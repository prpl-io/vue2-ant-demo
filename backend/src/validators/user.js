const { body } = require('express-validator');
const { Role } = require('../models');

const checkIfUnique = async (fieldName, value, app, params) => {
    const di = app.get('di');
    const userRepository = di.get('repositories.user');

    const { id } = params;
    const user = await userRepository[`findBy${fieldName}`](value);

    if (user && id !== user.id) {
        return Promise.reject('Already exists!');
    }
};

const update = [
    body(['firstName', 'lastName'])
        .trim()
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .bail()
        .isLength({ min: 2, max: 64 })
        .withMessage(
            'Invalid format. Min length is 2 chars. Max length is 64 chars'
        ),

    body('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .bail()
        .isEmail()
        .withMessage('Email address is not valid!')
        .bail()
        .custom((email, { req: { app, params } }) =>
            checkIfUnique('Email', email, app, params)
        )
];

const store = [
    ...update,
    body('role')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isIn([Role.USER, Role.ADMIN])
        .withMessage('Unknown role.')
];

module.exports = {
    store,
    update
};
