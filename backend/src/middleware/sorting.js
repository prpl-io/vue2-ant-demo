const { col } = require('sequelize');

module.exports = (defaultSortBy = 'createdAt', defaultOrder = 'DESC') => {
    return (request, response, next) => {
        let { sortBy = defaultSortBy, order = defaultOrder } = request.query;

        request.sorting = {
            order: [[sortBy.includes('.') ? col(sortBy) : sortBy, order]]
        };

        return next();
    };
};
