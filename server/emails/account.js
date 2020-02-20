const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    const code = require('../utils/randomInt')()
    sgMail.send({
        to: email,
        from: 'no-reply@workoutsharer.com',
        subject: 'Workout Sharer',
        text: `Welcome to Workout Sharer, ${name}! Your confirmation code is ${code}. Feel free to email me with feedback through the contact page and good luck training!`
    })
    return code
}

const sendCancelationEmail = (email, name) => {
    const code = require('../utils/randomInt')()
    sgMail.send({
        to: email,
        from: 'no-reply@workoutsharer.com',
        subject: 'Workout Sharer',
        text: `Goodbye, ${name}. If there is something I could do better please let me know at jacob.carroll.rothschild@gmail.com. Your 4 digit code is ${code}.`
    })
    return code
}

const sendChangePasswordEmail = (email) => {
    const code = require('../utils/randomInt')()
    sgMail.send({
        to: email,
        from: 'no-reply@workoutsharer.com',
        subject: 'Workout Sharer',
        text: `Your 4 digit code to change your password is ${code}.`
    })
    return code
}

const sendMeEmail = (email, subject, content) => {
    sgMail.send({
        to: 'jacob.carroll.rothschild@gmail.com',
        from: email,
        subject: subject,
        text: content
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
    sendChangePasswordEmail,
    sendMeEmail
}