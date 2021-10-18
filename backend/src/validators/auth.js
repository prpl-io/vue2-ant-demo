const { body } = require('express-validator');
const bcrypt = require('bcryptjs');

const checkIfUnique = async (fieldName, value, app, id) => {
    const di = app.get('di');
    const userRepository = di.get('repositories.user');

    const user = await userRepository[`findBy${fieldName}`](value);

    if (user && id !== user.id) {
        return Promise.reject('Already exists!');
    }
};

const login = [
    body(['email'])
        .trim()
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .bail()
        .isEmail()
        .withMessage('Email address is not valid!'),

    body(['password']).trim().not().isEmpty().withMessage('Should not be empty')
];

const register = [
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
        .custom(
            async (
                email,
                {
                    req: {
                        app,
                        params: { id }
                    }
                }
            ) => checkIfUnique('Email', email, app, id)
        )
];

const profile = [
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
        .custom(
            (
                email,
                {
                    req: {
                        app,
                        user: { id }
                    }
                }
            ) => checkIfUnique('Email', email, app, id)
        )
];

const changePassword = [
    body('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .bail()
        .isLength({ min: 6, max: 85 })
        .withMessage(
            'Invalid format. Min length is 6 chars. Max length is 85 chars'
        )
        .custom(value => /\d/.test(value))
        .withMessage('Password must contain numbers and letters!'),

    body('passwordConfirmation')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Password confirmation must be equal to Password')
];

const forgotPassword = [
    body('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .bail()
        .isEmail()
        .withMessage('Email address is not valid!')
];

const password = [
    body('currentPassword')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .bail()
        .custom(async (val, { req }) => {
            const di = req.app.get('di');
            const userRepository = di.get('repositories.user');

            const {
                user: { id }
            } = req;
            const loggedUser = await userRepository.findById(id, {
                attributes: ['email', 'password']
            });

            const isValid = bcrypt.compareSync(val, loggedUser.password);

            if (!isValid) {
                return Promise.reject('Wrong current password');
            }
        }),

    ...changePassword
];

module.exports = {
    login,
    register,
    profile,
    changePassword,
    forgotPassword,
    password
};
