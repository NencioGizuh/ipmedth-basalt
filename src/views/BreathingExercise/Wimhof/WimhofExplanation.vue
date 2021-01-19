<template>
  <div>
    <h1>Wim Hof Methode</h1>
    <h2>Wat is de Wim Hof methode?</h2>
    <p>De Wim Hof-methode is een wetenschappelijk erkende ademhalingstechniek, geïnspireerd op de meditatie van Tibetaanse monniken. Deze zogenaamde Tumo-meditatie heeft als doel om de lichaamstemperatuur te verhogen met behulp van bepaalde ademhalingstechnieken om slechte gedachten en gevoelens te “verbranden”. Wim Hof heeft traditionele ademhalingstechnieken gecombineerd met zachte bewegingen en koudetraining. Het doel van de Wim Hof-methode is om je gezonder, comfortabeler en krachtiger te voelen.</p>
    
    <h2>Praktisch nut</h2>
    <p>Ademhalingsoefeningen zoals de Wim Hof ademhalingsmethode zijn slechts een manier om je leven te veranderen. 
      De echte magie van deze techniek in het bijzonder is dat het zowel je fysieke als mentale gezondheid kan helpen,
      dus echt, je zult meerdere ploegen maken. De Wim Hof ademhaling moet je niet in één keer doen en het een dag noemen. 
      Je moet dit continu doen voor een optimaal resultaat. Je zult waarschijnlijk geen fysieke verbeteringen zien na slechts één sessie, 
      hoewel je misschien wat minder angstgevoelens voelt. 
    </p>
  </div>
</template>



<script>
export default {
  name: "WimHofExplanation",
  data: () => {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "Wim Hof oefening",
        appbarCloseRoute: "/breathingexercise/list/",
      });
    });
  },
};
</script>

<style lang="scss" scoped>
</style>