<template>
    <div>
        <v-btn outlined block color="primary" to="/breathingexercise/cpstatistics">
            CP Metingen statistieken
        </v-btn>
        <v-btn outlined block color="primary" to="/breathingexercise/list">
            Oefeningen
        </v-btn>
        BreathingExerciseOverview
    </div>
</template>

<script>
export default {
    name: "BreathingExerciseOverview",
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