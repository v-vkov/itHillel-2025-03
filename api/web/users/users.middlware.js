const jwt = require('jsonwebtoken')

const validationUtil = require('../../../utils/validation.util')

function validateUser(req, res, next) {
    return validationUtil.createUserValidation(req.body)
        .then(data => {
            req.body = data
            next()
        })
        .catch(err => {
            return res.status(404).json({
                message: 'Validation Error',
                details: err.details
            })
        })
}

function validateUserRole(req, res, next) {
    if (req.body.role !== 'admin') {
        return res.status(400).json({error: 'User has no access'})
    }

    next()
}

function validateToken(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({message: 'Unauthorized'})

    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET)

        console.log('TOKEN', decoded)

        req.user = decoded
        next()
    } catch (error) {
        console.log('error', error)
        return res.status(401).json({message: 'Unauthorized'})
    } 
}

module.exports = {
    validateUser,
    validateUserRole,
    validateToken
}