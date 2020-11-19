<template>
    <div>
        <v-btn outlined block color="primary" to="/medication/add">
            <v-icon left>mdi-plus</v-icon>
            Medicatie innemen
        </v-btn>
        MedicationOverview
    </div>
</template>

<script>
export default {
    name: "MedicationOverview",
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