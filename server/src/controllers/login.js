const User = require("../schemas/User");
const jwtutils = require('../utils/jwtutils')

async function login(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if(!email) throw 'Invalid email';
        if(!password) throw 'Invalid password';

        let user = await User.findOne({email: email}).lean().exec();

        if(user === null) throw 'No such user';

        if(user.password !== password) throw 'Wrong password';

        user.token = await jwtutils.sign(user);
        res.status(200).json({user}); 
    }
    catch(e) {
        console.log(e);
        res.status(404).json({
            errors: e,
        });
    }
}

module.exports = {login};