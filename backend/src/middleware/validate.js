const { StatusCodes: HTTP } = require('http-status-codes');
const { matchedData, validationResult } = require('express-validator');

module.exports = (request, response, next) => {
    const validationErrors = validationResult(request);

    if (validationErrors.isEmpty()) {
        request.body = matchedData(request);

        return next();
    }

    const errors = validationErrors.array().map(e => {
        return { message: e.msg, param: e.param };
    });

    return response.status(HTTP.BAD_REQUEST).json({ errors });
};
