const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config({path: 'variables.env'});


exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.rol,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    }
    return jwt.encode(payload,process.env.JWT_SECRET);
}