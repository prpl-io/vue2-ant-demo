const express = require('express');
const deepmerge = require('deepmerge');
const isLoggedIn = require('../../middleware/isLoggedIn');
const validators = require('../../validators');
const CreateRouteHandler = require('./CreateRouteHandler');

class CreateCrudRoutesHandler {
    constructor(resource, overrideOptions = {}) {
        const defaultOptions = {
            prefix: null,
            permissions: null,
            middleware: null,
            routes: {
                index: true,
                show: true,
                store: true,
                update: true,
                destroy: true
            }
        };

        this.actions = ['index', 'show', 'store', 'update', 'destroy'];

        const options = deepmerge(defaultOptions, overrideOptions);

        const { prefix, permissions, routes, middleware } = options;

        this.prefix = prefix;
        this.permissions = permissions;
        this.routes = routes;
        this.middleware = middleware;
        this.resource = resource;

        this.router = express.Router();
    }

    handle() {
        this._setPermissions();
        this._setMiddleware();

        for (const action of this.enabledActions) {
            const prefix = this._getRoutePrefix(action);
            const validator = validators[this.resource];

            const routeOptions = deepmerge(this.routes[action], {
                prefix,
                validator,
                resource: this.resource
            });

            const createCrudRouteHandler = new CreateRouteHandler(
                this.router,
                action,
                routeOptions
            );

            createCrudRouteHandler.handle();
        }

        return this.router;
    }

    get enabledActions() {
        return this.actions.filter(action => this.routes[action]);
    }

    _setPermissions() {
        if (this.permissions) {
            this.router.use(isLoggedIn(this.permissions));
        }
    }

    _setMiddleware() {
        if (this.middleware) {
            this.router.use(this.middleware);
        }
    }

    _getRoutePrefix(action) {
        return (
            (typeof this.routes[action] === 'object' &&
                this.routes[action].prefix) ||
            this.prefix
        );
    }
}

module.exports = CreateCrudRoutesHandler;
