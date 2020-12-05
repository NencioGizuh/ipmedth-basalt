<template>
  <div>
    <v-card class="mb-2">
      <v-list-item three-line>
        <v-list-item-content class="mb-n4">
          <v-card-title class="overline mt-n3 mb-n9"
            >{{ location
            }}<v-icon color="black" class="ml-1"
              >mdi-crosshairs-gps</v-icon
            ></v-card-title
          >
          <v-card-title class="headline font-weight-bold">{{
            currentAirquality
          }}</v-card-title>
          <v-card-subtitle>{{ currentDate }}, lokale tijd</v-card-subtitle>
        </v-list-item-content>
        <v-progress-circular @click="airQualityIndex" :color="colorStroke" :value="100" :size="75">{{ currentConcentration }}</v-progress-circular>
      </v-list-item>
      <div class="text-center">
        <v-btn-toggle
          color="deep-purple accent-3"
          group
          v-model="concentrationChange"
        >
          <v-btn value="lki"> LKI </v-btn>
          <v-btn value="no2"> NO2 </v-btn>
          <v-btn value="pm10"> PM10 </v-btn>
          <v-btn value="o3"> O3 </v-btn>
        </v-btn-toggle>
      </div>
      <overview-bar
        :styles="myStyles"
        v-if="loaded"
        :chartdata="chartdata"
        :labels="labels"
        :backgroundColor="backgroundColor"
      ></overview-bar>
      <hr />
      <v-card-title>Weer</v-card-title>
      <v-card-subtitle>Huidige temperatuur</v-card-subtitle>
      <v-row class="mt-n5" :align="align">
          <v-col class="mr-n2">
          <v-card-text>
          <v-icon x-large>mdi-cloud</v-icon>
          <v-card-subtitle>{{ celsius }}</v-card-subtitle>
          Celsius
        </v-card-text>
          </v-col>
          <v-col class="mr-n2">
          <v-card-text>
          <v-icon x-large>mdi-weather-windy</v-icon>
          <v-card-subtitle>{{ windSpeed }}</v-card-subtitle>
          km/h
        </v-card-text>
          </v-col>
          <v-col class="mr-n2">
          <v-card-text>
          <v-icon x-large>mdi-weather-sunny</v-icon>
          <v-card-subtitle>{{ uvIndex }}</v-card-subtitle>
          <div class="text-center">UV</div>
        </v-card-text>
          </v-col>
           <v-col class="mr-n2">
           <v-card-text>
          <v-icon x-large>mdi-water</v-icon>
          <v-card-subtitle>{{ humidity }}%</v-card-subtitle>
          <div class="text-center">Vochtigheid</div>
        </v-card-text>
          </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import OverviewBar from '../../components/Airquality/OverviewBar.vue';
