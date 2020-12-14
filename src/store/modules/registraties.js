import axios from "axios";

const state = {
    registratie: {},

}

const mutations = {
    saveRegistratie: (state, payload) => {
        state.registratie = payload; 
    },
};

const actions = {
    postRegistration() {
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
            console.log(response);
        }).catch(function (error) {
            console.log("Er is iets fout gegaan met registreren" + error);
        })
    }
};

const getters = {
    saved_registraties(state) {
        return state.registraties;
    },
};

export default { state, mutations, actions, getters };