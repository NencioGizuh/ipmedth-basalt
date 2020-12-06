<template>
  <div>
    <v-btn class="excercise_button" outlined block color="primary" to="/breathingexercise/list/buteyko">
      Buteyko
    </v-btn>

    <v-btn class="excercise_button" outlined block color="primary" to="/breathingexercise/list/papworth">
      Papworth
    </v-btn>

    <v-btn class="excercise_button" outlined block color="primary" to="/breathingexercise/list/interval">
      Interval
    </v-btn>

    <v-btn class="excercise_button" outlined block color="primary" to="/breathingexercise/list/middenrifspier">
      Middenrifspier
    </v-btn>

    <v-btn class="excercise_button" outlined block color="primary" to="/breathingexercise/list/wimhof">
      Wim Hof
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "BreathingExercisesList",
  data() {
    return {  
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "Ademhalingsoefeningen",
        appbarCloseRoute: "/breathingexercise",
      });
    });
  },
};
</script>

<style lang="scss" scoped>

.excercise_button {
  margin-bottom: 20px;
}
</style>