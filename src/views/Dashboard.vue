<template>
    <div>
        <v-row v-if="!loadingPeakFlow">
            <v-col>
                <v-card class="h-100">
                    <v-card-text>
                        <div v-if="getPeakFlow.length > 0">
                            <p>Laatst gemeten peak flow waarde:</p>
                            <div class="width-peakflow">
                                <peak-flow-measurement-circle :value="Math.max(getPeakFlow[0].measurement_one, getPeakFlow[0].measurement_two, getPeakFlow[0].measurement_three)" />
                            </div>
                        </div>
                        <div v-else>
                            Er zijn nog peak flow metingen ingevuld. Vul zo snel mogelijk jouw eerste <router-link class="peakflow-link" to="/peakflow/add">peak flow meting</router-link> in!
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="h-100">
                    <v-card-text class="h-100 d-flex flex-column">
                        <p class="">Je volgende medicijnen moet je nemen om:</p>
                        <div class="d-flex justify-center align-center flex-grow-1">
                            <p class="mb-0 medicine-time">XX:XX</p>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols=12>
                <airquality-overview />
            </v-col>
        </v-row>
        <v-progress-linear
            v-else
            rounded
            indeterminate
            color="accent"
        />
    </div>
</template>

<script>
import AirqualityOverview from '../components/Airquality/AirqualityOverview.vue'
import PeakFlowMeasurementCircle from '../components/PeakFlow/PeakFlowMeasurementCircle.vue';

export default {
    name: "Dashboard",
    data() {
        return {
        };
    },
    components: {
        AirqualityOverview,
        PeakFlowMeasurementCircle,
    },
    created() {
        this.$store.dispatch("setDefaultAppbar");
    },
    computed: {
        loadingPeakFlow() {
            return this.$store.getters.loadingPeakFlow;
        },
        getPeakFlow() {
            return this.$store.getters.getPeakFlow;
        },
    }
};
</script>

<style lang="scss" scoped>
.width-peakflow {
    max-width: 100px;
    margin: 0 auto;
}

.peakflow-link {
    color: $accent-color !important;
}

.h-100 {
    height: 100%;
}

.medicine-time {
    font-size: 1.7rem;
}
</style>
