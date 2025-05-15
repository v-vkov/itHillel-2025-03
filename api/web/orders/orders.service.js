const Order = require('../../../models/orders')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

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

async function updateOrder(orderId, data = {}) {
    try {
        const updated = await Order.findByIdAndUpdate(orderId, {
            $push: {
                items: data.new_pizza
        }}, {new: true})

        return updated
    } catch (err) {
        throw new Error(err)
    }
}

async function getPaymentLink (orderId) {
    try {
        const order = await Order.findById(orderId)
            .populate({ path: 'items' })
            .populate({ path: 'user_id' })

        const items = order.items.map(product => {
            return {
                price_data: {
                  currency: 'eur',
                  product_data: {
                    name: product.name,
                    images: [product.imageUrl]
                  },
                  unit_amount: product.unitPrice * 100,
                },
                quantity: 1
              }
        })

        // todo: move to stripe service
        const session = await stripe.checkout.sessions.create({
            line_items: items,
            customer_email: order.user_id.email,
            client_reference_id: order._id.toString(),
            mode: 'payment',
            success_url: 'http://localhost:3000/api-web/menu/render',
            cancel_url: 'http://localhost:3000/',
          })

          return session.url
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    create,
    list,
    updateOrder,
    getPaymentLink
}
