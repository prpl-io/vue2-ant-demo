const { StatusCodes: HTTP } = require('http-status-codes');

module.exports = (roles = []) => {
    return async (request, response, next) => {
        if (request.token) {
            return next();
        }

        const di = request.app.get('di');
        const getLoggedInUserHandler = di.get(
            'services.getLoggedInUserHandler'
        );
        const user = await getLoggedInUserHandler.handle(request);

        if (!user) {
            return response.sendStatus(HTTP.UNAUTHORIZED);
        }

        const rolesInfo = await user.getRolesInfo();

        request.user = user;
        request.isAdmin = rolesInfo.isAdmin;
        request.isUser = rolesInfo.isUser;

        if (!roles.length) {
            return next();
        }

        if (!Array.isArray(roles)) {
            roles = [roles];
        }

        const hasRequiredRole = roles.some(role =>
            rolesInfo.roles.includes(role)
        );

        if (hasRequiredRole) {
            return next();
        }

        return response.sendStatus(HTTP.FORBIDDEN);
    };
};
