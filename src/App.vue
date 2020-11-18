<template>
  <v-app>
    <app-bar />
    
    <v-main>
      <router-view />
    </v-main>

    <bottom-navigation /> 
  </v-app>
</template>

<script>
    import AppBar from "@/components/AppBar.vue"
    import BottomNavigation from "@/components/BottomNavigation.vue";

    export default {
        name: 'App',
        components: {
            AppBar,
            BottomNavigation
        }
    };
</script>

<style lang="scss">
</style>