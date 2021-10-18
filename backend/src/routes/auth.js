const express = require('express');

const router = express.Router();
const invoke = require('../middleware/invoke');
const validate = require('../middleware/validate');
const isLoggedIn = require('../middleware/isLoggedIn');
const authValidator = require('../validators/auth');

module.exports = di => {
    const meController = di.get('controllers.auth.me');
    const loginController = di.get('controllers.auth.login');
    const logoutController = di.get('controllers.auth.logout');
    const registerController = di.get('controllers.auth.register');

    const resetPasswordController = di.get('controllers.auth.resetPassword');
    const checkResetPasswordTokenController = di.get(
        'controllers.auth.checkResetPasswordToken'
    );
    const sendResetPasswordLinkController = di.get(
        'controllers.auth.sendResetPasswordLink'
    );

    const profileController = di.get('controllers.auth.profile');
    const changePasswordController = di.get('controllers.auth.changePassword');

    router.get('/me', isLoggedIn(), invoke(meController));
    router.post(
        '/login',
        [authValidator.login, validate],
        invoke(loginController)
    );
    router.post('/logout', isLoggedIn(), invoke(logoutController));
    router.post(
        '/register',
        [authValidator.register, validate],
        invoke(registerController)
    );

    router.get(
        '/reset-password/:token',
        invoke(checkResetPasswordTokenController)
    );
    router.post(
        '/reset-password/:token',
        [authValidator.changePassword, validate],
        invoke(resetPasswordController)
    );
    router.post(
        '/forgot-password',
        [authValidator.forgotPassword, validate],
        invoke(sendResetPasswordLinkController)
    );

    router.post(
        '/profile',
        isLoggedIn(),
        [authValidator.profile, validate],
        invoke(profileController)
    );
    router.post(
        '/password',
        isLoggedIn(),
        [authValidator.password, validate],
        invoke(changePasswordController)
    );

    return router;
};
