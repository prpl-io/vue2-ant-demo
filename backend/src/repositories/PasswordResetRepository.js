const AbstractRepository = require('./AbstractRepository');

class PasswordResetRepository extends AbstractRepository {
    get model() {
        return this.db.PasswordReset;
    }

    findByToken(token, options = {}) {
        const args = this.deepmerge(options, { where: { token } });

        return this.findOne(args);
    }
}

module.exports = PasswordResetRepository;
