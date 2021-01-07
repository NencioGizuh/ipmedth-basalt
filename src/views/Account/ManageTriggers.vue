<template>
    <div>
        <v-form v-if="!loadingTriggers" autocomplete="off">
            <v-card>
                <v-card-text>
                    <p><strong>Wat triggert jouw astma?</strong></p>
                    <v-checkbox
                        v-model="tabaccoSmoke"
                        label="Tabaksrook"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="dustMites"
                        label="Huisstofmijt"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="airPollution"
                        label="Luchtverontreiniging"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="pets"
                        label="Huisdieren"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="fungi"
                        label="Schimmels"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="fireSmoke"
                        label="Vuurrook"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="infections"
                        label="Infecties"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="effort"
                        label="Inspanning"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="weatherConditions"
                        label="Weersomstandigheden"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="hyperventilation"
                        label="Hyperventilatie"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="pollen"
                        label="Pollen"
                        hide-details="auto"
                    />
                </v-card-text>
            </v-card>
            <v-btn class="mt-3" block color="accent" @click="manageTriggers" :loading="loading" :disabled="loading">
                Opslaan
            </v-btn>
        </v-form>
        <v-progress-linear
            v-else
            rounded
            indeterminate
            color="accent"
        />
    </div>
</template>

<script>
export default {
    name: "ManageTriggers",
    data() {
        return {
            tabaccoSmoke: false,
            dustMites: false,
            airPollution: false,
            pets: false,
            fungi: false,
            fireSmoke: false,
            infections: false,
            effort: false,
            weatherConditions: false,
            hyperventilation: false,
            pollen: false,
            loading: false,
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Triggers beheren",
                appbarCloseRoute: "/account",
            });
        });
    },
    created() {
        this.setTriggersFromVuex();
    },
    methods: {
        setTriggersFromVuex() {
            for (const prop in this.getTriggers) {
                this[prop] = this.getTriggers[prop];
            }
        },
        manageTriggers() {
            const data = {
                tabaccoSmoke: this.tabaccoSmoke,
                dust_mites: this.dustMites,
                air_pollution: this.airPollution,
                pets: this.pets,
                fungi: this.fungi,
                fire_smoke: this.fireSmoke,
                infections: this.infections,
                effort: this.effort,
                weather_conditions: this.weatherConditions,
                hyperventilation: this.hyperventilation,
                pollen: this.pollen,
            }

            this.loading = true;

            this.$store.dispatch("updateTriggers", data);
        }
    },
    watch: {
        loadingTriggers() {
            this.setTriggersFromVuex();
        }
    },
    computed: {
        getTriggers() {
            return this.$store.getters.triggers;
        },
        loadingTriggers() {
            return this.$store.getters.loadingTriggers;
        },
    },
}
</script>

<style lang="scss">

</style>