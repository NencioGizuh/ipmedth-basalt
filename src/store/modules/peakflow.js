import axios from "axios";
import router from "@/router/index";

const state = {
    peakflow: [],
    peakflowById: {},
    loadPeakFlow: false,
    zoneGreenPeakFlowBeforeMedicines: 600,
    zoneGreenPeakFlowAfterMedicines: null,
    zoneGreenExplanation: null,
    zoneYellowPeakFlowBelow: 599,
    zoneYellowPeakFlowAbove: 400,
    zoneYellowMedicines: null,
    zoneYellowExplanation: null,
    phoneNumberGP: null,
    phoneNumberLungSpecialist: null,
    zoneOrangeExplanation: null,
    zoneRedPeakFlow: 200,
    zoneRedMedicines: null,
    zoneRedExplanation: null,
    loadActionPlan: false,
};

const mutations = {
    setPeakFlow(state, data) {
        state.peakflow = data;
    },
    addPeakFlow(state, data) {
        state.peakflow.push(data);
    },
    deletePeakFlow(state, id) {
        const index = state.peakflow.map((e) => e.id).indexOf(Number(id));
        state.peakflow.splice(index, 1);
    },
    orderPeakFlow(state) {
        state.peakflow.sort((a,b) => {
            return (a.time < b.time) ? 1 : ((a.time > b.time) ? -1 : 0);
        });

        state.peakflow.sort((a,b) => {
            return new Date(b.date) - new Date(a.date);
        });
    },
    setPeakFlowById(state, data) {
        state.peakflowById = data;
    },
    setLoadingPeakFlow(state, data) {
        state.loadPeakFlow = data;
    },
    setActionPlan(state, data) {
        state.zoneGreenPeakFlowBeforeMedicines = data.zone_green_peakflow_before_medicines;
        state.zoneGreenPeakFlowAfterMedicines = data.zone_green_peakflow_after_medicines;
        state.zoneGreenExplanation = data.zone_green_explanation;
        state.zoneYellowPeakFlowBelow = data.zone_yellow_peakflow_below;
        state.zoneYellowPeakFlowAbove = data.zone_yellow_peakflow_above;
        state.zoneYellowMedicines = data.zone_yellow_medicines ? data.zone_yellow_medicines.split(',') : null;
        state.zoneYellowExplanation = data.zone_yellow_explanation;
        state.phoneNumberGP = data.phonenumber_gp;
        state.phoneNumberLungSpecialist = data.phonenumber_lung_specialist;
        state.zoneOrangeExplanation = data.zone_orange_explanation;
        state.zoneRedPeakFlow = data.zone_red_peakflow;
        state.zoneRedMedicines = data.zone_red_medicines ? data.zone_red_medicines.split(',') : null;
        state.zoneRedExplanation = data.zone_red_explanation;
    },
    setLoadingActionPlan(state, data) {
        state.loadActionPlan = data;
    }
};

const actions = {
    setPeakFlow({commit}) {
        commit("setLoadingPeakFlow", true);
        axios.get('http://localhost:8000/api/getpeakflowuser', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            } 
        }).then(res => {
            commit('setPeakFlow', res.data);
            commit("setLoadingPeakFlow", false);
            commit('orderPeakFlow');
        });
    },
    addPeakFlow({commit}, data) {
        axios.post('http://localhost:8000/api/createpeakflow', data, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            } 
        }).then(res => {
            commit("addPeakFlow", res.data);
            commit('orderPeakFlow');
            router.push("/peakflow");
        })
    },
    deletePeakFlow({commit}, id) {
        axios.delete(`http://localhost:8000/api/deletepeakflow/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            } 
        }).then(() => {
            commit("deletePeakFlow", id);
            commit('orderPeakFlow');
            router.push("/peakflow");
        })
    },
    setPeakFlowById({ commit, state }, id) {
        const peakflowById = state.peakflow.find(pk => pk.id === Number(id));
        commit("setPeakFlowById", peakflowById);
    },
    setActionPlanFromDatabase({commit}) {
        commit("setLoadingActionPlan", true);
        axios.get('http://localhost:8000/api/getactionplanuser', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            } 
        }).then(res => {
            commit("setActionPlan", res.data);
            commit("setLoadingActionPlan", false);
        }).catch(() => {
            axios.post('http://localhost:8000/api/createactionplan', {
                zone_green_peakflow_before_medicines: 600,
                zone_green_peakflow_after_medicines: 700,
                zone_yellow_peakflow_below: 599,
                zone_yellow_peakflow_above: 400,
                zone_red_peakflow: 200
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                } 
            }).then(res => {
                commit("setActionPlan", res.data);
                commit("setLoadingActionPlan", false);
            })
        })
    },
    postActionPlan({ commit }, data) {
        axios.post('http://localhost:8000/api/createactionplan', data, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            } 
        }).then(res => {
            commit("setActionPlan", res.data);
            router.push({path: "/actionplan", query: {reset: 'succes'}});
        })
    },
};

const getters = {
    getPeakFlow(state) {
        return state.peakflow;
    },
    getPeakFlowById(state) {
        return state.peakflowById;
    },
    getPeakFlowZoneGreen(state) {
        return state.zoneGreenPeakFlowBeforeMedicines;
    },
    getPeakFlowZoneYellow(state) {
        return state.zoneYellowPeakFlowAbove;
    },
    getPeakFlowZoneRed(state) {
        return state.zoneRedPeakFlow;
    },
    loadingPeakFlow() {
        return state.loadPeakFlow;
    },
    getActionPlan(state) {
        const filteredState = Object.keys(state)
            .filter(key => {
                if (key === "peakflow" || key === "peakflowById") return false;
                return true;
            })
            .reduce((obj, key) => {
                obj[key] = state[key];
                return obj;
            }, {});
        return filteredState;
    },
    getPhoneNumberGP() {
        return state.phoneNumberGP;
    },
    getPhoneNumberLungSpecialist() {
        return state.phoneNumberLungSpecialist;
    },
    loadingActionPlan() {
        return state.loadActionPlan;
    }
};

export default {state, mutations, actions, getters};