require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SERVER_JWT_SEED, {}, (err, token) => {
            if (err){
                console.log(err);
                reject(err)
            }

            resolve(token);
        })
    })
}

generateToken({name: 'Stella Luna Dev'}).then(token => {
    console.log(token);
})

module.exports = { generateToken }