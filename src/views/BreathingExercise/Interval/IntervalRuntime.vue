<template>
  <div>
    <div>
      <div id="breathing-button" class="placed-in-middle"></div>
      <div id="random-button" class="placed-in-middle"></div>
    </div>
    <div class="timerCount">
      {{ timerCount }}
    </div>
  </div>
</template>

<script>
export default {
  name: "IntervalRuntime",
  data() {
    return {
      timerCount: 30,
      timeout: null,
      test1: "", 
      completedID2: false
    };
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
            console.log(this.timerCount);
          }, 1000);
        } 
      },
      immediate: true,
    },
  },
  created() {
    this.timeout = setTimeout(
      function () {
        this.completedID2 = true;
        localStorage.setItem('completedID2', this.completedID2)
        this.$router.push({ path: "/breathingexercise" });
      }.bind(this),
      30000
    );
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "Interval",
        appbarCloseRoute: "/breathingexercise",
      });
    });
  },
};
</script>

<style lang="scss" scoped>
#random-button {
  width: 180px;
  height: 180px;
  padding: 12px;
  margin: 50px auto;
  border: 1px solid #63a198;
  font-family: "Lantinghei SC";
  font-size: 16px;
  background: #63a198;
  color: #fff;
  border-radius: 100%;
  text-align: center;
  transform: scale(0.7);
}

#breathing-button {
  width: 180px;
  height: 180px;
  padding: 12px;
  margin: 50px auto;
  border: 1px solid #3cc8b4;
  -webkit-animation: breathing 15s ease-in-out infinite normal;
  animation: breathing 15s ease-in-out infinite normal;
  font-family: "Lantinghei SC";
  font-size: 16px;
  background: #3cc8b4;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  border-radius: 100%;
  text-align: center;
}

.placed-in-middle {
  position: absolute;
  top: 25%;
  left: 25%;
  transform: translate(-50%, -50%);
}

@-webkit-keyframes breathing {
  0% {
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
  }

  28% {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }

  57% {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }

  100% {
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
  }
}

.timerCount {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 34px;
}
</style>