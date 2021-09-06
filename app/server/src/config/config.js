module.exports = {
    DB: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        passowrd: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    TOKEN: {
        secret_key: process.env.SECRET_TOKEN_KEY
    }
}