require('dotenv').config();

const env = (key, defaultValue = null) => process.env[key] || defaultValue;
const isEnabled = key => env(key) && env(key) === 'true';

const config = {
    app: {
        env: env('NODE_ENV'),
        url: env('APP_URL', 'http://127.0.0.1:3001'),
        port: parseInt(env('PORT', 3001)),
        frontendUrl: env('APP_FRONTEND_URL'),
        corsSites: env('APP_CORS_SITES', ''),
        routesWithoutBodyParser: env('APP_ROUTES_WITHOUT_BODY_PARSER', '')
    },
    session: {
        secret: env('SESSION_SECRET')
    },
    db: {
        url:
            env('DATABASE_DIALECT', 'mysql') +
            '://' +
            env('DATABASE_USERNAME', 'guest') +
            ':' +
            env('DATABASE_PASSWORD', 'guest') +
            '@' +
            env('DATABASE_HOST', 'localhost') +
            ':' +
            env('DATABASE_PORT', 3306) +
            '/' +
            env('DATABASE_NAME', 'db'),
        host: env('DATABASE_HOST', '127.0.0.1'),
        name: env('DATABASE_NAME'),
        username: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        port: parseInt(env('DATABASE_PORT', 3306)),
        logging: isEnabled('SEQUELIZE_LOGGING') ? console.log : false,
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            timestamps: false
        }
    },
    redisCache: {
        host: env('CACHE_REDIS_HOST'),
        port: env('CACHE_REDIS_PORT'),
        pass: env('CACHE_REDIS_PASS') || undefined,
        password: env('CACHE_REDIS_PASS') || undefined,
        ttl: env('CACHE_REDIS_TTL')
    },
    redisSession: {
        host: env('SESSION_REDIS_HOST'),
        port: env('SESSION_REDIS_PORT'),
        pass: env('SESSION_REDIS_PASS') || undefined,
        password: env('SESSION_REDIS_PASS') || undefined,
        ttl: env('SESSION_REDIS_TTL')
    },
    cache: {
        enable: isEnabled('CACHE_ENABLE'),
        keyExpiresInMinutes: parseInt(env('CACHE_KEY_EXPIRES_IN_MINUTES', 60))
    },
    email: {
        host: env('EMAIL_HOST'),
        port: env('EMAIL_PORT'),
        secure: isEnabled('EMAIL_SECURE'),
        auth: {
            user: env('EMAIL_AUTH_USER'),
            pass: env('EMAIL_AUTH_PASSWORD')
        },
        from: {
            name: env('EMAIL_FROM_NAME'),
            address: env('EMAIL_FROM_ADDRESS')
        }
    },
    rabbitmq: {
        url:
            'amqp://' +
            env('RABBITMQ_USER', 'guest') +
            ':' +
            env('RABBITMQ_PASS', 'guest') +
            '@' +
            env('RABBITMQ_HOST', 'localhost') +
            ':' +
            env('RABBITMQ_PORT', 5672),
        timeout: env('RABBITMQ_TIMEOUT', 10000),
        queues: {
            emails: 'emails'
        }
    },
    sentry: {
        dsn: env('SENTRY_DSN')
    },
    mediaUrl: env('MEDIA_URL')
};

module.exports = config;
