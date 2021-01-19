<template>
    <div>
        <v-form v-if="!loadingUser" @submit="changePersonalInformation" autocomplete="off" ref="form" lazy-validation>
            <v-card>
                <v-card-text>
                    <p class="mb-1">Naam</p>
                    <v-text-field
                        v-model="name"
                        outlined 
                        dense
                        :rules="rules.nameRules"
                    />
                    <p class="mb-1">Email</p>
                    <v-text-field
                        v-model="email"
                        outlined 
                        dense
                        :rules="rules.emailRules"
                        :error-messages="errorMessages.email"
                    />
                    <p class="mb-1">Patiëntnummer</p>
                    <v-text-field
                        v-model="patientNumber"
                        type="number"
                        outlined 
                        dense
                        :rules="rules.patientNumberRules"
                        :error-messages="errorMessages.patientNumber"
                    />

                    <p class="mb-1">Leeftijd</p>
                    <v-text-field
                        :value="age"
                        type="number"
                        outlined
                        dense
                        :rules="rules.ageRules"
                    />

                    <p class="mb-1">Lengte</p>
                    <v-text-field
                        v-model="height"
                        outlined 
                        dense
                        type="number"
                        suffix="cm"
                        :rules="rules.heightRules"
                    />
                </v-card-text>
            </v-card>
            <v-btn class="mt-3" block color="accent" type="submit" :loading="loading" :disabled="loading">
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
    name: "ChangePersonalInformation",
    data() {
        return {
            name: "",
            email: "",
            patientNumber: "",
            age: "",
            height: "",
            loading: false,
            rules: {
                nameRules: [
                    (v) => !!v || "Naam is vereist",
                    (v) => isNaN(v) || "Naam mag niet uit cijfers bestaan",
                ],
                emailRules: [
                    (v) => !!v || "E-mail is vereist",
                    (v) => /.+@.+\..+/.test(v) || "E-mail moet valide zijn",
                ],
                patientNumberRules: [
                    (v) => !!v || "Patientnummer is vereist",
                    (v) => /\d/.test(v) || "Patientnummer bestaat uit nummers",
                ],
                ageRules: [
                    (v) => !!v || "Leeftijd is vereist",
                    (v) => /\d/.test(v) || "Leeftijd bestaat uit cijfers",
                ],
                heightRules: [
                    (v) => !!v || "Lengte is vereist",
                    (v) => /\d/.test(v) || "Lengte bestaat uit cijfers",
                    (v) => /^\d{3}$/.test(v) || "Lengte kan maar uit drie cijfers bestaan",
                ],
            },
            errorMessages: {
                email: null,
                patientNumber: null,
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Gegevens wijzigen",
                appbarCloseRoute: "/account",
            });
        });
    },
    created() {
        this.setPersonalInformationFromVuex();
    },
    methods: {
        setPersonalInformationFromVuex() {
            for (const prop in this.getUser) {
                this[prop] = this.getUser[prop];
            }
        },
        changePersonalInformation(e) {
            e.preventDefault();

            if (!this.$refs.form.validate()) return;

            const data = {
                name: this.name,
                email: this.email,
                patient_number: this.patientNumber,
                age: this.age,
                height: this.height,
            }

            this.loading = true;

            this.$store.dispatch("changeUser", data).catch(err => {
                for(let i=0; i<err.length; i++) {
                    if (err[i].id == "patient_number") {
                        this.errorMessages.patientNumber = "Dit patientnummer is al in gebruik";
                    } else if (err[i].id == "email") {
                        this.errorMessages.email = "Dit emailadres is al in gebruik";
                    }
                }
                this.loading = false;
            });
        }
    },
    watch: {
        loadingUser() {
            this.setPersonalInformationFromVuex();
        },
        email() {
            this.errorMessages.email = null;
        },
        patientNumber() {
            this.errorMessages.patientNumber = null;
        }
    },
    computed: {
        getUser() {
            return this.$store.getters.user;
        },
        loadingUser() {
            return this.$store.getters.loadingUser;
        },
    }
}
</script>

<style lang="scss">

</style>