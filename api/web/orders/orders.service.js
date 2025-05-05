const Order = require('../../../models/orders')

const ObjectId = require('mongoose').Types.ObjectId

async function create(userId, orderData) {
    try {
        const order = new Order({user_id: userId, ...orderData})
        await order.save()

        return order
    } catch (err) {
        throw new Error(err)
    }
}

async function list (userId) {
    try {
        const query = {}
        if (userId) {
            query.user_id = new ObjectId(userId)
        }
        return Order.find(query)
            .sort({createdAt: 1})
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    create,
    list
}
