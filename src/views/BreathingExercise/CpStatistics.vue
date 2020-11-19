<template>
    <div>
        <v-btn outlined block color="primary" to="/breathingexercise/cpmeasurement">
            CP Meten
        </v-btn>
        CpStatistics
    </div>
</template>

<script>
export default {
    name: "CpStatistics",
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "CP Metingen",
                appbarCloseRoute: "/breathingexercise",
            });
        });
    },
}
</script>

<style lang="scss">

</style>