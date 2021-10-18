const bodyParser = require('body-parser');
const config = require('../config');

module.exports = app => {
    const routesWithoutBodyParser = config.app.routesWithoutBodyParser
        .split(',')
        .map(site => site.trim());

    app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
    app.use((req, res, next) => {
        if (routesWithoutBodyParser.find(item => item === req.originalUrl)) {
            next();
        } else {
            bodyParser.json({ limit: config.app.jsonRequestSizeLimit })(
                req,
                res,
                next
            );
        }
    });
};
