<template>
  <div>
    <v-card
      v-if="initalized"
      class="mb-2"
      @click="overviewConcentration"
      elevation="2"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-card-title class="overline caption mt-n3 mb-n9"
            >{{ locationUser
            }}<v-icon color="black" class="ml-1"
              >mdi-crosshairs-gps</v-icon
            ></v-card-title
          >
          <v-card-title class="headline font-weight-bold">{{
            currentAirquality
          }}</v-card-title>
          <v-card-subtitle>{{ currentDate }}, lokale tijd</v-card-subtitle>
        </v-list-item-content>
        <v-progress-circular :color="colorStroke" :value="100" :size="75">
            <div class="text">{{
          currentConcentration
        }}</div>
        </v-progress-circular>
      </v-list-item>
      <bar
        :styles="myStyles"
        v-if="loaded"
        :chartdata="chartdata"
        :options="options"
      ></bar>
    </v-card>
    <v-skeleton-loader
      v-else
      width="382"
      height="221"
      type="list-item-three-line, card-avatar"
    ></v-skeleton-loader>
    <v-container><v-btn fab small :style="{left: '50%', transform:'translateX(-50%)'}"><v-icon>mdi-plus</v-icon></v-btn></v-container>
  </div>
</template>

<script>
import moment from "moment";
import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;
import axios from "axios";
import AirqualityBar from "./AirqualityBar.vue";
export default {
  data() {
    return {
      initalized: false,
      loaded: false,
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
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            },
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              display: false, //this will remove all the x-axis grid lines
            },
          ],
          xAxes: [
            {
              categoryPercentage: 1.2,
              barPercentage: 0.4,
              gridLines: {
                display: false,
              },
              type: "time",
              time: {
                unit: "minute",
                displayFormats: {
                  minute: "HH:mm",
                },
              },
              ticks: {
                source: "data",
              },
            },
          ],
        },
      },
      color: "",
      airQualityPerHour: "",
      height: 100,
    };
  },
  components: {
    bar: AirqualityBar,
  },
  methods: {
    initalizeComponent() {
        this.checkDevice();
    },
    checkDevice() {
        var vm = this;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.getGeolocationMobile()
            .then(function (response) {
                console.log(response);
                vm.reverseGeocoding();
                vm.airConcentrations();
            })
            .catch(function (error) {
                console.error(error);
            })
        }
        else {
            this.getGeolocationDesktop()
            .then(function (response) {
                console.log(response);
                vm.reverseGeocoding();
                vm.airConcentrations();
            })
            .catch(function (error) {
                console.error(error);
            })
        }
    },
    getGeolocationMobile() {
        var vm = this;
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition()
                .then(function (response) {
                resolve(response);
                console.log(response);
                vm.$store.state.longitude = response.coords.longitude;
                vm.$store.state.latitude = response.coords.latitude;
            })
            .catch(function (error) {
                reject(error);
                console.log(error);
            });
        })
    },
    getGeolocationDesktop() {
        return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            resolve(position);
            this.$store.state.latitude = position.coords.latitude;
            this.$store.state.longitude = position.coords.longitude;
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
    reverseGeocoding() {
        var vm = this;
          axios.get("http://www.mapquestapi.com/geocoding/v1/reverse", {
          params: {
            key: "SGTAMDyeoX9iqBrAGn8KVEuKHAIvC2HK",
            location:
              this.$store.state.latitude + "," + this.$store.state.longitude,
          },
        })
        .then(function (response) {
          console.log(response);
          console.log(response.data.results);
          for (let index = 0; index < response.data.results.length; index++) {
            const element = response.data.results[index];
            for (let index = 0; index < element.locations.length; index++) {
              const location = element.locations[index];
              console.log(location);
              vm.$store.state.locationUser = location.street;
              vm.$store.state.fullLocation =
                location.street + ", " + location.adminArea5;
              console.log(vm.$store.state.locationUser);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    airConcentrations() {
        var vm = this;
        axios.get("https://api.luchtmeetnet.nl/open_api/concentrations", {
          params: {
            formula: "LKI",
            longitude: this.$store.state.longitude,
            latitude: this.$store.state.latitude,
          },
        })
        .then(function (response) {
          console.log(response.data.data);
          for (let index = 0; index < response.data.data.length; index++) {
            const element = response.data.data[index];
            const currentTime = moment().format("YYYY-MMM-DD HH:00");
            if (
              moment(currentTime).isSame(
                moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm")
              )
            ) {
              vm.colorScheme(element.value);
              vm.$store.state.colorStroke = vm.color;
              vm.$store.state.currentAirquality = vm.airQualityPerHour;
              vm.$store.state.currentConcentration = Math.round(element.value);
              vm.chartdata.labels.push(
                moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm")
              );
              vm.chartdata.datasets[0].backgroundColor.push(vm.color);
              vm.chartdata.datasets[0].data.push(element.value);
            } else {
              vm.colorScheme(element.value);
              vm.chartdata.labels.push(
                  moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm")
               );
              vm.chartdata.datasets[0].backgroundColor.push(vm.color);
              vm.chartdata.datasets[0].data.push(element.value);
            }
          }
          vm.loaded = true;
          vm.initalized = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    overviewConcentration() {
      var vm = this;
      const path = "/dashboard/" + `${vm.$store.state.locationUser}` + "/airquality";
      this.$router.push(path);
    },
    colorScheme(colorValue) {
      this.color = "";
      const round = Math.round(colorValue);
      console.log(round);
      switch (round) {
        case 1:
          this.color = "#16B729";
          this.airQualityPerHour = "Goed";
          break;
        case 2:
          this.color = "#19d12f";
          this.airQualityPerHour = "Goed";
          break;
        case 3:
          this.color = "#1bf234";
          this.airQualityPerHour = "Goed";
          break;
        case 4:
          this.color = "#FFFECE";
          this.airQualityPerHour = "Matig";
          break;
        case 5:
          this.color = "#FFFF95";
          this.airQualityPerHour = "Matig";
          break;
        case 6:
          this.color = "#FEFF00";
          this.airQualityPerHour = "Matig";
          break;
        case 7:
          this.color = "#FFCA01";
          this.airQualityPerHour = "Onvoldoende";
          break;
        case 8:
          this.color = "#FF9601";
          this.airQualityPerHour = "Onvoldoende";
          break;
        case 9:
          this.color = "#FF4901";
          this.airQualityPerHour = "Zeer slecht";
          break;
        case 10:
          this.color = "#FE0A00";
          this.airQualityPerHour = "Zeer slecht";
          break;
        case 11:
          this.color = "#640094";
          this.airQualityPerHour = "Zeer slecht";
          break;
        default:
          this.color = "";
          break;
      }
  },
},
  computed: {
    myStyles() {
      return {
        height: `${this.height}px`,
        position: "relative",
      };
    },
    locationUser() {
      return this.$store.state.locationUser;
    },
    currentAirquality() {
      return this.$store.state.currentAirquality;
    },
    currentDate() {
      return this.$store.state.currentDate;
    },
    colorStroke() {
      return this.$store.state.colorStroke;
    },
    currentConcentration() {
      return this.$store.state.currentConcentration;
    },
  },
  created() {
    this.$store.dispatch("setDefaultAppbar");
    this.$store.state.currentDate = moment().format("MMM DD HH:mm");
    this.initalizeComponent();
  },
}
</script>

<style>
  .text {
      color:black;
  }
</style>