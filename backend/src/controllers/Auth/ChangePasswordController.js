const { StatusCodes: HTTP } = require('http-status-codes');

class ChangePasswordController {
    constructor(sendNotificationAboutChangePassword) {
        this.sendNotificationAboutChangePassword = sendNotificationAboutChangePassword;
    }

    async invoke(request, response) {
        const {
            body: { password },
            user
        } = request;

        this.sendNotificationAboutChangePassword.handle(user);

        await user.update({ password });

        return response.sendStatus(HTTP.NO_CONTENT);
    }
}

module.exports = ChangePasswordController;
