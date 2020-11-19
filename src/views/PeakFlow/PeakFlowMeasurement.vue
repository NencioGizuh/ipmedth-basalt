<template>
  <div>
      PeakFlowMeasurement
      {{ $route.params.peak_flow_id }}
  </div>
</template>

<script>
export default {
    name: "PeakFlowMeasurement",
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Peak flow meting",
                appbarCloseRoute: "/peakflow",
            });
        });
    }, 
}
</script>

<style lang="scss">

</style>