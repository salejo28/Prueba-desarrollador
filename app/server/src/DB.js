const mysql = require('mysql')
const { promisify } = require('util')
const config = require('./config/config')

const pool = mysql.createPool({
    host: config.DB.host,
    user: config.DB.user,
    password: config.DB.passowrd,
    database: config.DB.database
})

pool.getConnection((err, conn) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused')
        }
        throw new Error(err);
    }

    if (conn) {
        console.log('Database is connected!')
        return
    }

})

pool.query = promisify(pool.query)

module.exports = pool