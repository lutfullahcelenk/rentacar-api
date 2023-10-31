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

// Sending Mail
const nodemailer = require("nodemailer");
/*
nodemailer.createTestAccount().then((email) => console.log(email));
{
     user: 'vh2wflyppvzx4fl5@ethereal.email',
     pass: '919MavhunD3GtSNUXq',
     smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
     imap: { host: 'imap.ethereal.email', port: 993, secure: true },
     pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
     web: 'https://ethereal.email'
   } 
*/

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "vh2wflyppvzx4fl5@ethereal.email",
        pass: "919MavhunD3GtSNUXq",
    },
});

transporter.sendMail(
    {
        from: "vh2wflyppvzx4fl5@ethereal.email",
        to: "lutfullahclnk1104@gmail.com",
        subject: "Hello",
        text: "Hello Lutfullah",
        html: "<b>Salih Paşa</b>",
    },
    (error, successInfo) => {
        error ? console.log(error) : console.log(successInfo);
    }
);

// Routes
app.all("/", (req, res) => {
    res.send({
        error: false,
        message: "Welcome to RentACar API",
        document: "/documents",
        user: req.user,
    });
});

app.use(require("./src/routes"));

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("Server running on http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require("./src/helpers/sync")();
