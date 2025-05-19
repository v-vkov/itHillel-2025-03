const { Resend } = require('resend')
const resend = new Resend('re_jTnr38g7_4AC8J1ZHZ3v9p3a4z4vjxrc4')

async function sendEmail (args) {
    const emailOptions = {
        from: args.from,
        to: args.to,
        subject: args.subject,
        html: args.html
    }

    if (args.attachments && args.attachments.length) {
        emailOptions.attachments = args.attachments
    } 

    const { data, error } = await resend.emails.send(emailOptions)

    if (error) {
        console.log('error', error)
    }

    console.log('data', data)

    return data
}

module.exports = {
    sendEmail
}