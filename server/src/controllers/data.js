const url = require('url');
const mongoose = require('mongoose')
const History = require('../schemas/History');
const Scheduled = require('../schemas/Scheduled');
const Subscriber = require('../schemas/Subscriber');
const Template = require('../schemas/Templates');

async function fetch_table(req, res) {

    const table_name = req.params.table_name;
    const valid_tables = ['subscribers', 'history', 'scheduled', 'templates'];
    if (!valid_tables.find((item) => item == table_name)) {
        res.status(404).json({ error: "No such table" });
        return;
    }

    let { page_size, page, record_id } = url.parse(req.url, true).query;
    if (record_id) {
        if (!mongoose.Types.ObjectId.isValid(record_id)) {
            res.status(404).json({ error: 'record id is invalid' });
            return;
        }
    }

    if (!page_size || page_size <= 0) page_size = 10;
    if (!page || page <= 0) page = 1;

    const result = {};
    const limit = page * page_size;
    const offset = limit - page_size;
    
    if (table_name === 'subscribers') {
        if (record_id) data = await Subscriber.findById(record_id);
        else {
            const data = await Subscriber.find({is_verified: true}).limit(limit).skip(offset);
            result.data = data;
            result.table_headers = ['email', 'name', 'total_emails_sent', 'successful_emails_sent', 'subscribed_on'];
        }
    }
    else if (table_name === 'history') {
        if(record_id) data = await History.findById(record_id);
        else {
            const data = await History.find().limit(limit).skip(offset);            
            result.data = data;
            result.table_headers = ['email', 'sent_at'];
        }
    }
    else if (table_name === 'scheduled') {
         if(record_id) data = await Scheduled.findById(record_id);
        else {
            const data = await Scheduled.find().limit(limit).skip(offset);            
            result.data = data;
            result.table_headers = ['email', 'recurrence', 'next_send_date'];
        }
    }
    else if (table_name === 'templates') {
          if(record_id) data = await Template.findById(record_id);
        else {
            const data = await Template.find().limit(limit).skip(offset);            
            result.data = data;
            result.table_headers = ['email', 'created_at'];
        }       
    }
    res.status(200).json({ result });
}

module.exports = { fetch_table }