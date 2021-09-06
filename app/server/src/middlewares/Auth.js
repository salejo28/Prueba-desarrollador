const { Hash } = require('../security/password')
const { ValidateFormRegister } = require('../validations/validations')
const { ExistEmail, RegisterModel, LoginModel } = require('../models/AuthModel')
const { CreateToken } = require('./Token')

async function Login(data) {
    const { success, errors, user } = await LoginModel(data)
    
    if (!success) return { success, errors, token: null }
    const token = CreateToken(user.id, user.role_id, user.role_name)
    return {
        success,
        errors: null,
        token
    }
}

async function Register(data) {
    const { errors, valid } = ValidateFormRegister(data)
    if (!valid) return ({ success: false, errors })
    if (await ExistEmail(data.email)) return ({
        success: false,
        errors: { message: 'The email is already exist', path: ['email'] }
    })

    data.password = await Hash(data.password)

    await RegisterModel(data)

    return {
        success: true,
        errors: null
    }
}

module.exports = {
    Login,
    Register
}