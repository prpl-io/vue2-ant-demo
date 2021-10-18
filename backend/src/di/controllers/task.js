const commonDependencies = ['@repositories.task', '@cache'];

module.exports = {
    services: {
        'controllers.task.destroy': {
            class: 'controllers/Task/DestroyController',
            arguments: commonDependencies
        },
        'controllers.task.index': {
            class: 'controllers/Task/IndexController',
            arguments: commonDependencies
        },
        'controllers.task.show': {
            class: 'controllers/Task/ShowController',
            arguments: commonDependencies
        },
        'controllers.task.store': {
            class: 'controllers/Task/StoreController',
            arguments: commonDependencies
        },
        'controllers.task.update': {
            class: 'controllers/Task/UpdateController',
            arguments: commonDependencies
        },
        'controllers.task.complete': {
            class: 'controllers/Task/CompleteController',
            arguments: commonDependencies
        }
    }
};
