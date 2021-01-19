<template>
    <div>
        <v-card to="/account/changepersonalinformation">
            <v-card-text>
                <v-icon left>mdi-account</v-icon>
                Persoonlijke gegevens
            </v-card-text> 
        </v-card>

        <v-card class="mt-3" to="/account/changepassword">
            <v-card-text>
                <v-icon left>mdi-lock</v-icon>
                Wachtwoord wijzigen
            </v-card-text>
        </v-card>

        <v-card class="mt-3" to="/account/managenotifications">
            <v-card-text>
                <v-icon left>mdi-bell</v-icon>
                Meldingen beheren
            </v-card-text>
        </v-card>

        <v-card class="mt-3" to="/account/managetriggers">
            <v-card-text>
                <v-icon left>mdi-lungs</v-icon>
                Triggers beheren
            </v-card-text>
        </v-card>

        <v-btn class="mt-3" block color="accent" @click="logout" :loading="loading" :disabled="loading">
            <v-icon left>mdi-logout</v-icon>
            Uitloggen
        </v-btn>

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
export default {
    name: "AccountOverview",
    data() {
        return {
            loading: false,
            snackbarText: null,
            snackbar: false,
        }
    },
    created() {
        setTimeout(() => {
            if (this.$route.query.personal === "succes") {
                this.$router.replace('/account');
                this.snackbarText = "Jouw persoonlijke gegevens zijn succesvol gewijzigd."
                this.snackbar = true;
            } else if (this.$route.query.password === "succes") {
                this.$router.replace('/account');
                this.snackbarText = "Jouw wachtwoord is succesvol gewijzigd."
                this.snackbar = true;
            } else if (this.$route.query.notifications === "succes") {
                this.$router.replace('/account');
                this.snackbarText = "Jouw meldingen zijn succesvol gewijzigd."
                this.snackbar = true;
            } else if (this.$route.query.triggers === "succes") {
                this.$router.replace('/account');
                this.snackbarText = "Jouw triggers zijn succesvol gewijzigd."
                this.snackbar = true;
            }
        }, 200);
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (!vm.$store.getters.user) {
                vm.$store.dispatch("setUser");
            }
            
            if (!from.path.match(/account/)) {
                localStorage.setItem("prevRouteAccount", from.path);
            }

            vm.$store.dispatch('setAppbarDetails', {
                appbarText: vm.$store.getters.user.name,
                appbarCloseRoute: localStorage.getItem("prevRouteAccount"),
            });
        });
    },
    methods: {
        logout() {
            this.loading = true;
            this.$store.dispatch("logout");
        }
    }
}
</script>

<style lang="scss">

</style>