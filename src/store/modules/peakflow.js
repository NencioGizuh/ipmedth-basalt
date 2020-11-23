const state = {
    peakflow: [],
    zoneGreen: null,
    zoneYellow: null,
    zoneRed: null,
};

const mutations = {
    setPeakFlow(state, data) {
        state.peakflow = data;
    },
    setPeakFlowZones(state, data) {
        state.zoneGreen = data.zoneGreen;
        state.zoneYellow = data.zoneYellow;
        state.zoneRed = data.zoneRed;
    },
};

const actions = {
    setPeakFlow({commit, dispatch}) {
        dispatch("setPeakFlowZones");
        
        // TODO: Retrieve from database
        const peakflow = [
            {
                id: 1,
                date: "23-11-2020",
                time: "11:00",
                measurementOne: "632",
                measurementTwo: "620",
                measurementThree: "600",
                explanation: "Ik voel me prima"
            },
            {
                id: 2,
                date: "22-11-2020",
                time: "20:00",
                measurementOne: "432",
                measurementTwo: "420",
                measurementThree: "400",
                explanation: "Het gaat beter"
            },
            {
                id: 3,
                date: "22-11-2020",
                time: "8:32",
                measurementOne: "190",
                measurementTwo: "180",
                measurementThree: "185",
                explanation: "Ik heb het heel benauwd"
            },
            {
                id: 4,
                date: "21-11-2020",
                time: "21:10",
                measurementOne: "390",
                measurementTwo: "380",
                measurementThree: "388",
                explanation: "Ik heb het benauwd"
            },
            {
                id: 5,
                date: "21-11-2020",
                time: "11:00",
                measurementOne: "632",
                measurementTwo: "645",
                measurementThree: "628",
                explanation: "Ik voel me prima"
            },
            {
                id: 6,
                date: "20-11-2020",
                time: "20:00",
                measurementOne: "432",
                measurementTwo: "462",
                measurementThree: "400",
                explanation: "Het gaat beter"
            },
            {
                id: 7,
                date: "20-11-2020",
                time: "8:32",
                measurementOne: "177",
                measurementTwo: "170",
                measurementThree: "173",
                explanation: "Ik heb het heel benauwd"
            },
            {
                id: 8,
                date: "19-11-2020",
                time: "21:10",
                measurementOne: "390",
                measurementTwo: "350",
                measurementThree: "375",
                explanation: "Ik heb het benauwd"
            },
        ];

        commit('setPeakFlow', peakflow);
    },
    setPeakFlowZones({commit}) {
        // TODO: Retrieve from database
        const zones = {
            zoneGreen: 600,
            zoneYellow: 400,
            zoneRed: 200,
        };

        commit('setPeakFlowZones', zones);
    },
};

const getters = {
    getPeakFlow(state) {
        return state.peakflow;
    },
    getPeakFlowZoneGreen(state) {
        return state.zoneGreen;
    },
    getPeakFlowZoneYellow(state) {
        return state.zoneYellow;
    },
    getPeakFlowZoneRed(state) {
        return state.zoneRed;
    },
};

export default {state, mutations, actions, getters};