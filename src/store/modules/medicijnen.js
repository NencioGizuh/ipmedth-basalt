import axios from "axios";
//import router from "@/router/index";

const state = {
    slcMedicijn: null,
    medicijnenInDB: [],
    medicijnen: [
        {
            id: 1,
            title: "Salbutamol",
            category: "Luchtwegverwijder"
        },
        {
            id: 2,
            title: "Terbutaline",
            category: "Luchtwegverwijder"
        },
        {
            id: 3,
            title: "Ipratropium",
            category: "Luchtbeschermer"
        },
    ],
    medicijnen_tijden: [],
    current_selected_medicijn: {
        title: null
    }
}

const mutations = {
    slcMedicijn: (state, payload) => {
        state.slcMedicijn = payload; 
    },
    saveMedicijn: (state, payload) => {
        state.medicijnen_tijden.push(payload) 
    },
    currentMedicijn: (state, payload) => {
        state.current_selected_medicijn.title = payload;
    },
    setMedicationTimes: (state, payload) => {
        state.medicijnen_tijden.push(payload);
    },
    setMedication: (state, payload) => {
        state.medicijnenInDB = payload;

    }
};

const actions = {
    retrieveInhalators({rootState, commit}) {
        var string = rootState.registraties.inhalators.join();
        axios.get("http://localhost:8000/api/choseninhalators", {
        }, {
            params: {
                values: string
            }
        }).then(function (response) {
            commit('saveMedicijnen', response.data);
            
        }).catch(function (error) {
            console.log(error);
        })
    },

    getSelectedMedicijn({commit, dispatch}, data) {
        axios.get('http://localhost:8000/api/getmedication', {
        }).then(function (response) {
            let data_medicatie_id = response.data.filter(i => i.name == data.title);
            commit("slcMedicijn", data_medicatie_id[0].id);
            const data_medications_user = {
              time: data.tijd,
              medicine_id: data_medicatie_id[0].id,
            }
            dispatch("postMedicationUsers", data_medications_user);
        })
    },

    postMedicationUsers({ commit }, data_medications_user) {
        axios.post('http://localhost:8000/api/createmedicationsuser', data_medications_user, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then(function () {
            commit("slcMedicijn", null);
        }).catch(function (error) {
            console.log(error);
        })
    },

    getMedicijnTijden({commit}) {
        axios.get('http://localhost:8000/api/getmedicationsuser', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then(function (response) {
            //let data_medicatie_user_id = response.data.filter(i => i.user_id == data);
            commit("setMedicationTimes", response.data);
        }).catch(function (error) {
            console.log(error);
        })
        return 
    },

    getRegisteredMedicijnen({commit}) {
        axios.get('http://localhost:8000/api/getmedication', {
        }).then(function (response) {
            console.log(response);
            commit("setMedication", response.data);
        })
    },
};

const getters = {
    datacollection_label(state) {
        return state.datacollection_label;
    },
    datacollection_label_datasets(state) {
        return state.datacollection_label_datasets;
    },
    medicijnen(state) {
        return state.medicijnen;
    },
    medicijnen_tijden(state) {
        return state.medicijnen_tijden;
    },
    current_selected_medicijn(state) {
        return state.current_selected_medicijn;
    },
    slcMedicijn(state){
        return state.slcMedicijn;
    },
    medicijnenInDB(state){
        return state.medicijnenInDB;
    }

};

export default { state, mutations, actions, getters };