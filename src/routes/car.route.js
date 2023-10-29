"use strict";

const router = require("express").Router();
const permission = require("../middlewares/permissions");
const carController = require("../controllers/car.controller");

router
    .route("/")
    .get(carController.list)
    .post(permission.isAdmin, carController.create);

router
    .route("/:id")
    .get(carController.read)
    .put(permission.isAdmin, carController.update)
    .patch(permission.isAdmin, carController.update)
    .delete(permission.isAdmin, carController.delete);

module.exports = router;
