const { Router } = require('express')
const AuthController = require('../controllers/auth.controller')

class AuthRoutes {

    constructor() {
        this.router = Router({ strict: true })
        this.controller = AuthController

        this.Login()
        this.Register()
    }

    Login() {
        this.router.post('/login', this.controller.Login)
    }

    Register() {
        this.router.post('/register', this.controller.Register)
    }

}

module.exports = new AuthRoutes().router