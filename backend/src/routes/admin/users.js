const { Role } = require('../../models');
const createCrudRoutes = require('../../helpers/crud');

module.exports = () =>
    createCrudRoutes('user', {
        prefix: 'admin',
        permissions: Role.ADMIN
    });
