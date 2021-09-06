const bcrypt = require('bcryptjs')

async function Hash(password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

async function ComparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
    Hash,
    ComparePasswords
}