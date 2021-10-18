const BaseMail = require('./BaseMail');

class ResetPassword extends BaseMail {
    _generate() {
        return {
            to: this.options.email,
            subject: `${this.options.isReset ? 'Reset' : 'Set'} your password`,
            template: 'reset_password',
            context: this.options,
            text: `Hello ${this.options.firstName}! Please ${
                this.options.isReset ? 'reset' : 'set'
            }  your password using this link: ${this.options.link}`
        };
    }
}

module.exports = ResetPassword;
