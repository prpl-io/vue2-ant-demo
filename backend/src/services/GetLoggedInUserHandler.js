class GetLoggedInUserHandler {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async handle(req) {
        let currentUserId;

        if (!req.session || !req.session.users) {
            return null;
        }

        if (req.headers.cluid) {
            currentUserId = req.session.users.find(id => id === req.headers.cluid);
        } else if (req.session.users.length === 1) {
            [currentUserId] = req.session.users;
        }

        if (!currentUserId) {
            return null;
        }

        return this.userRepository.findById(currentUserId, {
            where: {
                deletedAt: null
            }
        });
    }
}

module.exports = GetLoggedInUserHandler;
