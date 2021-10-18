const { Role } = require('../models');
const roleFactory = di.get('factories.model.role');

module.exports = {
    up: () =>
        roleFactory.create([
            {
                name: Role.ADMIN
            },
            {
                name: Role.USER
            }
        ]),
    down: () => {}
};
