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
  myStorage: window.localStorage,
  methods: {
    getNow: function () {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
    },
    clearCache() {
      if (this.uren >= 0 && this.uren <= 6) {
        localStorage.removeItem("CPMeting1");
        localStorage.removeItem("CPMeting2");
      }
    }
  },
  data() {
    return {
      dataCP: [
        {
          name: "first CP",
          color: "red",
          data: {
            currentDate: localStorage.getItem("CPMeting1"),
          },
        },
        {
          name: "second CP",
          color: "green",
          data: {
            currentDate: localStorage.getItem("CPMeting2"),
          },
        },
      ],
      averageCP: [
        {
          name: "Average CP",
          color: "blue",
          data: {
            "26-11-2020": 6,
            "27-11-2020": 8,
            "28-11-2020": 9,
            "29-11-2020": 7,
          },
        },
      ],
    };
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