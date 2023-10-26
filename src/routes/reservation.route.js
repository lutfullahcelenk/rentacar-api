"use strict"

const router = require('express').Router()

const reservartionController = require('../controllers/reservartion.controller')

router.route('/')
    .get(reservartionController.list)
    .post(reservartionController.create)

router.route('/:id')
    .get(reservartionController.read)
    .put(reservartionController.update)
    .patch(reservartionController.update)
    .delete(reservartionController.delete)

module.exports = router