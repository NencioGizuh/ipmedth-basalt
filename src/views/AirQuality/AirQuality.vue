<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="mb-2">Luchtmeetnet Index</v-card-title>
        <v-card-subtitle>De luchtmeetnet LKi neemt alle concentraties
                        die mogelijk schade kunnen veroorzaken aan
                        Uw gezondheid op in het cijfer dat de 
                        luchtkwaliteit bepaalt 
        </v-card-subtitle>
        <v-row no-gutters>
          <v-col class="mb-2">
            <v-card flat>
                  <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          Laag, 0-3
        </v-list-item-title>
        <v-list-item-subtitle>De lucht is schoon</v-list-item-subtitle>
      </v-list-item-content>

             <v-progress-circular color="green" :value="100" :size="85"> 
              <div class="text">1</div>
              </v-progress-circular>
    </v-list-item>
            </v-card>
          </v-col>

                    <v-col class="mb-2">
            <v-card flat>
                  <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          Matig, 4-7
        </v-list-item-title>
        <v-list-item-subtitle>De lucht is niet heel schoon</v-list-item-subtitle>
      </v-list-item-content>

             <v-progress-circular color="#FEF995" :value="100" :size="85"> 
              <div class="text">5</div>
              </v-progress-circular>
    </v-list-item>
            </v-card>
          </v-col>
            <v-col class="mb-5">
            <v-card flat>
                  <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          Slecht, 8-11
        </v-list-item-title>
        <v-list-item-subtitle>De lucht is heel vuil</v-list-item-subtitle>
      </v-list-item-content>

             <v-progress-circular color="#ED462F" :value="100" :size="85"> 
              <div class="text">9</div>
              </v-progress-circular>
    </v-list-item>
            </v-card>
          </v-col>
        </v-row>

        
      </v-card>
    </v-dialog>
    <v-card class="mb-2">
      <v-list-item three-line>
        <v-list-item-content class="mb-n4">
          <v-card-title class="overline mt-n3 mb-n9"
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
        <v-progress-circular @click="dialog = true" :color="colorStroke" :value="100" :size="75"> 
            <div class="text">{{ currentConcentration }}</div>
        </v-progress-circular>
      </v-list-item>
      <div class="text-center">
        <v-btn-toggle
          color="blue darken-2"
          group
          v-model="concentrationChange"
        >
          <v-btn class="pr-5 pl-5" value="lki"> LKI </v-btn>
          <v-btn class="pr-5 pl-5" value="no2"> NO2 </v-btn>
          <v-btn class="pr-5 pl-5" value="pm10"> PM10 </v-btn>
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
        dialog: false,
        concentrationChange: "lki",
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
          this.color = "#ffda40";
          this.airQualityPerHour = "Matig";
          break;
        case 5:
          this.color = "#ffda40";
          this.airQualityPerHour = "Matig";
          break;
        case 6:
          this.color = "#ffda40";
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
                        longitude: this.$store.state.airquality.longitude,
                        latitude: this.$store.state.airquality.latitude,
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
        locationUser() {
            return this.$store.state.airquality.locationUser;
        },
        currentAirquality() {
            return this.$store.state.airquality.currentAirquality;
        },
        currentDate() {
            return this.$store.state.airquality.currentDate;
        },
        colorStroke() {
            return this.$store.state.airquality.colorStroke;
        },
        currentConcentration() {
            return this.$store.state.airquality.currentConcentration;
        },
        celsius() {
          return this.$store.state.airquality.celsius;
        },
        windSpeed() {
          return this.$store.state.airquality.windSpeed;
        },
        uvIndex() {
          return this.$store.state.airquality.uvIndex;
        },
        humidity() {
          return this.$store.state.airquality.humidity;
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
        this.$store.dispatch("getWeatherData");
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
  .text {
      color:black;
  }
</style>