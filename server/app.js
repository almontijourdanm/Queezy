if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}  

const express = require('express');
const app = express();
const PORT = 3000

const cors = require('cors');
app.use(cors());

const UserController = require('./controllers/userController');
const errorHandler = require('./middlewares/errorHandler');

const { Server } = require('socket.io');
const { createServer } = require("http");

const Controller = require('./controllers/controller');
const authentication = require('./middlewares/authentication');


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
    socket.emit("counter/update", lastCountValue)
  
    // Listen event dari client
    // event: counter/update
    socket.on('counter/set', (newCount) => {
      console.log(newCount, "<<< ")
  
      lastCountValue = newCount
  
      // emit to everyone
      io.emit("counter/update", newCount)
    })
  
    // disconnect -> event bawaan socket.io
    socket.on('disconnect', () => {
      console.log(socket.id, "<<< new user disconnect");
      updateOnlineUsers(io)
    });
});


app.get('/', (req, res) => {
    res.send('ini homepage')
})

app.post('/register', UserController.register);

app.post('/login', UserController.login);

app.use(authentication)

app.post('/start-game', Controller.startGame)

app.get('/rooms', (req,res,next) => {
    res.send("ini rooms page")
})

app.get('/gemini-generate', Controller.generateAI)


app.use(errorHandler);


httpServer.listen(PORT, () => {
    console.log(`Server can be access in http://localhost:${PORT}`);
})



module.exports = io;