<template>
  <div>
      <h3>Welk medicijn wilt u gebruiken?</h3>
       <v-container class="grey lighten-5" v-for="category in medicijn_categorieen" :key="category.id" >
            <h5 font-weight="500">{{category.title}}</h5>
            <v-row>
                <v-col v-show="category.title != medicijn.category" v-for="medicijn in medicijnen" :key="medicijn.id" class=" child-flex" cols="6" @click="currentMedicijn(medicijn)" >
                    <router-link to="/medication/doing">
                        <v-img to="/medication/doing"  :src="`https://picsum.photos/500/300?image=${medicijn.id * 5 + 12}`"  aspect-ratio="1" class="grey lighten-2"></v-img>
                    </router-link>
                    <h4 class="text-center">{{ medicijn["title"] }} </h4> 
                </v-col>
            </v-row>
        </v-container>
  </div>
</template>

<script>
export default {
    name: "AddMedication",
    data() {
        return {
            medicijn: null
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
    }
}
</script>

<style lang="scss">
</style>