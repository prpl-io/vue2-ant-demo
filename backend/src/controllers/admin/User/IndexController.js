const deepmerge = require('deepmerge');

class IndexController {
    constructor(userRepository, roleRepository, cache) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.cache = cache;
    }

    async invoke(request, response) {
        let {
            filters,
            search,
            sorting,
            pagination,
            query: { role = null }
        } = request;
        const { ALL_ROLES } = this.roleRepository.model;

        const where = deepmerge.all([search, filters]);

        const rolesAssociation = {
            association: 'roles',
            through: {
                attributes: []
            }
        };

        if (ALL_ROLES.includes(role)) {
            rolesAssociation.where = {
                name: role
            };
        }

        const users = await this.userRepository.findAndCountAll({
            where,
            ...sorting,
            ...pagination,
            include: [rolesAssociation]
        });

        return response.send(users);
    }
}

module.exports = IndexController;
