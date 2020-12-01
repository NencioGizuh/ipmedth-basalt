const state = {
    medicijnen: [
        {
            id: 1,
            title: "Autohaler",
            link: "/medication/doing",
            category: "Luchtwegverwijder"
        },
        {
            id: 2,
            title: "Onbrez Breezhaler",
            link: "/medication/doing",
            category: "Luchtwegverwijder"
        },
        {
            id: 3,
            title: "Qvar autohaler",
            link: "/medication/doing",
            category: "Luchtbeschermer"
        },
        {
            id: 4,
            title: "Avamys neusspray",
            link: "/medication/doing",
            category: "Luchtbeschermer"
        }
    ],
    medicijnen_tijden: [
        {
            id: 1,
            title: "Autohaler",
            done: true,
            tijd: "08:00",
            dosage: 150,
        },
        {
            id: 2,
            title: "Onbrez Breezhaler",
            done: false,
            tijd: "12:30",
            dosage: 200,
        },
    ],
    medicijn_categorieen: [
        {
            id: 1,
            title: "Luchtwegverwijder",
          },
          {
            id: 2,
            title: "Luchtbeschermer",
          }
    ],
    datacollection_label: [
         "21", "22", "23", "24", "25", "26", "27"
    ],
    datacollection_label_datasets: [
        {
            label: 'Salbutamol',
            backgroundColor: '#008ACC',
            data: [150 ]
        }, {
            label: 'Medicijn 2',
            backgroundColor: '#005BA9',
            data: [200]
        },
        {
            label: 'Medicijn 3',
            backgroundColor: '#00305D',
            data: [250]
        }
    ],
    current_selected_medicijn: {
        title: null
    }
}

const mutations = {
    saveMedicijn: (state, payload) => {
        state.medicijnen_tijden.push(payload) 
    },
    currentMedicijn: (state, payload) => {
        state.current_selected_medicijn.title = payload;
    }
};

const actions = {

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
    medicijn_categorieen(state) {
        return state.medicijn_categorieen;
    },
    medicijnen_tijden(state) {
        return state.medicijnen_tijden;
    },
    current_medicijn(state) {
        return state.current_selected_medicijn;
    }

};

export default { state, mutations, actions, getters };
