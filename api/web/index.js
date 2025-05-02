const express = require('express')

const router = express.Router()

const usersRouter = require('./users/users.router')
const menuRouter = require('./menu/menu.router')
const ordersRouter = require('./orders/orders.router')

router.use('/users', usersRouter)
router.use('/menu', menuRouter)
router.use('/orders', ordersRouter)


module.exports = router