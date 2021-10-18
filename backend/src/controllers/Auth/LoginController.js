const { StatusCodes: HTTP } = require('http-status-codes');

class LoginController {
    constructor(loginHandler) {
        this.loginHandler = loginHandler;
    }

    async invoke(request, response) {
        const { email, password } = request.body;

        const loggedUser = await this.loginHandler.handle(email, password);

        if (!loggedUser) {
            return response.status(HTTP.UNAUTHORIZED).send('WRONG_CREDENTIALS');
        }

        if (
            request.session.users &&
            !request.session.users.includes(loggedUser.id)
        ) {
            request.session.users.push(loggedUser.id);
        } else if (!request.session.users) {
            request.session.users = [loggedUser.id];
        }

        return response.send(loggedUser);
    }
}

module.exports = LoginController;
