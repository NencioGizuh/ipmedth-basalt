<template>
    <div>
        <v-form autocomplete="off">
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

                    <p class="mb-1">Geboortedatum</p>
                    <v-menu
                        ref="dateMenu"
                        v-model="dateMenu"
                        :close-on-content-click="false"
                        :return-value.sync="dateOfBirth"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                :value="dateOfBirth | formatDate"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                outlined
                                dense
                            />
                        </template>
                        <v-date-picker
                            v-model="dateOfBirth"
                            no-title
                            scrollable
                        >
                            <v-spacer />
                            <v-btn
                                text
                                color="primary"
                                @click="dateMenu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.dateMenu.save(dateOfBirth)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>

                    <p class="mb-1">Lengte</p>
                    <v-text-field
                        v-model="length"
                        outlined 
                        dense
                        type="number"
                        suffix="cm"
                    />
                    <p class="mb-0">Geslacht</p>
                    <v-radio-group class="mt-1" row v-model="gender" hide-details="auto">
                        <v-radio
                            label="Man"
                            value="man"
                        />
                        <v-radio
                            label="Vrouw"
                            value="women"
                        />
                    </v-radio-group>
                </v-card-text>
            </v-card>
            <v-btn class="mt-3" block color="accent" @click="changePersonalInformation">
                Opslaan
            </v-btn>
        </v-form>
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
            dateOfBirth: "",
            dateMenu: false,
            length: "",
            gender: "man",
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
                dateOfBirth: this.dateOfBirth,
                length: this.length,
                gender: this.gender,
            }

            console.log(data);

            this.$router.push("/account");
        }
    },
    computed: {
        getUser() {
            return this.$store.getters.user;
        }
    }
}
</script>

<style lang="scss">

</style>