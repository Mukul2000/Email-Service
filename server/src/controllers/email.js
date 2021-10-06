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

        const subscribers = await Subscriber.find({ user: user._id.toString(), is_verified: true });
        const receiver_emails = [];
        subscribers.forEach(item => receiver_emails.push(item.email));

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
            const d = await Promise.all([send_email(email, receiver_emails, subject, body, body), historyEntry]);
            const rejected = d[0];

            // update total sent emails and delivered emails for each sub
            subscribers.forEach(async (sub) => {
                const good_sent = sub.successful_emails_sent;
                const total_sent = sub.total_emails_sent;
                if (!rejected.find(item => item === sub.email)) {
                    await Subscriber.findOneAndUpdate({ _id: sub._id }, { $set: { total_emails_sent: total_sent + 1, successful_emails_sent: good_sent + 1 } });
                }
                else {
                    await Subscriber.findOneAndUpdate({ _id: sub._id }, { $set: { total_emails_sent: total_sent + 1, successful_emails_sent: good_sent } });
                }
            });


        }
        res.status(200).json({ message: "Emails sent successfully" });

    }
    catch (e) {
        console.log(e);
        res.json({ error: e });
    }
}

module.exports = { handle_email_send };