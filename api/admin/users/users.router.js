const express = require('express')
const usersController = require('./users.controller')
const usersMiddlware = require('./users.middlware')
const authMiddleware = require('../../common/middleware/auth.middleware')

const router = express.Router()

router.get('/', [authMiddleware.checkAuth('api:admin')], usersController.getUsers)
router.get('/:id', [authMiddleware.checkAuth('api:admin')], usersController.getUserById)
router.post('/', [authMiddleware.checkAuth('api:admin'), usersMiddlware.validateUser], usersController.createUsers)
router.delete('/:id', [authMiddleware.checkAuth('api:admin')], usersController.deleteUserById)


router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.post('/logout', usersController.logout)

module.exports = router