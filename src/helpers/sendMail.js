"use strict";

const nodemailer = require("nodemailer");

module.exports = async (to, subject, message) => {
    // Create Test (Fake) Account:
    // nodemailer.createTestAccount().then((email) => console.log(email))
    /*
    {
      user: 'ac6evxdu3t45mgmt@ethereal.email',
      pass: 'EhuWArCFt3uevRf887',
      smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
      imap: { host: 'imap.ethereal.email', port: 993, secure: true },
      pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
      web: 'https://ethereal.email'
    }
    */
    // // Connection to mailServer:
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     secure: false, // false | 'tls' | 'ssl'
    //     auth: {
    //         user: 'ac6evxdu3t45mgmt@ethereal.email',
    //         pass: 'EhuWArCFt3uevRf887'
    //     }
    // })
    // // SendMail:
    // transporter.sendMail({
    //     from: 'ac6evxdu3t45mgmt@ethereal.email',
    //     to: 'qadir@clarusway.com', // 'abc@mail.com, def@mail.com'
    //     subject: 'Hello',
    //     text: 'Hello There...',
    //     html: '<b>Hello There</b>'
    // }, (error, successInfo) => {
    //     (error) ? console.log(error) : console.log(successInfo)
    // })

    try {
        // determine the mail to send from and its credentials
        const mailSettings = {
            service: process.env.SERVICE,
            user: process.env.USER,
            pass: process.env.PASS,
        };

        // configure nodemailer
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: mailSettings.user,
                pass: mailSettings.pass,
            },
        });

        const mailOptions = {
            from: mailSettings.user,
            to: to,
            subject: subject,
            html: message,
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (err) {
        throw new Error(err.message);
    }
};
