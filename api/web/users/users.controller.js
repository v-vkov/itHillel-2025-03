const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    const {email, password} = req.body

    const user = users.find(u => u.email === email) 
    if (!user) return res.status(400).json({message: 'Invalid credentials'})

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({message: 'Invalid credentials'})

    const token = jwt.sign(
        {
            email: user.email, role: 'user'
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
            issuer: 'api:web'
        }
    )

    return res.status(200).json({
        email: user.email,
        name: user.name,
        token
    })

}

module.exports = {
    register,
    login
}

