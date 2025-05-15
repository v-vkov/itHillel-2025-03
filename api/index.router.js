const express = require('express')

const router = express.Router()

const apiWebRouter = require('./web/index')
const apiAdminRouter = require('./admin/index')
const externalRouter = require('./external')

router.use('/api-web', express.json(), apiWebRouter)
router.use('/api-admin', express.json(), apiAdminRouter)
router.use('/external', externalRouter)

module.exports = router