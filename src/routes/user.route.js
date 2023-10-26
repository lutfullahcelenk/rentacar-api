"use strict"

const router = require('express').Router()

const userController = require('../controllers/user.controller')

router.route('/')
    .get(userController.list)
    .post(userController.create)

router.route('/:id')
    .get(userController.read)
    .put(userController.update)
    .patch(userController.update)
    .delete(userController.delete)

module.exports = router