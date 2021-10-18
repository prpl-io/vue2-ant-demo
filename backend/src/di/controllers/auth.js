module.exports = {
    services: {
        'controllers.auth.login': {
            class: 'controllers/Auth/LoginController',
            arguments: ['@services.auth.loginHandler']
        },
        'controllers.auth.logout': {
            class: 'controllers/Auth/LogoutController',
            arguments: []
        },
        'controllers.auth.me': {
            class: 'controllers/Auth/MeController',
            arguments: ['@repositories.user']
        },
        'controllers.auth.profile': {
            class: 'controllers/Auth/ProfileController',
            arguments: ['@repositories.user', '@cache']
        },
        'controllers.auth.changePassword': {
            class: 'controllers/Auth/ChangePasswordController',
            arguments: ['@services.mail.sendNotificationAboutChangePassword']
        },
        'controllers.auth.register': {
            class: 'controllers/Auth/RegisterController',
            arguments: [
                '@services.user.storeHandler',
                '@repositories.role',
                '@cache'
            ]
        },
        'controllers.auth.resetPassword': {
            class: 'controllers/Auth/ResetPasswordController',
            arguments: [
                '@repositories.passwordReset',
                '@services.auth.resetPassword',
                '@services.mail.sendNotificationAboutChangePassword'
            ]
        },
        'controllers.auth.checkResetPasswordToken': {
            class: 'controllers/Auth/CheckResetPasswordTokenController',
            arguments: ['@services.auth.resetPassword']
        },
        'controllers.auth.sendResetPasswordLink': {
            class: 'controllers/Auth/SendResetPasswordLinkController',
            arguments: [
                '@repositories.user',
                '@services.mail.sendResetPasswordLinkHandler'
            ]
        }
    }
};
