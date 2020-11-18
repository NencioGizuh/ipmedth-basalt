<template>
  <v-app-bar app dark class="appbar">
        <div class="d-flex align-center">
            <p class="ma-0">Mijn<strong>Astma</strong></p>
        </div>

        <v-spacer></v-spacer>

        <v-btn to="/account" icon>
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
    export default {
        name: "AppBar",
    }
</script>

<style lang="scss" scoped>
    .appbar {
        background: rgb(0,85,164);
        background: linear-gradient(45deg, rgba(0,85,164,1) 0%, rgba(0,138,204,1) 100%);
    }
</style>