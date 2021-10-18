const { StatusCodes: HTTP } = require('http-status-codes');

class CheckResetPasswordTokenController {
    constructor(resetPasswordService) {
        this.resetPasswordService = resetPasswordService;
    }

    async invoke(request, response) {
        const { token } = request.params;

        const isValid = await this.resetPasswordService.isTokenValid(token);

        if (!isValid) {
            return response.sendStatus(HTTP.FORBIDDEN);
        }

        return response.sendStatus(HTTP.NO_CONTENT);
    }
}

module.exports = CheckResetPasswordTokenController;
