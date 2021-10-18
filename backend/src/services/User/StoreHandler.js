const { User } = require('../../models');

class StoreHandler {
    constructor(userRepository, roleRepository, sendResetPasswordLinkHandler) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.sendResetPasswordLinkHandler = sendResetPasswordLinkHandler;
    }

    async handle(userData) {
        const { role: roleName } = userData;
        const user = await this.userRepository.create(userData, {
            fields: User.DISPLAYABLE_FIELDS
        });
        const role = await this.roleRepository.findByName(roleName);

        await user.setRoles([role]);

        this.sendResetPasswordLinkHandler.handle(user);

        this.userRepository.findById(user.id);

        return this.userRepository.findById(user.id);
    }
}

module.exports = StoreHandler;
