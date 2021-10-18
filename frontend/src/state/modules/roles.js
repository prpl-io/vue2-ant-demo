export const state = () => ({
    ADMIN: 'admin',
    USER: 'user'
});

export const getters = {
    ADMIN: state => state.ADMIN,
    USER: state => state.USER,
    ALL_ROLES: state => [
        {
            text: 'Admins',
            value: state.ADMIN
        },
        {
            text: 'Users',
            value: state.USER
        }
    ]
};

export const mutations = {};

export const actions = {};
