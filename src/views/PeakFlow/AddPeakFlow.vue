<template>
    <div>
        <v-form ref="form" @submit="submitForm" autocomplete="off">
            <v-card>
                <v-card-text>
                    <p class="font-weight-bold">Wanneer wordt deze meting gedaan?</p>
                    <v-radio-group v-model="dateTimeMeasurement" hide-details="auto">
                        <v-radio
                            label="Nu"
                            value="now"
                        />
                        <v-radio
                            label="Andere dag/tijd, namelijk..."
                            value="notNow"
                        />
                    </v-radio-group>

                    <div v-if="dateTimeMeasurement === 'notNow'">
                        <v-menu
                            ref="dateMenu"
                            v-model="dateMenu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    class="mt-4"
                                    :value="date | formatDate"
                                    label="Dag"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    hide-details="auto"
                                />
                            </template>
                            <v-date-picker
                                v-model="date"
                                no-title
                                scrollable
                            >
                                <v-spacer></v-spacer>
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
                                    @click="$refs.dateMenu.save(date)"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>

                        <v-menu
                            ref="timeMenu"
                            v-model="timeMenu"
                            :close-on-content-click="false"
                            :return-value.sync="time"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    class="mt-4"
                                    :value="time"
                                    label="Tijd"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    hide-details="auto"
                                />
                            </template>
                            <v-time-picker
                                v-model="time"
                                format="24hr"
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="timeMenu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.timeMenu.save(time)"
                                >
                                    OK
                                </v-btn>
                            </v-time-picker>
                        </v-menu>
                    </div>
                </v-card-text>
            </v-card>

            <v-card class="mt-4">
                <v-card-text>
                    <p class="font-weight-bold">Doe 3 metingen en vul in</p>
                    <v-text-field
                        v-model="measurementOne"
                        label="Meting 1"
                        outlined
                        :rules="required"
                    />
                    <v-text-field
                        v-model="measurementTwo"
                        label="Meting 2"
                        outlined
                        :rules="required"
                    />
                    <v-text-field
                        v-model="measurementThree"
                        label="Meting 3"
                        outlined
                        :rules="required"
                    />
                </v-card-text>
            </v-card>

            <v-card class="mt-4">
                <v-card-text>
                    <p class="font-weight-bold">Medicijnen (net) ingenomen?</p>
                    <v-radio-group v-model="takenMedicines" hide-details="auto">
                        <v-radio
                            label="Ja"
                            value="yes"
                        />
                        <v-radio
                            label="Nee"
                            value="no"
                        />
                    </v-radio-group>
                </v-card-text>
            </v-card>

            <v-card class="mt-4">
                <v-card-text>
                    <p class="mb-1 font-weight-bold">Eventuele opmerkingen/verklaringen</p>
                    <p><small>Bijvoorbeeld een verklaring voor een lage peak flow (trigger?).</small></p>
                    <v-textarea
                        outlined
                        name="explanation"
                        v-model="explanation"
                        hide-details="auto"
                    />
                </v-card-text>
            </v-card>

            <v-btn block color="accent" class="mt-4" type="submit">
                Opslaan
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import moment from "moment";

export default {
    name: "AddPeakFlow",
    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
            time: moment(new Date().toISOString()).locale('nl').format('HH:mm'),
            dateMenu: false,
            timeMenu: false,
            dateTimeMeasurement: "now",
            measurementOne: null,
            measurementTwo: null,
            measurementThree: null,
            takenMedicines: "no",
            explanation: null,
            required: [
                value => !!value || 'Verplicht in te vullen.',
            ],
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.dispatch('setAppbarDetails', {
                appbarText: "Peak flow meting toevoegen",
                appbarCloseRoute: "/peakflow",
            });
        });
    }, 
    methods: {
        submitForm (e) {
            e.preventDefault();

            if (!this.$refs.form.validate()) return;

            const data = {
                date: this.date,
                time: this.time,
                measurementOne: this.measurementOne,
                measurementTwo: this.measurementTwo,
                measurementThree: this.measurementThree,
                takenMedicines: this.takenMedicines === "yes" ? true : false,
                explanation: this.explanation,
            };

            console.log(data);

            // TODO: Send data to API

            this.$router.push("/peakflow");
        },
    }
}
</script>

<style lang="scss">

</style>