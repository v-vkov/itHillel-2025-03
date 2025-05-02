const express = require('express')
const menuController = require('./menu.controller')

const router = express.Router()

router.get('/', menuController.listMenu)

module.exports = router
