const User = require('../../../models/users')

const bcrypt = require('bcryptjs')

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
        console.log()
        throw new Error(`Error register user: ${err && err.message}`)
    }
    
}

module.exports = {
    registerUser
}