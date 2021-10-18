const { StatusCodes: HTTP } = require('http-status-codes');

class ResetPasswordController {
    constructor(
        passwordResetRepository,
        resetPasswordService,
        sendNotificationAboutChangePassword
    ) {
        this.passwordResetRepository = passwordResetRepository;
        this.resetPasswordService = resetPasswordService;
        this.sendNotificationAboutChangePassword = sendNotificationAboutChangePassword;
    }

    async invoke(request, response) {
        const {
            params: { token },
            body: { password }
        } = request;

        const isValid = await this.resetPasswordService.isTokenValid(token);

        if (!isValid) {
            return response.sendStatus(HTTP.FORBIDDEN);
        }

        const passwordReset = await this.passwordResetRepository.findByToken(
            token,
            {
                include: [
                    {
                        association: 'user'
                    }
                ]
            }
        );

        const wasResetSuccessfully = await this.resetPasswordService.reset(
            token,
            password
        );

        if (!wasResetSuccessfully) {
            return response.sendStatus(HTTP.UNPROCESSABLE_ENTITY);
        }

        this.sendNotificationAboutChangePassword.handle(passwordReset.user);

        return response.sendStatus(HTTP.NO_CONTENT);
    }
}

module.exports = ResetPasswordController;
