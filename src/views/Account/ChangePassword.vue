<template>
  <div>
      ChangePassword
  </div>
</template>

<script>
export default {
    name: "ChangePassword",
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Wachtwoord wijzigen",
                appbarCloseRoute: "/account",
            });
        });
    },
}
</script>

<style lang="scss">

</style>