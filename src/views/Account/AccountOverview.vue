<template>
    <div>
        <v-btn block to="/account/changepersonalinformation">
            <v-icon left>mdi-account</v-icon>
            Persoonlijke gegevens
        </v-btn>
        <v-btn block to="/account/changepassword">
            <v-icon left>mdi-lock</v-icon>
            Wachtwoord wijzigen
        </v-btn>
        <v-btn block to="/account/managenotifications">
            <v-icon left>mdi-bell</v-icon>
            Meldingen beheren
        </v-btn>
        <v-btn block to="/account/managetriggers">
            <v-icon left>mdi-lungs</v-icon>
            Triggers beheren
        </v-btn>

        AccountOverview
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
            if (!from.path.match(/account/)) {
                localStorage.setItem("prevRouteAccount", from.path);
            }

            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "USER_NAME", // TODO: Must be changed to logged in user
                appbarCloseRoute: localStorage.getItem("prevRouteAccount"),
            });
        });
    }, 
}
</script>

<style lang="scss">

</style>