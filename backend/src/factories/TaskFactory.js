const AbstractFactory = require('./AbstractFactory');

class TaskFactory extends AbstractFactory {
    get model() {
        return this.db.Task;
    }

    get defaultProps() {
        return {
            title: this.faker.lorem.sentence(),
            description: this.faker.lorem.sentences(3),
            completedAt:
                Math.random() > 0.5 ? this.faker.date.past(1, new Date()) : null
        };
    }
}

module.exports = TaskFactory;
