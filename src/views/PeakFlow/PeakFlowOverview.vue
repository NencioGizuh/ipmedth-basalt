<template>
    <div>
        <v-btn outlined block color="primary" to="/peakflow/add">
            <v-icon left>mdi-plus</v-icon>
            Nieuwe meting toevoegen
        </v-btn>

        <v-card class="mt-3">
            <v-card-title>Laatste metingen</v-card-title>
            <v-card-text>
                <v-row 
                    v-for="peakflow in getPeakFlow.slice(0, showMeasurements)" 
                    :key="peakflow.id" 
                    @click="goToMeasurement(peakflow.id)"
                >
                    <v-col cols="4">
                        <peak-flow-measurement-circle :value="Math.max(peakflow.measurementOne, peakflow.measurementTwo, peakflow.measurementThree)" />
                    </v-col>
                    <v-col class="d-flex flex-column justify-center">
                        <p class="font-weight-bold mb-1">{{peakflow.date}}, {{peakflow.time}}</p>
                        <p class="mb-1">{{peakflow.explanation}}</p>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn v-if="showMeasurements > 4" small text @click="showMeasurements -= 4">
                    Laad minder
                </v-btn>
                <v-btn v-if="showMeasurements == 4" small text @click="showMeasurements += 4">
                    Laad meer
                </v-btn>
            </v-card-actions>
        </v-card>

        <peak-flow-card-chart />
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
        this.$store.dispatch('setPeakFlow');
    },
    computed: {
        getPeakFlow() {
            return this.$store.getters.getPeakFlow;
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
