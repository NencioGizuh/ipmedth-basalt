<template>
    <div>
        <div v-if="!loadingPeakFlow">
            <v-btn outlined block color="primary" to="/peakflow/add">
                <v-icon left>mdi-plus</v-icon>
                Nieuwe meting toevoegen
            </v-btn>

            <v-card class="mt-3">
                <v-card-title>Laatste metingen</v-card-title>
                <v-card-text v-if="getPeakFlow.length > 0">
                    <v-row 
                        v-for="peakflow in getPeakFlow.slice(0, showMeasurements)" 
                        :key="peakflow.id" 
                        @click="goToMeasurement(peakflow.id)"
                    >
                        <v-col cols="4">
                            <peak-flow-measurement-circle :value="Math.max(peakflow.measurement_one, peakflow.measurement_two, peakflow.measurement_three)" />
                        </v-col>
                        <v-col class="d-flex flex-column justify-center">
                            <p class="font-weight-bold mb-1">{{peakflow.date | formatDate}}, {{peakflow.time.slice(0,5)}}</p>
                            <p class="mb-1" v-if="peakflow.explanation">{{peakflow.explanation}}</p>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-text v-else>
                    Er zijn nog geen peak flow metingen ingevuld.
                </v-card-text>
                <v-card-actions v-if="getPeakFlow.length > 4">
                    <v-btn v-if="showMeasurements > 4" small text @click="showMeasurements -= 4">
                        Laad minder
                    </v-btn>
                    <v-btn v-if="showMeasurements == 4" small text @click="showMeasurements += 4">
                        Laad meer
                    </v-btn>
                </v-card-actions>
            </v-card>

            <peak-flow-card-chart v-if="getPeakFlow.length > 0" />
        </div>
        <v-progress-linear
            v-else
            rounded
            indeterminate
            color="accent"
        />
    </div>
</template>

<script>
import PeakFlowCardChart from "@/components/PeakFlow/PeakFlowCardChart.vue";
import PeakFlowMeasurementCircle from "@/components/PeakFlow/PeakFlowMeasurementCircle.vue";

export default {
    name: "PeakFlowOverview",
    data() {
        return {
            showMeasurements: 4,
        }
    },
    components: {
        PeakFlowCardChart,
        PeakFlowMeasurementCircle,
    },
    created() {
        this.$store.dispatch('setDefaultAppbar');
    },
    computed: {
        getPeakFlow() {
            return this.$store.getters.getPeakFlow;
        },
        loadingPeakFlow() {
            return this.$store.getters.loadingPeakFlow;
        },
    },
    methods: {
        goToMeasurement(peakflowId) {
            this.$router.push(`/peakflow/${peakflowId}`)
        }
    }
}
</script>

<style lang="scss">

</style>
