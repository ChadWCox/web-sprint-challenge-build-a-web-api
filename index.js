const dotenv = require('dotenv')
dotenv.config()
const server = require('./api/server')

const port = process.env.PORT


server.listen(port, () => {
    console.log(`listening on port ${port}`)
})