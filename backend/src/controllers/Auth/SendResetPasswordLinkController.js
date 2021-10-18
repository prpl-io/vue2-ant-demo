const { StatusCodes: HTTP } = require('http-status-codes');

class SendResetPasswordLinkController {
    constructor(userRepository, sendResetPasswordLinkHandler) {
        this.userRepository = userRepository;
        this.sendResetPasswordLinkHandler = sendResetPasswordLinkHandler;
    }

    async invoke(request, response) {
        const { email } = request.body;

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            return response.sendStatus(HTTP.NO_CONTENT);
        }

        this.sendResetPasswordLinkHandler.handle(user, true);

        return response.sendStatus(HTTP.NO_CONTENT);
    }
}

module.exports = SendResetPasswordLinkController;
