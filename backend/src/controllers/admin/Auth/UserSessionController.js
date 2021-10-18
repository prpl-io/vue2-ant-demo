const { StatusCodes: HTTP } = require('http-status-codes');

class UserSessionController {
    async invoke(request, response) {
        const { id } = request.params;

        if (request.session && !request.session.users.includes(id)) {
            request.session.users.push(id);
        }

        return response.sendStatus(HTTP.NO_CONTENT);
    }
}

module.exports = UserSessionController;
