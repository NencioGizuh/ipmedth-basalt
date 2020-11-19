const state = {
    token: null,
    user: null,
};

const mutations = {
    setToken(state, data) {
        state.token = data;
    }
};

const actions = {
    // TODO: Change function
    setToken({commit}, data) {
        commit("setToken", data);
    }
};

const getters = {
    user(state) {
        return state.user;
    },
    isAuthenticated(state) {
        console.log(state.token !== null);
        // return state.token !== null;
        return true; // Can be used for development
    },
};

export default {state, mutations, actions, getters};