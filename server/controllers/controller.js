const { User, Room, RoomPlayer } = require('../models');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyD7Uc9NvuPDoi7m6wapcYPvcRRRjr8iTWA');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class Controller {
    static async listRooms(req, res, next) {
        try {
            const rooms = await Room.findAll({
                include: User
            });

            res.status(200).json(rooms);

        } catch (error) {
            next(error);
        }
    }

    static async startGame(req, res, next) {
        try {
            const {
                category,
                players
            } = req.body;

            const questions = await Controller.generateAI(category);

            const code = Math.random().toString(36).substring(2, 8).toUpperCase();

            const newRoom = await Room.create({
                code,
                questions,
                HostId: req.user.id
            });

            players.forEach(async player => {
                await RoomPlayer.create({
                    RoomId: newRoom.id,
                    UserId: player.id,
                    score: 0,
                    answer: []
                });
            });


            res.status(201).json({
                id: newRoom.id,
                code: newRoom.code,
                questions: newRoom.questions,
                players: players
            });
            
        } catch (error) {
            console.log(error);
            
            next(error)
        }
    }


    static async generateAI(category) {
        try {
            const prompt =
                `Please make me 10 questions with answers options about the topic of '${category}'. The questions should be suitable for a 5th grade student.
        {"question": "What is the capital of France?", "options": ["Paris", "Berlin", "Madrid", "Rome"], "correct_answer": "Paris"}`;
    
            const response = await model.generateContent(prompt);
            const cleanResponse = response.response.text().replace(/```json|```/g, "").trim(); 
            const result = JSON.parse(cleanResponse);
            

            // res.status(200).json(result);

            return result;
    
        } catch (error) {
            console.log(error);
            

            next(error);
        }
    }
}


module.exports = Controller;