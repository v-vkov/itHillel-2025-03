const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
    }, 
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {
    timestamps: true // createdAt , updatedAt
})

userSchema.index({
    email: 1,
    company: 1
}, {unique: true})


module.exports = mongoose.model('User', userSchema, 'users')