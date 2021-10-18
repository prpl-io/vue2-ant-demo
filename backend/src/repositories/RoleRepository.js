const AbstractRepository = require('./AbstractRepository');

class RoleRepository extends AbstractRepository {
    get model() {
        return this.db.Role;
    }

    findByName(name) {
        return this.findOne({
            where: {
                name
            }
        });
    }
}

module.exports = RoleRepository;
