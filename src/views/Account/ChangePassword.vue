<template>
    <div>
        <v-form ref="form" autocomplete="off" @submit="resetPassword" lazy-validation>
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
                        :rules="rules.oldPasswordRules"
                        :error-messages="errorMessages"
                    />
                    <p class="mb-1">Nieuw wachtwoord</p>
                    <v-text-field
                        v-model="newPassword"
                        outlined 
                        dense
                        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showNewPassword ? 'text' : 'password'"
                        @click:append="showNewPassword = !showNewPassword"
                        :rules="rules.newPasswordRules"
                    />
                    <p class="mb-1">Herhaal nieuw wachtwoord</p>
                    <v-text-field
                        v-model="repeatNewPassword"
                        outlined 
                        dense
                        :append-icon="showRepeatNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showRepeatNewPassword ? 'text' : 'password'"
                        @click:append="showRepeatNewPassword = !showRepeatNewPassword"
                        :rules="rules.repeatNewPasswordRules"
                    />
                </v-card-text>
            </v-card>
            <v-btn class="mt-3" block color="accent" type="submit" :loading="loading" :disabled="loading">
                Reset wachtwoord
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import axios from 'axios';

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
            loading: false,
            rules: {
                oldPasswordRules: [
                    (v) => !!v || "Oude wachtwoord is vereist",
                    (v) => v.length >= 6 || "Minimaal 6 karakters",
                ],
                newPasswordRules: [
                    (v) => !!v || "Nieuw wachtwoord is vereist",
                    (v) => v.length >= 6 || "Minimaal 6 karakters",
                ],
                repeatNewPasswordRules: [
                    (v) => !!v || "Nieuw wachtwoord moet worden herhaald",
                    (v) => (!!v && v) === this.newPassword || "Wachtwoorden komen niet overeen",
                ],
            },
            errorMessages: null
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
        resetPassword(e) {
            e.preventDefault()

            if (!this.$refs.form.validate()) return;

            this.loading = true;
            
            const data = {
                old_password: this.oldPassword,
                new_password: this.newPassword,
            }

            axios.put('http://localhost:8000/api/changepassword', data, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                } 
            }).then(() => {
                this.$router.push("/account");
            }).catch(() => {
                this.loading = false;
                this.errorMessages = "Verkeerd wachtwoord";
            });
        }
    },
    watch: {
        oldPassword() {
            this.errorMessages = null;
        },
    }
}
</script>

<style lang="scss">

</style>