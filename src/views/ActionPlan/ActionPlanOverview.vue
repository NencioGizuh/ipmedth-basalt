<template>
    <div>
        <v-btn outlined block color="primary" to="/actionplan/change">
            <v-icon left>mdi-pencil</v-icon>
            Actieplan aanpassen
        </v-btn>
        ActionPlanOverview
    </div>
</template>

<script>
export default {
    name: "ActionPlanOverview",
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