const { Role } = require('../models');
const invoke = require('../middleware/invoke');
const createCrudRoutes = require('../helpers/crud');

module.exports = di => {
    const completeController = di.get('controllers.task.complete');

    const router = createCrudRoutes('task', {
        permissions: [Role.USER, Role.ADMIN]
    });

    router.post('/:id/complete', invoke(completeController));

    return router;
};
