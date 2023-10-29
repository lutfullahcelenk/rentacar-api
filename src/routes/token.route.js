"use strict";

const router = require("express").Router();
const permission = require("../middlewares/permissions");
const tokenController = require("../controllers/token.controller");

router
    .route("/")
    .get(permission.isAdmin, tokenController.list)
    .post(permission.isAdmin, tokenController.create);

router
    .route("/:id")
    .get(permission.isAdmin, tokenController.read)
    .put(permission.isAdmin, tokenController.update)
    .patch(permission.isAdmin, tokenController.update)
    .delete(permission.isAdmin, tokenController.delete);

module.exports = router;
