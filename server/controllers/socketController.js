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
}


module.exports = SocketController;