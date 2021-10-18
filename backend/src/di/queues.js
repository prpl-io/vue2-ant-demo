const { rabbitmq } = require('../config');
const { queues } = rabbitmq;

module.exports = {
    parameters: {
        'config.rabbitmq': rabbitmq,
        'config.rabbitmq.queues.emails': queues.emails
    },
    services: {
        'queues.connection': {
            arguments: ['%amqplib', '%config.rabbitmq%'],
            factory: {
                class: 'services/Queues/ConnectionFactory',
                method: 'create'
            }
        },
        'queues.channels.email': {
            arguments: [
                '@queues.connection',
                '%config.rabbitmq.queues.emails%'
            ],
            factory: {
                class: 'services/Queues/ChannelFactory',
                method: 'create'
            }
        },
        'queues.publishers.emails': {
            class: 'services/Queues/Publisher',
            arguments: [
                '@queues.channels.email',
                '%config.rabbitmq.queues.emails%'
            ]
        },
        'queues.consumers.emails': {
            class: 'services/Queues/Consumers/EmailsConsumer',
            arguments: [
                '@queues.channels.email',
                '%config.rabbitmq.queues.emails%',
                '@services.mail.sendMailHandler'
            ]
        }
    }
};
