const pool = require('../DB')
const { ComparePasswords } = require('../security/password')

async function RegisterModel(data) {
    const toSave = {
        name: data.name,
        email: data.email,
        password: data.password
    }
    const result = await pool.query('INSERT INTO users SET ?', [toSave])
    const relation = {
        user_id: result.insertId,
        role_id: data.role
    }
    return await pool.query('INSERT INTO users_roles SET ?', [relation])
}

async function LoginModel(data) {
    // Exist email
    if (!await ExistEmail(data.email)) return { 
        success: false, 
        errors: { path: ['email'], message: "The email does not exist!" },
        user: null
    }

    // Compare password
    const user = await pool.query('SELECT users.*, users_roles.user_id, users_roles.role_id, roles.name AS role_name FROM users JOIN users_roles ON users.id = users_roles.user_id JOIN roles ON roles.id = users_roles.role_id WHERE users.email = ?', [data.email]);

    const matchPasswords = await ComparePasswords(data.password, user[0].password)
    if (!matchPasswords) return {
        success: false,
        errors: {
            path: ["password"],
            message: 'Incorrect password!'
        },
        user: null
    }

    return { success: true, errors: null, user: user[0] }
}

async function ExistEmail(email) {
    const user = await pool.query(`SELECT * FROM users WHERE email = ?`, [email])
    if (user.length > 0) return true
    return false
}

module.exports = {
    RegisterModel,
    LoginModel,
    ExistEmail
}