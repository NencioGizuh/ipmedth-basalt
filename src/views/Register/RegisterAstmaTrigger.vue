<template>
  <div>
    <img
      align="center"
      class="basalt-block-blue1"
      src="@/assets/logos_en_blocks/basalt-block-blue.png"
    />
    <img
      align="center"
      class="basalt-block-blue2"
      src="@/assets/logos_en_blocks/basalt-block-blue.png"
    />
    <img
      align="center"
      class="basalt-block-orange1"
      src="@/assets/logos_en_blocks/basalt-block-orange.png"
    />
    <!-- TODO: Stepper toevoegen zodat het process duidelijk wordt wanneer het klaar zal zijn voor de gebruiker -->
    <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Triggers invullen
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        Actieplan
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step 
        :complete="e1 > 3"
        step="3"
      >
        Medicijnen
      </v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
    <v-container class="lighten-5 mb-6 mt-2" background-color="white">
      <div v-if="!triggersPage">
        <h2 class="mb-2">Geef hier je triggers aan</h2>
        <v-row class="mb-2" no-gutters>
          <v-col>
            <v-card :color="active.activeRook" width="100" height="80" @click="dialogOpen('rook')" class="pa-2 rounded" outlined tile>
              <div class="text-center">
              <v-icon class="mt-2">mdi-smoking</v-icon>
              </div>
              <h3 class="text-center text-subtitle-2">Rook</h3>
            </v-card>
          </v-col>
          <v-dialog v-model="dialogBox.rook" width="500">
            <v-card>
                <v-checkbox class="mb-n8"
                v-model="triggersMultiple.rook"
                label="Wierrook"
                value="Wierrook"
              ></v-checkbox>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.rook"
                label="Kampvuur"
                value="Kampvuur"
              ></v-checkbox>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.rook"
                label="Vuurkorf"
                value="Vuurkorf"
              ></v-checkbox>
                            <v-checkbox
                v-model="triggersMultiple.rook"
                label="Barbecue"
                value="Barbecue"
              ></v-checkbox>
              <v-btn @click="dialogBox.rook = false">Sluit</v-btn>
            </v-card>
          </v-dialog>
          <v-col>
            <v-card :color="active.activeHuisstofmijt" @click="selectingTrigger('huisstofmijt')" width="100" height="80" class="pa-2 rounded test" outlined tile>
              <div class="text-center">
              <v-icon class="mt-2">mdi-bee</v-icon>
              </div>
              <h3 class="text-center text-subtitle-2">Huisstofmijt</h3>
            </v-card>
          </v-col>
          <v-col>
            <v-card
              :color="active.activePollutie"
              width="100" height="80"
              @click="dialogOpen('pollutie')"
              class="pa-2 rounded"
              outlined
              tile
            >
            <div class="text-center">
              <v-icon class="mt-2">mdi-weather-windy</v-icon>
            </div>
            <h3 class="text-center text-subtitle-2">Pollutie</h3>
            </v-card>
          </v-col>
          <v-dialog v-model="dialogBox.luchtverontreiging" width="500">
            <v-card>
            <v-checkbox class="mb-n8"
                v-model="triggersMultiple.luchtverontreiging"
                label="Fijnstof"
                value="Fijnstof"
              ></v-checkbox>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.luchtverontreiging"
                label="Stikstofdioxide"
                value="Stikstofdioxide"
              ></v-checkbox>
                <v-checkbox class="mb-n8"
                v-model="triggersMultiple.luchtverontreiging"
                label="Ozon"
                value="Ozon"
              ></v-checkbox>
                <v-checkbox class="mb-n8"
                v-model="triggersMultiple.luchtverontreiging"
                label="Smog"
                value="Smog"
              ></v-checkbox>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.luchtverontreiging"
                label="Roet"
                value="Roet"
              ></v-checkbox>
              <v-checkbox
                v-model="triggersMultiple.luchtverontreiging"
                label="Koolstofdioxide"
                value="Koolstofdioxide"
              ></v-checkbox>
              <v-btn @click="dialogBox.luchtverontreiging = false">Sluit</v-btn>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row class="mb-2" no-gutters>
          <v-col>
            <v-card :color="active.activeHuisdieren" width="100" height="80" @click="dialogOpen('huisdieren')" class="pa-2" outlined tile>
              <div class="text-center">
              <v-icon class="mt-2">mdi-dog-side</v-icon>
              </div>
              <h3 class="text-center text-subtitle-2">Huisdieren</h3>
            </v-card>
          </v-col>
          <v-dialog v-model="dialogBox.huisdieren" width="500">
            <v-card>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.huisdieren"
                label="Honden"
                value="Honden"
              ></v-checkbox>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.huisdieren"
                label="Katten"
                value="Katten"
              ></v-checkbox>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.huisdieren"
                label="Vogels"
                value="Vogels"
              ></v-checkbox>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.huisdieren"
                label="Cavia"
                value="Cavia"
              ></v-checkbox>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.huisdieren"
                label="Hamsters"
                value="Hamsters"
              ></v-checkbox>
              <v-checkbox 
                v-model="triggersMultiple.huisdieren"
                label="Muis"
                value="Muis"
              ></v-checkbox>
              <v-btn @click="dialogBox.huisdieren = false">Sluit</v-btn>
            </v-card>
          </v-dialog>
          <v-col>
            <v-card :color="active.activeSchimmels" @click="selectingTrigger('schimmels')" width="100" height="80" class="pa-2" outlined tile>
              <div class="text-center">
              <v-icon class="mt-2">mdi-mushroom</v-icon>
              </div>
              <h3 class="text-center text-subtitle-2">Schimmels</h3>
            </v-card>
          </v-col>
          <v-col>
            <v-card :color="active.activeVuurrook" @click="selectingTrigger('vuurrook')" width="100" height="80" class="pa-2" outlined tile>
              <div class="text-center">
              <v-icon class="mt-2">mdi-fire</v-icon>
              </div>
              <h3 class="text-center text-subtitle-2">Vuurrook</h3>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mb-2" no-gutters>
          <v-col>
            <v-card :color="active.activeInfecties" @click="selectingTrigger('infecties')" width="100" height="80" class="pa-2 rounded" outlined tile>
              <div class="text-center">
              <v-icon class="mt-2">mdi-emoticon-sick</v-icon>
              </div>
              <h3 class="text-center text-subtitle-2">Infecties</h3>
            </v-card>
          </v-col>
          <v-col>
            <v-card :color="active.activeInspanning" @click="selectingTrigger('inspanning')" width="100" height="80" class="pa-2 rounded" outlined tile>
                            <div class="text-center">
              <v-icon class="mt-2">mdi-weight-lifter</v-icon>
              </div>
              <h3 class="text-center text-subtitle-2">Inspanning</h3>
            </v-card>
          </v-col>
          <v-col>
            <v-card
              :color="active.activeWeer"
              width="100" height="80"
              @click="dialogOpen('weer')"
              class="pa-2 rounded"
              outlined
              tile
            >
                          <div class="text-center">
              <v-icon class="mt-2">mdi-cloud</v-icon>
              </div>
              <h3 class="text-center text-subtitle-2">Weer</h3>
            </v-card>
          </v-col>
          <v-dialog v-model="dialogBox.weersomstandigheden" width="500">
            <v-card>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.weersomstandigheden"
                label="Droge koude lucht"
                value="Droge koude lucht"
              ></v-checkbox>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.weersomstandigheden"
                label="Benauwd weer"
                value="Benauwd weer"
              ></v-checkbox>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.weersomstandigheden"
                label="Onweer"
                value="Onweer"
              ></v-checkbox>
              <v-checkbox 
                v-model="triggersMultiple.weersomstandigheden"
                label="Mistig weer"
                value="Mistig weer"
              ></v-checkbox>
              <v-btn @click="dialogBox.weersomstandigheden = false">Sluit</v-btn>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row class="mb-2" no-gutters>
          <v-col>
            <v-card :color="active.activeHyperventilatie" @click="selectingTrigger('hyperventilatie')" width="150" height="80" class="pa-2 rounded" outlined tile>
                            <div class="text-center">
              <v-icon class="mt-2">mdi-lungs</v-icon>
              </div>
              <h3 class="text-center text-subtitle-2">Hyperventilatie</h3>
            </v-card>
          </v-col>
          <v-col>
            <v-card :color="active.activePollen" width="160" height="80" @click="dialogOpen('pollen')" class="pa-2 rounded" outlined tile>
                            <div class="text-center">
              <v-icon class="mt-2">mdi-alert-octagram</v-icon>
              </div>
              <h3 class="text-center text-subtitle-2">Pollen</h3>
            </v-card>
          </v-col>
          <v-dialog v-model="dialogBox.pollen" width="500">
            <v-card>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.pollen"
                label="Grassen"
                value="Grassen"
              ></v-checkbox>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.pollen"
                label="Berk"
                value="Berk"
              ></v-checkbox>
              <v-checkbox class="mb-n8"
                v-model="triggersMultiple.pollen"
                label="Els"
                value="Els"
              ></v-checkbox>
             <v-checkbox class="mb-n8"
                v-model="triggersMultiple.pollen"
                label="Hazelaar"
                value="Hazelaar"
              ></v-checkbox>
              <v-checkbox 
                v-model="triggersMultiple.pollen"
                label="Bijvoet"
                value="Bijvoet"
              ></v-checkbox>
              <v-btn @click="dialogBox.pollen = false">Sluit</v-btn>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row class="mt-n4 mb-n1">
          <v-col>
              <v-checkbox v-model="astma" label="Ik heb geen triggers voor mijn astma"
              ></v-checkbox>
          </v-col>
        </v-row>
        <v-btn :disabled="!triggersOK" block tile @click="switchZone" color="accent"> Opslaan </v-btn>
      </div>
      
      <!-- Actieplan - Groene Zone-->
      <div v-if="!groeneZone">
        <h2>Groene zone</h2>
        <v-form ref="form" v-model="valid">
          <v-text-field
            :rules="rules.peakflow"
            v-model="actieplan.voorMedicatieGroeneZone"
            label="Beste peakflowaarde voor medicatie"
            ><span slot="append">L/min</span></v-text-field
          >
          <v-text-field
            :rules="rules.peakflow"
            v-model="actieplan.naMedicatieGroeneZone"
            label="Beste peakflowwaarde na medicatie"
            ><span slot="append">L/min</span></v-text-field
          >
        </v-form>
        <v-btn :disabled="!valid" block tile @click="switchZone" color="accent">Opslaan</v-btn>
      </div>
      <!-- Actieplan - Gele Zone-->
      <div v-if="!geleZone">
        <h2>Gele zone</h2>
        <p>U heeft last van één of meerdere <br> van de onderstaande symptonen</p>
        <ul>
          <li>Hoesten</li>
          <li>Kortademigheid</li>
          <li>Benauwdheid</li>
          <li>Slijm</li>
          <li>Piepende ademhaling</li>
        </ul>
        <v-form ref="form" v-model="valid">
          <v-text-field :rules="rules.peakflow" v-model="actieplan.voorMedicatieGeleZone" label="Peakflowwaarde tussen de"
            ><span slot="append">L/min</span></v-text-field
          >
          <v-text-field :rules="rules.peakflow" v-model="actieplan.naMedicatieGeleZone" label="Na de medicatie"
            ><span slot="append">L/min</span></v-text-field
          >
        </v-form>
        <v-btn :disabled="!valid" block tile @click="switchZone" color="accent">Opslaan</v-btn>
      </div>
      <!-- Actieplan - Oranje Zone-->
      <div v-if="!oranjeZone">
        <h2>Oranje zone</h2>
        <p>U bevindt zich in deze als er na 48 uur nog <br> geen verbetering is opgetreden na het <br> volgen van de stappen uit de gele zone </p>
        <v-form ref="form" v-model="valid">
          <v-text-field :rules="rules.telefoonnummer" v-model="actieplan.voorMedicatieOranjeZone" label="Telefoonnummer longarts"
            ></v-text-field
          >
          <v-text-field :rules="rules.telefoonnummer" v-model="actieplan.naMedicatieOranjeZone" label="Telefoon huisarts"
            ></v-text-field
          >
        </v-form>
        <v-btn :disabled="!valid" block tile @click="switchZone" color="accent">Opslaan</v-btn>
      </div>
      <!-- Actieplan - Rode Zone-->
      <div v-if="!rodeZone">
        <h2>Rode zone</h2>
        <p>U bevindt zich in deze zone als:</p>
        <ul>
          <li>Uw luchtwegverwijder niet werkt of elke vier uur nodig is</li>
          <li>U moeite heeft met lopen en/of praten</li>
          <li>U moeite heeft met ademhalen</li>
          <li>U last heeft van benauwdheid / piepende ademhaling / veel hoesten</li>
        </ul>
        <v-form ref="form" v-model="valid">
          <v-text-field :rules="rules.peakflow" v-model="actieplan.voorMedicatieRodeZone" label="Peakflowwaarde tussen de"
            ><span slot="append">L/min</span></v-text-field
          >
        </v-form>
        <v-btn :disabled="!valid" block tile @click="switchZone" color="accent">Opslaan</v-btn>
      </div>
      <!-- Medicatiegebruik-->
      <!-- TODO: Een optie waar een gebruiker medicijnen kan meegeven die niet op de medicijnlijst staan -->
      <!-- TODO: Een optie waarbij er geen medicijnen hoeven meegegeven te worden -->
      <div v-if="!medicatieGebruik">
        <h1>Medicatiegebruik</h1>
        <p>Check altijd voor het invullen met je longverpleegkundige</p>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Luchtwegverwijder(s)
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <h3>Kortwerkende bètamimetica</h3>
              <v-row no-gutters>
                <v-col>
                  <v-checkbox
                    v-model="medicijnen.luchtwegverwijders"
                    label="Salbutamol"
                    value="salbutamol"
                  ></v-checkbox>
                </v-col>
                <v-col>
                  <v-checkbox
                    v-model="medicijnen.luchtwegverwijders"
                    label="Terbutaline"
                    value="terbutaline"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <h3>Kortwerkende anticholinergica</h3>
              <v-checkbox
                v-model="medicijnen.luchtwegverwijders"
                label="Ipratropium"
                value="ipratropium"
              ></v-checkbox>
              <h3>Langwerkende bètamimetica</h3>
              <v-row no-gutters>
                <v-col>
                  <v-checkbox
                    v-model="medicijnen.luchtwegverwijders"
                    label="Formoterol"
                    value="formoterol"
                  ></v-checkbox>
                </v-col>
                <v-col>
                  <v-checkbox
                    v-model="medicijnen.luchtwegverwijders"
                    label="Salmeterol"
                    value="salmeterol"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row class="mt-n8" no-gutters>
                <v-col>
                  <v-checkbox
                    v-model="medicijnen.luchtwegverwijders"
                    label="Indacaterol"
                    value="indacaterol"
                  ></v-checkbox>
                </v-col>
                <v-col>
                  <v-checkbox
                    v-model="medicijnen.luchtwegverwijders"
                    label="Olodaterol"
                    value="olodaterol"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <h3>Langwerkende anticholinergica</h3>
              <v-row no-gutters>
                <v-col>
                  <v-checkbox
                    v-model="medicijnen.luchtwegverwijders"
                    label="Tiotropium"
                    value="tiotropium"
                  ></v-checkbox>
                </v-col>
                <v-col>
                  <v-checkbox
                    v-model="medicijnen.luchtwegverwijders"
                    label="Aclidinium"
                    value="aclidinium"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row class="mt-n8" no-gutters>
                <v-col>
                  <v-checkbox
                    v-model="medicijnen.luchtwegverwijders"
                    label="Glycopyronium"
                    value="glycopyronium"
                  ></v-checkbox>
                </v-col>
                <v-col>
                  <v-checkbox
                    v-model="medicijnen.luchtwegverwijders"
                    label="Umeclidinium"
                    value="umeclidinium"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Luchtwegbeschermer(s)
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-checkbox
                v-model="medicijnen.luchtwegbeschermers"
                label="Beclomethason"
                value="beclomethason"
              ></v-checkbox>
              <v-checkbox
                v-model="medicijnen.luchtwegbeschermers"
                label="Budesonide"
                value="budesonide"
              ></v-checkbox>
              <v-checkbox
                v-model="medicijnen.luchtwegbeschermers"
                label="Ciclesonide"
                value="ciclesonide"
              ></v-checkbox>
              <v-checkbox
                v-model="medicijnen.luchtwegbeschermers"
                label="Fluticasonpropionaat"
                value="fluticasonpropionaat"
              ></v-checkbox>
              <v-checkbox
                v-model="medicijnen.luchtwegbeschermers"
                label="geen"
                value="geen"
              ></v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-expansion-panels class="mb-4">
          <v-expansion-panel>
            <v-expansion-panel-header> Neusspray </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-checkbox
                v-model="medicijnen.neusspray"
                label="Corticosteroid neusspray"
                value="corticosteroid neusspray"
              ></v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-btn :disabled="!medicijnenOK" block tile @click="switchZone" color="accent"> Opslaan </v-btn>
      </div>

      <!-- Medicatie gebruik per medicijn -->
      <div v-if="!medicijnGebruik">
        <h1>Selecteer jouw medicijn</h1>
        <div v-for="medicijn in inhalatorInformatie" :key="medicijn.name">
          <h3>{{ medicijn.name }}</h3>
          <v-container class="lighten-5" background-color="white">
          <v-row no-gutters>
          <v-col v-for="(inhalator) in medicijn.data" :key="inhalator.inhalatorName">
          <v-card width="150" class="mb-2" :color="inhalator.color" @click="testMethode(inhalator.id, medicijn.name)">
            <v-img width="140" :src="'http://localhost:8000' + inhalator.afbeelding" alt="inhalator foto"></v-img>
            <v-card-title class="text-caption">{{ inhalator.inhalatorName}}</v-card-title>
          </v-card>
          </v-col>
          </v-row>
          </v-container>
        </div>
        <v-btn :disabled="!medicineSelected" block tile @click="loginScreen" color="accent"> Opslaan </v-btn>
      </div>
    </v-container>
    </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterAstmaTrigger",
  data() {
    return {
      e1: 1,
      medicineSelected: false,
      astma: false,
      triggersOK: false,
      medicijnenOK: false,
      valid: true,
      active: {
        activeRook: '',
        activeHuisstofmijt: '',
        activePollutie: '',
        activeHuisdieren: '',
        activeSchimmels: '',
        activeVuurrook: '',
        activeInfecties: '',
        activeInspanning: '',
        activeWeer: '',
        activeHyperventilatie: '',
        activePollen: ''
      },
      dialogBox: {
        weersomstandigheden: false,
        pollen: false,
        rook: false,
        luchtverontreiging: false,
        huisdieren: false,
      },
      triggersPage: false,
      groeneZone: true,
      geleZone: true,
      oranjeZone: true,
      rodeZone: true,
      medicatieGebruik: true,
      medicijnGebruik: true,
      boxSelected: {
        huisstofmijt: false,
        schimmels: false,
        vuurrook: false,
        infecties: false,
        inspanning: false,
        hyperventilatie: false
      },
      actieplan: {
          voorMedicatieGroeneZone: "",
          naMedicatieGroeneZone: "",
          zoneGroenComment: "",
          voorMedicatieGeleZone: "",
          naMedicatieGeleZone: "",
          zoneGeelMedicijnen: "",
          zoneGeelUitleg: "",
          voorMedicatieOranjeZone: "",
          naMedicatieOranjeZone: "",
          oranjeZoneUitleg: "",
          voorMedicatieRodeZone: "",
          rodeZoneUitleg: "",
          rodeZoneMedicijnen: ""
      },
      triggers: {
        rook: false,
        huisstofmijt: false,
        luchtverontreiging: false,
        huisdieren: false,
        schimmels: false,
        vuurrook: false,
        infecties: false,
        inspanning: false,
        weersomstandigheden: false,
        hyperventilatie: false,
        pollen: false
      },
      zone: "groen",
      inhalatorSelected: [],
      triggersMultiple: {
        rook: [],
        luchtverontreiging: [],
        weersomstandigheden: [],
        pollen: []
      },
      medicijnen: {
        luchtwegverwijders: [],
        luchtwegbeschermers: [],
        neusspray: [],
      },
      inhalatorInformatie: [],
      rules: {
        peakflow: [
          (v) => !!v || "Peakflow is vereist",
          (v) => /\d/.test(v) || "Peakflow bestaat uit getallen",
          (v) => /^\d{3}$/.test(v) || "Peakflow kan maar uit drie getallen bestaan",
        ],
        telefoonnummer: [
          (v) => /\d/.test(v) || "Een telefoonnummer bestaat uit getallen",
          (v) => /^\d{10}$/.test(v) || "Een telefoonnummer kan maar uit tien getallen bestaan",
        ]
      }
    };
  },
  methods: {
    loginScreen() {
      this.$router.push('/login');
    },
    dialogOpen(dialogName) {
      switch(dialogName) {
        case 'rook':
          if(this.astma === true) {
            this.dialogBox.rook = false;
          }
          else {
            this.dialogBox.rook = true;
          }
          break;
        case 'pollutie':
          if(this.astma === true) {
            this.dialogBox.luchtverontreiging = false;
          }
          else {
            this.dialogBox.luchtverontreiging = true;
          }
          break;
        case 'huisdieren':
          if(this.astma === true) {
            this.dialogBox.huisdieren = false;
          }
          else {
            this.dialogBox.huisdieren = true;
          }
          break;
        case 'weer':
          if(this.astma === true) {
            this.dialogBox.weersomstandigheden = false;
          }
          else {
            this.dialogBox.weersomstandigheden = true;
          }
          break;
        case 'pollen':
          if(this.astma === true) {
            this.dialogBox.pollen = false;
          }
          else {
            this.dialogBox.pollen = true;
          }
          break;
      }
    },
    getInhalatorInformation() {
      return new Promise((resolve, reject) => {
      var vm = this;
      var output = [...this.medicijnen.luchtwegbeschermers, ...this.medicijnen.luchtwegverwijders, ...this.medicijnen.neusspray];
      for (let index = 0; index < output.length; index++) {
        const element = output[index];
        let object = {
          name: element,
          data: [],
        }
        this.inhalatorInformatie.push(object);
      }
      var string = output.join();
      axios.get("http://localhost:8000/api/inhalatorinformation", {
        params: {
          values: string
        }
      }).then(function (response) {
        resolve(response);
        let yoyo = response.data;
        for (let index = 0; index < yoyo.length; index++) {
          const element = yoyo[index];
          let yaya = vm.inhalatorInformatie;
          for (let index = 0; index < yaya.length; index++) {
            const elementInhalator = yaya[index];
            if(element.gebruikMedicijn === elementInhalator.name) {
              vm.inhalatorInformatie[index].data.push(element);
            }
          }
        }
        //TODO: Opslaan welke inhalators beschikbaar zijn voor medijcijnen tab
      }).catch(function (error) {
        reject(error);
      })
      })
    },
    switchZone() {
      var vm = this;
      switch (this.zone) {
        case "groen":
          this.zone = "geel";
          this.triggersPage = true;
          this.groeneZone = false;
          this.e1 = 2;
          break;
        case "geel":
          this.zone = "oranje";
          this.groeneZone = true;
          this.geleZone = false;
          break;
        case "oranje":
          this.zone = "rood";
          this.geleZone = true;
          this.oranjeZone = false;
          break;
        case "rood":
          this.zone = "medicatiegebruik";
          this.oranjeZone = true;
          this.rodeZone = false;
          break;
        case "medicatiegebruik":
          this.zone = "medicijngebruik"
          this.rodeZone = true;
          this.medicatieGebruik = false;
          this.e1 = 3;
          break;
        case "medicijngebruik": 
          this.getInhalatorInformation().then(function () {
            vm.medicatieGebruik = true;
            vm.medicijnGebruik = false;
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    },
    selectingTrigger(box) {
    switch(box) {
      case 'huisstofmijt':
        if(this.astma === true) {
          this.boxSelected.huisstofmijt = false;
          this.triggers.huisstofmijt = false;
        }
        else {
        this.boxSelected.huisstofmijt = !this.boxSelected.huisstofmijt;
        this.triggers.huisstofmijt = !this.triggers.huisstofmijt;
        if(this.boxSelected.huisstofmijt === true) {
          this.active.activeHuisstofmijt = 'orange';
        }
        else {
          this.active.activeHuisstofmijt = '';
        }
        }
        break;
      case 'schimmels':
        if(this.astma === true) {
          this.boxSelected.schimmels = false;
          this.triggers.schimmels = false;
        }
        else {
        this.boxSelected.schimmels = !this.boxSelected.schimmels;
        this.triggers.schimmels = !this.triggers.schimmels;
        if(this.boxSelected.schimmels === true) {
          this.active.activeSchimmels = 'orange';
        }
        else {
          this.active.activeSchimmels = '';
        }
        }
        break;
      case 'vuurrook':
        if(this.astma === true) {
          this.boxSelected.vuurrook = false;
          this.triggers.vuurrook = false;
        }
        else {
        this.boxSelected.vuurrook = !this.boxSelected.vuurrook;
        this.triggers.vuurrook = !this.triggers.vuurrook;
        if(this.boxSelected.vuurrook === true) {
          this.active.activeVuurrook = 'orange';
        }
        else {
          this.active.activeVuurrook = '';
        }
        }
        break;
      case 'infecties':
        if(this.astma === true) {
          this.boxSelected.infecties = false;
          this.triggers.infecties = false;
        }
        else {
                  this.boxSelected.infecties = !this.boxSelected.infecties;
        this.triggers.infecties = !this.triggers.infecties;
        if(this.boxSelected.infecties === true) {
          this.active.activeInfecties = 'orange';
        }
        else {
          this.active.activeInfecties = '';
        }
        }
        break;
      case 'inspanning':
        if(this.astma === true) {
          this.boxSelected.inspanning = false;
          this.triggers.inspanning = false;
        }
        else {
            this.boxSelected.inspanning = !this.boxSelected.inspanning;
            this.triggers.inspanning = !this.triggers.inspanning;
        if(this.boxSelected.inspanning === true) {
          this.active.activeInspanning = 'orange';
        }
        else {
          this.active.activeInspanning = '';
        }
        }
        break;
      case 'hyperventilatie':
        if(this.astma === true) {
          this.boxSelected.hyperventilatie = false;
          this.triggers.hyperventilatie = false;
        }
        else {
        this.boxSelected.hyperventilatie = !this.boxSelected.hyperventilatie;
        this.triggers.hyperventilatie = !this.triggers.hyperventilatie;
        if(this.boxSelected.hyperventilatie === true) {
          this.active.activeHyperventilatie = 'orange';
        }
        else {
          this.active.activeHyperventilatie = '';
        }
        }
        break;
    }
  },
  testMethode(inhalatorID, medicine) {
    var vm = this;
    let array = this.inhalatorInformatie;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(element.name === medicine) {
        let data = element.data
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if(element.state === true) {
            if(inhalatorID === element.id) {
            element.state = false
            element.color = '';
            let voorval = vm.inhalatorSelected.indexOf(element);
            vm.inhalatorSelected.splice(voorval, 1);
            }
          }
          else {
            if(inhalatorID === element.id) {
              element.state = !element.state
              if(element.state === true) {
                element.color = 'orange';
                vm.inhalatorSelected.push(element);
              }
            }
          }
        }
      }
    }
  },
  },
  watch: {
    inhalatorSelected: function() {
      var vm = this;
      if(vm.inhalatorSelected.length === 0) {
        vm.medicineSelected = false;
      }
      else {
        vm.medicineSelected = true;
      }
    },
    medicijnen: {
      handler: function() {
        var vm = this;
        if(vm.medicijnen.luchtwegverwijders.length === 0 & 
          vm.medicijnen.luchtwegbeschermers.length === 0 & vm.medicijnen.neusspray.length === 0) {
            vm.medicijnenOK = false;
          }
        else {
          vm.medicijnenOK = true;
        }
      },
      deep: true
    },
    astma: function() {
      var vm = this;
      if(vm.astma === true) { 
        vm.triggersOK = true
      }
      else {
        vm.triggersOK = false
      }
    },
    triggers: {
      handler: function () {
        var vm = this;
        if(vm.triggers.rook === false && vm.triggers.huisstofmijt === false && vm.triggers.luchtverontreiging === false &&
          vm.triggers.huisdieren === false && vm.triggers.schimmels === false && vm.triggers.vuurrook === false &&
          vm.triggers.infecties === false && vm.triggers.inspanning === false && vm.triggers.weersomstandigheden === false &&
          vm.triggers.hyperventilatie === false && vm.triggers.pollen === false) 
        {
          vm.triggersOK = false;
        }
        else {
          vm.triggersOK = true;
        }
      },
      deep: true
    },
    'triggersMultiple.rook': function() {
      var vm = this;
      if(vm.triggersMultiple.rook.length > 0) {
        vm.active.activeRook = 'orange';
        vm.triggers.rook = true;
      } 
      else {
        vm.active.activeRook = '';
        vm.triggers.rook = false;
      }
    },
    'triggersMultiple.luchtverontreiging': function() {
      var vm = this;
      if(vm.triggersMultiple.luchtverontreiging.length > 0) {
        vm.active.activePollutie = 'orange';
        vm.triggers.luchtverontreiging = true;
      } 
      else {
        vm.active.activePollutie = '';
        vm.triggers.luchtverontreiging = false;
      }
    },
    'triggersMultiple.huisdieren': function() {
      var vm = this;
      if(vm.triggersMultiple.huisdieren.length > 0) {
        vm.active.activeHuisdieren = 'orange';
        vm.triggers.huisdieren = true;
      } 
      else {
        vm.active.activeHuisdieren = '';
        vm.triggers.huisdieren = false;
      }
    },
    'triggersMultiple.weersomstandigheden': function() {
      var vm = this;
      if(vm.triggersMultiple.weersomstandigheden.length > 0) {
        vm.active.activeWeer = 'orange';
        vm.triggers.weersomstandigheden = true;
      } 
      else {
        vm.active.activeWeer = '';
        vm.triggers.weersomstandigheden = false;
      }
    },
    'triggersMultiple.pollen': function() {
      var vm = this;
      if(vm.triggersMultiple.pollen.length > 0) {
        vm.active.activePollen = 'orange';
        vm.triggers.pollen = true;
      } 
      else {
        vm.active.activePollen = '';
        vm.triggers.pollen = false;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch("setAppbarDetails", {
        appbarText: "Registreren",
        appbarCloseRoute: "/dashboard",
      });
    });
  },
};
</script>

<style lang="scss">
.basalt-block-blue1 {
  position: fixed;
  top: 320px;
  right: -212px;
}
.basalt-block-blue2 {
  position: fixed;
  bottom: -100px;
  left: -100px;
  height: 30%;
}
.basalt-block-orange1 {
  position: fixed;
  top: -70px;
  left: -50px;
}
</style>