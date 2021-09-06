const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')
const cors = require('cors')

class App {

    constructor(port) {
        this.app = express()
        this.port = port

        this.Settings()
        this.Middlewares()
        this.Routes()
    }

    Settings() {
        this.app.set('port', this.port)
    }

    Middlewares() {
        this.app.use(cors({
            origin: 'http://localhost:3000'
        }))
        this.app.use(morgan('dev'))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
    }

    Routes() {
        this.app.use('/api/auth', routes.AuthRoutes)
        this.app.use('/api/conferences', routes.ConferenceRoutes)
        this.app.use('/api/roles', routes.RolesRoutes)
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log("Server listening on port", this.app.get('port'))
    }

}

module.exports = { App }
