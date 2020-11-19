<template>
  <div>
      AddPeakFlow
  </div>
</template>

<script>
export default {
    name: "AddPeakFlow",
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Peak flow meting toevoegen",
                appbarCloseRoute: "/peakflow",
            });
        });
    }, 
}
</script>

<style lang="scss">

</style>