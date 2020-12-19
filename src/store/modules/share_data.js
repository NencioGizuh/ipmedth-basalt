const state = {
    peakflow_shares: [
        {
            id: 1,
            zorgverleneres_id: "1",
            opmerking: "dit is een opmerking",
            user_id: "11",
            tijd: null
        },
    ],
}

const mutations = {
    saveSharePeakflow: (state, payload) => {
        state.peakflow_shares.push(payload) 
    },
};

const actions = {
    saveSharePeakflow: (context, payload) => {
        context.commit("saveSharePeakflow", payload);
    }
};

const getters = {

    peakflow_shares(state) {
        return state.peakflow_shares;
    },

};

export default { state, mutations, actions, getters };