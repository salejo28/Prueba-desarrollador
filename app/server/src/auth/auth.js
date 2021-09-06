const jwt = require('jsonwebtoken')
const pool = require('../DB')
const config = require('../config/config')

function authenticate(req, res, next) {
    try {
        const token = req.header('x-access-token')?.replace('Bearer ', '')
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access Denied'
            })
        }

        const verify = jwt.verify(token, config.TOKEN.secret_key)
        if (!verify) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Token'
            })
        }

        req.user = verify
        next()
    } catch (error) {
        return res.send(error)
    }
}

async function isSpeaker(req, res, next) {
    try {
        if (req.user.role_id !== 1) {
            return res.status(401).json({
                success: false,
                message: "You're not speaker"
            })
        }
        next()
    } catch (error) {
        return res.send(error)
    }
}

async function isAttendant(req, res, next) {
    try {
        if (req.user.role_id !== 2) {
            return res.status(401).json({
                success: false,
                message: "You're not attendant"
            })
        }
        next()
    } catch (error) {
        return res.send(error)
    }
}

module.exports = {
    authenticate,
    isAttendant,
    isSpeaker
}
