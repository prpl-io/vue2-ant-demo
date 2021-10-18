const deepmerge = require('deepmerge');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');

const di = require('../../di');
const models = require('../../models');
const invoke = require('../../middleware/invoke');
const sorting = require('../../middleware/sorting');
const validate = require('../../middleware/validate');
const searchable = require('../../middleware/searchable');
const filterable = require('../../middleware/filterable');
const isLoggedIn = require('../../middleware/isLoggedIn');
const pagination = require('../../middleware/pagination');

class CreateRouteHandler {
    constructor(router, action, options) {
        this.defaultRouteOptions = {
            param: 'id',
            middleware: [],
            prefix: null,
            permissions: null,
            filterable: true,
            searchable: true,
            pagination: true,
            sorting: true
        };

        this.router = router;
        this.action = action;

        if (typeof options !== 'object') {
            options = this.defaultRouteOptions;
        }

        this.options = deepmerge(this.defaultRouteOptions, options);

        const {
            param,
            prefix,
            middleware,
            permissions,
            validator,
            resource,
            filterable,
            searchable,
            sorting
        } = this.options;

        this.param = param;
        this.prefix = prefix;
        this.resource = resource;
        this.filterable = filterable;
        this.searchable = searchable;
        this.pagination = pagination;
        this.sorting = sorting;
        this.middleware = !Array.isArray(middleware)
            ? [middleware]
            : middleware;
        this.validator = validator;
        this.permissions = permissions ? isLoggedIn(permissions) : [];
        this.model = models[upperFirst(camelCase(this.resource))];

        if (this.action === 'index') {
            this._setIndexMiddleware();
        }
    }

    handle() {
        this.router[this.method](
            this.path,
            this.permissions,
            this.validation,
            this.middleware,
            invoke(this.controller)
        );
    }

    _setIndexMiddleware() {
        if (this.filterable) {
            this.middleware.push(filterable(this.model.FILTERABLE_FIELDS));
        }

        if (this.searchable) {
            this.middleware.push(searchable(this.model.SEARCHABLE_FIELDS));
        }

        if (this.pagination) {
            this.middleware.push(pagination);
        }

        if (this.sorting) {
            this.middleware.push(sorting());
        }
    }

    get path() {
        const actions = {
            index: '/',
            show: `/:${this.param}`,
            store: `/`,
            update: `/:${this.param}`,
            destroy: `/:${this.param}`
        };

        return actions[this.action];
    }

    get method() {
        const actions = {
            index: 'get',
            show: 'get',
            store: 'post',
            update: 'put',
            destroy: 'delete'
        };

        return actions[this.action];
    }

    get diPath() {
        return ['controllers', this.prefix, this.resource, this.action]
            .filter(i => i)
            .join('.');
    }

    get controller() {
        return di.get(this.diPath);
    }

    get validation() {
        let validation = [];

        if (this.validator && this.validator[this.action]) {
            validation = [this.validator[this.action], validate];
        }

        return validation;
    }
}

module.exports = CreateRouteHandler;
