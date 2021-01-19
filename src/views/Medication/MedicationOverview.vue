<template>
    <div> 
        <v-btn outlined block color="primary" to="/medication/add" >
            <v-icon left>mdi-plus</v-icon>
            Medicatie innemen
        </v-btn>
        <v-container class="grey lighten-5">
            <h5 font-weight="500">Medicatie voor vandaag</h5>
            <!-- Medicijn V-card-->
            <div v-for="(medicijn, key) in medicijnen_tijden" :key="medicijn.id" v-show="rmvDups[key]">
              <v-list-item>
                  <v-list-item two-line class="pa-0">
                      <v-list-item-content>
                        <h3> {{ medicijn.medication.name }}</h3>
                          <v-layout row>
                            <div  v-for="med_tijd in medicijnen_tijden" :key="med_tijd.id">
                              <v-list-item class="pr-0" style="flex:initial" v-show="medicijn.medication.name == med_tijd.medication.name">
                                  <v-chip :class="{'orange orange--text' : med_tijd.done}" label outlined > {{ med_tijd.time.substring(0,5) }}</v-chip>
                              </v-list-item>
                            </div>  
                              </v-layout>
                      </v-list-item-content>
                  </v-list-item>
              </v-list-item> 
            </div>
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
      rmvDups: [],
      //loadingMedicatie: false,
      datacollection: null,
      datasets: [],
      ChartConfig: {
        labels: [],
      },
      datachart_colors:[
        "#2ecc71","#3498db","#e67e22","#e74c3c","#f1c40f",
      ]
    };
  },
  mounted() {
    this.getData();
    this.fillData();
  },
  watch: {
    medicijnen_tijden () {
      this.fillData();
      //this.loadingMedicatie = true;
    }
  },
  computed:{
    medicijn(){
      return this.$store.getters.medicijn;
    },
    medicijnen_tijden(){
      return this.$store.getters.medicijnen_tijden;
    },
    medicijnen_category(){
      return this.$store.getters.medicijn_categorieen;
    },
  },
  methods:{
    getData(){
      this.$store.dispatch('getMedicijnTijden', 1 ).then(() => {
      });
    },
    fillData () { 
    let filterValues = [];
      for (let k=0; k < this.medicijnen_tijden.length; k++){
        if(filterValues.includes(this.medicijnen_tijden[k].medication.name)){
          this.rmvDups.push(false);
        } else {
          this.rmvDups.push(true);
          filterValues.push(this.medicijnen_tijden[k].medication.name);
        }
                          
      }

      this.fillChartData();
      this.datacollection = {
        labels: this.labels,
        datasets: this.datasets
      }
    },
    fillChartData(){
      const datum = new Date();
      const maand = datum.getMonth() + 1;
      const dag = datum.getDate();
      var i = 0;
      for (i = 0; i < 6; i++){
        this.labels[i] = ((dag + i +"-" +maand ));
      }
      for (let j = 0; j < this.medicijnen_tijden.length; j++){
        this.datasets.push( {
          label: this.medicijnen_tijden[j].medication.name,
          backgroundColor: this.datachart_colors[j],
          data: [1]
        
        },)
      }
    }
  },
  created(){
    this.$store.dispatch('setDefaultAppbar');
  }
};
</script>

<style lang="scss">
</style>