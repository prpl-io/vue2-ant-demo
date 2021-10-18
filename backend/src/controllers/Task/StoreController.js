const { StatusCodes: HTTP } = require('http-status-codes');

class StoreController {
    constructor(taskRepository, cache) {
        this.taskRepository = taskRepository;
        this.cache = cache;
    }

    async invoke(request, response) {
        const { body: taskData, user: loggedUser } = request;

        const task = await loggedUser.createTask(taskData);

        return response.status(HTTP.CREATED).send(task);
    }
}

module.exports = StoreController;
