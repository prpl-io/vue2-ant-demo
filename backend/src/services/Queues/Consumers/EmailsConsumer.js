const AbstractConsumer = require('../AbstractConsumer');

class EmailsConsumer extends AbstractConsumer {
    constructor(channel, name, sendMailHandler) {
        super(channel, name);
        this.sendMailHandler = sendMailHandler;

        const id = Math.random().toString(36).substring(2);
        console.log(`EmailsConsumer instance created ID ${id}`);
    }

    async _processing(item) {
        await this.sendMailHandler.handle(item);
    }
}

module.exports = EmailsConsumer;
