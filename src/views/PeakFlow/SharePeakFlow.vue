<template>
  <div>
      SharePeakFlow
      {{ $route.params.peak_flow_id }}
  </div>
</template>

<script>
export default {
    name: "SharePeakFlow",
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Peak flow meting delen",
                appbarCloseRoute: "/peakflow",
            });
        });
    },
}
</script>

<style lang="scss">

</style>