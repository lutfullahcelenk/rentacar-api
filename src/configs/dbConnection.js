"use strict";

const mongoose = require("mongoose");

const dbConnection = () => {
    mongoose
        .connect(process.env.MONGODB)
        .then(() => console.log("* DB Connected * "))
        .catch((err) => console.log("* DB Not Connected * ", err));
};

module.exports = {
    mongoose,
    dbConnection,
};
