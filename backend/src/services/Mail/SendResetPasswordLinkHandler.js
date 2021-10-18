const dayjs = require('dayjs');
const crypto = require('crypto');

class SendResetPasswordLinkHandler {
    constructor(emailPublisher, passwordResetRepository, appConfig) {
        this.emailPublisher = emailPublisher;
        this.passwordResetRepository = passwordResetRepository;
        this.appConfig = appConfig;
    }

    async handle(user, isReset = false) {
        const token = crypto.randomBytes(32).toString('hex');

        await this.passwordResetRepository.create({
            userId: user.id,
            token,
            expiresAt: dayjs().add(2, 'days').format()
        });

        const { frontendUrl } = this.appConfig;

        const link = `${frontendUrl}/${
            isReset ? 'reset' : 'set'
        }-password/${token}`;

        this.emailPublisher.publish({
            type: 'ResetPassword',
            email: user.email,
            firstName: user.firstName,
            link,
            isReset
        });
    }
}

module.exports = SendResetPasswordLinkHandler;
