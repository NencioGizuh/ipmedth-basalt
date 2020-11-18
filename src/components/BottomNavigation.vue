<template>
  <v-bottom-navigation app shift>
        <v-btn color="primary" text min-width="20%" to="/dashboard">
            <span class="nav-span">Dashboard</span>
            <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>

        <v-btn color="primary" text min-width="20%" to="/peakflow">
            <span class="nav-span">Peak flow</span>
            <v-icon>mdi-chart-line</v-icon>
        </v-btn>

        <v-btn color="primary" text min-width="20%" to="/actionplan">
            <span class="nav-span">Actieplan</span>
            <v-icon>mdi-checkbox-marked-outline</v-icon>
        </v-btn>

        <v-btn color="primary" text min-width="20%" to="/medication">
            <span class="nav-span">Medicijnen</span>
            <v-icon>mdi-pill</v-icon>
        </v-btn>

        <v-btn color="primary" text min-width="20%" to="/breathingexercise">
            <span class="nav-span">Oefeningen</span>
            <v-icon>mdi-lungs</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    name: "BottomNavigation",
}
</script>

<style lang="scss" scoped>
    .nav-span {
        font-size: 9px;
        margin-top: 5px;
    }
</style>