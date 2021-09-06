const { Router } = require('express')
const pool = require('../DB')
class RolesRoutes {
  constructor() {
    this.router = Router()

    this.getRoles()
  }

  getRoles() {
    this.router.get('/', async(req, res) => {
      const roles = await pool.query('SELECT * FROM roles')

      return res.json({
        roles
      })
    })
  }
}

module.exports = new RolesRoutes().router
