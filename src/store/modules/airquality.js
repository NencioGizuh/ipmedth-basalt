import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;
import axios from "axios";
import moment from "moment";


const state = {
    loaded: false,
    initalized: false,
    latitude: 0,
    longitude: 0,
    locationUser: "Location",
    fullLocation: "",
    colorStroke: "",
    currentConcentration: 0,
    currentAirquality: 0,
    currentDate: "",
    color: "",
    airQualityPerHour: "",
    celsius: 0,
    windSpeed: 0,
    uvIndex: 0,
    humidity: 0,
    chartdata: {
        labels: [],
        datasets: [
          {
            minBarLength: 2,
            backgroundColor: [],
            data: [],
          },
        ],
      },
};

const getters = {
};

const mutations = {
    saveLatitude: (state, payload) => {
        state.latitude = payload;
    },
    saveLongitude: (state, payload) => {
        state.longitude = payload;
    },
    saveLocation: (state, payload) => {
        state.locationUser = payload;
    },
    saveFullLocation: (state, payload) => {
        state.fullLocation = payload;
    },
    saveColor: (state, payload) => {
        state.color = payload;
    },
    saveairQualityPerHour: (state, payload) => {
        state.airQualityPerHour = payload;
    },
    saveCurrentConcentration: (state, payload) => {
        state.currentConcentration = payload;
    },
    saveLoaded: (state, payload) => {
        state.loaded = payload;
    },
    saveInitalized: (state, payload) => {
        state.initalized = payload;
    },
    saveCelsius: (state, payload) => {
        state.celsius = payload;
    },
    saveWindSpeed: (state, payload) => {
        state.windSpeed = payload;
    },
    saveUvIndex: (state, payload) => {
        state.uvIndex = payload;
    },
    saveHumidity: (state, payload) => {
        state.humidity = payload;
    }
};

const actions = {
    getGeolocationMobile({ commit }) {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition()
                .then(function (response) {
                resolve(response);
                commit("saveLongitude", response.coords.longitude);
                commit("saveLatitude", response.coords.latitude);
            })
            .catch(function (error) {
                reject(error);
            });
        })
    },

    getGeolocationDesktop({ commit }) {
        return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position);
            commit("saveLongitude", position.coords.longitude);
            commit("saveLatitude", position.coords.latitude);
          },
          (error) => {
            reject(error);
            switch (error.code) {
              case error.PERMISSION_DENIED:
                 console.error("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
            }
          }
        );
        });
     },

    reverseGeocoding({commit, state}) {
          axios.get("http://www.mapquestapi.com/geocoding/v1/reverse", {
          params: {
            key: "SGTAMDyeoX9iqBrAGn8KVEuKHAIvC2HK",
            location:
              state.latitude + "," + state.longitude,
          },
        })
        .then(function (response) {
          for (let index = 0; index < response.data.results.length; index++) {
            const element = response.data.results[index];
            for (let index = 0; index < element.locations.length; index++) {
              const location = element.locations[index];
              commit("saveLocation", location.street);
              var string = location.street + ", " + location.adminArea5;
              commit("saveFullLocation", string);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    airConcentrations({commit, state, dispatch}) {
        axios.get("https://api.luchtmeetnet.nl/open_api/concentrations", {
          params: {
            formula: "LKI",
            longitude: state.longitude,
            latitude: state.latitude,
          },
        })
        .then(function (response) {
          state.chartdata.labels = [];
          state.chartdata.datasets[0].backgroundColor = [];
          state.chartdata.datasets[0].data = [];
          for (let index = 0; index < response.data.data.length; index++) {
            const element = response.data.data[index];
            const currentTime = moment().format("YYYY-MMM-DD HH:00");
            if (
              moment(currentTime).isSame(
                moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm")
              )
            ) {
              dispatch('colorScheme', element.value);
              state.colorStroke = state.color;
              state.currentAirquality = state.airQualityPerHour;
              commit("saveCurrentConcentration", Math.round(element.value));
              state.chartdata.labels.push(
                moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm")
              );
              state.chartdata.datasets[0].backgroundColor.push(state.color);
              state.chartdata.datasets[0].data.push(element.value);
            } else {
              dispatch('colorScheme', element.value);
              state.chartdata.labels.push(
                moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm")
             );
             state.chartdata.datasets[0].backgroundColor.push(state.color);
             state.chartdata.datasets[0].data.push(element.value);
            }
          }
          state.loaded = true;
          state.initalized = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    colorScheme({commit}, colorValue) {
        commit("saveColor", "");
        const round = Math.round(colorValue);
        switch (round) {
          case 1:
            commit("saveColor", "#16B729");
            commit("saveairQualityPerHour", "Goed");
            break;
          case 2:
            commit("saveColor", "#19d12f");
            commit("saveairQualityPerHour", "Goed");
            break;
          case 3:
            commit("saveColor", "#1bf234");
            commit("saveairQualityPerHour", "Goed");
            break;
          case 4:
            commit("saveColor", "#ffda40");
            commit("saveairQualityPerHour", "Matig");
            break;
          case 5:
            commit("saveColor", "#ffda40");
            commit("saveairQualityPerHour", "Matig");
            break;
          case 6:
            commit("saveColor", "#ffda40");
            commit("saveairQualityPerHour", "Matig");
            break;
          case 7:
            commit("saveColor", "#FFCA01");
            commit("saveairQualityPerHour", "Onvoldoende");
            break;
          case 8:
            commit("saveColor", "#FF9601");
            commit("saveairQualityPerHour", "Onvoldoende");
            break;
          case 9:
            commit("saveColor", "#FF4901");
            commit("saveairQualityPerHour", "Zeer slecht");
            break;
          case 10:
            commit("saveColor", "#FE0A00");
            commit("saveairQualityPerHour", "Zeer slecht");
            break;
          case 11:
            commit("saveColor", "#640094");
            commit("saveairQualityPerHour", "Zeer slecht");
            break;
          default:
            commit("saveColor", "");
            commit("saveairQualityPerHour", "Test");
            break;
        }
    },

    getWeatherData({commit, state}) {
        axios.get("http://api.weatherstack.com/current", {
            params: {
                access_key: "6bad04e7584ead55a0bf6de38174600d",
                query: state.fullLocation,
                units: "m",
            },
        })
        .then(function (response) {
            commit("saveCelsius", response.data.current.temperature);
            commit("saveWindSpeed", response.data.current.wind_speed);
            commit("saveUvIndex", response.data.current.uv_index);
            commit("saveHumidity", response.data.current.humidity);

        })
         .catch(function (error) {
          console.log(error);
        });
    },
};

export default {state, mutations, actions, getters};