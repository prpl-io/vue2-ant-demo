'use strict';

const { Op } = require('sequelize');
const { isPlainObject } = require('is-plain-object');
const isUUID = require('../helpers/isUUID');

class AbstractRepository {
    constructor(db, deepmerge) {
        this.db = db;

        this._deepmerge = deepmerge;
        this._deepMergeOptions = {
            isMergeableObject: isPlainObject
        };

        this.deepmerge.all = all =>
            this._deepmerge.all(all, this._deepMergeOptions);
    }

    deepmerge(x, y) {
        return this._deepmerge(x, y, this._deepMergeOptions);
    }

    findById(id, options = {}, scope = 'defaultScope') {
        return this.model.scope(scope).findByPk(id, options);
    }

    findOne(options = {}) {
        return this.model.findOne(options);
    }

    findAll(options = {}) {
        return this.model.findAll(options);
    }

    findAndCountAll(options = {}) {
        return this.model.findAndCountAll(options);
    }

    count(options = {}) {
        return this.model.count(options);
    }

    updateById(id, data, options = {}) {
        const args = this.deepmerge(
            {
                where: {
                    id
                }
            },
            options
        );

        return this.model.update(data, args);
    }

    delete(options = {}) {
        return this.model.destroy(options);
    }

    destroy(options = {}) {
        return this.delete(options);
    }

    update(data, options = {}) {
        return this.model.update(data, options);
    }

    create(data, options) {
        return this.model.create(data, options);
    }

    bulkCreate(items = [], options = {}) {
        return this.model.bulkCreate(items, options);
    }

    random(limit = 1, options = {}) {
        const method = limit === 1 ? 'findOne' : 'findAll';

        return this[method]({
            order: this.db.sequelize.random(),
            limit,
            ...options
        });
    }
}

module.exports = AbstractRepository;
