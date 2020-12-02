<template>
    <div>
        <v-form autocomplete="off">
            <v-card>
                <v-card-text>
                    <p><strong>Meldingen ontvangen voor:</strong></p>
                    <v-checkbox
                        v-model="medicines"
                        label="Medicijnen innemen"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="peakflow"
                        label="Peak flow meten"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="breathingExercise"
                        label="Ademhalingsoefeningen doen"
                        hide-details="auto"
                    />
                    <v-checkbox
                        v-model="airQuality"
                        label="Concentraties per ug/m3"
                        hide-details="auto"
                    />
                </v-card-text>
            </v-card>
            <v-btn class="mt-3" block color="accent" @click="manageNotifications">
                Opslaan
            </v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    name: "ManageNotifications",
    data() {
        return {
            medicines: false,
            peakflow: false,
            breathingExercise: false,
            airQuality: false,
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Meldingen beheren",
                appbarCloseRoute: "/account",
            });
        });
    },
    created() {
        this.setNotificationsFromVuex();
    },
    methods: {
        setNotificationsFromVuex() {
            for (const prop in this.getNotifications) {
                this[prop] = this.getNotifications[prop];
            }
        },
        manageNotifications() {
            // TODO: Send changes to database
            this.$router.push("/account");
        }
    },
    computed: {
        getNotifications() {
            return this.$store.getters.notifications;
        }
    },
}
</script>

<style lang="scss">

</style>