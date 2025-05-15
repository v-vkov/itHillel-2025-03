const express = require('express')
const paymentsController = require('./payments.controller')

const router = express.Router()

router.post('/webhook', express.raw({type: 'application/json'}), paymentsController.handleWebhook)

module.exports = router
