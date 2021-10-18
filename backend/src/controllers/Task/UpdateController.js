const { StatusCodes: HTTP } = require('http-status-codes');

class UpdateController {
    constructor(taskRepository, cache) {
        this.taskRepository = taskRepository;
        this.cache = cache;
    }

    async invoke(request, response) {
        const {
            params: { id },
            body: taskData,
            user: loggedUser
        } = request;

        const task = await this.taskRepository.findById(id);

        if (!task || task.userId !== loggedUser.id) {
            return response.sendStatus(HTTP.NOT_FOUND);
        }

        await task.update(taskData);

        return response.send(task);
    }
}

module.exports = UpdateController;
