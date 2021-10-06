const Subscriber = require("../schemas/Subscriber");
const User = require("../schemas/User");
const History = require('../schemas/History')
const send_email = require("../utils/send_email");
const Scheduled = require("../schemas/Scheduled");

async function handle_email_send(req, res) {
    const { subject, body, is_scheduled, recurrence } = req.body;

    try {
        if (!subject) {
            res.status(400);
            throw 'subject is invalid';
        }
        if (!body) {
            res.status(400);
            throw 'body is invalid';
        }

        const { email } = req.user;

        const user = await User.findOne({ email: email });

        if (user === null) {
            res.status(404);
            throw 'No such user';
        }

        const subscribers = await Subscriber.find({ user: user._id.toString() });
        const receiver_emails = [];
        subscribers.forEach(item => receiver_emails.push(item.email));
        console.log(receiver_emails);

        if (is_scheduled) {
            const recur_states = ['Daily', 'Weekly', 'Monthly'];
            if (!recurrence && !recur_states.find(item => recurrence === item)) {
                res.status(400);
                throw 'Recurrence is not defined';
            }

            const scheduled = await Scheduled.create({
                user: user._id,
                email: {
                    subject: subject,
                    body: body
                },
                recurrence: recurrence,
                next_send_date: Date.now(),
                created_at: Date.now()
            });

        }
        else {
            const historyEntry = History.create({
                user: user._id,
                email: {
                    subject: subject,
                    body: body
                },
                sent_at: Date.now()
            })
            Promise.all([send_email(email, receiver_emails, subject, body, body), historyEntry]);
        }
        res.status(200).json({ message: "Emails sent successfully" });

    }
    catch (e) {
        console.log(e);
        res.json({ error: e });
    }
}

module.exports = { handle_email_send };