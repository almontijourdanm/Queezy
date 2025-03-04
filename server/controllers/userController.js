const { User } = require('../models');

class UserController {
    static async register(req, res, next) {
        try {
            const {
                username,
                email,
                password
            } = req.body;

            const newUser = await User.create({
                username,
                email,
                password
            });

            res.status(201).json({
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            });
            
        } catch (error) {
            next(error);
        }
    }
}


module.exports = UserController;