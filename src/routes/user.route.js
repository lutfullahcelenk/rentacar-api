"use strict";

const router = require("express").Router();
const permission = require("../middlewares/permissions");
const userController = require("../controllers/user.controller");

router
    .route("/")
    .get(permission.isAdmin, userController.list)
    .post(permission.isAdmin, userController.create);

router
    .route("/register")
    .post(userController.create)

router.get('/verify', userController.verify)

router
    .route("/:id")
    .get(permission.isLogin, userController.read)
    .put(permission.isLogin, userController.update)
    .patch(permission.isLogin, userController.update)
    .delete(permission.isAdmin, userController.delete);

module.exports = router;
