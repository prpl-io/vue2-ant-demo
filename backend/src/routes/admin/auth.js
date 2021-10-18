const express = require('express');

const { Role } = require('../../models');

const router = express.Router();
const invoke = require('../../middleware/invoke');
const isLoggedIn = require('../../middleware/isLoggedIn');

module.exports = di => {
    const userSessionController = di.get('controllers.admin.auth.userSession');

    router.post(
        '/user-session/:id',
        isLoggedIn(Role.ADMIN),
        invoke(userSessionController)
    );

    return router;
};
