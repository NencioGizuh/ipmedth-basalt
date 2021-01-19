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
                    <v-card-text v-if="loadingTime" class="h-100 d-flex flex-column">
                        <p>Je volgende medicijnen moet je nemen om:</p>
                        <div class="d-flex justify-center align-center flex-grow-1">
                            <p class="mb-0 medicine-time">{{time}}</p>
                        </div>
                    </v-card-text>
                    <v-card-text v-else>
                        <p>Er zijn geen medicijnen geregistreerd.</p>
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
import moment from 'moment';

export default {
    name: "Dashboard",
    data() {
        return {
            loadingTime: true,
            time: null
        };
    },
    components: {
        AirqualityOverview,
        PeakFlowMeasurementCircle,
    },
    created() {
        this.$store.dispatch("setDefaultAppbar");
        this.getMedicationTimeUser();
    },
    watch: {
        medicijnen_tijden() {
            this.getMedicationTimeUser();
        }
    },
    methods: {
        getMedicationTimeUser() {
            const medicijnen = this.$store.getters.medicijnen_tijden;

            if(medicijnen.length === 0) {
                this.loadingTime = false;
                return null;
            }

            const times = [];

            for(let i=0; i<medicijnen.length; i++) {
                times.push(medicijnen[i].time);
            }

            times.sort((a,b) => {
                return (a < b) ? 1 : ((a > b) ? -1 : 0);
            });

            const now = moment(new Date()).locale('nl').format('HH:mm:ss');

            for(let i=0; i<times.length; i++) {
                if (times[i] > now) {
                    this.time = times[i].substring(0, 5);
                }
            }

            this.loadingTime = true;
        }
    },
    computed: {
        loadingPeakFlow() {
            return this.$store.getters.loadingPeakFlow;
        },
        getPeakFlow() {
            return this.$store.getters.getPeakFlow;
        },
        medicijnen_tijden(){
            return this.$store.getters.medicijnen_tijden;
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
