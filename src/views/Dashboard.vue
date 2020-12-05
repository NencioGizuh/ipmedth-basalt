<template>
  <div>
    <airquality-overview></airquality-overview>
    <v-container>
        <v-btn fab small :style="{left: '50%', transform:'translateX(-50%)'}"><v-icon>mdi-plus</v-icon></v-btn>
    </v-container>
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
};
</script>

<style lang="scss">
</style>