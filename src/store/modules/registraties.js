import axios from "axios";

const state = {
    registratie: {},
    registratieErrors: {},
    inloggen: {},
    inloggenErrors: {}

}

const mutations = {
    saveRegistratie: (state, payload) => {
        state.registratie = payload; 
    },
    saveInloggen: (state, payload) => {
        state.inloggen = payload; 
    },
    saveRegistratieErrors: (state, payload) => {
        state.registratieErrors = payload
    },
    saveLoginErrors: (state, payload) => {
        state.inloggenErrors = payload
    },
};

const actions = {
    postRegistration({ commit }) {
        return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/register', {
            name: state.registratie.fullname,
            patient_number: state.registratie.patientnummer,
            email: state.registratie.email,
            password: state.registratie.wachtwoord,
            password_confirmation: state.registratie.bevestigingWachtwoord,
            age: state.registratie.leeftijd,
            height: state.registratie.lengte
        },{
            headers: {
                 "Content-Type": "application/json",
            } 
         }).then(function (response) {
            resolve(response);
            console.log(response);
            const object = {
                status: response.status,
                statusText: "Uw registratie is voltooid",
                errorText: "De registratie is successvol verlopen. U wordt doorverwezen naar het inlogscherm",
                buttonText: "U wordt ingelogd"
            }
            commit("saveRegistratieErrors", object);
        }).catch(function (error) {
            reject(error);
            const allowed = ["data", "status", "statusText"];
            Object.keys(error.response)
            .filter((key) => !allowed.includes(key))
            .forEach((key) => delete error.response[key]);
            console.log(error.response);
            const errors = [];
            Object.keys(error.response.data.errors).forEach(function (key) {
                const re = error.response.data.errors[key];
                Object.keys(re).forEach(function (key) {
                  const bericht = re[key];
                  errors.push(bericht);
                });
              });
              const object = {
                statusText: "Deze registratie kon niet verwerkt worden",
                status: error.response.status,
                errorText: "Er is iets fout gegaan tijdens het registreren. Dit komt door de volgende punten:",
                errors: errors,
                buttonText: "Verander gegevens"
              };
            commit("saveRegistratieErrors", object);
        })
        })
    },
    postLogin({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/login', {
            username: state.inloggen.email,
            password: state.inloggen.password,
        }, {
            headers: {
                "Content-Type": "application/json",
           } 
        }).then(function (response) {
            resolve(response)
            commit("setToken", response.data.access_token);
            localStorage.setItem("token", response.data.access_token);
            dispatch('setActionPlanFromDatabase');
            dispatch('setPeakFlow');
        }).catch(function (error) {
            reject(error);
            console.log(error.response);
            const allowed = ["status"];
            Object.keys(error.response)
            .filter((key) => !allowed.includes(key))
            .forEach((key) => delete error.response[key]);
            const object = {
                loginErrorTitle: "Inloggen mislukt",
                loginErrorBody: "Het inloggen is mislukt. Het wachtwoord of emailadres klopt niet. Probeer het opnieuw",
                loginErrorStatus: error.response.status,
                loginErrorButton: "Probeer opnieuw"
            }
            commit("saveLoginErrors", object);
        })
    })
    },
};

const getters = {
    saved_registraties(state) {
        return state.registraties;
    },
};

export default { state, mutations, actions, getters };