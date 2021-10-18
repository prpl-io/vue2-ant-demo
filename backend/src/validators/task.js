const { body } = require('express-validator');

const update = [
    body(['title', 'description'])
        .trim()
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
];

const store = [...update];

module.exports = {
    store,
    update
};
