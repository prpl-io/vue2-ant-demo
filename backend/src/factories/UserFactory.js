const AbstractFactory = require('./AbstractFactory');

class UserFactory extends AbstractFactory {
    get model() {
        return this.db.User;
    }

    get defaultProps() {
        const number = this.faker.datatype.number({
            min: 100000000,
            max: 999999999
        });

        return {
            firstName: this.faker.name.firstName(),
            lastName: this.faker.name.lastName(),
            email: `${number}@vue2.test`,
            password: 'test'
        };
    }
}

module.exports = UserFactory;
