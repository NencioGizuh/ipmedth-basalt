<template>
  <div>
    <img align="center" class="basalt-block-blue1" src="@/assets/logos_en_blocks/basalt-block-blue.png" />
    <img align="center" class="basalt-block-blue2" src="@/assets/logos_en_blocks/basalt-block-blue.png" />
    <img align="center" class="basalt-block-orange1" src="@/assets/logos_en_blocks/basalt-block-orange.png" />
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container class="lighten-5 mb-6 mt-2" background-color="white">
        <v-col class="pt-4 pb-4 pr-10 pl-10" cols="8" sm="8" md="8">
          <img align="center" src="@/assets/logos_en_blocks/logo-basalt.png" />
        </v-col>  
        <v-alert v-show="registratie_succes" dense text align="center" type="success" >Uw registratie is opgeslagen</v-alert>
        <v-row class="mt-0">  
            <v-col class="pt-0 pb-0 pr-10 pl-10" cols="12" sm="12" md="12">
              <h5>Email</h5>
              <v-text-field class="mt-0 pt-0" v-model="register.email" label="jdoe@gmail.com" required :rules="[v => !!v || 'Alles invullen aub']" ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0 pr-10 pl-10" cols="12" sm="12" md="12">
              <h5>Patientnummer</h5>
              <v-text-field class="mt-0 pt-0" v-model="register.patientnummer" label="34546999" required :rules="[v => !!v || 'Alles invullen aub']" ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-2 pr-10 pl-10" cols="12" sm="12" md="12">
              <h5>Wachtwoord</h5>
              <v-text-field class="mt-0 pt-0" v-model="register.wachtwoord" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]" :type="show1 ? 'text' : 'password'" name="input-10-1" hint="minstens 8 tekens" counter @click:append="show1 = !show1" ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0 pr-10 pl-10" cols="6" sm="6" md="6">
              <h5>Leeftijd</h5>
              <v-text-field class="mt-0 pt-0" v-model="register.leeftijf" label="" required :rules="[v => !!v || 'Alles invullen aub']" ></v-text-field>
            </v-col>
            <v-col class="pt-0 pb-0 pr-10 pl-10" cols="6" sm="6" md="6">
              <h5>Lengte (in cm)</h5>
              <v-text-field class="mt-0 pt-0" v-model="register.lengte" label="" required :rules="[v => !!v || 'Alles invullen aub']" ></v-text-field>
            </v-col>
            <v-btn :disabled="registratie_succes || !valid"  block tile @click="validate" color="accent">
              Registreren
            </v-btn>
        </v-row>        
      </v-container>
    </v-form>
  </div>
</template>

<script>
import router from "@/router/index.js"

export default {
    name: "Register",
  data() {
    return {
      show1: false,
      registratie_succes: false,
      valid: true,
      uur: null,
      minuut: null,
      register : {
        email: null,
        patientnummer: null,
        wachtwoord:null,
        leeftijf: null,
        lengte: null
      },
      rules: {
        required: value => !!value || 'Required.',
        min: value => value.length >= 8 || 'Min 8 characters',
      },
    };
  },

  methods:{
    formValues(){
      this.$store.commit("saveRegistratie", this.register);
      this.registratie_succes = true;
      setTimeout( // Als de backend klaar is een succesvol action recall laten
        function(){ 
          router.push({ name: 'RegisterAstmaTrigger', params: { userId: 123 } }) // User.token meegeven als registratie succesvol is
        }, 3000);
    },
    validate(){
      this.$refs.form.validate();
      if (this.$refs.form.validate()){
        this.formValues();
      }
    },
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