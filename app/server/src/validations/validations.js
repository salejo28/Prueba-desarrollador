function ValidatePassword(password) {
    return password.length < 6 ? false : true
}

function CheckEmail(email) {
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    if (!validEmail) return false
    return true
}

function ValidateFormRegister(data) {
    let errors = {}
    let message = "This field is required!"

    if ((data.name === "" && data.email === "" && data.password === "") || !data) {
        errors.path = ["name", "email", "password"]
        errors.message = message
    }

    if (!data.name || data.name === "") {
        errors.path = ["name"]
        errors.message = message
    }

    if (!data.email || data.email === "") {
        errors.path = ["email"]
        errors.message = message
    } else if (!CheckEmail(data.email)) {
        errors.path = ["email"]
        errors.message = "Invalid email!"
    }

    if (!data.password || data.password === "") {
        errors.path = ["password"]
        errors.message = message
    } else if (!ValidatePassword(data.password)) {
        errors.path = ["password"]
        errors.message = "Password must be six characters or longer"
    }

    if (!data.role || data.role === "") {
        errors.path = ["role"]
        errors.message = message
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }

}

module.exports = {
    CheckEmail,
    ValidateFormRegister,
    ValidatePassword
}