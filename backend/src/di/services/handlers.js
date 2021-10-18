const config = require('../../config');

module.exports = {
    parameters: {
        config
    },
    services: {
        'services.mail.sendMailHandler': {
            class: 'services/Mail/SendMailHandler',
            arguments: ['%config%', '@nodemailer']
        },
        'services.getLoggedInUserHandler': {
            class: 'services/GetLoggedInUserHandler',
            arguments: ['@repositories.user']
        },
        'services.validateFiltersHandler': {
            class: 'services/ValidateFiltersHandler',
            arguments: []
        }
    }
};
