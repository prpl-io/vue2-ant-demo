const { StatusCodes: HTTP } = require('http-status-codes');

class ShowController {
    constructor(userRepository, cache) {
        this.userRepository = userRepository;
        this.cache = cache;
    }

    async invoke(request, response) {
        const { id } = request.params;

        const user = await this.userRepository.findById(id, {
            include: [
                {
                    association: 'roles',
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        if (!user) {
            return response.sendStatus(HTTP.NOT_FOUND);
        }

        return response.send(user);
    }
}

module.exports = ShowController;
