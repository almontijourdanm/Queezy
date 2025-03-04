if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}  

const express = require('express');
const app = express();
const PORT = 3000
app.use(express.urlencoded({ extended: true }))

app.use(express.json())


const { GoogleGenerativeAI } = require("@google/generative-ai");
const UserController = require('./controllers/userController');
const errorHandler = require('./middlewares/errorHandler');
const genAI = new GoogleGenerativeAI('AIzaSyD7Uc9NvuPDoi7m6wapcYPvcRRRjr8iTWA');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.get('/', (req, res) => {
    res.send('ini homepage')
})

app.post('/register', UserController.register);

app.post('/login', UserController.login);

app.post('/start-game', (req,res,next) => {
    res.send("ini start page")
})

app.get('/rooms', (req,res,next) => {
    res.send("ini rooms page")
})

app.get('/gemini-generate', async (req, res) => {
    try {
        const {category} = req.body 
        const prompt =
            `Please make me 10 questions with answers options about the topic of '${category}'. The questions should be suitable for a 5th grade student.
    {"question": "What is the capital of France?", "options": ["Paris", "Berlin", "Madrid", "Rome"], "correct_answer": "Paris"}`;

        const result = await model.generateContent(prompt);
        console.log(result, "ini result<<><");
        res.send(result.response.text());


    } catch (error) {
        console.log(error, "ini error<<><");
        res.status(500).send('Internal Server Error');

    }
})


app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server can be access in http://localhost:${PORT}`);
})

