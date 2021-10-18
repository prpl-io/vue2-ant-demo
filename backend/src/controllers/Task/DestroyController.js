const { StatusCodes: HTTP } = require('http-status-codes');

class DestroyController {
    constructor(taskRepository, cache) {
        this.taskRepository = taskRepository;
        this.cache = cache;
    }

    async invoke(request, response) {
        const {
            user: loggedUser,
            params: { id }
        } = request;

        const task = await this.taskRepository.findById(id);

        if (task?.userId === loggedUser.id) {
            await task.destroy();
        }

        return response.sendStatus(HTTP.NO_CONTENT);
    }
}

module.exports = DestroyController;
