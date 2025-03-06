if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

const cors = require('cors');
app.use(cors());

const UserController = require('./controllers/userController');
const errorHandler = require('./middlewares/errorHandler');

const { Server } = require('socket.io');
const { createServer } = require("http");

const Controller = require('./controllers/controller');
const authentication = require('./middlewares/authentication');
const { verifyToken } = require('./helpers/jwt');
const SocketController = require('./controllers/socketController');


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  socket.on('join-room', async (roomId) => {
    try {

      const access_token = socket.handshake.auth?.access_token;
      const payload = verifyToken(access_token);

      const roomPlayers = await SocketController.joinRoom(roomId, payload.id);

      socket.join(roomId);

      io.to(roomId).emit('roomPlayers', roomPlayers);

    } catch (error) {
      console.log(error);
      
    }
  });

  // Listen event dari client
  // event: counter/update
  // io.to('room1').emit('counter/update', 1);

  socket.on("startGame", async (roomId) => {
    try {
      const room = await SocketController.startGame(roomId);
      
      io.to(roomId).emit("gameStarted", room);
      
    } catch (error) {
      
    }
  })

  socket.on("finishGame", async (data) => {
    try {
      console.log(data, "<<< data finish game");
      let totalScore = 0;
      
      const room = await SocketController.findRoomByPk(data.roomId);
      room.questions.forEach(async (question, index) => {
        if (question.correct_answer === data.players.answer[index]) {
          totalScore += 10;
        }
      });

      const access_token = socket.handshake.auth?.access_token;
      const payload = verifyToken(access_token);

      const scoreBoard = await SocketController.finishedGame(data.roomId, payload.id, totalScore, data);
      
      io.to(data.roomId).emit("scoreBoard", scoreBoard);

      // const room = await SocketController.finishGame(data);
      // console.log(room, "<<< room finish game");
    } catch (error) {
      console.log(error);
    }
  });


  // disconnect -> event bawaan socket.io
  socket.on('disconnect', () => {
    console.log(socket.id, "<<< new user disconnect");
    // updateOnlineUsers(io)
  });
});


app.post('/register', UserController.register);

app.post('/login', UserController.login);

app.use(authentication)


app.get('/rooms', Controller.listRooms);

app.post('/rooms', Controller.createRoom);

app.post('/start-game', Controller.startGame);

// app.put('/finish-game')


app.use(errorHandler);


httpServer.listen(PORT, () => {
  console.log(`Server can be access in http://localhost:${PORT}`);
})



module.exports = io;