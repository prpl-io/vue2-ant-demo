class ProfileController {
    constructor(userRepository, cache) {
        this.userRepository = userRepository;
        this.cache = cache;
    }

    async invoke(request, response) {
        const { body, user: loggedUser } = request;
        const { id } = loggedUser;

        await loggedUser.update(body, {
            fields: ['firstName', 'lastName', 'email']
        });

        const user = await this.userRepository.findById(id);

        await this.cache.forgetByPattern('users:*');

        return response.send(user);
    }
}

module.exports = ProfileController;
