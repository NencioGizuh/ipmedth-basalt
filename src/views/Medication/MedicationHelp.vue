<template>
  <v-card id="carousel_card_medicatie" elevation="24" max-width="444" class="mx-auto">
    <v-carousel :continuous="false" :cycle="cycle" :show-arrows="true"  delimiter-icon="mdi-numeric-0" >
      <h3 align="center" class="medicijn_name" font-weight="500">{{ this.medicijnen[medicijnen.length - 1].title }}</h3>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet color="blue-grey lighten-5" height="100%" >
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">
              <img :src="images[i]" />
            </div>
            <div class="hulp_displaytext_medicatie">
              <h5 > {{ slide }}  </h5>

              <!-- Laat alleen zien wanneer count true is, wat gebeurd als de carousel page op 5 staat. -->
              <h1 align="center" justify="center" v-show="count" > <br/><br/>{{ countDown }} </h1>
              
              <!-- Laat alleen zien wanneer medicatieOpgeslagen true is, wat gebeurd als de carousel page op 7 staat. -->
              
              <v-container v-show="medicatieOpgeslagen" class="grey lighten-5 mb-6 mt-5" justify="center" align="center">
                <h4 align="center" class="mb-5">Ik neem nog een puf</h4>
                <v-row align="center" no-gutters style="">
                  <v-col>
                    <v-card to="/medication" style="background-color:#EF7D00;" class="pa-2 ma-1" align="center" outlined tile> Klaar </v-card>
                  </v-col>
                  <v-col>
                    <v-card to="/medication" class="pa-2 ma-1 primary" :disabled="true" align="center" outlined tile >Logboek</v-card>
                  </v-col>
                </v-row>
              </v-container>


            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel> 
  </v-card>
</template>

<script>

import image1 from "@/assets/medicatie_hulp/medicatie_luchtverwijderaar_1.png"
import image2 from "@/assets/medicatie_hulp/medicatie_luchtverwijderaar_2.png"
import image3 from "@/assets/medicatie_hulp/medicatie_luchtverwijderaar_3.png"
import image4 from "@/assets/medicatie_hulp/medicatie_luchtverwijderaar_4.png"
import image5 from "@/assets/medicatie_hulp/medicatie_luchtverwijderaar_5.png"

export default {
  data() {
    return {
      countDown : 10,
      counter_fullTime : 1000,
      count: false,
      medicatieOpgeslagen: false,
      cycle: false,
      slides: [
        "Zorg dat uw mond leeg is", 
        "Houd de Autohaler® rechtop met de hefboom aan de bovenkant. Haal de beschermdop van het mondstuk door het lipje aan de achterkant naar beneden te duwen.", 
        "Schud de Autohaler®, houd de Autohaler® rechtop en duw de hefboom omhoog. Zorg dat de luchtspleten aan de onderkant vrij blijven. ", 
        "Ga rechtop zitten of staan, houd uw hoofd iets achterover. Adem uit. Doe dit langzaam en volledig. Adem niet uit in de Autohaler®.",  
        "Adem nu met een gelijkmatige teug in, Zo diep als u kunt. ",
        "Houd uw adem 10 seconden vast of zo lang als u kunt."   ,  
        "Duw de hefboom weer omlaag en zet de beschermdop terug.",
        ],
      images: [
        image1,
        image1,
        image2,
        image3,
        image4,
        image5,
        image5,
        image5,
        image5,
      ]
    };
  },
  methods:{
    changeIcon(){ 
      for (var ind = 0; ind < this.slides.length; ind++) {
        var elem_icon = parseInt(document.getElementsByClassName("v-icon notranslate mdi mdi-numeric-0 theme--dark")[0].parentElement.parentElement.value);
        document.getElementsByClassName("v-icon notranslate mdi mdi-numeric-0 theme--dark")[0].className = "v-icon notranslate mdi mdi-numeric-"+(elem_icon+1) +" theme--dark";
      }
    },
    setCounter(){

    },
    countDownTimer() {
      var page_value = document.getElementsByClassName("v-item--active")[0].value;
      if (page_value == (7 - 1)){
        this.medicatieOpgeslagen = true;
      } else {
        this.medicatieOpgeslagen = false;
      }
      if (page_value == (6 - 1)){
        this.count = true;
        if(this.countDown > 0){
          this.countDown -= 1;
        }
      } else {
        this.count = false;
        this.countDown = 10;
      }
      if(this.counter_fullTime > 0) {
        setTimeout(() => {
          this.countDownTimer()
          this.counter_fullTime -= 1;
        }, 1000)
      }
    },

  },
  computed: {
    medicijnen(){
        return this.$store.getters.medicijnen_tijden;
    },
  },
    mounted() { 
      this.$nextTick(() => this.changeIcon());

      this.$nextTick(() => this.countDownTimer());
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
        vm.$store.dispatch('setAppbarDetails', {
            appbarText: "Medicatie registeren",
            appbarCloseRoute: "/medication",
        });
    });
  }
};
</script>

<style lang="scss" scoped>

#carousel_card_medicatie .v-btn--outlined .v-btn__content .v-icon, .v-btn--round .v-btn__content .v-icon {
    color: black;
}
.hulp_displaytext_medicatie{
  font-size: 18px;
  color: black;
  line-height: 24px;
  padding: 0 50px; 
  margin-top: -110px;
}
#carousel_card_medicatie .theme--dark.v-btn.v-btn--icon {
  color: #0066b1;
}
.medicijn_name{
  position: absolute;
  z-index: 1;
  margin: 0 auto;
  left: 30%;
  margin-top: 20px;
}
#carousel_card_medicatie .v-window__prev, .v-window__next, .v-carousel__controls  {
  background: rgb(138 138 138 / 30%) !important;
}
</style>