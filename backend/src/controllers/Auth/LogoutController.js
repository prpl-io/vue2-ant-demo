const { StatusCodes: HTTP } = require('http-status-codes');

class LogoutController {
    invoke(request, response) {
        if (request.session && request.session.users) {
            if (request.headers.cluid) {
                const index = request.session.users.indexOf(
                    request.headers.cluid
                );
                request.session.users.splice(index, 1);
            } else {
                delete request.session.users;
            }
        }

        return response.sendStatus(HTTP.NO_CONTENT);
    }
}

module.exports = LogoutController;
