const express = require('express')
const usersController = require('./users.controller')
const usersMiddlware = require('./users.middlware')

const router = express.Router()

router.post('/register', usersController.register)
router.post('/login', usersController.login)

module.exports = router