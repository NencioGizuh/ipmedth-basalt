<template>
    <div>
        <v-card>
            <v-card-title>
                    Meting van {{getPeakFlowById.date | formatDate}}, {{getPeakFlowById.time.slice(0,5)}}
            </v-card-title>
            <v-card-text>
                    <p class="font-weight-bold mb-1">Metingen:</p>
                    <v-row>
                        <v-col>
                            <peak-flow-measurement-circle :value="getPeakFlowById.measurement_one" />
                        </v-col>
                        <v-col>
                            <peak-flow-measurement-circle :value="getPeakFlowById.measurement_two" />
                        </v-col>
                        <v-col>
                            <peak-flow-measurement-circle :value="getPeakFlowById.measurement_three" />
                        </v-col>
                    </v-row>

                    <p class="font-weight-bold my-1">Medicijnen ingenomen?</p>
                    <p>{{getPeakFlowById.taken_medicines ? "Ja" : "Nee"}}</p>

                    <div v-if="getPeakFlowById.explanation">
                        <p class="font-weight-bold mb-1">Toelichting:</p>
                        <p>{{getPeakFlowById.explanation || "-"}}</p>
                    </div>
            </v-card-text>
        </v-card>
        <v-row dense class="mt-3">
            <v-col>
                <v-dialog v-model="dialogDelete">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn block color="accent" outlined v-bind="attrs" v-on="on">
                            <v-icon left>mdi-trash-can</v-icon>
                            Verwijderen
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            Meting verwijderen
                            <v-spacer />
                            <v-btn icon @click="dialogDelete = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-text>
                            <p>Weet u zeker dat u de meting van {{getPeakFlowById.date | formatDate}}, {{getPeakFlowById.time.slice(0,5)}} wilt verwijderen?</p>
                            <p class="mb-0">Als u de meting nu verwijderd, kan deze nooit meer terug gehaald worden.</p>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                text 
                                color="accent" 
                                @click="dialogDelete = false"
                            >Annuleer</v-btn>
                            <v-btn 
                                text
                                color="accent"
                                @click="deleteMeasurement"
                            >Verwijder</v-btn>
                        </v-card-actions>
                        <v-progress-linear
                            v-if="measurementDelete"
                            rounded
                            indeterminate
                            color="accent"
                        />
                    </v-card>
                </v-dialog>
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
            dialogDelete: false,
            measurementDelete: false,
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
            this.measurementDelete = true;
            this.$store.dispatch("deletePeakFlow", this.$route.params.peak_flow_id);
        },
        shareMeasurement() {
            this.$router.push(`/peakflow/${this.$route.params.peak_flow_id}/share`);
        }
    }
}
</script>

<style lang="scss">

</style>