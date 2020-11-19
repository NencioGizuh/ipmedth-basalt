<template>
  <v-app-bar v-if="isAuth" app dark class="appbar">
        <v-btn v-if="!showDefaultAppbar" :to="getAppbarCloseRoute" :ripple="false" icon id="no-background-hover">
            <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title v-if="showDefaultAppbar">Mijn<strong>Astma</strong></v-toolbar-title>
        <v-toolbar-title v-if="!showDefaultAppbar">{{getAppbarText}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn v-if="showDefaultAppbar" to="/account" :ripple="false" icon id="no-background-hover">
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
    export default {
        name: "AppBar",
        computed: {
            isAuth() {
                return this.$store.getters.isAuthenticated;
            },
            showDefaultAppbar() {
                return this.$store.getters.getDefaultAppbar;
            },
            getAppbarText() {
                return this.$store.getters.getAppbarText;
            },
            getAppbarCloseRoute() {
                return this.$store.getters.getAppbarCloseRoute;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .appbar {
        background: rgb(0,85,164);
        background: linear-gradient(45deg, rgba(0,85,164,1) 0%, rgba(0,138,204,1) 100%);
    }

    #no-background-hover::before {
        background-color: transparent !important;
    }
</style>