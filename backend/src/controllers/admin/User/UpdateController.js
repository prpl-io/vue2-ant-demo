const { StatusCodes: HTTP } = require('http-status-codes');

class UpdateController {
    constructor(userRepository, cache) {
        this.userRepository = userRepository;
        this.cache = cache;
    }

    async invoke(request, response) {
        const {
            params: { id },
            body: userData,
            user: loggedUser
        } = request;

        const user = await this.userRepository.findById(id);

        if (!user) {
            return response.sendStatus(HTTP.NOT_FOUND);
        }

        if (loggedUser.id === user.id) {
            return response
                .status(HTTP.UNPROCESSABLE_ENTITY)
                .send('You can edit yourself in account management.');
        }

        await user.update(userData);

        return response.send(user);
    }
}

module.exports = UpdateController;
