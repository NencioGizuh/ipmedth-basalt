<template>
  <div>
    <div class="exercise__message">
      <h1 class="exercise__message--header">CP Meting 1</h1>
      <ol class="exercise__message--list">
        <li>{{ text1 }}</li>
        <li>{{ text2 }}</li>
        <li>{{ text3 }}</li>
      </ol>
      <div class="center">
        <v-btn
        class="exercise__message--button"
        to="/breathingexercise/cpmeasurement/CP1/CP1start"
      >
        Start oefening
      </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CP1",
  data: () => {
    return {
      text1: "Adem volledig uit, knijp je neus dicht en start de timer.",
      text2: "Zodra je de eerste aandrang voelt om te ademen, stop je de timer.",
      text3: "Nadat je de meting hebt afgerond, druk je op 'verzenden' ",
    };
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
.center {
  width: 100%;
  text-align: center;
}

.exercise {
  &__message {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    height: 225px;
    width: 95%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;

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
      margin: 0 auto;
    }
  }
}
</style>