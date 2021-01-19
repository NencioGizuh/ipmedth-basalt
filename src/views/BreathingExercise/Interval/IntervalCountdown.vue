<template>
  <div class="timer">
    {{ timerCount }}
  </div>
</template>

<script>
export default {
  name: "IntervalCountdown",
  data: () => {
    return {
      timerCount: 5,
      timeout: null,
    };
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
        if (value == 0) {
          this.timerCount = "Go!";
        }
      },
      immediate: true,
    },
  },
  created() {
    this.timeout = setTimeout(
      function () {
        this.$router.push({ path: "/breathingexercise/list/interval/runtime" });
      }.bind(this),
      6000
    );
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "Interval oefening",
        appbarCloseRoute: "/breathingexercise/list/",
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.timer {
  font-size: 72px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>