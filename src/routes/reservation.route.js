"use strict";

const router = require("express").Router();
const permission = require("../middlewares/permissions");
const reservationController = require("../controllers/reservation.controller");

router
    .route("/")
    .get(permission.isLogin, reservationController.list)
    .post(permission.isLogin, reservationController.create);

router
    .route("/:id")
    .get(permission.isLogin, reservationController.read)
    .put(permission.isAdmin, reservationController.update)
    .patch(permission.isLogin, reservationController.update)
    .delete(permission.isAdmin, reservationController.delete);

module.exports = router;
