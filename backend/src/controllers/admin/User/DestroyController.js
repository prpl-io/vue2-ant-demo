const { StatusCodes: HTTP } = require('http-status-codes');

class DestroyController {
    constructor(userRepository, cache) {
        this.userRepository = userRepository;
        this.cache = cache;
    }

    async invoke(request, response) {
        const {
            user: loggedUser,
            params: { id }
        } = request;

        const user = await this.userRepository.findById(id);

        if (user) {
            if (loggedUser.id === user.id) {
                return response
                    .status(HTTP.UNPROCESSABLE_ENTITY)
                    .send('You cannot delete your account.');
            }

            const now = Date.now();

            await user.destroy();
            await user.update({
                email: `${user.email}_${now}`
            });
        }

        return response.sendStatus(HTTP.NO_CONTENT);
    }
}

module.exports = DestroyController;
