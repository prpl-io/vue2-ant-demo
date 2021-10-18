const cron = require('node-cron');

class CronService {
    constructor() {
        this.jobs = [];
        this.intervalHelpers = {
            EVERY_MONTH: '40 0 1 * *',
            EVERY_DAY: '15 0 * * *',
            EVERY_HOUR: '30 * * * *',
            EVERY_MINUTE: '* * * * *'
        };
    }

    addJob(name, interval = 'EVERY_DAY', callback) {
        const cronExpression = this.getExpression(interval);

        return (this.jobs[name] = cron.schedule(cronExpression, callback));
    }

    getExpression(interval) {
        return this.intervalHelpers[interval] || interval;
    }
}

module.exports = CronService;
