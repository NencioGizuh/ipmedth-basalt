<template>
  <div>
      CpMeasurement
  </div>
</template>

<script>
export default {
    name: "CpMeasurement",
    data() {
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

<style lang="scss">

</style>