const nodemailer = require('nodemailer');

async function send_email(from, receiver_list, subject, text, html) {
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
        from: from, // sender address
        to: receiver_list, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = send_email;
