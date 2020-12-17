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
    this.$store.dispatch("setDefaultAppbar");
  }
};
</script>

<style lang="scss">
</style>