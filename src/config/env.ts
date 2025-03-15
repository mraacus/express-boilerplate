import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const EnvSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'], {
            description: 'Node environment',
        })
        .default('development'),
    PORT: z.coerce
        .number({
            description:
                '.env files convert numbers to strings, therefore we have to enforce them to be numbers',
        })
        .positive()
        .max(65536, 'options.port should be >= 0 and < 65536')
        .default(3000),
    CORS_ORIGIN: z
        .string()
        .transform(value => value.split(',').map(value => value.trim()))
        .pipe(z.string().array())
        .optional(),
})

type TEnv = z.infer<typeof EnvSchema>

export const env =
    process.env.NODE_ENV === 'test'
        ? (process.env as unknown as TEnv)
        : EnvSchema.parse(process.env)
