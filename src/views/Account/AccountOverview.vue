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

        <v-btn class="mt-3" block color="accent" @click="logout">
            <v-icon left>mdi-logout</v-icon>
            Uitloggen
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "AccountOverview",
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch("setUser");

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
            // TODO: Logout user
            this.$router.push("/");
        }
    }
}
</script>

<style lang="scss">

</style>