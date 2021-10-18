const createModelFactories = require('../../helpers/di/createModelFactories');

const factories = ['Role', 'Task', 'User'];

const services = createModelFactories(factories);

module.exports = {
    services
};
