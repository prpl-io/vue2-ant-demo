module.exports = {
    services: {
        'services.user.storeHandler': {
            class: 'services/User/StoreHandler',
            arguments: [
                '@repositories.user',
                '@repositories.role',
                '@services.mail.sendResetPasswordLinkHandler'
            ]
        }
    }
};
