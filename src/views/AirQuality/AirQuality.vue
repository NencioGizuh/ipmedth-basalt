<template>
  <div>
      AirQuality
      {{ $route.params.name_of_city }}
  </div>
</template>

<script>
export default {
    name: "AirQuality",
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Luchtkwaliteit",
                appbarCloseRoute: "/dashboard",
            });
        });
    },
}
</script>

<style lang="scss">

</style>