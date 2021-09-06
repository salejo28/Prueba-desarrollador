const jwt = require('jsonwebtoken')
const config = require('../config/config')

function CreateToken(user, role_id, role_name) {
    return jwt.sign({
        user_id: user,
        role_id,
        role_name
    }, config.TOKEN.secret_key)
}

module.exports = {
    CreateToken
}