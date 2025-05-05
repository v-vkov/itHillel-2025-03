
const Products = require('../../../models/products')

async function list() {
    return Products.find({})
}

module.exports = {
    list
}
