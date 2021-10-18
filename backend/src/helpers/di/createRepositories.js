const camelCase = require('lodash/camelCase');

const commonDependencies = ['@sequelize', '%deepmerge'];

module.exports = repositories => {
    const services = {};

    for (const repository of repositories) {
        services[`repositories.${camelCase(repository)}`] = {
            class: `repositories/${repository}Repository`,
            arguments: commonDependencies
        };
    }

    return services;
};
