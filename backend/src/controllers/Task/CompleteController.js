const { StatusCodes: HTTP } = require('http-status-codes');

class CompleteController {
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

        if (!task.completedAt) {
            await task.update({ completedAt: new Date() });
        }

        const updatedTask = await this.taskRepository.findById(id);

        return response.send(updatedTask);
    }
}

module.exports = CompleteController;
