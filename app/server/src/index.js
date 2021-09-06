require('dotenv').config()
const { App } = require('./App')

async function main() {
    const app = new App(4000)
    await app.listen()
}

if (require.main === module) {
    main()
}