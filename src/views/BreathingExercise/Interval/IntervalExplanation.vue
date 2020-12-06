<template>
  <div>
    <div class="overlay"></div>
    <div class="exercise__message">
      <h1 class="exercise__message--header">Interval exercise</h1>
      <p class="exercise__message--text">
        Gebruiker gaat op een bepaald tempo de ademhaling controleren:
      </p>
      <ul class="exercise__message--list">
        <li>4 seconden inademen</li>
        <li>5 seconden adem inhouden</li>
        <li>6 seconden uitademen</li>
      </ul>
      <div class="center">
        <v-btn
          class="exercise__message--button"
          to="/breathingexercise/list/interval/countdown"
        >
          Start oefening
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IntervalExplanation",
  data: () => {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "Interval exercise",
        appbarCloseRoute: "/breathingexercise",
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.exercise {
  &__message {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    height: 225px;
    width: 95%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 0 0 20px;

    &--header {
      font-size: 16px;
      padding: 0 0 10px 0;
    }

    &--text {
      font-size: 12px;
    }

    &--list {
      font-size: 12px;
      margin: 0 0 10px 0;
    }

    &--button {
      width: 60% !important;
    }
  }
}

.center {
  text-align: center;
}
</style>