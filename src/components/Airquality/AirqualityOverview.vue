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
  </div>
</template>

<script>
import moment from "moment";
import AirqualityBar from "./AirqualityBar.vue";
export default {
  data() {
    return {
      laden: false,
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
            this.$store.dispatch("getGeolocationMobile")
            //this.getGeolocationMobile()
            .then(function (response) {
                console.log(response);
                //vm.reverseGeocoding();
                vm.$store.dispatch("reverseGeocoding");
                //vm.airConcentrations();
                vm.$store.dispatch("airConcentrations");
            })
            .catch(function (error) {
                console.error(error);
            })
        }
        else {
            this.$store.dispatch("getGeolocationDesktop")
            //this.getGeolocationDesktop()
            .then(function (response) {
                console.log(response);
                //vm.reverseGeocoding();
                vm.$store.dispatch("reverseGeocoding");
                //vm.airConcentrations();
                vm.$store.dispatch("airConcentrations");
            })
            .catch(function (error) {
                console.error(error);
            })
        }
    },
    overviewConcentration() {
      var vm = this;
      const path = "/dashboard/" + `${vm.$store.state.locationUser}` + "/airquality";
      this.$router.push(path);
    },
},
  computed: {
    locationUser() {
      return this.$store.state.airquality.locationUser;
    },
    loaded() {
      return this.$store.state.airquality.loaded;
    },
    initalized() {
      return this.$store.state.airquality.initalized;
    },
    colorStroke() {
      return this.$store.state.airquality.colorStroke;
    },
    currentConcentration() {
      return this.$store.state.airquality.currentConcentration;
    },
    currentAirquality() {
      return this.$store.state.airquality.currentAirquality;
    },
    currentDate() {
      return this.$store.state.airquality.currentDate;
    },
    airQualityPerHour() {
      return this.$store.state.airquality.airQualityPerHour;
    },
    chartdata() {
      return this.$store.state.airquality.chartdata;
    },
    myStyles() {
      return {
        height: `${this.height}px`,
        position: "relative",
      };
    }
  },
  created() {
    console.log(this.$store.state.airquality);
    this.$store.state.airquality.currentDate = moment().format("MMM DD HH:mm");
    this.initalizeComponent();
  },
}
</script>

<style>
  .text {
      color:black;
  }
</style>