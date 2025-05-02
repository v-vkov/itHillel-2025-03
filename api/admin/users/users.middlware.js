
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

module.exports = {
    validateUser,
    validateUserRole
}