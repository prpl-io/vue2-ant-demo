const { StatusCodes: HTTP } = require('http-status-codes');

class MeController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async invoke(request, response) {
        const { id: userId } = request.user;

        const user = await this.userRepository.findById(userId);

        if (!user) {
            return response.sendStatus(HTTP.UNAUTHORIZED);
        }

        return response.send(user);
    }
}

module.exports = MeController;
