<template>
  <div>
    <v-card v-if="initalized" class="mb-2" @click="overviewConcentration" elevation="2">
        <v-list-item three-line>
            <v-list-item-content>
                <v-card-title class="overline caption mt-n3 mb-n9">{{ location }}<v-icon color="black" class="ml-1">mdi-crosshairs-gps</v-icon></v-card-title>
                <v-card-title class="headline font-weight-bold">{{ currentAirquality }}</v-card-title>
                <v-card-subtitle>{{ currentDate }}, lokale tijd</v-card-subtitle>
            </v-list-item-content>
        <v-progress-circular :color="colorStroke" :value="100" :size="75">{{ currentConcentration }}</v-progress-circular>
        </v-list-item>
      <bar :styles="myStyles" v-if="loaded" :chartdata="chartdata" :options="options"></bar>
    </v-card>
    <v-skeleton-loader v-else width="382" height="221" type="list-item-three-line, card-avatar"></v-skeleton-loader>
  </div>
</template>

<script>
import moment from "moment";
import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;
import axios from "axios";
import AirqualityBar from "./AirqualityBar.vue";
export default {
  name: "Dashboard",
  data() {
    return {
      initalized: false,
      loaded: false,
      chartdata: {
        labels: [],
        datasets: [{
            minBarLength: 2,
            backgroundColor: [],
            data: []
        }],
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
                beginAtZero: true
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
                    'minute': 'HH:mm',
                },
              },
              ticks: { 
                  source: 'data',
              }
            },
          ],
        },
      },
      color: "",
      airQualityPerHour: "",
      height: 100
    };
  },
  components: {
    'bar': AirqualityBar,
  },
  methods: {
    overviewConcentration() {
        const path = '/dashboard/' + `${this.location}` + '/airquality';
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
    onSucces(pos) {
      console.log(pos);
      this.$store.state.latitude = pos.coords.latitude;
      this.$store.state.longitude = pos.coords.longitude;
    },
    onError(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },
  },
  computed: {
     myStyles () {
      return {
        height: `${this.height}px`,
        position: 'relative'
      }
    },
    location() {
        return this.$store.state.location;
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
    }

  },
  async created() {
    this.$store.dispatch("setDefaultAppbar");
    this.$store.state.currentDate = moment().format("MMM DD HH:mm");
    var vm = this;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      Geolocation.getCurrentPosition()
        .then(function (response) {
          console.log(response);
          vm.$store.state.longitude = response.coords.longitude;
          vm.$store.state.latitude = response.coords.latitude;
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(
          this.onSucces,
          this.onError
        );
      } else {
        console.log("hallo mijn naam is Hans");
      }
    }
    setTimeout(() => {
      axios
        .get("http://www.mapquestapi.com/geocoding/v1/reverse", {
          params: {
            key: "SGTAMDyeoX9iqBrAGn8KVEuKHAIvC2HK",
            location: this.$store.state.latitude + "," + this.$store.state.longitude,
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
              vm.$store.state.location = location.street;
              vm.$store.state.fullLocation = location.street + ", " + location.adminArea5;
              console.log(vm.$store.state.location);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get("https://api.luchtmeetnet.nl/open_api/concentrations", {
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
            if(moment(currentTime).isSame(moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm"))) {
                vm.colorScheme(element.value);
                vm.$store.state.colorStroke = vm.color;
                vm.$store.state.currentAirquality = vm.airQualityPerHour;
                vm.$store.state.currentConcentration = Math.round(element.value);
                vm.chartdata.labels.push(moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm"));
                vm.chartdata.datasets[0].backgroundColor.push(vm.color);
                vm.chartdata.datasets[0].data.push(element.value);
            }
            else {
                vm.colorScheme(element.value);
                vm.chartdata.labels.push(moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm"));
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
    }, 5000);
  },
};
</script>

<style>

</style>