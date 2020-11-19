<template>
  <div>
      AddMedication
  </div>
</template>

<script>
export default {
    name: "AddMedication",
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Medicatie registeren",
                appbarCloseRoute: "/medication",
            });
        });
    }, 
}
</script>

<style lang="scss">

</style>