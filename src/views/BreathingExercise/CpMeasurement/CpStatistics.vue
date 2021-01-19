<template>
  <div>
    <v-btn
      class="cpmeasurement__button"
      outlined
      block
      color="primary"
      to="/breathingexercise/cpmeasurement"
    >
      CP Meten
    </v-btn>
    <line-chart :data="dataCP"></line-chart>
    <line-chart :data="averageCP"></line-chart>
  </div>
</template>

<script>
export default {
  name: "CpStatistics",
  created () {
    setInterval(this.getNow, 1000);
  },
  data() {
    return {
      dataCP: [
        {
          name: "first CP",
          color: "#42a5f5",
          data: {
            [new Date().toISOString().substr(0,10)]: this.$store.getters.getCp1Meting,
          },
        },
        {
          name: "second CP",
          color: "#0d47a1",
          data: {
            [new Date().toISOString().substr(0,10)]: this.$store.getters.getCp2Meting,
          },
        },
      ],
      averageCP: [
        {
          name: "Average CP",
          color: "#8bc34a",
          data: {
            [new Date().toISOString().substr(0,10)]: this.$store.getters.getAverageCP,
          },
        },
      ],
    };
  },
  methods: {
    getNow: function () {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      this.timestamp = date;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "CP Metingen",
        appbarCloseRoute: "/breathingexercise",
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.cpmeasurement__button {
  width: 100%;
}
</style>