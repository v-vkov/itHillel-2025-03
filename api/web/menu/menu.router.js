const express = require('express')
const menuController = require('./menu.controller')

const router = express.Router()

router.get('/', menuController.listMenu)
router.get('/render', menuController.renderMenu)
router.get('/upload/:type', menuController.uploadFile)

module.exports = router
