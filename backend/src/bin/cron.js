const Sentry = require('@sentry/node');
const lockfile = require('proper-lockfile');

const di = require('../di');
const config = require('../config');

const { cronDsn } = config.sentry;

if (cronDsn) {
    Sentry.init({ dsn: cronDsn });
}

const cronScheduler = di.get('cron');

(async () => {
    const isLocked = await lockfile.check(__filename);

    if (isLocked) {
        console.log(`This script is already running!`);
        process.exit(1);
    }

    await lockfile.lock(__filename);

    console.log('Scheduler started.');
})();

process
    .once('SIGINT', () => process.exit(1))
    .once('SIGTERM', () => process.exit(1));

module.exports = cronScheduler;
