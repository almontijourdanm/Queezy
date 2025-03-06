const { Room, RoomPlayer, User } = require("../models");

class SocketController {
    static async joinRoom(roomId, userId) {
        try {
            const room = await Room.findByPk(roomId);
            if (!room) {
                throw { message: "Room not found" };
            }

            const roomPlayer = await RoomPlayer.findOne({
                where: {
                    RoomId: roomId,
                    UserId: userId
                }
            });
            if (!roomPlayer) {
                await RoomPlayer.create({
                    RoomId: roomId,
                    UserId: userId,
                    score: 0,
                    answer: []
                });
            }

            const roomPlayers = await RoomPlayer.findAll({
                where: {
                    RoomId: roomId
                },
                include: {
                    model: User,
                    attributes: { exclude: ['password'] }
                }
            });

            return roomPlayers

        } catch (error) {
            return error.message
        }
    }

    static async startGame(roomId) {
        try {
            const room = await Room.findByPk(roomId);
            if (!room) {
                throw { message: "Room not found" };
            }
            

            // players.forEach(async player => {
            //     await RoomPlayer.create({
            //         RoomId: roomId,
            //         UserId: player.id,
            //         score: 0,
            //         answer: []
            //     });
            // });

            room.status = "Playing";
            await room.save();

            return room
            
        } catch (error) {
            return error.message;
        }
    }

    static async findRoomByPk(roomId) {
        try {
            const room = await Room.findByPk(roomId);
            if (!room) {
                throw { message: "Room not found" };
            }

            return room;

        } catch (error) {
            return error.message;
        }
    }

    static async finishedGame(roomId, userId, score, data) {
        try {
            const roomPlayer = await RoomPlayer.findOne({
                where: {
                    RoomId: roomId,
                    UserId: userId
                }
            });

            if (!roomPlayer) {
                throw { message: "RoomPlayer not found" };
            }

            roomPlayer.score = score;
            roomPlayer.answers = {
                quaestions: data.players.questions,
                answer: data.players.answer
            }
            await roomPlayer.save();


            const roomLeaderboard = await RoomPlayer.findAll({
                where: {
                    RoomId: roomId
                },
                include: {
                    model: User,
                    attributes: { exclude: ['password'] }
                },
                order: [['score', 'DESC']]
            });

            console.log(roomLeaderboard, "<<< roomLeaderboard");
            

            return roomLeaderboard;

        } catch (error) {
            return error.message;
        }
    }
}


module.exports = SocketController;