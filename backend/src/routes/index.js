const express = require('express');
const router = express.Router();
const fs = require('fs');
const Layer = require('express/lib/router/layer');

function wrapErrorMiddleware(fn) {
    return (err, req, res, next) => {
        const ret = fn.call(this, err, req, res, next);

        if (ret && ret.catch) {
            ret.catch(innerErr => next(innerErr));
        }

        return ret;
    };
}

function wrap(fn) {
    return (req, res, next) => {
        const ret = fn.call(this, req, res, next);

        if (ret && ret.catch) {
            ret.catch(err => {
                next(err);
            });
        }

        return ret;
    };
}

Object.defineProperty(Layer.prototype, 'handle', {
    enumerable: true,
    get() {
        return this.__handle;
    },
    set(fn) {
        // Bizarre, but Express checks for 4 args to detect error middleware: https://github.com/expressjs/express/blob/master/lib/router/layer.js
        if (fn.length === 4) {
            fn = wrapErrorMiddleware(fn);
        } else {
            fn = wrap(fn);
        }

        this.__handle = fn;
    }
});

module.exports = di => {
    const loadRoutes = (currentDirectory = '') => {
        const routes = fs.readdirSync(__dirname + currentDirectory);

        for (let route of routes) {
            if (!route.includes('.')) {
                loadRoutes(`${currentDirectory}/${route}`);

                continue;
            }

            route = route.split('.')[0];

            if (route === 'index') {
                continue;
            }

            if (route === 'default') {
                const requirePath = currentDirectory.endsWith('/')
                    ? currentDirectory
                    : `${currentDirectory}/`;

                router.use(
                    currentDirectory,
                    require(`.${requirePath}/default`)(di)
                );

                continue;
            }

            const routePath = `${currentDirectory}/${route}`;

            router.use(routePath, require(`./${routePath}`)(di));
        }
    };

    loadRoutes();

    return router;
};
