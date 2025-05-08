const express = require('express')
const ordersController = require('./orders.controller')
const ordersMiddleware = require('./orders.middleware')

const router = express.Router()

router.get('/', ordersController.listOrders)
router.post('/:user_id', ordersMiddleware.validateOrder, ordersController.createOrder)
router.put('/:id', ordersController.updateOrder)

module.exports = router
