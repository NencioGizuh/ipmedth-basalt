<template>
    <div>
        <v-form autocomplete="off">
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
            <v-btn class="mt-3" block color="accent" @click="manageTriggers">
                Opslaan
            </v-btn>
        </v-form>
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
            // TODO: Send changes to database
            this.$router.push("/account");
        }
    },
    computed: {
        getTriggers() {
            return this.$store.getters.triggers;
        }
    },
}
</script>

<style lang="scss">

</style>