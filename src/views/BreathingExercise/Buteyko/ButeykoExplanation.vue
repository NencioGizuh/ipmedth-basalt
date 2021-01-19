<template>
  <div>
    <h1>Buteyko</h1>
    <h2>Wat is Buteyko?</h2>
    <p>Een methode om de ademhaling te beheersen. Dr. Buteyko, een ingenieur die medicus werd, merkte op dat wanneer mensen ziek waren, hun ademhalingsfrequentie toenam en ze begonnen te hyperventileren. Hij redeneerde dat het omgekeerde zou kunnen gelden, en dat als ze hun ademhaling onder controle hielden, dat goed zou kunnen zijn voor hun welzijn. Hij leende technieken uit yoga en ontwikkelde de Buteyko-methode van gecontroleerde ademhaling, die aanhangers over de hele wereld heeft.</p>
    <h2>Praktisch Nut</h2>
    <p>De methode is in de loop der jaren verder ontwikkeld en wetenschappelijk onderzocht vnl bij astma patiënten waarbij een spectaculaire daling te zien was van astma medicijn gebruik.
Maar ook bij een hoop andere aandoeningen waarbij een te laag koolzuurgasgehalte in bloed aanwezig is kan de Buteyko methode helpen een deel van de klachten op te lossen.</p>
  </div>
</template>

<script>
export default {
  name: "ButeykoExplanation",
  data: () => {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "Buteyko oefening",
        appbarCloseRoute: "/breathingexercise/list/",
      });
    });
  },
};
</script>

<style lang="scss" scoped>
</style>