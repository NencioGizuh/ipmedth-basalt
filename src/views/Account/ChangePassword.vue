<template>
    <div>
        <v-form autocomplete="off">
            <v-card>
                <v-card-text>
                    <p class="mb-1">Oud wachtwoord</p>
                    <v-text-field
                        v-model="oldPassword"
                        outlined 
                        dense
                        :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showOldPassword ? 'text' : 'password'"
                        @click:append="showOldPassword = !showOldPassword"
                    />
                    <p class="mb-1">Nieuw wachtwoord</p>
                    <v-text-field
                        v-model="newPassword"
                        outlined 
                        dense
                        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showNewPassword ? 'text' : 'password'"
                        @click:append="showNewPassword = !showNewPassword"
                    />
                    <p class="mb-1">Herhaal nieuw wachtwoord</p>
                    <v-text-field
                        v-model="repeatNewPassword"
                        outlined 
                        dense
                        :append-icon="showRepeatNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showRepeatNewPassword ? 'text' : 'password'"
                        @click:append="showRepeatNewPassword = !showRepeatNewPassword"
                    />
                </v-card-text>
            </v-card>
            <v-btn class="mt-3" block color="accent" @click="resetPassword">
                Reset wachtwoord
            </v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    name: "ChangePassword",
    data() {
        return {
            oldPassword: "",
            newPassword: "",
            repeatNewPassword: "",
            showOldPassword: false,
            showNewPassword: false,
            showRepeatNewPassword: false,
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Wachtwoord wijzigen",
                appbarCloseRoute: "/account",
            });
        });
    },
    methods: {
        resetPassword() {
            // TODO: Check if old password is correct
            // Check if newPassword and repeatNewPassword are the same
            // Send new password to database

            this.$router.push("/account");
        }
    }
}
</script>

<style lang="scss">

</style>