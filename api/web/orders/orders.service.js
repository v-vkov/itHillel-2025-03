const Order = require('../../../models/orders')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const ObjectId = require('mongoose').Types.ObjectId

const ejs = require('ejs')
const path = require('path')

const emailSender = require('../../../utils/email-sender.util')
 
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

async function getOrdersReport () {
        const report =  await Order.aggregate()
            .facet({
                uniqueUsers: [
                    {
                        $group: {
                            _id: '$user_id'
                        }
                    },
                    {
                        $count: 'value'
                    }
                ],
                totalOrders: [
                    {
                        $count: 'value'
                    }
                ],
                totalAvrg: [
                    {
                        $group: {
                            _id: null,
                            maxBill: { $max: '$total'},
                            minBill: {$min: '$total'},
                            avgBill: {$avg: '$total'},
                        }
                    }
                ],
                topPizzas: [
                        {
                          $unwind: "$items",
                        },
                        {
                          $group:
                            {
                              _id: "$items",
                              count: {
                                $sum: 1,
                              },
                            },
                        },
                        {
                          $lookup:
                            {
                              from: "products",
                              localField: "_id",
                              foreignField: "_id",
                              as: "product",
                            },
                        },
                        {
                          $unwind:
                            "$product",
                        },
                        {
                          $project:
                            {
                              count: 1,
                              name: "$product.name",
                            },
                        },
                        {
                            $sort: {count: -1}
                        }
                    ]
            })


            const html = await ejs.renderFile(path.resolve('views/emails/orders-report.ejs'), {
                // todo: open report array and rewrite this logic
                uniqueUsers: report[0].uniqueUsers[0].value,
                totalOrders:  report[0].totalOrders[0].value,
                maxCheck: report[0].totalAvrg[0].maxBill,
                minCheck: report[0].totalAvrg[0].minBill,
                averageCheck: report[0].totalAvrg[0].avgBill,
                topPizzas: report[0].topPizzas,
            })


            await emailSender.sendEmail({
                // todo: get domain and set dynamic data
                from: 'Acme <onboarding@resend.dev>',
                to: ['rambambam72@gmail.com'],
                subject: 'Orders report',
                html
            })

            return true
}

module.exports = {
    create,
    list,
    updateOrder,
    getPaymentLink,
    getOrdersReport
}
