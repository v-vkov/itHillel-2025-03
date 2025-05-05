const User = require('../../../models/users')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (data) => {
    try {
        const {email, password, name, role} = data

        const existedUser = await User.findOne({email})
        if (existedUser) throw new Error('User already exists')
    
        const hash = await bcrypt.hash(password, 10)
    
        const user = new User({
            email,
            name,
            role,
            password: hash
        })
    
        return user.save()
    } catch (err) {
        throw new Error(`Error register user: ${err && err.message}`)
    }   
}

const login = async (data) => {
    try {
        const user = await User.findOne({email: data.email})
        if (!user) throw new Error('Invalid credentials')

        const isMatch = await bcrypt.compare(data.password, user.password)
        if (!isMatch) throw new Error('Invalid credentials')

        const token = jwt.sign(
            {
                email: user.email, role: 'user'
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d',
                issuer: 'api:web'
            }
        )

        return {
            email: user.email,
            name: user.name,
            token
        }
    } catch (err) {
        throw new Error(`Error login user: ${err && err.message}`)
    }
}

module.exports = {
    registerUser,
    login
}