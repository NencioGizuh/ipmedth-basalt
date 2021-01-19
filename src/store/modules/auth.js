import axios from "axios";
import router from "@/router/index";

const state = {
    token: null,
    user: {
        name: null,
        email: null,
        patientNumber: null,
        age: null,
        height: null,
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
    loadingUser: false,
    loadingTriggers: false,
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
    },
    setLoadingUser(state, data) {
        state.loadingUser = data;
    },
    setLoadingTriggers(state, data) {
        state.loadingTriggers = data;
    },
};

const actions = {
    setToken({commit}, data) {
        commit("setToken", data);
    },
    setUser({commit}) {
        commit("setLoadingUser", true);
        commit("setLoadingTriggers", true);

        axios.get('http://localhost:8000/api/user', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            } 
        }).then(res => {
            commit("setUser", {
                name: res.data.name,
                email: res.data.email,
                patientNumber: res.data.patient_number,
                age: res.data.age,
                height: res.data.height,
            });
            commit("setLoadingUser", false);
        });

        axios.get('http://localhost:8000/api/gettriggersuser', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            } 
        }).then(res => {
            console.log(res.data);
            commit("setTriggers", {
                tabaccoSmoke: res.data.tabacco_smoke,
                dustMites: res.data.dust_mites,
                airPollution: res.data.air_pollution,
                pets: res.data.pets,
                fungi: res.data.fungi,
                fireSmoke: res.data.fire_smoke,
                infections: res.data.infections,
                effort: res.data.effort,
                weatherConditions: res.data.weather_conditions,
                hyperventilation: res.data.hyperventilation,
                pollen: res.data.pollen, 
            });
            commit("setLoadingTriggers", false);
        }).catch(err => {
            if (err.response.status === 404) {
                axios.post('http://localhost:8000/api/createtriggers', {}, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    } 
                }).then(res => {
                    console.log(res.data);
                    commit("setTriggers", {
                        tabaccoSmoke: res.data.tabacco_smoke,
                        dustMites: res.data.dust_mites,
                        airPollution: res.data.air_pollution,
                        pets: res.data.pets,
                        fungi: res.data.fungi,
                        fireSmoke: res.data.fire_smoke,
                        infections: res.data.infections,
                        effort: res.data.effort,
                        weatherConditions: res.data.weather_conditions,
                        hyperventilation: res.data.hyperventilation,
                        pollen: res.data.pollen, 
                    });
                    commit("setLoadingTriggers", false);
                });
            }
        });

        const notifications = localStorage.getItem('notifications');
        if(notifications) {
            commit("setNotifications", JSON.parse(notifications));
        } else {
            localStorage.setItem("notifications", JSON.stringify({
                medicines: false,
                peakflow: false,
                breathingExercise: false,
                airQuality: false,
            }));
            commit("setNotifications", JSON.parse(localStorage.getItem('notifications')));
        }
    },
    updateTriggers({commit}, data) {
        axios.put('http://localhost:8000/api/updatetriggers', data, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            } 
        }).then(res => {
            commit("setTriggers", {
                tabaccoSmoke: res.data.tabacco_smoke,
                dustMites: res.data.dust_mites,
                airPollution: res.data.air_pollution,
                pets: res.data.pets,
                fungi: res.data.fungi,
                fireSmoke: res.data.fire_smoke,
                infections: res.data.infections,
                effort: res.data.effort,
                weatherConditions: res.data.weather_conditions,
                hyperventilation: res.data.hyperventilation,
                pollen: res.data.pollen, 
            });
            router.push({path: "/account", query: {triggers: 'succes'}});
        });
    },
    logout({commit}) {
        axios.post('http://localhost:8000/api/logout', {}, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            } 
        }).then(res => {
            console.log(res.data);
            commit("setUser", null);
            commit("setNotifications", null);
            commit("setTriggers", null);
            commit("setMedicationTimes", null);
            commit("setMedication", null);
            commit("setToken", null);
            localStorage.removeItem("token");
            router.push("/login");
        });
    },
    changeUser({commit}, data) {
        return new Promise((resolve, reject) => {
            axios.put('http://localhost:8000/api/updateuser', data, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                } 
            }).then(res => {
                commit("setUser", {
                    name: res.data.name,
                    email: res.data.email,
                    patientNumber: res.data.patient_number,
                    age: res.data.age,
                    height: res.data.height,
                });
                router.push({path: "/account", query: {personal: 'succes'}});
                resolve(res.data);
            }).catch(err => {
                reject(err.response.data);
            });
        });
    },
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
    loadingUser(state) {
        return state.loadingUser;
    },
    loadingTriggers(state) {
        return state.loadingTriggers;
    },
};

export default {state, mutations, actions, getters};