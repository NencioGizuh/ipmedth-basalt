<template>
  <v-card elevation="24" max-width="444" class="mx-auto">
    <v-carousel :continuous="false" :cycle="cycle" :show-arrows="true"  delimiter-icon="mdi-numeric-1" >
      <h3 align="center" class="medicijn_name" font-weight="500">{{ this.medicijnen[medicijnen.length - 1].title }}</h3>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet color="blue-grey lighten-5" height="100%" >
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">
              <v-img src="@/assets/medicatie/medicatie_luchtverwijderaar_1.png"></v-img>
            </div>
            <div class="display_55">
              <h6> {{ slide }} </h6>
              
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel> 
  </v-card>
</template>

<script>
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
          "@/assets/medicatie/medicatie_luchtverwijderaar_1.png",
        ]
    };
  },
  methods:{
    changeIcon(){ 
      var ind = 0;
      for (ind = 0; ind < this.slides.length; ind++) {
        document.getElementsByClassName("v-icon notranslate mdi mdi-numeric-1 theme--dark")[0].className = "v-icon notranslate mdi mdi-numeric-"+ind +" theme--dark";
      }
    }
  },
  computed: {
    medicijnen(){
        return this.$store.getters.medicijnen_tijden;
    },
  },
    mounted() {
    document.onreadystatechange = () => {    
      if (document.readyState == "complete") {  
          this.changeIcon();
      } 
    }
  },
};
</script>

<style lang="scss">
.v-btn--outlined .v-btn__content .v-icon, .v-btn--round .v-btn__content .v-icon {
    color: black;
}
.display_55{
  font-size: 18px;
  color: black;
  line-height: 20px;
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