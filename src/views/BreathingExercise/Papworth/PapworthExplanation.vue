<template>
  <div>
    <h1>Papworth</h1>
    <h2>Wat is Papworth?</h2>
    <p>Een reeks geïntegreerde ademhalings- en ontspanningsoefeningen, bekend als de Papworth-methode, werd ontwikkeld in de jaren zestig. Deze methode is gericht op problemen van disfunctionele ademhaling, waaronder hyperventilatie en hyperinflatie, die vaak voorkomen bij astmapatiënten. De cyclus van kortademigheid en piepende ademhaling gaat vaak gepaard met angst en wordt verergerd door complexe fysiologische mechanismen. Aangenomen wordt dat de Papworth-methode leidt tot verminderde astmasymptomen, angstgevoelens en symptomen die voortkomen uit hypocapnie. De huidige studie was bedoeld om deze hypothese te onderzoeken.</p>
    <h2>Praktisch nut</h2>
    <p>De Papworth-methode lijkt ademhalingssymptomen, disfunctionele ademhaling en ongunstige stemming te verbeteren in vergelijking met de gebruikelijke zorg. Verdere gecontroleerde onderzoeken zijn gerechtvaardigd om deze bevinding te bevestigen, het effect bij andere patiëntengroepen te beoordelen en te bepalen of er enig effect is op objectieve metingen van de ademhalingsfunctie.</p>
  </div>
</template>

<script>
export default {
  name: "PapworthExplanation",
  data: () => {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "Papworth oefening",
        appbarCloseRoute: "/breathingexercise/list/",
      });
    });
  },
};
</script>

<style lang="scss" scoped>
</style>