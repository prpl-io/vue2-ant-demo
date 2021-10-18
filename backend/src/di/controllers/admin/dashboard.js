module.exports = {
    services: {
        'controllers.admin.dashboard.getSummaryData': {
            class: 'controllers/admin/Dashboard/GetSummaryDataController',
            arguments: ['@cache']
        }
    }
};
