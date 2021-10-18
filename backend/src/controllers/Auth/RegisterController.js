const { StatusCodes: HTTP } = require('http-status-codes');

class RegisterController {
    constructor(userStoreHandler, roleRepository, cache) {
        this.userStoreHandler = userStoreHandler;
        this.roleRepository = roleRepository;
        this.cache = cache;
    }

    async invoke(request, response) {
        const { USER } = this.roleRepository.model;

        const userRole = await this.roleRepository.findByName(USER);

        const user = await this.userStoreHandler.handle({
            ...request.body,
            role: userRole.name
        });

        await this.cache.forgetByPattern('users:*');

        return response.status(HTTP.CREATED).send(user);
    }
}

module.exports = RegisterController;
