const csrf = require('csurf');

module.exports = app => {
    app.use(csrf({ cookie: false }));

    app.all('*', function(req, res, next) {
        res.header('XSRF-TOKEN', req.csrfToken());

        return next();
    });
};
