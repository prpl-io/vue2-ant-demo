const Sentry = require('@sentry/node');
const lockfile = require('proper-lockfile');
const di = require('./../di');
const {
    sentry: { dsn: sentryDsn }
} = require('./../config');

process.on('SIGINT', status => shutdown(status));
process.on('SIGTERM', status => shutdown(status));
process.on('exit', status => shutdown(status));

if (sentryDsn) {
    Sentry.init({ dsn: sentryDsn });
}

const errorHandler = error => {
    console.error(error);

    if (sentryDsn) {
        Sentry.captureException(error);
    }
};

try {
    const isLocked = lockfile.checkSync(__filename);

    if (isLocked) {
        console.log(`This script is already running!`);
        process.exit(1);
    }

    lockfile.lockSync(__filename);

    const emailConsumer = di.get('queues.consumers.emails');
    emailConsumer.consume(errorHandler);

    console.log('Queues started ...');
} catch (error) {
    errorHandler(error);

    process.exit(1);
}

async function shutdown(status = 0) {
    try {
        console.log('Shutting down queue connection ...');
        const queueConnection = await di.get('queues.connection');
        await queueConnection.close();
    } catch (e) {
        console.error(
            'There was an error during shutting down queue connection!'
        );
    }

    process.exit(status);
}
