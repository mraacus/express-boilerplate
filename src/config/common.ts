import { env } from './env'

export const config = Object.freeze({
    rateLimit: Object.freeze({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    }),
    cors: Object.freeze({
        // Allow multiple origins, separated by comma
        origin: env.NODE_ENV === 'test' ? '*' : env.CORS_ORIGIN,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
    }),
})
