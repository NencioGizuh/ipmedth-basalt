<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container class="grey lighten-5 mb-6">
        <h3 align="center">
          Wat zijn uw gewenste tijden en/of dosage voor
          <b>{{ current_selected_medicijn.title }}</b>?
        </h3>
        <v-alert v-show="medicatieOpgeslagen" dense text align="center" type="success" >Uw medicatie is opgeslagen</v-alert>
        <v-row class="mt-5">
            <v-col cols="6" sm="6" md="6">
              <h5>Aantal keer</h5>
              <v-text-field v-model="form.dosage" label="Hoeveelheid" required :rules="[v => !!v || 'Alles invullen aub']"></v-text-field>
            </v-col>
            <v-col cols="3" sm="3" md="3">
              <h5>Tijd</h5>
              <v-row no-gutters>
                <v-col>
                  <v-text-field v-model="uur" label="Uur" :rules="[v => !!v || 'Alles invullen aub']"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3" sm="3" md="3">
              <h5 class="pt-5"></h5>
              <v-row  no-gutters>
                <v-col>
                  <v-text-field v-model="minuut" label="Min." :rules="[v => !!v || 'Alles invullen aub']"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-btn :disabled="medicatieOpgeslagen || !valid" outlined block @click="validate" color="primary">
              opslaan
            </v-btn>
        </v-row>
      </v-container>
    </v-form>

    <v-container v-show="medicatieOpgeslagen" class="grey lighten-5 mb-6" justify="center" align="center">
      <h3 align="center">Wilt u hulp bij het gebruik van <br/>{{ current_selected_medicijn.title }}?</h3>
      <v-row align="center" no-gutters style="height: 150px">
        <v-col>
          <v-card to="/medication/help" class="pa-2 ma-1" align="center" outlined tile> Ja </v-card>
        </v-col>
        <v-col>
          <v-card to="/medication" class="pa-2 ma-1" align="center" outlined tile >Nee</v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  data() {
    return {
      medicatieOpgeslagen: false,
      valid: true,
      uur: null,
      minuut: null,
      form : {
        id: null,
        title: null,
        dosage:null,
        tijd: null
      },
    };
  },
  computed: {
    medicijnen_tijden() {
      return this.$store.getters.medicijnen_tijden;
    },
    current_selected_medicijn() {
      return this.$store.getters.current_selected_medicijn;
    },
    slcMedicijn(){
      return this.$store.getters.slcMedicijn;
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate();
      if (this.$refs.form.validate()){
        this.formValues();
      }
    },
    formValues(){
      this.form.title = this.current_selected_medicijn.title;
      this.form.tijd = this.uur + ":" + this.minuut;
      this.medicatieOpgeslagen = true;
      this.getSelectedMedicijn();
    },
    getSelectedMedicijn(){
      this.$store.dispatch("getSelectedMedicijn", this.form);
    },

    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$store.dispatch("setAppbarDetails", {
          appbarText: "Medicatie registeren",
          appbarCloseRoute: "/medication",
        });
      });
    },
  },
};
</script>

<style lang="scss">
</style>