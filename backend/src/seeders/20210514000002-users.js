module.exports = {
    up: async () => {
        const roleRepository = di.get('repositories.role');
        const userFactory = di.get('factories.model.user');
        const { ADMIN, USER } = roleRepository.model;

        const [adminRole, userRole] = await Promise.all([
            roleRepository.findByName(ADMIN),
            roleRepository.findByName(USER)
        ]);

        const [admin, user] = await userFactory.create([
            {
                email: 'admin@vue2.test',
                lastName: 'Admin'
            },
            {
                email: 'user@vue2.test',
                lastName: 'User'
            }
        ]);

        await Promise.all([admin.addRole(adminRole), user.addRole(userRole)]);

        const users = await userFactory.create(100);

        await Promise.all([...users.map(user => user.addRole(userRole))]);
    },

    down: () => {}
};
