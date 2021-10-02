const { decode } = require("jsonwebtoken");

async function authByToken(req, res, next) {
    const authHeader = req.header('Authorization')?.split(' ');

    //Check if Authorization token exists
    if (!authHeader) return res.status(401).json({
        errors: {
            body: ['Authorization Failed', 'No Authorization header'],
        }
    });

    //Check if Authorization type is token
    if (authHeader[0] != 'Token') res.status(401).json({
        errors: {
            body: ['Authorization Failed', 'Token missing'],
        }
    });
    //Check if token is valid
    const token = authHeader[1];
    try {
        const user = await decode(token);
        if (!user) throw 'No user found in token';
        req.user = user;
        return next();
    }
    catch (e) {
        return res.status(401).json({
            errors: {
                body: ['Authorization Failed', e],
            }
        });
    }

}

module.exports=authByToken;