const { StatusCodes: HTTP } = require('http-status-codes');

// eslint-disable-next-line
module.exports = (err, request, response, next) => {
    if (err.message === 'Not allowed by CORS') {
        return response.json({ message: 'Request not allowed by CORS' });
    }

    if (
        err.name === 'SequelizeValidationError' ||
        err.name === 'SequelizeUniqueConstraintError'
    ) {
        const errors = err.errors.map(e => {
            return { message: e.message, param: e.path };
        });

        return response.status(HTTP.UNPROCESSABLE_ENTITY).json({ errors });
    }

    if (err.message === 'Validation failed') {
        const errors = err.array().map(e => {
            return { message: e.msg, param: e.param };
        });

        return response.status(HTTP.UNPROCESSABLE_ENTITY).json({ errors });
    }

    if (err.code === 'EBADCSRFTOKEN') {
        return response
            .status(HTTP.FORBIDDEN)
            .send('Invalid or missing CSRF token');
    }

    console.error(err);

    return response
        .status(HTTP.INTERNAL_SERVER_ERROR)
        .send('We messed something up. Sorry!');
};
