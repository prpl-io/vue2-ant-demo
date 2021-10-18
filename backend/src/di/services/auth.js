module.exports = {
    services: {
        'services.auth.loginHandler': {
            class: 'services/Auth/LoginHandler',
            arguments: ['@repositories.user', '%bcryptjs']
        },
        'services.auth.resetPassword': {
            class: 'services/Auth/ResetPassword',
            arguments: ['@repositories.passwordReset']
        }
    }
};
