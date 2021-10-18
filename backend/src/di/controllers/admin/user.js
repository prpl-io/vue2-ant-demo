const commonDependencies = ['@repositories.user', '@cache'];

module.exports = {
    services: {
        'controllers.admin.user.destroy': {
            class: 'controllers/admin/User/DestroyController',
            arguments: commonDependencies
        },
        'controllers.admin.user.index': {
            class: 'controllers/admin/User/IndexController',
            arguments: ['@repositories.user', '@repositories.role', '@cache']
        },
        'controllers.admin.user.show': {
            class: 'controllers/admin/User/ShowController',
            arguments: commonDependencies
        },
        'controllers.admin.user.store': {
            class: 'controllers/admin/User/StoreController',
            arguments: ['@services.user.storeHandler', '@cache']
        },
        'controllers.admin.user.update': {
            class: 'controllers/admin/User/UpdateController',
            arguments: commonDependencies
        }
    }
};
