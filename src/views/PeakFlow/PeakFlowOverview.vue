<template>
    <div>
        <v-btn outlined block color="primary" to="/peakflow/add">
            <v-icon left>mdi-plus</v-icon>
            Nieuwe meting toevoegen
        </v-btn>

        PeakFlowOverview
    </div>
</template>

<script>
export default {
    name: "PeakFlowOverview",
    data() {
        return {
            
        }
    },
    created() {
        this.$store.dispatch('setDefaultAppbar');
    }
}
</script>

<style lang="scss">

</style>