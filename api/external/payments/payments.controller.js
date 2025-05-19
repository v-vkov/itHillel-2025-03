const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET

const emailSender = require('../../../utils/email-sender.util')
const pdfGenerator = require('../../../utils/pdf-generator.util')

async function handleWebhook(req, res) {
    let event = req.body

    // todo: move to stripe service
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = req.headers['stripe-signature']
        try {
          event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            endpointSecret
          )
        } catch (err) {
          console.log(`⚠️  Webhook signature verification failed.`, err.message)
          return res.sendStatus(400)
        }
      }

      // todo: move to stripe service
      switch (event.type) {
        case 'checkout.session.completed':
          const result = event.data.object
          console.log(`Result`, result)
          // TODO: 
          // get order by id and update with 'paid: true'
          // save payment_intent id
          // save charge.reciept_url (optional)
          break
        case 'charge.updated':
             // just to test
            const charge = event.data.object
            console.log(`charge`, charge)

            const pdf = await pdfGenerator.generatePdf(charge.receipt_url)

            await emailSender.sendEmail({
              from: 'Acme <onboarding@resend.dev>',
              to: ['rambambam72@gmail.com'],
              subject: 'Order Paid',
              html: '<strong>We recieved your order.</strong>',
              attachments: [{
                content: Buffer.from(pdf),
                filename: 'order_reciept.pdf'
              }]
            })


            break
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`)
          break
      }
    
    return res.send()
}

module.exports = {
    handleWebhook
}