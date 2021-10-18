const camelCase = require('lodash/camelCase');
const commonDependencies = ['@sequelize', '%faker'];

module.exports = factories => {
    const services = {};

    for (const factory of factories) {
        services[`factories.model.${camelCase(factory)}`] = {
            class: `factories/${factory}Factory`,
            arguments: commonDependencies
        };
    }

    return services;
};
