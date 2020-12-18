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

    <v-card class="mt-4 px-3 py-4">
      <h4>Eventuele opmerkingen/verklaringen</h4>
      <h5>Bijvoorbeeld een verklaring voor een lage peak flow</h5>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container class="pt-0 lighten-5 mb-6">
          <v-row class="mt-5">
            <v-textarea v-model="form.opmerking" outlined color="teal">
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
      locatieFilterValue: null,
      zorgverlenerSelected: "",
      search: "",
      form : {
        id: null,
        title: null,
        opmerking: null,
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
      if (this.$refs.form.validate()){
        alert("valid");
       }
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
      for (let ind = 0; ind < this.selected.length; ind++) {
        selectedRow[ind] = this.selected[ind];
      }
      return selectedRow[0] ? selectedRow : "geen data";
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "Peak flow meting delen",
        appbarCloseRoute: from.path,
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