<template>
  <div>
    <h1>Middenrifspier</h1>
    <h2>Wat is de middenrifspier oefening?</h2>
    <p>Het middenrif wordt ook wel diafragma genoemd. Je middenrif is een grote spier die je romp in twee delen verdeelt: je borstholte en je buikholte. Boven het middenrif liggen de longen en het hart, eronder de lever, de maag, de milt en darmen.</p>
    <p>Je middenrif speelt een hele belangrijke rol bij de ademhaling. Op de inademing trekt de middenrifspier samen en beweegt hij naar beneden. Dit kan tot wel 10 centimeter zijn.</p>
    <h2>Praktisch Nut</h2>
    <p>Met deze ademhaling kun je het middenrif losmaken en het is een goede oefening om weer te leren ademen via je buik. Je gebruikt bij deze ademhaling juist niet je borst. Deze ademhaling is dan ook niet helemaal hetzelfde als de buikademhaling waarbij de borst wel gebruikt kan worden.</p>
  </div>
</template>

<script>
export default {
  name: "MiddenrifspierExplanation",
  data: () => {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "Middenrifspier oefening",
        appbarCloseRoute: "/breathingexercise/list/",
      });
    });
  },
};
</script>

<style lang="scss" scoped>
</style>