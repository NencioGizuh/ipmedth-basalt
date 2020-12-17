const state = {
    token: null,
    user: {
        name: null,
        email: null,
        patientNumber: null,
        dateOfBirth: null,
        length: null,
        gender: null,
    },
    notifications: {
        medicines: false,
        peakflow: false,
        breathingExercise: false,
        airQuality: false,
    },
    triggers: {
        tabaccoSmoke: false,
        dustMites: false,
        airPollution: false,
        pets: false,
        fungi: false,
        fireSmoke: false,
        infections: false,
        effort: false,
        weatherConditions: false,
        hyperventilation: false,
        pollen: false,
    },
};

const mutations = {
    setToken(state, data) {
        state.token = data;
    },
    setUser(state, data) {
        state.user = data;
    },
    setNotifications(state, data) {
        state.notifications = data;
    },
    setTriggers(state, data) {
        state.triggers = data;
    }
};

const actions = {
    // TODO: Change function
    setToken({commit}, data) {
        commit("setToken", data);
    },
    setUser({commit}) {
        // TODO: Get user information from database

        const user = {
            name: "John Doe",
            email: "jdoe@gmail.com",
            patientNumber: "123456",
            dateOfBirth: "1970-01-01",
            length: "179",
            gender: "man"
        }

        const notifications = {
            medicines: true,
            peakflow: true,
            breathingExercise: false,
            airQuality: false,
        }

        const triggers = {
            tabaccoSmoke: false,
            dustMites: true,
            airPollution: true,
            pets: false,
            fungi: true,
            fireSmoke: true,
            infections: true,
            effort: false,
            weatherConditions: false,
            hyperventilation: true,
            pollen: false,
        }

        commit("setUser", user);
        commit("setNotifications", notifications);
        commit("setTriggers", triggers);
    }
};

const getters = {
    user(state) {
        return state.user;
    },
    notifications(state) {
        return state.notifications;
    },
    triggers(state) {
        return state.triggers;
    },
    isAuthenticated(state) {
        console.log(state.token !== null);
        return state.token !== null;
        //return true; // Can be used for development
    },
};

export default {state, mutations, actions, getters};