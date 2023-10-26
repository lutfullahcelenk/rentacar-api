"use strict"

const router = require('express').Router()

const carController = require('../controllers/car.controller')

router.route('/')
    .get(carController.list)
    .post(carController.create)

router.route('/:id')
    .get(carController.read)
    .put(carController.update)
    .patch(carController.update)
    .delete(carController.delete)

module.exports = router