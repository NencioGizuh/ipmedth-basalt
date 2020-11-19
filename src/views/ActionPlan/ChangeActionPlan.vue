<template>
  <div>
      ChangeActionPlan
  </div>
</template>

<script>
export default {
    name: "ChangeActionPlan",
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Actieplan aanpassen",
                appbarCloseRoute: "/actionplan",
            });
        });
    },
}
</script>

<style lang="scss">

</style>