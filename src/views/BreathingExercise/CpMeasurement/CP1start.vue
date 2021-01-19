<template>
  <div>
    <div class="cp" id="app">
      <h2 class="cp__header">Druk op start om de meting te beginnen</h2>
      <p class="cp__timer">{{ formattedElapsedTime }}</p>
      <div class="cp__buttons">
        <button class="cp__buttons--button" @click="start">Start</button>
        <button class="cp__buttons--button" @click="stop">Stop</button>
        <button class="cp__buttons--button" @click="verzend">Verzend</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CP1start",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      elapsedTime: 0,
      timeInSeconds: 0,
      timer: undefined,
      timerState: 0,
      cp1Completed: this.$store.getters.getCp1Completed,
      cp1Meting: this.$store.getters.getCp1Meting
    };
  },
  watch: {
    todos: {
      handler() {
        console.log("CP metingen zijn veranderd");
      },
      deep: true,
    },
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - -1, 5);
    },
    getCp1Completed(){
      return this.$store.getters.getCp1Completed;
    }, 
    getCp1Meting(){
      return this.$store.getters.getCp1Meting;
    }
  },
  methods: {
    start() {
      if (this.timerState == 0) {
        this.timer = setInterval(() => {
          this.timerState = 1;
          this.elapsedTime += 1000;
          this.timeInSeconds = this.elapsedTime / 1000;
          console.log(this.timeInSeconds);
        }, 1000);
      } else {
        return;
      }
    },
    stop() {
      if (this.timerState == 1) {
        clearInterval(this.timer);
        console.log("De timer is gestopt");
        this.timerState = 2;
      }
    },
    verzend() {
      if (this.timerState == 2) {
        const data = {
          date: this.date,
          cp_measurement_one: this.timeInSeconds,
          cp_measurement_two: this.$store.getters.getCp2Meting
        }
        console.log("Meting met waarde: " + this.timeInSeconds);
        this.$store.commit('setCp1Meting', this.timeInSeconds);
        this.$store.commit('setCp1Completed');
        this.$store.dispatch("addMeting", data);
        this.$router.push({ path: "/breathingexercise/cpstatistics" });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "CP Meten",
        appbarCloseRoute: "/breathingexercise/cpstatistics",
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.cp {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);

  &__header {
    width: 300px;
    margin: 0 0 35px 0;
    text-align: center;
  }

  &__timer {
    font-size: 50px;
    text-align: center;
  }

  &__buttons {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 100%;

    &--button {
      margin: 0 7px;
      border: 1px solid black;
      font-size: 20px;
      padding: 15px;
      border-radius: 15px;
    }
  }
}
</style>