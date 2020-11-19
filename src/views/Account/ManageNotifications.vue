<template>
  <div>
      ManageNotifications
  </div>
</template>

<script>
export default {
    name: "ManageNotifications",
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Meldingen beheren",
                appbarCloseRoute: "/account",
            });
        });
    },
}
</script>

<style lang="scss">

</style>