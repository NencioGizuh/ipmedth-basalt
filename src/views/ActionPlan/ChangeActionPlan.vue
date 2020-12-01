<template>
    <div>
        <v-form @submit="submitForm" autocomplete="off">
            <v-card>
                <v-card-text>
                    <p class="font-weight-bold body-2">Groen zone</p>
                    <p class="mb-1">De peak flow is boven de ... <u>voor</u> medicatie:</p>
                    <v-text-field
                        v-model="zoneGreenPeakFlowBeforeMedicines"
                        outlined 
                        dense
                        type="number"
                        suffix="l/min"
                    />
                    <p class="mb-1">De peak flow is boven de ... <u>na</u> medicatie:</p>
                    <v-text-field
                        v-model="zoneGreenPeakFlowAfterMedicines"
                        outlined 
                        dense
                        type="number"
                        suffix="l/min"
                    />
                    <p class="mb-1">Overige opmerkingen/afspraken</p>
                    <v-textarea
                        name="zoneGreenExplanation"
                        v-model="zoneGreenExplanation"
                        outlined 
                        dense
                    />
                </v-card-text>
            </v-card>   

            <v-card class="mt-3">
                <v-card-text>
                    <p class="font-weight-bold body-2">Gele zone</p>
                    <p class="mb-1">De peak flow is onder de:</p>
                    <v-text-field
                        v-model="zoneYellowPeakFlowBelow"
                        outlined 
                        dense
                        type="number"
                        suffix="l/min"
                    />
                    <p class="mb-1">De peak flow is boven de:</p>
                    <v-text-field
                        v-model="zoneYellowPeakFlowAbove"
                        outlined 
                        dense
                        type="number"
                        suffix="l/min"
                    />
                    <p class="mb-1">Welke extra medicijnen moet je nemen?</p>
                    <v-combobox
                        v-model="zoneYellowMedicines"
                        :items="medicines"
                        multiple
                        outlined
                        dense
                    />
                    <p class="mb-1">Overige opmerkingen/afspraken</p>
                    <v-textarea
                        name="zoneYellowExplanation"
                        v-model="zoneYellowExplanation"
                        outlined 
                        dense
                    />
                </v-card-text>
            </v-card>

            <v-card class="mt-3">
                <v-card-text>
                    <p class="font-weight-bold body-2">Oranje zone</p>
                    <p class="mb-1">Telefoonnummer huisarts</p>
                    <v-text-field
                        v-model="phoneNumberGP"
                        outlined 
                        dense
                        type="number"
                    />
                    <p class="mb-1">Telefoonnummer longarts</p>
                    <v-text-field
                        v-model="phoneNumberLungSpecialist"
                        outlined 
                        dense
                        type="number"
                    />
                    <p class="mb-1">Overige opmerkingen/afspraken</p>
                    <v-textarea
                        name="zoneOrangeExplanation"
                        v-model="zoneOrangeExplanation"
                        outlined 
                        dense
                    />
                </v-card-text>
            </v-card>

            <v-card class="mt-3">
                <v-card-text>
                    <p class="font-weight-bold body-2">Rode zone</p>
                    <p class="mb-1">De peak flow is onder de:</p>
                    <v-text-field
                        v-model="zoneRedPeakFlow"
                        outlined 
                        dense
                        type="number"
                        suffix="l/min"
                    />
                    <p class="mb-1">Welke extra medicijnen moet je nemen?</p>
                    <v-combobox
                        v-model="zoneRedMedicines"
                        :items="medicines"
                        multiple
                        outlined
                        dense
                    />
                    <p class="mb-1">Overige opmerkingen/afspraken</p>
                    <v-textarea
                        name="zoneOrangeExplanation"
                        v-model="zoneRedExplanation"
                        outlined 
                        dense
                    />
                </v-card-text>
            </v-card>

            <v-btn block color="accent" class="mt-4" type="submit">
                Opslaan
            </v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    name: "ChangeActionPlan",
    data() {
        return {
            zoneGreenPeakFlowBeforeMedicines: null,
            zoneGreenPeakFlowAfterMedicines: null,
            zoneGreenExplanation: null,
            zoneYellowPeakFlowBelow: null,
            zoneYellowPeakFlowAbove: null,
            zoneYellowMedicines: null,
            zoneYellowExplanation: null,
            phoneNumberGP: null,
            phoneNumberLungSpecialist: null,
            zoneOrangeExplanation: null,
            zoneRedPeakFlow: null,
            zoneRedMedicines: null,
            zoneRedExplanation: null,
            medicines: [ // TODO: Change to real medicines
                'Medicine 1',
                'Medicine 2',
                'Medicine 3',
                'Medicine 4',
            ],
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Actieplan aanpassen",
                appbarCloseRoute: "/actionplan",
            });
        });
    },
    created() {
        // TODO: Retrieve data from database and fill values
        this.$store.dispatch("setActionPlanFromDatabase");
        this.setActionPlanFromVuex();
    },
    methods: {
        setActionPlanFromVuex() {
            for (const prop in this.getActionPlan) {
                this[prop] = this.getActionPlan[prop];
            }
        },
        submitForm (e) {
            e.preventDefault();

            const data = {
                zoneGreenPeakFlowBeforeMedicines: this.zoneGreenPeakFlowBeforeMedicines,
                zoneGreenPeakFlowAfterMedicines: this.zoneGreenPeakFlowAfterMedicines,
                zoneGreenExplanation: this.zoneGreenExplanation,
                zoneYellowPeakFlowBelow: this.zoneYellowPeakFlowBelow,
                zoneYellowPeakFlowAbove: this.zoneYellowPeakFlowAbove,
                zoneYellowMedicines: this.zoneYellowMedicines,
                zoneYellowExplanation: this.zoneYellowExplanation,
                phoneNumberGP: this.phoneNumberGP,
                phoneNumberLungSpecialist: this.phoneNumberLungSpecialist,
                zoneOrangeExplanation: this.zoneOrangeExplanation,
                zoneRedPeakFlow: this.zoneRedPeakFlow,
                zoneRedMedicines: this.zoneRedMedicines,
                zoneRedExplanation: this.zoneRedExplanation,
            };

            console.log(data);

            // TODO: Send data to API
            this.$store.dispatch("setActionPlan", data);

            this.$router.push("/actionplan");
        }
    },
    computed: {
        getActionPlan() {
            return this.$store.getters.getActionPlan;
        }
    }
}
</script>

<style lang="scss">

</style>