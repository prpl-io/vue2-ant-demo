const CreateCrudRoutesHandler = require('./CreateCrudRoutesHandler');

module.exports = (resource, options = {}) => {
    const createCrudRoutesHandler = new CreateCrudRoutesHandler(
        resource,
        options
    );

    return createCrudRoutesHandler.handle();
};
