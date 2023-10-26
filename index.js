"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

require("express-async-errors");

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

// Accept JSON
app.use(express.json());

// Middlewares
app.use(require("./src/middlewares/findSortSearchPage"));
app.use(require("./src/middlewares/logger"));
app.use(require("./src/middlewares/authentication"));

// Routes
app.all("/", (req, res) => {
    res.send({
        error: false,
        message: "Welcome to Flight API",
        document: "/documents",
        user: req.user,
    });
});

app.use(require("./src/routes"))

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("Server running on http://127.0.0.1:" + PORT));
