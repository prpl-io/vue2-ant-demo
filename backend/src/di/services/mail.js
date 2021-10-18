const config = require('../../config');

module.exports = {
    parameters: {
        config,
        'config.app': config.app,
        'config.email': config.email
    },
    services: {
        'services.mail.sendMailHandler': {
            class: 'services/Mail/SendMailHandler',
            arguments: ['%config%', '@nodemailer']
        },
        'services.mail.sendNotificationAboutChangePassword': {
            class: 'services/Mail/SendNotificationAboutChangePassword',
            arguments: ['@queues.publishers.emails']
        },
        'services.mail.sendResetPasswordLinkHandler': {
            class: 'services/Mail/SendResetPasswordLinkHandler',
            arguments: [
                '@queues.publishers.emails',
                '@repositories.passwordReset',
                '%config.app%'
            ]
        }
    }
};
