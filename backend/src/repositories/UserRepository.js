const AbstractRepository = require('./AbstractRepository');

class UserRepository extends AbstractRepository {
    get model() {
        return this.db.User;
    }

    getAll(where, includeDeleted = false) {
        const options = {
            include: [
                {
                    association: 'roles',
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        };

        const args = this.deepmerge({ where }, options);

        if (includeDeleted) {
            return this.model.scope().findAll(args);
        }

        return this.findAll(args);
    }

    async get(id, includeDeleted = false) {
        const user = await this.findById(
            id,
            {
                include: [
                    {
                        association: 'roles',
                        attributes: ['id', 'name'],
                        through: {
                            attributes: []
                        }
                    }
                ]
            },
            includeDeleted
        );

        if (!user) {
            return null;
        }

        return user;
    }

    findById(id, options = {}, includeDeleted = false) {
        const args = this.deepmerge(options, { where: { id } });

        if (includeDeleted) {
            return this.model.scope().findOne(args);
        }

        return this.model.scope('withAssociations').findOne(args);
    }

    findByEmail(email, options = {}, includeDeleted = false) {
        const args = this.deepmerge(options, { where: { email } });

        if (includeDeleted) {
            return this.model.scope().findOne(args);
        }

        return this.model.findOne(args);
    }

    async findAllByRole(role, options = {}) {
        const args = this.deepmerge.all([
            {
                where: {
                    '$roles.name$': role
                }
            },
            {
                include: [
                    {
                        association: 'roles',
                        attributes: ['name']
                    }
                ]
            },
            options
        ]);

        return this.findAll(args);
    }
}

module.exports = UserRepository;
