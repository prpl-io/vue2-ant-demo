const { StatusCodes: HTTP } = require('http-status-codes');

async function ApiKeysAccess(req, res, next) {
    if (req.session && req.session.users) {
        return next();
    }

    const { token } = req.query;

    if (!token) {
        return res.sendStatus(HTTP.UNAUTHORIZED);
    }

    const di = req.app.get('di');
    const apiKeyRepository = di.get('repositories.apiKey');

    const key = await apiKeyRepository.findByValue(token);

    if (!key) {
        return res.sendStatus(HTTP.UNAUTHORIZED);
    }

    req.token = token;
    req.isAdmin = true;

    return next();
}

module.exports = ApiKeysAccess;
