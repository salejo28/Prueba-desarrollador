const { Login, Register } = require('../middlewares/Auth')

class AuthController {
    async Login(req, res) {

        const { errors, success, token } = await Login(req.body)
        if (!success) return res.json({
            errors,
            success
        })

        return res.set('x-access-token', `Bearer ${token}`).json({
            token,
            success: true
        })
    }

    async Register(req, res) {

        const { errors, success } = await Register(req.body)
        if (!success) return res.json({
            success,
            errors
        })

        return res.json({
            success: true,
            message: "You're ready, log in!"
        })
    }
}

module.exports = new AuthController()