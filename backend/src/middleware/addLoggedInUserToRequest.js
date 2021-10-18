module.exports = function addLoggedUserToRequest() {
    return async (request, response, next) => {
        const di = request.app.get('di');
        const getLoggedInUserHandler = di.get(
            'services.getLoggedInUserHandler'
        );

        const user = await getLoggedInUserHandler.handle(request);

        request.user = user;

        if (user) {
            const rolesInfo = await user.getRolesInfo();

            request.user = user;
            request.isAdmin = rolesInfo.isAdmin;
            request.isUser = rolesInfo.isUser;
        }

        return next();
    };
};
