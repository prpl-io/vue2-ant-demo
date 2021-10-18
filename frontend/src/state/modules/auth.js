import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { projectName } from '@/config';

export const state = {
    currentUser: getSavedState('auth.currentUser') || {}
};

export const getters = {
    loggedIn: state => !!state.currentUser.id,
    loggedUser: state => state.currentUser,
    isAdmin: state =>
        state.currentUser?.roles?.some(role => role.name === 'admin')
};

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue;

        saveState('auth.currentUser', newValue);
        setCLUID(state.currentUser.id);
    }
};

export const actions = {
    init({ dispatch }) {
        dispatch('validate');
    },

    async login({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) {
            return dispatch('validate');
        }

        const user = await axios.$post('/auth/login', {
            email,
            password
        });

        if (user) {
            commit('SET_CURRENT_USER', user);
        }

        return null;
    },

    async signUp(
        vuexContext,
        { firstName, lastName, email, companyName } = {}
    ) {
        await axios.$post('/auth/register', {
            firstName,
            lastName,
            email,
            companyName
        });
    },

    async logout({ dispatch }) {
        await axios.post('/auth/logout');
        await dispatch('validate');
    },

    async validate({ commit, state }) {
        const { id } = state.currentUser;

        if (!id) {
            return null;
        }

        try {
            setCLUID(id);

            const user = await axios.$get('/auth/me');

            commit('SET_CURRENT_USER', user);

            return user;
        } catch (error) {
            if (
                error.response &&
                error.response.status === StatusCodes.UNAUTHORIZED
            ) {
                commit('SET_CURRENT_USER', {});
            }

            return null;
        }
    },

    checkPasswordResetToken({ dispatch, getters }, token) {
        if (getters.loggedIn) {
            return dispatch('validate');
        }

        return axios.get(`/auth/reset-password/${token}`);
    },

    sendResetPasswordLink({ dispatch, getters }, email) {
        if (getters.loggedIn) {
            return dispatch('validate');
        }

        return axios.post('/auth/forgot-password', { email });
    },

    resetPassword(
        { dispatch, getters },
        { password, passwordConfirmation, token } = {}
    ) {
        if (getters.loggedIn) {
            return dispatch('validate');
        }

        return axios.post(`/auth/reset-password/${token}`, {
            password,
            passwordConfirmation
        });
    },

    async updateProfile({ commit }, data) {
        const user = await axios.$post('/auth/profile', data);

        commit('SET_CURRENT_USER', user);

        return user;
    },

    updatePassword(vuexContext, passwords) {
        return axios.$post('/auth/password', passwords);
    },

    async loginAs({ commit }, id) {
        const user = await axios.$post(`/auth/login-as/${id}`);

        if (user) {
            commit('SET_CURRENT_USER', user);
        }

        return user;
    }
};

// ===
// Private helpers
// ===

function getSavedState(key) {
    return JSON.parse(window.localStorage.getItem(`${projectName}.${key}`));
}

function saveState(key, state) {
    window.localStorage.setItem(`${projectName}.${key}`, JSON.stringify(state));
}

function setCLUID(id) {
    axios.defaults.headers.cluid = id || '';
}
