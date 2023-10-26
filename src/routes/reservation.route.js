"use strict";

const router = require("express").Router();

const reservationController = require("../controllers/reservation.controller");

router.route("/").get(reservationController.list).post(reservationController.create);

router
    .route("/:id")
    .get(reservationController.read)
    .put(reservationController.update)
    .patch(reservationController.update)
    .delete(reservationController.delete);

module.exports = router;
