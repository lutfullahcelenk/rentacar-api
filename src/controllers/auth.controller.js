"use strict";

const User = require("../models/user.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
    login: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password.'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */

        const { username, email, password } = req.body;

        if ((username || email) && password) {
            const user = await User.findOne({ $or: [{ username }, { email }] });

            if (user && user.password == passwordEncrypt(password)) {
                if (user.isActive) {
                    /* TOKEN */

                    let tokenData = await Token.findOne({ userId: user._id });

                    if (!tokenData) {
                        let tokenKey = passwordEncrypt(user._id + Date.now());
                        tokenData = await Token.create({ userId: user._id, token: tokenKey });
                    }

                    res.send({
                        error: false,
                        message: "Login Successful",
                        token: tokenData.token,
                        user,
                    });
                    /* TOKEN */
                } else {
                    res.errorStatusCode = 401;
                    throw new Error("This account is not active.");
                }
            } else {
                res.errorStatusCode = 401;
                throw new Error("Wrong username/email or password.");
            }
        } else {
            res.errorStatusCode = 401;
            throw new Error("Please enter username/email and password.");
        }
    },

    logout: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Logout"
            #swagger.description = 'Delete token key.'
        */

        const auth = req.headers?.authorization || null;
        const tokenKey = auth ? auth.split(" ")[1] : null;

        // Delete token from db:
        const tokenData = await Token.deleteOne({ token: tokenKey });

        res.send({
            error: false,
            message: "Logout Successful.",
            data: tokenData,
        });
    },
};
