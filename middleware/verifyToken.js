require('dotenv').config();
const { response } = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res = response, next) => {
    const token = req.header('x-api-key');

    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'Invalid api key'
        })
    }

    try {
        jwt.verify(token, process.env.SERVER_JWT_SEED);
        next();
    } catch ( error ) {
        return res.status(401).json({
            ok: false,
            msg: 'Incorrect api key'
        })
    }

}


module.exports = { verifyToken }