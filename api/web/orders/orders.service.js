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

        // const page = 3
        // const limit = 10

        // return Order.find({})
        //     .sort({createdAt: 1})
        //     .skip((page-1)*limit) //20
        //     .limit(limit) //10


    } catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    create,
    list
}
