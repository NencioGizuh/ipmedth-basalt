<template>
  <div>
    <img align="center" class="basalt-block-blue1" src="@/assets/logos_en_blocks/basalt-block-blue.png" />
    <img align="center" class="basalt-block-blue2" src="@/assets/logos_en_blocks/basalt-block-blue.png" />
    <img align="center" class="basalt-block-orange1" src="@/assets/logos_en_blocks/basalt-block-orange.png" />
    <v-container class="lighten-5 mb-6 mt-2" background-color="white">
   
    </v-container>
  </div>
</template>

<script>

export default {
    name: "RegisterAstmaTrigger",
  data() {
    return {

    };
  },

  methods:{

  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "Registreren",
        appbarCloseRoute: "/dashboard",
      });
    });
  },
}
</script>

<style lang="scss">

.basalt-block-blue1{
  position: fixed;
  top: 320px;
  right: -212px;
}
.basalt-block-blue2{
  position: fixed;
  bottom: -100px;
  left: -100px;
  height: 30%;
}
.basalt-block-orange1{
  position: fixed;
  top: -70px;
  left: -50px;
}

</style>