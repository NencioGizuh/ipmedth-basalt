<template>
  <div class="sharingppeak_view">    
    <v-card>
      <v-card-title>
        <h3>Vind uw zorgverlener</h3>
        <h6>Zoek de zorgverlener met wie u de informatie wilt delen</h6>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Zoeken op naam" single-line hide-details ></v-text-field>
        <v-select class=" mt-4" :items="locatieList" v-model="locatieFilterValue" label="Filter op locatie" ></v-select>
      </v-card-title>
      <div>
        <v-data-table v-model="selected" :headers="headers" :items="zorgverleners" :search="search" item-key="name" hide-default-footer :single-select="false" :mobile-breakpoint="0" show-select ></v-data-table>
      </div>
    </v-card>

    <v-alert v-show="alertZorverlener" dense text align="center" type="error" >Selecteer altublieft een zorgverlener.</v-alert>

    <v-card class="mt-4 px-3 py-4">
      <h4>Eventuele opmerkingen/verklaringen</h4>
      <h5>Bijvoorbeeld een verklaring voor een lage peak flow</h5>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container class="pt-0 lighten-5">
          <v-row class="mt-5">
            <v-textarea v-model="form.opmerking" outlined>
              <template v-slot:label>
                <div>Opmerking <small>(optioneel)</small></div>
              </template>
            </v-textarea>

            <div class="mb-4"  >
              <h4 v-show="msg[0].name">De zorgverleners die u heeft geselecteerd om informatie mee te delen zijn:</h4>
              <h5 v-for="per in msg" :key="per.name" >{{ per.name }}</h5>
            </div>

            <v-btn block color="accent" @click="validate">
              <v-icon left>mdi-share</v-icon>
              Delen
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "SharePeakFlow",
  data() {
    return {
      selected: [],
      selectedRows: [],
      valid: true,
      alertZorverlener: false,
      locatieFilterValue: null,
      zorgverlenerSelected: "",
      search: "",
      form : {
        peak_id: null,
        zorgverleneres_id: [],
        opmerking: null,
        user_id: null,
        tijd: null
      },
      locatieList: [
          {text: "Alle", value: null},
          {text: "Den Haag", value: "Den Haag"},
          {text: "Amsterdam", value: "Amsterdam"},
        ],
      headers: [
        { text: "Naam", sortable: false, filterable: true, value: "name" },
        { text: "Locatie", sortable: false, filter: this.locatiesFilter, value: "locatie" },
      ],
      zorgverleners: [
        {
          id: 1,
          name: "Stut-van Hagen, C.C.",
          locatie: "Den Haag Kinderrevalidatie",
          specialisatie: "",
          email: "s1108101@student.hsleiden.nl",
          show: false,
        },
        {
          id : 2,
          name: "Harberts, F.",
          locatie: "Den Haag",
          specialisatie: "Kinderrevalidatie",
          email: "s1108101@student.hsleiden.nl",
          actief: true,
        },
        {
          id : 3,
          name: "Jagersma, E.",
          locatie: "Den Haag",
          specialisatie: "Kinderrevalidatie",
          email: "s1108101@student.hsleiden.nl",
          actief: true,
        },
        {
          id : 4,
          name: "Roux-Otter, N.",
          locatie: "Den Haag",
          specialisatie: "Kinderrevalidatie",
          email: "s1108101@student.hsleiden.nl",
          actief: true,
        },
        {
          id : 5,
          name: "Meer, P. van der",
          locatie: "Den Haag",
          specialisatie: "Kinderrevalidatie",
          email: "s1108101@student.hsleiden.nl",
          actief: true,
        },
        {
          id : 6,
          name: "Pieters, S.",
          locatie: "Amsterdam",
          specialisatie: "Kinderrevalidatie",
          email: "s1108101@student.hsleiden.nl",
          actief: true,
        },
      ],
    };
  },
  methods: {
    validate() {
      if(this.selectedRows.length != 0){
        this.alertZorverlener = false;
        this.packData();
      } else {
        this.alertZorverlener = true;
      }
      
    },
    packData(){
      this.form.peak_id = this.$route.params.peak_flow_id;
      for (let a = 0; a < this.selected.length; a++){
        this.form.zorgverleneres_id[a] = this.selected[a].id;
      }
      this.form.opmerking;
      this.user_id;
      this.tijd;
      this.sendData();
    },

    sendData(){
      this.$store.dispatch("saveSharePeakflow", this.form);
      setTimeout(() => {
          this.$router.push({path: "/peakflow", query: {share: 'succes'}});
      }, 500)
    },
    slctName(selectedRow){
      this.selectedRows = selectedRow;
    },
    locatiesFilter(value) {
      if (!this.locatieFilterValue) {
          return true;
      }
      return value.toLowerCase().includes(this.locatieFilterValue.toLowerCase());
    }
  },
  computed: {
    msg() {
      var selectedRow = [];
      if (this.selected.length == 0){
        this.slctName(selectedRow);
      }
      for (let ind = 0; ind < this.selected.length; ind++) {
        selectedRow[ind] = this.selected[ind];
        if(ind == (this.selected.length -1)){
          this.slctName(selectedRow);
        }
      }
      return selectedRow[0] ? selectedRow : "geen data";
    },
    peakflow_shares(){
      return this.$store.getters.peakflow_shares;
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "Peak flow meting delen",
        appbarCloseRoute: "/peakflow",
      });
    });
  },
};
</script>

<style lang="scss">

.sharingppeak_view tr:nth-child(even) {background: #F8F8F8}
.sharingppeak_view tr:nth-child(odd) {background: #FFF}

.sharingppeak_view .v-data-table__selected, .sharingppeak_view .v-data-table__selected .theme--light.v-icon{
     color: #EF7D00;
}

.sharingppeak_view .v-data-table__wrapper {
    height: 300px;
    overflow: auto;
}
.sharingppeak_view th {
    font-size: medium !important;
}
.sharingppeak_view td {
    padding: 12px 16px !important;
}
.sharingppeak_view th .v-icon  {
    display:none;
}


</style>