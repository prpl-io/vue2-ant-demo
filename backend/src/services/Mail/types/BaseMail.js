const config = require('../../../config');

class BaseMail {
    constructor(options) {
        this.options = options;
    }

    get defaultOptions() {
        return {
            from: config.email.from
        };
    }

    _generate() {
        throw new Error('Extend BaseMail class to use this method');
    }

    generate() {
        const mail = this._generate();

        if ('bcc' in mail) {
            // "to" field cannot be empty when using BCC
            mail.to = mail.bccTo || config.email.from.address;
        }

        return {
            ...this.defaultOptions,
            ...mail
        };
    }
}

module.exports = BaseMail;
