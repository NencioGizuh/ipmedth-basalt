<template>
  <div>
      ChangePersonalInformation
  </div>
</template>

<script>
export default {
    name: "ChangePersonalInformation",
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Gegevens wijzigen",
                appbarCloseRoute: "/account",
            });
        });
    },
}
</script>

<style lang="scss">

</style>