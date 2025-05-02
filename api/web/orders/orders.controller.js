const ordersService = require('./orders.service')

async function createOrder(req, res) {
    const order = await ordersService.create(req.params.user_id, req.body)

    return res.status(201).json(order)
}

async function listOrders(req, res) {
    const orders = await ordersService.list(req.query.user_id)

    return res.status(200).json(orders)
}

module.exports = {
    createOrder,
    listOrders
}
