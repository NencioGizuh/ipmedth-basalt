<template>
  <div>
      ManageTriggers
  </div>
</template>

<script>
export default {
    name: "ManageTriggers",
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Triggers beheren",
                appbarCloseRoute: "/account",
            });
        });
    },
}
</script>

<style lang="scss">

</style>