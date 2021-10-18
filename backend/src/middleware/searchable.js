const { Op } = require('sequelize');

module.exports = (fields = []) => {
    return (request, response, next) => {
        const { q = '' } = request.query;

        const where = {};

        if (q) {
            const fieldIncludesQueryString = {
                [Op.like]: `%${q}%`
            };

            where[Op.or] = fields.map(field => ({
                [field]: fieldIncludesQueryString
            }));
        }

        request.search = where;

        return next();
    };
};
