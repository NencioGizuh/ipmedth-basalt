<template>
    <div> 
        <v-btn outlined block color="primary" to="/medication/add">
            <v-icon left>mdi-plus</v-icon>
            Medicatie innemen
        </v-btn>
        <v-container class="grey lighten-5">
            <h5 font-weight="500">Medicatie vandaag te nemen</h5>
            <!-- Medicijn V-card-->
            <v-list-item v-for="medicijn in medicijnen_category" :key="medicijn.id"> 
                <v-list-item two-line class="pa-0"> 
                    <v-list-item-content>
                       <h3> {{ medicijn.title }} </h3>
                        <v-layout row>
                            <v-list-item class="pr-0" style="flex:initial" v-for="medicijnen_tijden in medicijnen_tijden" :key="medicijnen_tijden.id">
                                <v-chip :class="{'orange orange--text' : medicijnen_tijden.done}" label outlined> {{ medicijnen_tijden.tijd }}</v-chip>
                            </v-list-item>
                            </v-layout>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item> 
        </v-container>
        
        <v-container class="grey lighten-5 mt-3">
          <h5 @click="fillData()" font-weight="500">Medicatie overzicht</h5>
          <BarChart :chart-data="datacollection" ></BarChart>
        </v-container>
    </div>
</template>

<script>
import BarChart from '../../components/medicatie/BarChart.vue';

export default {
  components: { BarChart },
  data() {
    return {
      labels: [],
      datacollection: null,
      datasets: [],
      ChartConfig: {
        labels: [],
      },
    };
  },
  mounted() {
    this.fillData();
  },
  computed:{
    medicijn(){
      return this.$store.getters.medicijn;
    },
    medicijnen_tijden(){
      return this.$store.getters.medicijnen_tijden;
    },
    datacollection_label(){
      return this.$store.getters.datacollection_label;
    },
    datacollection_datasets(){
      return this.$store.getters.datacollection_label_datasets;
    },
    medicijnen_category(){
      return this.$store.getters.medicijn_categorieen;
    },
  },
  methods:{
    fillData () {
      this.fillChartData();

      this.datacollection = {
        labels: this.labels,
        datasets: this.datasets
      }
      return this.datacollection; 
    },
    fillChartData(){
      const datum = new Date();
      //const maand = datum.getMonth() + 1;
      const dag = datum.getDate();
      var i = 0;
      for (i = 0; i < 6; i++){
        this.labels[i] = ((dag + i));
      }
      var j = 0;
      for (j = 0; j < this.medicijnen_tijden.length; j++){
        console.log(this.datasets);
        console.log(j);
        this.datasets.push( {
          label: this.medicijnen_tijden[j].title,
          backgroundColor: '#008ACC',
          data: [this.medicijnen_tijden[j].dosage]
        
        },)
      }
    }
  }
};
</script>

<style lang="scss">


</style>