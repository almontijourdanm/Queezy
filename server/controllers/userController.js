const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class UserController {
    static async register(req, res, next) {
        try {
            const {
                username,
                email,
                password
            } = req.body;

            if (!username) {
                throw { name: "BadRequest", message: "Username is required" }
            }

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

    static async login(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body;

            if (!email) {
                throw { name: "BadRequest", message: "Email is required" }
            }

            if (!password) {
                throw { name: "BadRequest", message: "Password is required" }
            }

            const user = await User.findOne({
                where: { email }
            });
            if (!user) {
                throw { name: "Unauthorized", message: "Invalid Email/Password" }
            }

            const isValidPassword = comparePassword(password, user.password);
            if (!isValidPassword) {
                throw { name: "Unauthorized", message: "Invalid Email/Password" }
            }

            const access_token = signToken({
                id: user.id,
                username: user.username,
                email: user.email
            });

            req.user = user;

            res.status(200).json({ access_token });
            
        } catch (error) {
            next(error)
        }
    }
}


module.exports = UserController;