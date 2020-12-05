<template>
  <v-card elevation="24" max-width="444" class="mx-auto">
    <v-carousel :continuous="false" :cycle="cycle" :show-arrows="true"  delimiter-icon="mdi-numeric-0" >
      <h3 align="center" class="medicijn_name" font-weight="500">{{ this.medicijnen[medicijnen.length - 1].title }}</h3>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet color="blue-grey lighten-5" height="100%" >
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">
              <img :src="images[i]" />
            </div>
            <div class="medicatue_hulp_display">
              <h5> {{ slide }} </h5>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel> 
  </v-card>
</template>

<script>

import image1 from "@/assets/medicatie/medicatie_luchtverwijderaar_1.png"
import image2 from "@/assets/medicatie/medicatie_luchtverwijderaar_2.png"
import image3 from "@/assets/medicatie/medicatie_luchtverwijderaar_3.png"
import image4 from "@/assets/medicatie/medicatie_luchtverwijderaar_4.png"
import image5 from "@/assets/medicatie/medicatie_luchtverwijderaar_5.png"

export default {
  data() {
    return {
      colors: [
        "blue-grey lighten-5",
      ],
      cycle: false,
      slides: [
        "Zorg dat uw mond leeg is", 
        "Houd de Autohaler® rechtop met de hefboom aan de bovenkant. Haal de beschermdop van het mondstuk door het lipje aan de achterkant naar beneden te duwen.", 
        "Schud de Autohaler®, houd de Autohaler® rechtop en duw de hefboom omhoog. Zorg dat de luchtspleten aan de onderkant vrij blijven. ", 
        "Ga rechtop zitten of staan, houd uw hoofd iets achterover. Adem uit. Doe dit langzaam en volledig. Adem niet uit in de Autohaler®.",  
        "Adem nu met een gelijkmatige teug in, Zo diep als u kunt. ",
        "Houd uw adem 10 seconden vast of zo lang als u kunt. ",  
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
    }
  },
  computed: {
    medicijnen(){
        return this.$store.getters.medicijnen_tijden;
    },
  },
    mounted() { 
      this.$nextTick(() => this.changeIcon());
  },
  destroyed(){
    this.changeIcon();
    alert("updated");
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

<style lang="scss">
.v-btn--outlined .v-btn__content .v-icon, .v-btn--round .v-btn__content .v-icon {
    color: black;
}
.medicatue_hulp_display{
  font-size: 18px;
  color: black;
  line-height: 24px;
  padding: 0 50px; 
  margin-top: -110px;
}
.theme--dark.v-btn.v-btn--icon {
  color: #0066b1;
}
.medicijn_name{
  position: absolute;
  z-index: 1;
  margin: 0 auto;
  left: 30%;
  margin-top: 20px;
}
.v-window__prev, .v-window__next, .v-carousel__controls  {
  background: rgb(138 138 138 / 30%) !important;
}
</style>