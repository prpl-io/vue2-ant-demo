module.exports = {
    up: async () => {
        const userRepository = di.get('repositories.user');
        const taskFactory = di.get('factories.model.task');

        const users = await userRepository.findAll();

        for (const user of users) {
            for (let i = 1; i <= 5; i++) {
                await user.createTask(taskFactory.defaultProps);
            }
        }
    },

    down: () => {}
};
