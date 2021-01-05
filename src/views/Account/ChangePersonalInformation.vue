<template>
    <div>
        <v-form v-if="!loadingUser" autocomplete="off">
            <v-card>
                <v-card-text>
                    <p class="mb-1">Naam</p>
                    <v-text-field
                        v-model="name"
                        outlined 
                        dense
                    />
                    <p class="mb-1">Email</p>
                    <v-text-field
                        v-model="email"
                        outlined 
                        dense
                    />
                    <p class="mb-1">Patiëntnummer</p>
                    <v-text-field
                        v-model="patientNumber"
                        outlined 
                        dense
                    />

                    <p class="mb-1">Leeftijd</p>
                    <v-text-field
                        :value="age"
                        type="number"
                        outlined
                        dense
                    />

                    <p class="mb-1">Lengte</p>
                    <v-text-field
                        v-model="height"
                        outlined 
                        dense
                        type="number"
                        suffix="cm"
                    />
                </v-card-text>
            </v-card>
            <v-btn class="mt-3" block color="accent" @click="changePersonalInformation" :loading="loading" :disabled="loading">
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
        changePersonalInformation() {
            // TODO: Send changes to database
            const data = {
                name: this.name,
                email: this.email,
                patientNumber: this.patientNumber,
                age: this.age,
                height: this.height,
            }

            this.loading = true;

            console.log(data);

            this.$router.push("/account");
        }
    },
    watch: {
        loadingUser() {
            this.setPersonalInformationFromVuex();
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