const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {type: String},
    unitPrice: {type: Number},
    imageUrl: {type: String},
    ingredients: [{
        type: String
    }],
    soldOut: {type: Boolean}
}, {
    timestamps: true
})



module.exports = mongoose.model('Product', productSchema, 'products')