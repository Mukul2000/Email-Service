const nodemailer = require('nodemailer');

async function send_email(email, key) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'euna.hoeger70@ethereal.email',
            pass: 'dphjsuxJqHwhcx5FQ8'
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "abcd@g.com", // sender address
        to: email, // list of receivers
        subject: "Your Subscription", // Subject line
        text: `Your OTP is ${key}`, // plain text body
        html: `<b>Your OTP is ${key}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = send_email;