import moment from "moment";
export default {
    name: "AirQuality",
    data() {
        return {
        concentrations: {
            lki: {
                name: 'lki',
                written: false,
                labels: [],
                backgroundColor: [],
                data: []
            },
            no2: {
                name: 'no2',
                written: false,
                labels: [],
                backgroundColor: [],
                data: []
            },
            pm10: {
                name: 'pm10',
                written: false,
                labels: [],
                backgroundColor: [],
                data: []
            },
            o3: {
                name: 'o3',
                written: false,
                labels: [],
                backgroundColor: [],
                data: []
            }
        },
        loaded: false,
        concentrationChange: "lki",
        celsius: 0,
        windSpeed: 0,
        uvIndex: 0,
        humidity: 0,
        color: "",
        airQualityPerHour: "",
        height: 200,
        chartdata: [],
        labels: [],
        backgroundColor: [],
      }
    },
    components: {
        OverviewBar
    },
    methods: {
    airQualityIndex() {
        this.$router.push("/dashboard/airquality/index");
    },
    //Deze functie zorgt voor het individueel kleuren geven van data in de barchart per concentratie
    decideConcentration(concentrationName, concentrationValue) {
        switch(concentrationName) {
            case "LKI": 
                this.colorSchemeLKI(concentrationValue);
                break;
            case "NO2":
                this.colorSchemeNO2(concentrationValue);
                break;
            case "PM10":
                this.colorSchemePM10(concentrationValue);
                break;
            case "O3":
                this.colorSchemeO3(concentrationValue);
                break;
        }
    },
    colorSchemeO3(colorValue) {
        this.color = "";
        if(colorValue >= 0 && colorValue <= 15) {
          this.color = "#16B729";
        }
        else if(colorValue >= 15 && colorValue <= 30) {
          this.color = "#16B729";
        }
        else if(colorValue >= 30 && colorValue <= 40) {
          this.color = "#16B729";
        }
        else if(colorValue >= 40 && colorValue <= 60) {
          this.color = "#F8AC00";
        }
        else if(colorValue >= 60 && colorValue <= 80) {
           this.color = "#F8AC00";
        }
        else if(colorValue >= 80 && colorValue <= 100) {
          this.color = "#F8AC00";
        }
        else if(colorValue >= 100 && colorValue <= 140) {
          this.color = "#F8AC00";
        }
        else if(colorValue >= 140 && colorValue <= 180) {
          this.color = "#F8AC00";
        }
        else if(colorValue >= 180 && colorValue <= 200) {
          this.color = "#663196";
        }
        else if(colorValue >= 200 && colorValue <= 240) {
          this.color = "#663196";
        }
        else {
          this.color = "#663196";
        }
    },
    colorSchemePM10(colorValue) {
       this.color = "";
        if(colorValue >= 0 && colorValue <= 10) {
          this.color = "#16B729";
        }
        else if(colorValue >= 10 && colorValue <= 20) {
          this.color = "#16B729";
        }
        else if(colorValue >= 20 && colorValue <= 30) {
          this.color = "#16B729";
        }
        else if(colorValue >= 30 && colorValue <= 45) {
          this.color = "#F8AC00";
        }
        else if(colorValue >= 45 && colorValue <= 60) {
           this.color = "#F8AC00";
        }
        else if(colorValue >= 60 && colorValue <= 75) {
          this.color = "#F8AC00";
        }
        else if(colorValue >= 75 && colorValue <= 100) {
          this.color = "#F8AC00";
        }
        else if(colorValue >= 100 && colorValue <= 125) {
          this.color = "#F8AC00";
        }
        else if(colorValue >= 125 && colorValue <= 150) {
          this.color = "#663196";
        }
        else if(colorValue >= 150 && colorValue <= 200) {
          this.color = "#663196";
        }
        else {
          this.color = "#663196";
        }
    },
    colorSchemeNO2(colorValue) {
        this.color = "";
        if(colorValue >= 0 && colorValue <= 10) {
          this.color = "#16B729";
        }
        else if(colorValue >= 10 && colorValue <= 20) {
          this.color = "#16B729";
        }
        else if(colorValue >= 20 && colorValue <= 30) {
          this.color = "#16B729";
        }
        else if(colorValue >= 30 && colorValue <= 45) {
          this.color = "#F8AC00";
        }
        else if(colorValue >= 45 && colorValue <= 60) {
           this.color = "#F8AC00";
        }
        else if(colorValue >= 60 && colorValue <= 75) {
          this.color = "#F8AC00";
        }
        else if(colorValue >= 75 && colorValue <= 100) {
          this.color = "#F8AC00";
        }
        else if(colorValue >= 100 && colorValue <= 125) {
          this.color = "#F8AC00";
        }
        else if(colorValue >= 125 && colorValue <= 150) {
          this.color = "#663196";
        }
        else if(colorValue >= 150 && colorValue <= 200) {
          this.color = "#663196";
        }
        else {
          this.color = "#663196";
        }
    },
    colorSchemeLKI(colorValue) {
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
        getConcentration() {
        var vm = this
        //Als de data al geschreven is naar objecten dan pak je daar de data uit anders doe je een API request
        //Hiermee kun je dynamisch de barchart datasets veranderen
        if(vm.concentrations[vm.concentrationChange].written === true) {
            vm.labels = vm.concentrations[vm.concentrationChange].labels
            vm.backgroundColor = vm.concentrations[vm.concentrationChange].backgroundColor
            vm.chartdata = vm.concentrations[vm.concentrationChange].data
        }
        else {
        console.log("Data is not found, retrieving from the API");
        axios.get("https://api.luchtmeetnet.nl/open_api/concentrations", {
                    params: {
                        formula: this.concentrationChange,
                        longitude: this.$store.state.longitude,
                        latitude: this.$store.state.latitude,
                    },
                }).then( function (response) {
                    console.log(response);
                    vm.labels = [];
                    vm.backgroundColor = [];
                    vm.data = [];
                    const localLabels = [];
                    const localColors = [];
                    const localData = [];
                    for (let index = 0; index < response.data.data.length; index++) {
                    const element = response.data.data[index];
                    const concentrationFormula = element.formula;
                    switch(concentrationFormula) {
                        case 'LKI':
                            vm.decideConcentration(element.formula, element.value);
                            vm.concentrations.lki.labels.push(moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm"));
                            vm.concentrations.lki.backgroundColor.push(vm.color);
                            vm.concentrations.lki.data.push(element.value);
                            vm.concentrations.lki.written = true;
                            break;
                        case 'NO2':
                            vm.decideConcentration(element.formula, element.value);
                            vm.concentrations.no2.labels.push(moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm"));
                            vm.concentrations.no2.backgroundColor.push(vm.color);
                            vm.concentrations.no2.data.push(element.value);
                            vm.concentrations.no2.written = true;
                            break;
                        case 'PM10':
                            vm.decideConcentration(element.formula, element.value);
                            vm.concentrations.pm10.labels.push(moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm"));
                            vm.concentrations.pm10.backgroundColor.push(vm.color);
                            vm.concentrations.pm10.data.push(element.value);
                            vm.concentrations.pm10.written = true;
                            break;
                        case 'O3':
                            vm.decideConcentration(element.formula, element.value);
                            vm.concentrations.o3.labels.push(moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm"));
                            vm.concentrations.o3.backgroundColor.push(vm.color);
                            vm.concentrations.o3.data.push(element.value);
                            vm.concentrations.o3.written = true;
                            break;
                    }
                    vm.decideConcentration(element.formula, element.value);
                    localLabels.push(moment(element.timestamp_measured).format("YYYY-MM-DD HH:mm"));
                    localColors.push(vm.color);
                    localData.push(element.value);
          }
                    vm.labels = localLabels;
                    vm.backgroundColor = localColors
                    vm.chartdata = localData
                    vm.loaded = true;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
      }
    },
    computed: {
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
        },
        myStyles () {
        return {
            height: `${this.height}px`,
            position: 'relative'
        }
        },
    },
    watch: {
        concentrationChange: function() {
            this.getConcentration();
        },
    },
    created() {
        var vm = this;
        console.log(vm.concentrations[vm.concentrationChange]);
        axios.get("http://api.weatherstack.com/current", {
            params: {
                access_key: "6bad04e7584ead55a0bf6de38174600d",
                query: this.$store.state.fullLocation,
                units: "m",
            },
        })
        .then(function (response) {
            console.log(response.data.current);
            vm.celsius = response.data.current.temperature;
            vm.windSpeed = response.data.current.wind_speed;
            vm.uvIndex = response.data.current.uv_index;
            vm.humidity = response.data.current.humidity;

        })
         .catch(function (error) {
          console.log(error);
        });
        vm.getConcentration(); 
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Luchtkwaliteit",
                appbarCloseRoute: "/dashboard",
            });
        });
    },
}
</script>

<style lang="scss">
</style>