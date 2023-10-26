"use strict";

const router = require("express").Router();

// auth:
router.use("/auth", require("./auth.route"));
// user:
router.use("/users", require("./user.route"));
// token:
router.use("/tokens", require("./token.route"));
// car:
router.use("/cars", require("./car.route"));
// reservation:
router.use("/reservations", require("./reservation.route"));
// document:
router.use("/documents", require("./document.route"));

module.exports = router;
