const state = {
    registraties: [],

}

const mutations = {
    saveRegistratie: (state, payload) => {
        state.registraties.push(payload) 
    },
};

const actions = {

};

const getters = {
    saved_registraties(state) {
        return state.registraties;
    },
};

export default { state, mutations, actions, getters };