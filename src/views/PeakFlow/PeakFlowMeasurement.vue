<template>
    <div>
        <v-card>
            <v-card-title>
                    Meting van {{getPeakFlowById.date}}, {{getPeakFlowById.time}}
            </v-card-title>
            <v-card-text>
                    <p class="font-weight-bold mb-1">Metingen:</p>
                    <v-row>
                        <v-col>
                            <peak-flow-measurement-circle :value="getPeakFlowById.measurementOne" />
                        </v-col>
                        <v-col>
                            <peak-flow-measurement-circle :value="getPeakFlowById.measurementTwo" />
                        </v-col>
                        <v-col>
                            <peak-flow-measurement-circle :value="getPeakFlowById.measurementThree" />
                        </v-col>
                    </v-row>

                    <p class="font-weight-bold my-1">Medicijnen ingenomen?</p>
                    <p>{{getPeakFlowById.takenMedicines ? "Ja" : "Nee"}}</p>
                    
                    <p class="font-weight-bold mb-1">Toelichting:</p>
                    <p>{{getPeakFlowById.explanation || "-"}}</p>
            </v-card-text>
        </v-card>
        <v-row dense class="mt-3">
            <v-col>
                <v-btn block color="accent" outlined @click="deleteMeasurement">
                    <v-icon left>mdi-trash-can</v-icon>
                    Verwijderen
                </v-btn>
            </v-col>
            <v-col>
                <v-btn block color="accent"  @click="shareMeasurement">
                    <v-icon left>mdi-share</v-icon>
                    Delen
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import PeakFlowMeasurementCircle from "@/components/PeakFlow/PeakFlowMeasurementCircle.vue";

export default {
    name: "PeakFlowMeasurement",
    data() {
        return {
            
        }
    },
    components: {
        PeakFlowMeasurementCircle
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Peak flow meting",
                appbarCloseRoute: "/peakflow",
            });
        });
    }, 
    created() {
        this.$store.dispatch("setPeakFlowById", this.$route.params.peak_flow_id);
    },
    computed: {
        getPeakFlowById() {
            return this.$store.getters.getPeakFlowById;
        }
    },
    methods: {
        deleteMeasurement() {
            // TODO: Delete this measurement 
        },
        shareMeasurement() {
            this.$router.push(`/peakflow/${this.$route.params.peak_flow_id}/share`);
        }
    }
}
</script>

<style lang="scss">

</style>