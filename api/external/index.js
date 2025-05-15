const express = require('express')

const router = express.Router()

const paymentsRouter = require('./payments/payments.router')

router.use('/payments', paymentsRouter)



module.exports = router