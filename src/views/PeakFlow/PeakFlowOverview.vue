<template>
    <div>
        <div v-if="!loadingPeakFlow">
            <v-btn outlined block color="primary" to="/peakflow/add">
                <v-icon left>mdi-plus</v-icon>
                Nieuwe meting toevoegen
            </v-btn>
            
            <v-card class="mt-3" v-if="getPeakFlow.length > 0">
                <v-card-text>
                    <div v-if="getDaysAgo(getPeakFlow[0].date) > 2">
                        Het is al {{getDaysAgo(getPeakFlow[0].date)}} dagen geleden dat je je laatste peak flow meting hebt ingevoerd. Door het doen van peak flow metingen kan je beter handelen naar je astma. Voer dus zo snel mogelijk weer een meting uit!
                    </div>
                    <div v-else>
                        <div v-if="getZone(Math.max(getPeakFlow[0].measurement_one, getPeakFlow[0].measurement_two, getPeakFlow[0].measurement_three)) === 'groene'">
                            Jouw laatste peak flow meting van {{getPeakFlow[0].date | formatDate}} bevindt zich in de <b>{{getZone(Math.max(getPeakFlow[0].measurement_one, getPeakFlow[0].measurement_two, getPeakFlow[0].measurement_three))}} zone</b>. Blijf je medicatie nemen zoals voorgeschreven om dit vol te blijven houden!
                        </div>
                        <div v-if="getZone(Math.max(getPeakFlow[0].measurement_one, getPeakFlow[0].measurement_two, getPeakFlow[0].measurement_three)) === 'gele'">
                            Jouw laatste peak flow meting van {{getPeakFlow[0].date | formatDate}} bevindt zich in de <b>{{getZone(Math.max(getPeakFlow[0].measurement_one, getPeakFlow[0].measurement_two, getPeakFlow[0].measurement_three))}} zone</b>. Ga naar het <router-link class="actionplan-link" to="/actionplan">actieplan</router-link> om te kijken hoe je je klachten kan verbeteren. Mochten de klachten langer dan 48 uur aanhouden, ga dan naar de oranje zone!
                        </div>
                        <div v-if="getZone(Math.max(getPeakFlow[0].measurement_one, getPeakFlow[0].measurement_two, getPeakFlow[0].measurement_three)) === 'rode'">
                            <p>
                                Jouw laatste peak flow meting van {{getPeakFlow[0].date | formatDate}} bevindt zich in de <b>{{getZone(Math.max(getPeakFlow[0].measurement_one, getPeakFlow[0].measurement_two, getPeakFlow[0].measurement_three))}} zone</b>! Neem contact op met jouw long- of huisarts! Kijk verder naar het <router-link class="actionplan-link" to="/actionplan">actieplan</router-link> om te zien welke handelingen je moet ondernemen.
                            </p>
                            <v-row>
                                <v-col v-if="getPhoneNumberGP">
                                    <v-btn 
                                        block
                                        color="accent" 
                                        :href="`tel:${getPhoneNumberGP}`"
                                    >Bel Huisarts</v-btn>
                                </v-col>
                                <v-col v-if="getPhoneNumberLungSpecialist">
                                    <v-btn 
                                        block 
                                        color="accent" 
                                        :href="`tel:${getPhoneNumberLungSpecialist}`"
                                    >Bel Longarts</v-btn>
                                </v-col>
                            </v-row>
                        </div>
                    </div>     
                </v-card-text>
            </v-card>

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
        <v-snackbar
            v-model="snackbar"
            :timeout="2000"
        >
            {{snackbarText}}

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="primary"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    Sluit
                </v-btn>
            </template>
        </v-snackbar>
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
            snackbarText: "",
            snackbar: false,
        }
    },
    components: {
        PeakFlowCardChart,
        PeakFlowMeasurementCircle,
    },
    created() {
        this.$store.dispatch('setDefaultAppbar');

        setTimeout(() => {
            if (this.$route.query.add === "succes") {
                this.$router.replace('/peakflow');
                this.snackbarText = "De peak flow meting is succesvol toegevoegd."
                this.snackbar = true;
            } else if (this.$route.query.delete === "succes") {
                this.$router.replace('/peakflow');
                this.snackbarText = "De peak flow meting is succesvol verwijderd."
                this.snackbar = true;
            } else if (this.$route.query.share === "succes") {
                this.$router.replace('/peakflow');
                this.snackbarText = "De peak flow meting is succesvol gedeeld met jouw zorgverlener(s)."
                this.snackbar = true;
            }
        }, 200);
    },
    computed: {
        getPeakFlow() {
            return this.$store.getters.getPeakFlow;
        },
        loadingPeakFlow() {
            return this.$store.getters.loadingPeakFlow;
        },
        getPhoneNumberGP() {
            return this.$store.getters.getPhoneNumberGP;
        },
        getPhoneNumberLungSpecialist() {
            return this.$store.getters.getPhoneNumberLungSpecialist;
        },
    },
    methods: {
        goToMeasurement(peakflowId) {
            this.$router.push(`/peakflow/${peakflowId}`)
        },
        getDaysAgo(date) {
            const today = new Date();
            return Math.floor((Date.parse(today) - Date.parse(date)) / 86400000);
        },
        getZone(value) {
            if (value > this.$store.getters.getPeakFlowZoneGreen) {
                return "groene";
            } else if (value > this.$store.getters.getPeakFlowZoneYellow) {
                return "gele";
            } else {
                return "rode";
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.actionplan-link {
    color: $accent-color !important;
}
</style>
