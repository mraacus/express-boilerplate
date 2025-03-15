import http from 'node:http'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import { env } from './config'
import { config } from './config/common'

const app = express()
const port = env.PORT || 3000

app.set('port', port)
app.use(cors(config.cors)) // enable cors for cross-domain api requests.
app.use(rateLimit(config.rateLimit))

// expose headers for cors
// so that requestor can use information such as RateLimit
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', '*')
    next()
})

/* CREATE SERVER */
const server = http.createServer(app)
server.listen(port)
server.on('listening', () => {
    console.log(`Listening on port ${port}.`)
})

server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.syscall !== 'listen') throw error

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.log(`${port} requires elevated privileges`)
            process.exit(1)
            return
        case 'EADDRINUSE':
            console.log(`${port} is already in use`)
            process.exit(1)
            return
        default:
            throw error
    }
})

process.on('unhandledRejection', async (reason, promise) => {
    // Browsers can unexpectedly terminate when there are unhandled promise rejection thrown in the same scope.
    console.log('Unhandled rejection! Please investigate and fix.', reason, promise)
})
