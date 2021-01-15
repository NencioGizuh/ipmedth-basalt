import axios from "axios";

const state = {
    registratie: {},
    registratieErrors: {},
    inloggen: {},
    inloggenErrors: {},
    triggers: {},
    actionplan: {},
    medication: [],
    inhalators: []
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
    saveTriggers: (state, payload) => {
        state.triggers = payload;
    },
    saveActionPlan: (state, payload) => {
        state.actionplan = payload;
    },
    saveInhalators: (state, payload) => {
        state.inhalators = payload;
    },
    saveMedication: (state, payload) => {
        state.medication = payload;
    }
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
            dispatch('setUser');
            dispatch('setActionPlanFromDatabase');
            dispatch('setPeakFlow');
            //Triggers
            dispatch('createTriggersUser');
            //Actieplan
            dispatch('createActionPlanUser');
            //Medicatiegebruik
            dispatch('createMedicationUser');
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
    createTriggersUser() {
        axios.post("http://localhost:8000/api/createtriggers", {
            tobacco_smoke: state.triggers.rook,
            dust_mites: state.triggers.huisstofmijt,
            air_pollution: state.triggers.luchtverontreiniging,
            pets: state.triggers.huisdieren,
            fungi: state.triggers.schimmels,
            fire_smoke: state.triggers.vuurrrook,
            infections: state.triggers.infecties,
            effort: state.triggers.inspanning,
            weather_conditions: state.triggers.weersomstandigheden,
            hyperventilation: state.triggers.hyperventilatie,
            pollen: state.triggers.pollen,
        },{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    },
    createActionPlanUser() {
        axios.post("http://localhost:8000/api/createactionplan", {
            zone_green_peakflow_before_medicines: state.actionplan.voorMedicatieGroeneZone,
            zone_green_peakflow_after_medicines: state.actionplan.naMedicatieGroeneZone,
            zone_green_explanation: null,
            zone_yellow_peakflow_below: state.actionplan.voorMedicatieGeleZone,
            zone_yellow_peakflow_above: state.actionplan.naMedicatieGeleZone,
            zone_yellow_medicines: null,
            zone_yellow_explanation: null,
            phonenumber_gp: state.actionplan.voorMedicatieOranjeZone,
            phonenumber_lung_specialist: state.actionplan.naMedicatieOranjeZone,
            zone_orange_explanation: null,
            zone_red_peakflow: state.actionplan.voorMedicatieRodeZone,
            zone_red_medicines: null,
            zone_red_explanation: null,
        }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    },
    createMedicationUser() {
        for (let index = 0; index < state.medication.length; index++) {
            const value = state.medication[index];
            for (let index = 0; index < value.lijst.length; index++) {
                const element = value.lijst[index];
                axios.post("http://localhost:8000/api/createmedicationsuser", {
                    time: element.value,
                    medicine_id: value.medicineID,
                }, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                })
            }
        }
    },
};

const getters = {
    saved_registraties(state) {
        return state.registraties;
    },
};

export default { state, mutations, actions, getters };