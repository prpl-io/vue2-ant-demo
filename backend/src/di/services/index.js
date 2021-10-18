const config = require('../../config');

module.exports = {
    parameters: {
        config,
        'config.email': config.email,
        'config.cache': config.cache,
        'config.redisCache': config.redisCache,
        'config.redisSession': config.redisSession,
    },
    services: {
        sequelize: {
            arguments: ['%sequelize', '%config%'],
            factory: {
                class: 'services/SequelizeFactory',
                method: 'create'
            }
        },
        redisCacheClient: {
            arguments: ['%redis', '%config.redisCache%'],
            factory: {
                class: 'services/RedisClientFactory',
                method: 'create'
            }
        },
        redisSessionClient: {
            arguments: ['%redis', '%config.redisSession%'],
            factory: {
                class: 'services/RedisClientFactory',
                method: 'create'
            }
        },
        redisSession: {
            arguments: ['@redisSessionClient'],
            factory: {
                class: 'services/RedisStoreFactory',
                method: 'create'
            }
        },
        nodemailer: {
            arguments: [
                '%nodemailer',
                '%nodemailer-express-handlebars',
                '%config.email%',
                '%path'
            ],
            factory: {
                class: 'services/NodemailerFactory',
                method: 'create'
            }
        },
        cache: {
            class: 'services/Cache',
            arguments: ['@redisCacheClient', '%config.cache%']
        },
        cron: {
            class: 'services/Cron',
            arguments: []
        },
        pathService: {
            class: 'services/PathService',
            arguments: ['%path']
        },
        'services.getLoggedInUserHandler': {
            class: 'services/GetLoggedInUserHandler',
            arguments: ['@repositories.user']
        }
    }
};
