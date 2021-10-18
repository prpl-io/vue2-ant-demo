const path = require('path');
const express = require('express');
const helmet = require('helmet');
const Sentry = require('@sentry/node');
const {
    sentry: { dsn: sentryDsn }
} = require('./config');

const app = express();
app.use(helmet());

if (sentryDsn) {
    Sentry.init({ dsn: sentryDsn });
    app.use(Sentry.Handlers.requestHandler());
}

const di = require('./di');
app.set('di', di);

const router = require('./routes')(di);
const errorHandler = require('./plugins/errorHandler');

require('./plugins/bodyParser')(app);

app.use('/public', express.static(path.join(__dirname, './../public')));
app.use('/doc', express.static(path.join(__dirname, './../public/swagger')));

require('./plugins/session')(app);
require('./plugins/cors')(app);

app.use('/api', router);

if (sentryDsn) {
    app.use(Sentry.Handlers.errorHandler());
}

app.use(errorHandler);

module.exports = app;
