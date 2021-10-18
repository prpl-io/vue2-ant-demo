import axios from 'axios';

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
    index(
        vuexContext,
        {
            page = 1,
            perPage = 10,
            search = '',
            sortBy = 'createdAt',
            descending = true,
            filters,
            role = null
        }
    ) {
        return axios.$get('/admin/users', {
            params: {
                page,
                perPage,
                q: search,
                sortBy,
                order: descending ? 'DESC' : 'ASC',
                filters: JSON.stringify(filters),
                role
            }
        });
    },

    store(vuexContext, data) {
        return axios.$post('admin/users', data);
    },

    show(vuexContext, id) {
        return axios.$get(`admin/users/${id}`);
    },

    update(vuexContext, { id, data }) {
        return axios.$put(`admin/users/${id}`, data);
    },

    destroy(vuexContext, id) {
        return axios.$delete(`admin/users/${id}`);
    }
};
