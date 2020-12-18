<template>
  <v-app>
    <app-bar />
    
    <v-main class="main">
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
        },
        created() {
            var vm = this;
            if (localStorage.getItem("token") === null) {
                console.log("Er bestaat nog geen access token, dit betekent dat er nog niet geregistreerd is")
                this.$router.push('/login');
            } else {
                if (vm.$store.state.auth.token === null) {
                    console.log("Er is geregistreerd maar de state heeft het nog niet")
                    this.$store.commit("setToken",localStorage.getItem("token"));
                } else {
                    console.log("De gebruiker het zojuist geregistreerd");
                }

                this.$store.dispatch('setActionPlanFromDatabase');
                this.$store.dispatch('setPeakFlow');
            }
        }
    };
    
</script>

<style lang="scss" scoped>
    .main {
        margin: 1rem;
    }
</style>