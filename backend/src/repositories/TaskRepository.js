const AbstractRepository = require('./AbstractRepository');

class TaskRepository extends AbstractRepository {
    get model() {
        return this.db.Task;
    }
}

module.exports = TaskRepository;
