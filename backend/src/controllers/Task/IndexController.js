const deepmerge = require('deepmerge');

class IndexController {
    constructor(taskRepository, cache) {
        this.taskRepository = taskRepository;
        this.cache = cache;
    }

    async invoke(request, response) {
        const {
            filters,
            search,
            sorting,
            pagination,
            user: loggedUser
        } = request;

        const where = deepmerge.all([
            search,
            filters,
            {
                userId: loggedUser.id
            }
        ]);

        const tasks = await this.taskRepository.findAndCountAll({
            where,
            ...sorting,
            ...pagination
        });

        return response.send(tasks);
    }
}

module.exports = IndexController;
