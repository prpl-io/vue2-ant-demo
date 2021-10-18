const express = require('express');
const { Role } = require('../../models');

const router = express.Router();
const invoke = require('../../middleware/invoke');
const isLoggedIn = require('../../middleware/isLoggedIn');

module.exports = di => {
    const getSummaryDataController = di.get(
        'controllers.admin.dashboard.getSummaryData'
    );

    router.get(
        '/summary-data',
        isLoggedIn(Role.ADMIN),
        invoke(getSummaryDataController)
    );

    return router;
};
