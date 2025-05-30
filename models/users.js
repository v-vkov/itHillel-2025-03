const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
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
    },
    address: {
        type: String
    }, 
    phone: {
        type: String
    }
}, {
    timestamps: true // createdAt , updatedAt
})



module.exports = mongoose.model('User', userSchema, 'users')