<template>
  <div>
      BreathingExercisesList
  </div>
</template>

<script>
export default {
    name: "BreathingExercisesList",
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Ademhalingsoefeningen",
                appbarCloseRoute: "/breathingexercise",
            });
        });
    },
}
</script>

<style lang="scss">

</style>