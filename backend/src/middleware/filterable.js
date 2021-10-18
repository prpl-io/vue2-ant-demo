const { Op } = require('sequelize');
const { StatusCodes: HTTP } = require('http-status-codes');

module.exports = (fields = []) => {
    return (request, response, next) => {
        let {
            app,
            timezone,
            query: { filters }
        } = request;

        const di = app.get('di');
        const validateFiltersHandler = di.get(
            'services.validateFiltersHandler'
        );

        const where = {};

        if (filters) {
            try {
                filters = JSON.parse(filters);
                filters = validateFiltersHandler.handle(filters, {
                    timezone,
                    validLabels: fields || []
                });

                for (let [key, { type, value }] of Object.entries(filters)) {
                    if (key.toLowerCase().includes('price')) {
                        value *= 100;
                    }

                    where[key] = {
                        [Op[type]]: value
                    };
                }
            } catch (error) {
                console.log(error);

                return response.status(HTTP.BAD_REQUEST).send({
                    errors: [{ message: 'Wrong format', param: 'filters' }]
                });
            }
        }

        request.filters = where;

        return next();
    };
};
