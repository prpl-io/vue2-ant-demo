const { StatusCodes: HTTP } = require('http-status-codes');

class ShowController {
    constructor(taskRepository, cache) {
        this.taskRepository = taskRepository;
        this.cache = cache;
    }

    async invoke(request, response) {
        const {
            params: { id },
            user: loggedUser
        } = request;

        const task = await this.taskRepository.findById(id);

        if (!task || task.userId !== loggedUser.id) {
            return response.sendStatus(HTTP.NOT_FOUND);
        }

        return response.send(task);
    }
}

module.exports = ShowController;
