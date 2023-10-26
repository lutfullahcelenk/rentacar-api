"use strict";

const User = require("../models/user.model");
const Token = require("../models/token.model");

module.exports = async (req, res, next) => {
    // Authorization: Token ...
    const auth = req.headers?.authorization || null; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

    if (tokenKey && tokenKey[0] == "Token") {
        const tokenData = await Token.findOne({ token: tokenKey[1] });
        if (tokenData) req.user = await User.findOne({ _id: tokenData.userId });
    }

    next();
};
