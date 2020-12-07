<template>
  <div>
      <h3>Welk medicijn wilt u gebruiken?</h3>
       <v-container class="grey lighten-5" v-for="category in medicijn_categorieen" :key="category.id" >
            <h5 font-weight="500">{{category.title}}</h5>
            <v-row>
                <v-col v-show="category.title != medicijn.category" v-for="medicijn in medicijnen" :key="medicijn.id" class=" child-flex" cols="6" @click="currentMedicijn(medicijn)" >
                    <router-link to="/medication/doing">
                        <v-img contain to="/medication/doing" :src="images[ medicijn['title'] ]"  aspect-ratio="1" class="grey lighten-2"></v-img>
                    </router-link>
                    <h4 class="text-center">{{ medicijn["title"] }} </h4> 
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
            images: {
                "Autohaler" : Autohaler,
                "Avamys neusspray" : Avamys_neusspray,
                "Onbrez Breezhaler" : Onbrez_Breezhaler,
                "Qvar autohaler" : Qvar_autohaler,
            }
        }
    },
    computed: {
        medicijnen(){
            return this.$store.getters.medicijnen;
        },
        medicijn_categorieen(){
            return this.$store.getters.medicijn_categorieen;
        },
    }, 
    methods:{
        currentMedicijn (medicijn){
            this.$store.commit("currentMedicijn", medicijn.title);
        }
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