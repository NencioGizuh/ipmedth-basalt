const state = {
    peakflow: [],
    peakflowById: {},
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
};

const mutations = {
    setPeakFlow(state, data) {
        state.peakflow = data;
    },
    setPeakFlowZones(state, data) {
        state.zoneGreenPeakFlowBeforeMedicines = data.zoneGreenPeakFlowBeforeMedicines;
        state.zoneYellowPeakFlowAbove = data.zoneYellowPeakFlowAbove;
        state.zoneRedPeakFlow = data.zoneRedPeakFlow;
    },
    setPeakFlowById(state, data) {
        state.peakflowById = data;
    },
    setActionPlan(state, data) {
        for (const prop in data) {
            state[prop] = data[prop];
        }
    }
};

const actions = {
    setPeakFlow({commit}) {
        // dispatch("setPeakFlowZones");
        
        // TODO: Retrieve from database
        const peakflow = [
            {
                id: 1,
                date: "23-11-2020",
                time: "11:00",
                measurementOne: "632",
                measurementTwo: "620",
                measurementThree: "600",
                takenMedicines: false,
                explanation: "Ik voel me prima"
            },
            {
                id: 2,
                date: "22-11-2020",
                time: "20:00",
                measurementOne: "432",
                measurementTwo: "420",
                measurementThree: "400",
                takenMedicines: true,
                explanation: "Het gaat beter"
            },
            {
                id: 3,
                date: "22-11-2020",
                time: "8:32",
                measurementOne: "190",
                measurementTwo: "180",
                measurementThree: "185",
                takenMedicines: false,
                explanation: "Ik heb het heel benauwd"
            },
            {
                id: 4,
                date: "21-11-2020",
                time: "21:10",
                measurementOne: "390",
                measurementTwo: "380",
                measurementThree: "388",
                takenMedicines: true,
                explanation: "Ik heb het benauwd"
            },
            {
                id: 5,
                date: "21-11-2020",
                time: "11:00",
                measurementOne: "632",
                measurementTwo: "645",
                measurementThree: "628",
                takenMedicines: false,
                explanation: "Ik voel me prima"
            },
            {
                id: 6,
                date: "20-11-2020",
                time: "20:00",
                measurementOne: "432",
                measurementTwo: "462",
                measurementThree: "400",
                takenMedicines: true,
                explanation: "Het gaat beter"
            },
            {
                id: 7,
                date: "20-11-2020",
                time: "8:32",
                measurementOne: "177",
                measurementTwo: "170",
                measurementThree: "173",
                takenMedicines: false,
                explanation: "Ik heb het heel benauwd"
            },
            {
                id: 8,
                date: "19-11-2020",
                time: "21:10",
                measurementOne: "390",
                measurementTwo: "350",
                measurementThree: "375",
                takenMedicines: true,
                explanation: "Ik heb het benauwd"
            },
        ];

        commit('setPeakFlow', peakflow);
    },
    setPeakFlowZones({commit}) {
        // TODO: Retrieve from database
        const zones = {
            zoneGreenPeakFlowBeforeMedicines: 600,
            zoneYellowPeakFlowAbove: 400,
            zoneRedPeakFlow: 200,
        };

        commit('setPeakFlowZones', zones);
    },
    setPeakFlowById({ commit, state }, id) {
        const peakflowById = state.peakflow.find(pk => pk.id === Number(id));
        commit("setPeakFlowById", peakflowById);
    },
    setActionPlanFromDatabase() {
        // TODO: Retrieve from database
    },
    setActionPlan({ commit }, data) {
        commit("setActionPlan", data);
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
};

export default {state, mutations, actions, getters};