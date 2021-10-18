const PasswordChanged = require('./types/PasswordChanged');
const ResetPassword = require('./types/ResetPassword');

class MailFactory {
    static create(name, options) {
        const classes = {
            PasswordChanged,
            ResetPassword
        };

        if (!classes[name]) {
            throw new Error('Unknown email type');
        }

        const mailClass = new classes[name](options);

        return mailClass.generate();
    }
}

module.exports = MailFactory;
