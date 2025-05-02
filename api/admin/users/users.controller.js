const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userService = require('./users.service')

const users = require('./mock/users')

async function register (req, res) {
    const {email, password, name} = req.body

    const user = users.find(u => u.email === email) 
    if (user) return res.status(400).json({message: 'User already exists'})

    const hash = await bcrypt.hash(password, 10)

    users.push({
        email,
        name,
        password: hash
    })

    return res.status(201).json({message: 'User registered'})
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
            issuer: 'api:admin'
        }
    )

    res.cookie('token', token, {
        httpOnly: true,
        secure: false, // prod true important
        maxAge: 60*60*1000 // 3600 000
    })

    return res.status(200).json({
        email: user.email,
        name: user.name
    })
}

async function logout (req, res) {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false, // prod true important
        maxAge: 60*60*1000 // 3600 000
    })

    return res.status(200).json({
        message: 'logout'
    })
}

function getUsers (req, res) { 
    res.json({users: users})
}

function getUserById (req, res, next) {
    const id = req.params.id
    res.json({userId: id})
}

function createUsers (req, res)  {
    const body = req.body
    console.log('BODY:', body)
    return res.json(req.body)
}

function deleteUserById (req, res)  {
    res.json({users: 'User with id deleted'})
}

module.exports = {
    register,
    login,
    logout,
    getUsers,
    getUserById,
    createUsers,
    deleteUserById
}

