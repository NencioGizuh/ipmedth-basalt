<template>
  <div>
    <airquality-overview></airquality-overview>
  </div>
</template>

<script>
import AirqualityOverview from '../components/Airquality/AirqualityOverview.vue'
export default {
  name: "Dashboard",
  data() {
    return {
    };
  },
  components: {
    'airquality-overview': AirqualityOverview
  },
  created() {
    var vm = this;
    if(localStorage.getItem("token") === null) {
      console.log("Er bestaat nog geen access token, dit betekent dat er nog niet geregistreerd is")
      this.$router.push('/login');
    } 
    else {
      if(vm.$store.state.auth.token === null) {
        console.log("Er is geregistreerd maar de state heeft het nog niet")
        this.$store.commit("setToken",localStorage.getItem("token"));
      }
      else {
        console.log("De gebruiker het zojuist geregistreerd");
      }
    }
    this.$store.dispatch("setDefaultAppbar");
  }
};
</script>

<style lang="scss">
</style>