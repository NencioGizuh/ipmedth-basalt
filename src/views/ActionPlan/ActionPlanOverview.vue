<template>
    <div>
        <v-btn outlined block color="primary" to="/actionplan/change">
            <v-icon left>mdi-pencil</v-icon>
            Actieplan aanpassen
        </v-btn>
        <v-dialog v-model="dialogZoneGreen" scrollable>
            <template v-slot:activator="{ on, attrs }">
                <v-card 
                    class="mt-3"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-card-title>
                        Groene zone
                        <v-spacer />
                        <v-icon :style="{ transform: 'rotate(90deg)' }">mdi-apple-keyboard-control</v-icon>
                    </v-card-title>
                </v-card>
            </template>
            <v-card>
                <v-card-title>
                    Groene zone
                    <v-spacer />
                    <v-btn icon @click="dialogZoneGreen = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <ul>
                        <li>Geen hoest</li>
                        <li>Geen piepende ademhaling</li>
                        <li>Geen benauwdheid tijdens de dag of nacht</li>
                    </ul>
                    <p class="mt-3">Peak flow waarde boven <strong>{{getPeakFlowZoneGreen}} l/min</strong></p>
                    <p class="mb-0">Neem je medicatie zoals je gewend bent. Je hoeft verder niks te doen.</p>
                    <div v-if="getActionPlan.zoneGreenExplanation">
                        <p class="mt-3 mb-1"><strong>Opmerkingen/afspraken:</strong></p>
                        <p class="mb-0">{{ getActionPlan.zoneGreenExplanation }}</p>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogZoneYellow" scrollable>
            <template v-slot:activator="{ on, attrs }">
                <v-card 
                    class="mt-3"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-card-title>
                        Gele zone
                        <v-spacer />
                        <v-icon :style="{ transform: 'rotate(90deg)' }">mdi-apple-keyboard-control</v-icon>
                    </v-card-title>
                </v-card>
            </template>
            <v-card>
                <v-card-title>
                    Gele zone
                    <v-spacer />
                    <v-btn icon @click="dialogZoneYellow = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <p class="mb-1">De volgende klachten nemen toe of komen terug:</p>
                    <ul>
                        <li>Hoesten</li>
                        <li>Benauwdheid</li>
                        <li>Slijm</li>
                    </ul>
                    <p class="mt-3 mb-1">Je hebt last van het volgende:</p>
                    <ul>
                        <li>Je wordt 's nachts wakker van je klachten.</li>
                        <li>Je kan je dagelijkse activiteiten niet goed doen.</li>
                        <li>Je gebruikt je medicatie meer dan 2 keer per dag.</li>
                    </ul>
                    <p class="mt-3">
                        Peak flow waarde is tussen de <strong>{{getPeakFlowZoneGreen-1}} en {{getPeakFlowZoneYellow}} l/min </strong>
                    </p>
                    <p>Neem 2 puffen salbutamol via voorzetkamer en herhaal dit elke 20 minuten gedurende één uur.</p>
                    <p class="mb-0">Neem rust en wacht tot de symptomen verbeteren. Als de symptomen na 48 uur niet verbeteren, ga dan door naar zone oranje!</p>
                    <div v-if="getActionPlan.zoneYellowMedicines">
                        <p class="mt-3 mb-1"><strong>Extra medicijnen nemen:</strong></p>
                        <ul class="mb-3">
                            <li v-for="medicine in getActionPlan.zoneYellowMedicines" :key="medicine">{{medicine}}</li>
                        </ul>
                    </div>
                    <div v-if="getActionPlan.zoneYellowExplanation">
                        <p class="mt-3 mb-1"><strong>Opmerkingen/afspraken:</strong></p>
                        <p class="mb-0">{{ getActionPlan.zoneYellowExplanation }}</p>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogZoneOrange" scrollable>
            <template v-slot:activator="{ on, attrs }">
                <v-card 
                    class="mt-3"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-card-title>
                        Oranje zone
                        <v-spacer />
                        <v-icon :style="{ transform: 'rotate(90deg)' }">mdi-apple-keyboard-control</v-icon>
                    </v-card-title>
                </v-card>
            </template>
            <v-card>
                <v-card-title>
                    Oranje zone
                    <v-spacer />
                    <v-btn icon @click="dialogZoneOrange = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <p>De klachen en/of peak flow zijn niet verbeterd in de afgelopen 48 uur.</p>
                    <p class="mb-0">Neem direct contact op met je long- of huisarts!</p>
                    <div v-if="getActionPlan.zoneOrangeExplanation">
                        <p class="mt-3 mb-1"><strong>Opmerkingen/afspraken:</strong></p>
                        <p class="mb-0">{{ getActionPlan.zoneOrangeExplanation }}</p>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn 
                        v-if="getPhoneNumberLungSpecialist" 
                        text 
                        color="accent" 
                        :href="`tel:${getPhoneNumberLungSpecialist}`"
                        @click="dialogZoneOrange = false"
                    >Longarts</v-btn>
                    <v-btn 
                        v-if="getPhoneNumberGP" 
                        text 
                        color="accent" 
                        :href="`tel:${getPhoneNumberGP}`"
                        @click="dialogZoneOrange = false"
                    >Huisarts</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogZoneRed" scrollable>
            <template v-slot:activator="{ on, attrs }">
                <v-card 
                    class="mt-3"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-card-title>
                        Rode zone
                        <v-spacer />
                        <v-icon :style="{ transform: 'rotate(90deg)' }">mdi-apple-keyboard-control</v-icon>
                    </v-card-title>
                </v-card>
            </template>
            <v-card>
                <v-card-title>
                    Rode zone
                    <v-spacer />
                    <v-btn icon @click="dialogZoneRed = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <p>Luchtwegverwijder werkt niet of je hebt het vaker dan elke 4 uur nodig.</p>
                    <ul>
                        <li>Je hebt moeite met lopen en/of praten.</li>
                        <li>Je hebt moeite met ademhalen.</li>
                        <li>Je hebt last van piepen en bent erg benauwd.</li>
                    </ul>
                    <p class="mt-3"><i>OF</i></p>
                    <p>Peak flow waarde is lager dan <strong>{{getPeakFlowZoneRed}} l/min</strong></p>
                    <p class="mb-1">Wat moet je doen?</p>
                    <ol>
                        <li>Zit rechtop en ga NIET liggen.</li>
                        <li>Neem 4 puffen salbutamol via voorzetkamer. Neem er na 5 minuten bij geen verbetering nog eens 4.</li> 
                        <li>Neem DIRECT contact op met je long- of huisarts. Bel bij geen gehoor direct 112.</li>
                    </ol>
                    <div v-if="getActionPlan.zoneRedMedicines">
                        <p class="mt-3 mb-1"><strong>Extra medicijnen nemen:</strong></p>
                        <ul class="mb-3">
                            <li v-for="medicine in getActionPlan.zoneRedMedicines" :key="medicine">{{medicine}}</li>
                        </ul>
                    </div>
                    <div v-if="getActionPlan.zoneRedExplanation">
                        <p class="mt-3 mb-1"><strong>Opmerkingen/afspraken:</strong></p>
                        <p class="mb-0">{{ getActionPlan.zoneRedExplanation }}</p>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn 
                        v-if="getPhoneNumberLungSpecialist" 
                        text 
                        color="accent" 
                        :href="`tel:${getPhoneNumberLungSpecialist}`"
                        @click="dialogZoneRed = false"
                    >Longarts</v-btn>
                    <v-btn 
                        v-if="getPhoneNumberGP" 
                        text 
                        color="accent" 
                        :href="`tel:${getPhoneNumberGP}`"
                        @click="dialogZoneRed = false"
                    >Huisarts</v-btn>
                    <!-- TODO: Change tel to 112 -->
                    <v-btn 
                        color="accent" 
                        depressed 
                        :href="`tel:1`" 
                        @click="dialogZoneRed = false"
                    >Bel 112</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-row class="pt-2">
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
</template>

<script>
export default {
    name: "ActionPlanOverview",
    data() {
        return {
            dialogZoneGreen: false,
            dialogZoneYellow: false,
            dialogZoneOrange: false,
            dialogZoneRed: false,
        }
    },
    created() {
        this.$store.dispatch('setDefaultAppbar');
        this.$store.dispatch('setPeakFlow'); // TODO: move to App.vue
    },
    computed: {
        getPeakFlowZoneGreen() {
            return this.$store.getters.getPeakFlowZoneGreen;
        },
        getPeakFlowZoneYellow() {
            return this.$store.getters.getPeakFlowZoneYellow;
        },
        getPeakFlowZoneRed() {
            return this.$store.getters.getPeakFlowZoneRed;
        },
        getPhoneNumberGP() {
            return this.$store.getters.getPhoneNumberGP;
        },
        getPhoneNumberLungSpecialist() {
            return this.$store.getters.getPhoneNumberLungSpecialist;
        },
        getActionPlan() {
            return this.$store.getters.getActionPlan;
        },
    }
}
</script>

<style lang="scss">

</style>