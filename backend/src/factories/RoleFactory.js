const AbstractFactory = require('./AbstractFactory');

class RoleFactory extends AbstractFactory {
    get model() {
        return this.db.Role;
    }

    get defaultProps() {
        return {
            name: this.faker.internet.domainWord()
        };
    }
}

module.exports = RoleFactory;
