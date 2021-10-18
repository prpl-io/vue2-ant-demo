const BaseMail = require('./BaseMail');

class PasswordChanged extends BaseMail {
    _generate() {
        return {
            to: this.options.email,
            subject: 'Password has been changed',
            template: 'password_changed',
            context: this.options,
            text: `Hello ${this.options.firstName}! Your password has been changed.`
        };
    }
}

module.exports = PasswordChanged;
