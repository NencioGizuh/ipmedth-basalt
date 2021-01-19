import axios from "axios";

const state = {
    metingen: {
        date: '',
        cp1Meting: null, 
        cp2Meting: null, 
        intervalCompleted: false, 
        buteykoCompleted: false, 
        papworthCompleted: false, 
        middenrifCompleted: false, 
        wimhofCompleted: false, 
        cp1Completed: false, 
        cp2Completed: false
    }
};

const mutations = {
    setCp1Meting (state, timeInSeconds) {
        state.metingen.cp1Meting = timeInSeconds;
    }, 
    addCp1Meting(state, data) {
        state.metingen.cp1Meting.push(data);
    },
    setCp2Meting (state, timeInSeconds) {
        state.metingen.cp2Meting = timeInSeconds;
    },
    addCp2Meting(state, data) {
        state.metingen.cp2Meting.push(data);
    },
    addMeting(state, data){
        state.metingen.push(data);
    }, 
    deleteMeting(state, id) {
        const index = state.metingen.map((e) => e.id).indexOf(Number(id));
        state.metingen.splice(index, 1);
    },
    setMeting(state, data) {
        state.metingen = data;
    },
    setIntervalCompleted (state) {
        state.metingen.intervalCompleted = true;
    }, 
    addIntervalCompleted(state, data) {
        state.metingen.intervalCompleted.push(data);
    },
    setButeykoCompleted (state) {
        state.metingen.buteykoCompleted = true;
    }, 
    setPapworthCompleted (state) {
        state.metingen.papworthCompleted = true;
    }, 
    setMiddenrifCompleted (state) {
        state.metingen.middenrifCompleted = true;
    }, 
    setWimhofCompleted (state) {
        state.metingen.wimhofCompleted = true;
    }, 
    setCp1Completed (state) {
        state.metingen.cp1Completed = true;
    }, 
    setCp2Completed (state) {
        state.metingen.cp2Completed = true;
    }, 
}

const actions = {
    getMeting({commit}, data) {
        axios.get('http://localhost:8000/api/updatetriggers', data, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            } 
        }).then(res => {
            commit("setMeting", {
                date: new Date().toISOString().substr(0,10),
                cp_measurement_one: res.data.cp_measurement_one,
                cp_measurement_two: res.data.cp_measurement_two,
                interval: res.data.interval,
                buteyko: res.data.buteyko,
                papworth: res.data.papworth,
                middenrifspier: res.data.middenrifspier,
                wim_hof: res.data.wim_hof
            });
        });
    },
    addMeting({commit}, data) {
        axios.post('http://localhost:8000/api/createbreathingexercise', data, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            } 
        }).then(res => {
            commit("addMeting",{
                date: new Date().toISOString().substr(0,10),
                cp_measurement_one: res.data.cp_measurement_one,
                cp_measurement_two: res.data.cp_measurement_two,
                interval: res.data.interval,
                buteyko: false,
                papworth: false,
                middenrifspier: false,
                wim_hof: false
            });
        }).catch(error => {
            console.log(error.message)
        })
    },
    deleteMeting({commit}, id) {
        axios.delete(`http://localhost:8000/api/deletebreathingexercise/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            } 
        }).then(() => {
            commit("deleteMeting", id);
        })
    },
    updateMeting({commit}, id) {
        axios.put(`http://localhost:8000/api/updatebreathingexercise/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            } 
        }).then(res => {
            commit("setMeting", {
                date: new Date().toISOString().substr(0,10),
                cp_measurement_one: res.data.cp_measurement_one,
                cp_measurement_two: res.data.cp_measurement_two,
                interval: res.data.interval,
                buteyko: res.data.buteyko,
                papworth: res.data.papworth,
                middenrifspier: res.data.middenrifspier,
                wim_hof: res.data.wim_hof
            });
        });
    }
};

const getters = {
    getCp1Meting(state) {
        return state.metingen.cp1Meting;
    },
    getCp2Meting(state) {
        return state.metingen.cp2Meting;
    },
    getAverageCP(state){
        return (state.metingen.cp1Meting + state.metingen.cp2Meting) / 2;
    },
    getIntervalCompleted(state) {
        return state.metingen.intervalCompleted;
    },
    getButeykoCompleted(state) {
        return state.metingen.buteykoCompleted;
    },
    getPapworthCompleted(state) {
        return state.metingen.papworthCompleted;
    },
    getMiddenrifCompleted(state) {
        return state.metingen.middenrifCompleted;
    },
    getWimhofCompleted(state) {
        return state.metingen.wimhofCompleted;
    },
    getCp1Completed(state) {
        return state.metingen.cp1Completed;
    },
    getCp2Completed(state) {
        return state.metingen.cp2Completed;
    },
};

export default {state, mutations, actions, getters};