const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    total: {
        type: Number,
    }, 
    user_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
    },
    delivery_address: {
        type: String
    }
}, {
    timestamps: true
})


ordersSchema.index({user_id: 1}) 

ordersSchema.index({createdAt: 1}, { expireAfterSeconds: 15552000 }) // 180 days




module.exports = mongoose.model('Order', ordersSchema, 'orders')