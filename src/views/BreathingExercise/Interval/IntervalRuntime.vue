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
  computed: {
    getIntervalCompleted(){
      return this.$store.getters.getIntervalCompleted;
    }
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      timerCount: 60,
      timeout: null,
      intervalCompleted: this.$store.getters.getIntervalCompleted
    };
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          this.intervalCompleted = true;
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
        const data = {
          date: this.date,
          cp_measurement_one: this.$store.getters.getCp1Meting,
          cp_measurement_two: this.$store.getters.getCp2Meting,
          interval: this.intervalCompleted
        }
        this.$store.commit('setIntervalCompleted', this.intervalCompleted);
        this.$store.dispatch("addMeting", data);
        this.$router.push({ path: "/breathingexercise" });
      }.bind(this),
      60000
    );
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "Interval oefening",
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
  opacity: 50%;
  filter: blur(2px);
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

@keyframes breathing {
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
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
}
</style>