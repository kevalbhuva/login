var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "026bb886bafb4d",
        pass: "965a518df2e81c"
    }
});

async function sendEmail(to, subject, text) {
    try {
        const info = await transport.sendMail({
            from: '"Maddison Foo Koch 👻" <info.kevalbhuva786@gmail>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
        });
        console.log('Email sent: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

module.exports = sendEmail;