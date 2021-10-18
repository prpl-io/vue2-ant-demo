const createRepositories = require('../helpers/di/createRepositories');

const repositories = ['PasswordReset', 'Role', 'Task', 'User'];

const services = createRepositories(repositories);

module.exports = {
    services
};
