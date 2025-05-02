const express = require('express')

const router = express.Router()

const apiWebRouter = require('./web/index')
const apiAdminRouter = require('./admin/index')

router.use('/api-web', apiWebRouter)
router.use('/api-admin', apiAdminRouter)

module.exports = router