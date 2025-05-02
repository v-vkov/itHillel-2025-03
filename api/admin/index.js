const express = require('express')

const router = express.Router()

const usersRouter = require('./users/users.router')

router.use('/users', usersRouter)

module.exports = router