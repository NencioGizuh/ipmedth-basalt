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
  name: "CP2start",
  myStorage: window.localStorage,
  data() {
    return {
      elapsedTime: 0,
      timeInSeconds: 0,
      timer: undefined,
      timerState: 0,
      completedID3: false
    };
  },
  watch: {
    todos: {
      handler() { console.log('CP metingen zijn veranderd'); },
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
      if (this.timerState == 1){
        clearInterval(this.timer);
        console.log("De timer is gestopt");
        this.timerState = 2;
      }
    },
    verzend() {
      if (this.timerState == 2) {
        console.log("Meting met waarde: " + this.timeInSeconds)
        localStorage.setItem('CPMeting2', this.timeInSeconds)
        this.completedID3 = true;
        localStorage.setItem('completedID3', this.completedID3)
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