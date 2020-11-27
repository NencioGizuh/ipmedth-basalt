<template>
    <div>
        <v-btn outlined block color="primary" to="/actionplan/change">
            <v-icon left>mdi-pencil</v-icon>
            Actieplan aanpassen
        </v-btn>
        <v-dialog v-model="dialogZoneGreen" persistent>
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
                    <!-- TODO: Describe medicines -->
                    <p class="mb-0">Neem rust en wacht tot de symptomen verbeteren. Als de symptomen na 48 uur niet verbeteren, ga dan door naar zone oranje!</p>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogZoneOrange" persistent>
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
                </v-card-text>
                <v-card-actions>
                    <!-- TODO: Open numbers on call screen -->
                    <v-btn 
                        v-if="getPhoneNumberLungSpecialist" 
                        text 
                        color="accent" 
                        @click="dialogZoneOrange = false"
                    >Longarts</v-btn>
                    <v-btn 
                        v-if="getPhoneNumberGP" 
                        text 
                        color="accent" 
                        @click="dialogZoneOrange = false"
                    >Huisarts</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogZoneRed" persistent>
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
                        <li>Neem medicijnen</li> <!-- TODO: Describe medicines -->
                        <li>Neem DIRECT contact op met je long- of huisarts. Bel bij geen gehoor direct 112.</li>
                    </ol>

                </v-card-text>
                <v-card-actions>
                    <!-- TODO: Open numbers on call screen -->
                    <v-btn 
                        v-if="getPhoneNumberLungSpecialist" 
                        text 
                        color="accent" 
                        @click="dialogZoneRed = false"
                    >Longarts</v-btn>
                    <v-btn 
                        v-if="getPhoneNumberGP" 
                        text 
                        color="accent" 
                        @click="dialogZoneRed = false"
                    >Huisarts</v-btn>
                    <v-btn 
                        color="accent" 
                        depressed 
                        @click="dialogZoneRed = false"
                    >Bel 112</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-card v-if="getPhoneNumberGP || getPhoneNumberLungSpecialist" class="mt-3" color="accent" dark>
            <v-card-text>
                <p v-if="getPhoneNumberGP" class="body-1" :class="getPhoneNumberLungSpecialist ? '' : 'mb-0'">
                    <strong>Huisarts:</strong> {{getPhoneNumberGP}}
                </p>
                <p v-if="getPhoneNumberLungSpecialist" class="mb-0 body-1">
                    <strong>Longarts:</strong> {{getPhoneNumberLungSpecialist}}
                </p>
            </v-card-text>
        </v-card>
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
    }
}
</script>

<style lang="scss">

</style>