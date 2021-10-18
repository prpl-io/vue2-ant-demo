const { Op } = require('sequelize');

module.exports = async (value, repository) => {
    if (!Array.isArray(value)) {
        return Promise.reject('Should be an array.');
    }

    if (value.some(item => typeof item !== 'string')) {
        return Promise.reject('Should be an array of strings.');
    }

    value = [...new Set(value)];
    const uniqueItemCount = await repository.count({
        where: { id: { [Op.in]: value } }
    });

    if (value.length !== uniqueItemCount) {
        return Promise.reject('One of the items does not exist!');
    }
};
