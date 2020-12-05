<template>
  <div class="center cp__message">
      <h2 class="cp_message--title ">Welke CP meting is dit?</h2>
      <v-btn class="cp__message--button" to="/breathingexercise/cpmeasurement/CP1">
          1e Meting
      </v-btn>
      <v-btn class="cp__message--button" to="/breathingexercise/cpmeasurement/CP2">
          2e Meting
      </v-btn>
  </div>
</template>

<script>
export default {
    name: "CpMeasurement",
    data: () =>  {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "CP Meten",
                appbarCloseRoute: "/breathingexercise/cpstatistics",
            });
        });
    },
}
</script>

<style lang="scss" scoped>
.center{
  text-align: center;
}

.cp {

  &__message {
    margin: 100px 0 0 0;

    &--button {
      margin: 45px 10px;
    }
  }

}
</style>