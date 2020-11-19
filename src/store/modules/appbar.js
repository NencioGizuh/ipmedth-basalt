const state = {
    defaultAppbar: true,
    appbarText: null,
    appbarCloseRoute: null,
};

const mutations = {
    setDefaultAppbar(state, data) {
        state.defaultAppbar = data;
    },
    setAppbarDetails(state, data) {
        state.defaultAppbar = false;
        state.appbarText = data.appbarText;
        state.appbarCloseRoute = data.appbarCloseRoute;
    },
};

const actions = {
    setDefaultAppbar({commit}) {
        commit('setDefaultAppbar', true);
    },
    setAppbarDetails({commit}, data) {
        commit('setAppbarDetails', data);
    },
};

const getters = {
    getDefaultAppbar(state) {
        return state.defaultAppbar;
    },
    getAppbarText(state) {
        return state.appbarText;
    },
    getAppbarCloseRoute(state) {
        return state.appbarCloseRoute;
    },
};

export default {state, mutations, actions, getters};