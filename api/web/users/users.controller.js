
const userService = require('./users.service')

async function register (req, res) {
    try {
        const user = await userService.registerUser(req.body)
        return res.status(201).json({message: 'User registered', user})
    } catch (err) {
        console.log('err', err)
        return res.status(400).json({message: 'Bad Request', error: (err && err.message) || err})
    }
}

async function login (req, res) {
    try {
        const user = await userService.login(req.body)
        return res.status(200).json(user)
    } catch (err) {
        console.log('err', err)
        return res.status(400).json({message: 'Bad Request', error: (err && err.message) || err})
    }  
}

module.exports = {
    register,
    login
}

