import axios from 'axios';

import BaseCrud from './baseCrud';
const crud = new BaseCrud('task');

export const state = () => ({ ...crud.state });

export const getters = {
    ...crud.getters
};

export const mutations = {
    ...crud.mutations
};

export const actions = {
    ...crud.actions,

    complete(vuexContext, id) {
        return axios.$post(`/tasks/${id}/complete`);
    }
};
