<template>
  <div>
      <h3>Welk medicijn wilt u gebruiken?</h3>
       <v-container class="grey lighten-5" v-for="(category, key) in medicijnenInDB" :key="category.id" v-show="rmvDups[key]" >
            <h5 font-weight="500">{{category.type}}</h5>
            <v-row>
                <v-col v-show="category.title != medicijn.category" v-for="(medicijn) in medicijnen" :key="medicijn.id" class=" child-flex" cols="6" @click="currentMedicijn(medicijn)" >
                    <router-link to="/medication/doing">
                        <v-img contain to="/medication/doing" :src="images[medicijn.title]" aspect-ratio="1" class="grey lighten-2"></v-img>
                    </router-link>
                    <h4 class="text-center">{{ medicijn.title }} </h4> 
                </v-col>
            </v-row>
        </v-container>
  </div>
</template>

<script>
import Autohaler from "@/assets/medicijnen/Autohaler.png";
import Avamys_neusspray from "@/assets/medicijnen/Avamys neusspray.png";
import Onbrez_Breezhaler from "@/assets/medicijnen/Onbrez Breezhaler.png";
import Qvar_autohaler from "@/assets/medicijnen/Qvar autohaler.png";

export default {
    name: "AddMedication",
    data() {
        return {
            medicijn: null,
            rmvDups: [true],
            filterValues: [],
            images: {
                "Salbutamol" : Autohaler,
                "Terbutaline" : Avamys_neusspray,
                "Ipratropium" : Onbrez_Breezhaler,
                "Formoterol" : Qvar_autohaler,
            }
        }
    },
    created(){
        this.$store.dispatch("getRegisteredMedicijnen");
    },
    computed: {
        medicijnen(){
            return this.$store.getters.medicijnen;
        },
        medicijnenInDB(){
            return this.$store.getters.medicijnenInDB;
        },
    }, 
    methods:{
        currentMedicijn (medicijn){
            console.log(this.$store.getters.medicijnen);
            this.$store.commit("currentMedicijn", medicijn.title);
        },
        fillData () { 
            for (let k=0; k < this.medicijnen_tijden[0].length; k++){
                this.filterValues.push(this.medicijnen_tijden[0][k].medication.name);
                if(this.filterValues.includes(this.medicijnen_tijden[0][k].medication.name)){
                    this.rmvDups.push(false);
                } else {
                this.rmvDups.push(true);
                }
            }
        },   
    },
      beforeRouteEnter (to, from, next) {
    next(vm => {
        vm.$store.dispatch('setAppbarDetails', {
            appbarText: "Medicatie registeren",
            appbarCloseRoute: "/medication",
        });
    });
  }
}
</script>

<style lang="scss">
</style>