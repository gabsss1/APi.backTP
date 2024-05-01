const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config({path: 'variables.env'});

exports.auth = function(req,res,next){
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'NoHeadersError'});
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');
    var segment = token.split('.');

    if (segment.length != 3) {
        return res.status(403).send({message: 'Token Invalido'});
    }else{
        try {
            var payload = jwt.decode(token,process.env.JWT_SECRET);
            
            if (payload.exp <= moment.unix()) {
                return res.status(403).send({message: 'Token Expirado'});
            }
        } catch (error) {
            return res.status(403).send({message: 'Token Invalido'});
        }
    }

    req.user = payload;

    next();
}