export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(date) {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleString('en-US', options)
}

export function onlyNumber(e) {
    var key = e.keyCode || e.which

    var keyboard = String.fromCharCode(key)

    var number = '0123456789'

    var special = "8-37-38-46"

    var keyboard_special = false

    for (let i in special) {
        if (key === special[i]) {
            keyboard_special = true
        }
    }

    if (number.indexOf(keyboard) === -1 && !keyboard_special) {
        e.preventDefault()
        return false
    }

    return true
}

export function CheckEmail(email) {
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    if (!validEmail) return false
    return true
}