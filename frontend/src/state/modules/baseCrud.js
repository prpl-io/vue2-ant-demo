import axios from 'axios';

export default class {
    constructor(singular, plural) {
        if (!plural) {
            plural = `${singular}s`;
        }

        this.state = {
            singular,
            plural
        };

        this.getters = {};

        this.mutations = {};

        this.actions = {
            index(
                { state },
                {
                    page = 1,
                    perPage = 10,
                    search = '',
                    sortBy = 'createdAt',
                    descending = true,
                    filters = null
                }
            ) {
                const params = {
                    page,
                    perPage,
                    q: search,
                    sortBy,
                    order: descending ? 'DESC' : 'ASC'
                };

                if (filters) {
                    params.filters = JSON.stringify(filters);
                }

                return axios.$get(`/${state.plural}`, {
                    params
                });
            },

            store({ state }, data) {
                return axios.$post(`/${state.plural}`, data);
            },

            show({ state }, id) {
                return axios.$get(`/${state.plural}/${id}`);
            },

            update({ state }, { id, data }) {
                return axios.$put(`/${state.plural}/${id}`, data);
            },

            destroy({ state }, id) {
                return axios.$delete(`/${state.plural}/${id}`);
            }
        };
    }
}
