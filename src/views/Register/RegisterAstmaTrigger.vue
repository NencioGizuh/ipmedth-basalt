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

      <v-divider></v-divider>

      <v-stepper-step 
        :complete="e1 > 4"
        step="4"
      >
        Reminders
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
              <v-checkbox :disabled="!areEnabled" v-model="astma" label="Ik heb geen triggers voor mijn astma"
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
        <p>Vul minstens één luchtwegverwijder, luchtwegbeschermer en neusspray in</p>
        <v-expansion-panels>
          <v-expansion-panel class="mb-2">
            <v-expansion-panel-header>
              Luchtwegverwijder(s)
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <h3>Kortwerkende bètamimetica</h3>
              <v-row no-gutters>
                <v-col v-for="medicijn in apiMedicijen.luchtwegverwijders.kortwerkendeBetamimetica" :key="medicijn.name">
                  <v-checkbox
                    v-model="medicijnen.luchtwegverwijders"
                    :label="medicijn.name | capitalize"
                    :value="medicijn.name.toLowerCase().trim()"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <h3>Kortwerkende anticholinergica</h3>
              <v-checkbox v-for="medicijn in apiMedicijen.luchtwegverwijders.kortwerkendeAnticholinergica" :key="medicijn.name"
                v-model="medicijnen.luchtwegverwijders"
                :label="medicijn.name | capitalize"
                :value="medicijn.name.toLowerCase().trim()"
              ></v-checkbox>
              <h3>Langwerkende bètamimetica</h3>
              <v-row class="mb-4" no-gutters>
                <v-col class="mb-n6" v-for="medicijn in apiMedicijen.luchtwegverwijders.langwerkendeBetamimetica" :key="medicijn.name">
                  <v-checkbox
                    v-model="medicijnen.luchtwegverwijders"
                    :label="medicijn.name | capitalize"
                    :value="medicijn.name.toLowerCase().trim()"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <h3>Langwerkende anticholinergica</h3>
              <v-row no-gutters>
                <v-col class="mb-n6" v-for="medicijn in apiMedicijen.luchtwegverwijders.langwerkendeAnticholinergica" :key="medicijn.name">
                  <v-checkbox
                    v-model="medicijnen.luchtwegverwijders"
                    :label="medicijn.name | capitalize"
                    :value="medicijn.name.toLowerCase().trim()"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-expansion-panels>
          <v-expansion-panel class="mb-2">
            <v-expansion-panel-header>
              Luchtwegbeschermer(s)
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-checkbox class="mb-n6" v-for="medicijn in apiMedicijen.luchtwegbeschermers" :key="medicijn.name"
              v-model="medicijnen.luchtwegbeschermers"
              :label="medicijn.name | capitalize"
              :value="medicijn.name.toLowerCase().trim()">
              </v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-expansion-panels class="mb-4">
          <v-expansion-panel>
            <v-expansion-panel-header> Neusspray </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-checkbox
              v-model="medicijnen.neusspray"
              v-for="medicijn in apiMedicijen.neusspray" :key="medicijn.name"
              :label="medicijn.name | capitalize"
              :value="medicijn.name.toLowerCase().trim()">
              </v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-btn :disabled="!medicijnenOK" block tile @click="switchZone" color="accent"> Opslaan </v-btn>
      </div>

      <!-- Medicatie gebruik per medicijn -->
      <div v-if="!medicijnGebruik">
        <h2>Selecteer jouw medicijn</h2>
        <div v-for="medicijn in inhalatorInformatie" :key="medicijn.name">
          <h3>{{ medicijn.name }}</h3>
          <v-container grid-list-xs class="lighten-5" background-color="white">
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
        <v-btn :disabled="!medicineSelected" block tile @click="switchZone" color="accent"> Opslaan </v-btn>
      </div>

      <!-- Reminders instellen -->
      <div v-if="!reminderInstellen">
        <h2 class="mb-8">Wilt u herinneringen instellen van uw medicatie</h2>
        <div class="justify-center">
          <v-btn
          @click="switchZone"
          elevation="2"
          class="mr-6"
          >Ja</v-btn>
          <v-btn
            elevation="2"
          @click="loginScreen"
          >Misschien later</v-btn>
        </div>
      </div>

      <!--Medicatie reminders maken -->
      <div v-if="!reminderMedicijn">
        <h3>Voor welk medicijn wilt u een herinnering instellen?</h3>
        <v-container class="lighten-5" background-color="white">
        <h4>Luchtwegverwijders</h4>
        <v-row no-gutters>
        <v-col v-for="chosen in inhalatorSelectedInformation.luchtwegverwijders" :key="chosen.name">
          <v-card width="150" class="mb-2" @click="chosen.model = true">
            <v-img width="140" :src="'http://localhost:8000' + chosen.afbeelding" alt="inhalator foto"></v-img>
            <v-card-title class="text-caption">{{ chosen.inhalatorName}}</v-card-title>
          </v-card>
          <v-dialog v-model="chosen.model" width="500">
            <v-card>
              <v-container>
              <h3 class="text-center">{{ chosen.inhalatorName }}</h3>
              <div class="align-center">
              <v-img class="align-center" width="140" :src="'http://localhost:8000' + chosen.afbeelding" alt="inhalator foto"></v-img>
              </div>
              <p>Hoe vaak per dag gebruik je dit medicijn</p>
              <div class="d-flex">
                <v-icon large class="verplaatslinks mx-xs-auto" @click="minus(chosen)">mdi-menu-left</v-icon>
                <p class="pt-1">{{chosen.counter}}</p>
                <v-icon large class="verplaatsrechts mx-xs-auto" @click="add(chosen)">mdi-menu-right</v-icon>
              </div>
              <div class="d-flex">
              <div v-for="item in chosen.lijst" :key="item.value">
              <v-text-field v-model="item.value" class="mr-3"
              type="time">
              </v-text-field>
              </div>
              </div>
              <v-btn @click="chosen.model = false">Sluit</v-btn>
              </v-container>
            </v-card>
          </v-dialog>
        </v-col>
        </v-row>
        <h4>Luchtwegbeschermers</h4>
        <v-row no-gutters>
        <v-col v-for="chosen in inhalatorSelectedInformation.luchtwegbeschermers" :key="chosen.name">
          <v-card width="150" class="mb-2" @click="chosen.model = true">
            <v-img width="140" :src="'http://localhost:8000' + chosen.afbeelding" alt="inhalator foto"></v-img>
            <v-card-title class="text-caption">{{ chosen.inhalatorName}}</v-card-title>
          </v-card>
          <v-dialog v-model="chosen.model" width="500">
            <v-card>
              <v-container>
              <h3 class="text-center">{{ chosen.inhalatorName }}</h3>
              <div class="align-center">
              <v-img class="align-center" width="140" :src="'http://localhost:8000' + chosen.afbeelding" alt="inhalator foto"></v-img>
              </div>
              <p>Hoe vaak per dag gebruik je dit medicijn</p>
              <div class="d-flex">
                <v-icon large class="verplaatslinks mx-xs-auto" @click="minus(chosen)">mdi-menu-left</v-icon>
                <p class="pt-1">{{chosen.counter}}</p>
                <v-icon large class="verplaatsrechts mx-xs-auto" @click="add(chosen)">mdi-menu-right</v-icon>
              </div>
              <div class="d-flex">
              <div v-for="item in chosen.lijst" :key="item.value">
              <v-text-field v-model="item.value" class="mr-3"
              type="time">
              </v-text-field>
              </div>
              </div>
              <v-btn @click="chosen.model = false">Sluit</v-btn>
              </v-container>
            </v-card>
          </v-dialog>
        </v-col>
        </v-row>
        <h4>Neusspray</h4>
        <v-row no-gutters>
        <v-col v-for="chosen in inhalatorSelectedInformation.neusspray" :key="chosen.name">
          <v-card width="150" class="mb-2" @click="chosen.model = true">
            <v-img width="140" :src="'http://localhost:8000' + chosen.afbeelding" alt="inhalator foto"></v-img>
            <v-card-title class="text-caption">{{ chosen.inhalatorName}}</v-card-title>
          </v-card>
          <v-dialog v-model="chosen.model" width="500">
            <v-card>
              <v-container>
              <h3 class="text-center">{{ chosen.inhalatorName }}</h3>
              <div class="align-center">
              <v-img class="align-center" width="140" :src="'http://localhost:8000' + chosen.afbeelding" alt="inhalator foto"></v-img>
              </div>
              <p>Hoe vaak per dag gebruik je dit medicijn</p>
              <div class="d-flex">
                <v-icon large class="verplaatslinks mx-xs-auto" @click="minus(chosen)">mdi-menu-left</v-icon>
                <p class="pt-1">{{chosen.counter}}</p>
                <v-icon large class="verplaatsrechts mx-xs-auto" @click="add(chosen)">mdi-menu-right</v-icon>
              </div>
              <div class="d-flex">
              <div v-for="item in chosen.lijst" :key="item.value">
              <v-text-field v-model="item.value" class="mr-3"
              type="time">
              </v-text-field>
              </div>
              </div>
              <v-btn @click="chosen.model = false">Sluit</v-btn>
              </v-container>
            </v-card>
          </v-dialog>
        </v-col>
        </v-row>
        </v-container>
        <v-btn :disabled="!reminder" block tile @click="loginScreen" color="accent"> Opslaan </v-btn>
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
      time: null,
      menu2: false,
      medicineID: 0,
      e1: 1,
      medicineSelected: false,
      areEnabled: true,
      astma: false,
      triggersOK: false,
      medicijnenOK: false,
      reminder: false,
      valid: true,
      validGeel: true,
      reminderOK: {
        luchtwegverwijders: false,
        luchtwegbeschermers: false,
        neusspray: false,
      },
      medicijnenEnabled: {
        luchtwegverwijders: false,
        luchtwegbeschermers: false,
        neusspray: false
      },
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
      reminderInstellen: true,
      reminderMedicijn: true,
      boxSelected: {
        huisstofmijt: false,
        schimmels: false,
        vuurrook: false,
        infecties: false,
        inspanning: false,
        hyperventilatie: false
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
      medicijnen: {
        luchtwegverwijders: [],
        luchtwegbeschermers: [],
        neusspray: [],
      },
      apiMedicijen: {
        luchtwegverwijders: {
          kortwerkendeBetamimetica: [],
          kortwerkendeAnticholinergica: [],
          langwerkendeBetamimetica: [],
          langwerkendeAnticholinergica: []
        },
        luchtwegbeschermers: [],
        neusspray: [],
      },
      inhalatorSelected: [],
      inhalatorSelectedInformation: {
        luchtwegverwijders: [],
        luchtwegbeschermers: [],
        neusspray: []
      },
      zone: "groen",
      triggersMultiple: {
        rook: [],
        huisdieren: [],
        luchtverontreiging: [],
        weersomstandigheden: [],
        pollen: []
      },
      inhalatorInformatie: [],
      reminderTijden: '',

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
  filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
  },
  methods: {
    add(object) {
      var vm = this;
      switch(object.type) {
        case 'Luchtwegverwijders': {
          let array = vm.inhalatorSelectedInformation.luchtwegverwijders;
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element.inhalatorName === object.inhalatorName) {
              if(element.counter === 3) {
                element.counter = 3;
              }
              else {
              element.counter++;
              let object = {
                value: ''
              }
              element.lijst.push(object);
              }
            }
          }
        }
          break;
        case 'Luchtwegbeschermers': {
          let array = vm.inhalatorSelectedInformation.luchtwegbeschermers;
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element.inhalatorName === object.inhalatorName) {
              if(element.counter === 3) {
                element.counter = 3;
              }
              else {
              element.counter++;
              let object = {
                value: ''
              }
              element.lijst.push(object);
              }
            }
          }
        }
          break;
        case 'Neusspray': {
          let array = vm.inhalatorSelectedInformation.neusspray;
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element.inhalatorName === object.inhalatorName) {
              if(element.counter === 3) {
                element.counter = 3;
              }
              else {
              element.counter++;
              let object = {
                value: ''
              }
              element.lijst.push(object);
              }
            }
          }
        }
          break;
      }
    },
    minus(object) {
      var vm = this;
      switch(object.type) {
        case 'Luchtwegverwijders': {
          let array = vm.inhalatorSelectedInformation.luchtwegverwijders;
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element.inhalatorName === object.inhalatorName) {
              if(element.counter === 1) {
                element.counter = 1;
              }
              else {
              element.counter--;
              let index = element.lijst.length - 1;
              element.lijst.splice(index, 1);
              }
            }
          }
        }
          break;
        case 'Luchtwegbeschermers': {
          let array = vm.inhalatorSelectedInformation.luchtwegbeschermers;
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element.inhalatorName === object.inhalatorName) {
              if(element.counter === 1) {
                element.counter = 1;
              }
              else {
              element.counter--;
              let index = element.lijst.length - 1;
              element.lijst.splice(index, 1);
              }
            }
          }
        }
          break;
        case 'Neusspray': {
          let array = vm.inhalatorSelectedInformation.neusspray;
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element.inhalatorName === object.inhalatorName) {
              if(element.counter === 1) {
                element.counter = 1;
              }
              else {
              element.counter--;
              let index = element.lijst.length - 1;
              element.lijst.splice(index, 1);
              }
            }
          }
        }
          break;
      }
    },
    loginScreen() {
      this.$store.commit("saveInhalators", this.inhalatorSelected);
      var output = [...this.inhalatorSelectedInformation.luchtwegverwijders, ...this.inhalatorSelectedInformation.luchtwegbeschermers, ...this.inhalatorSelectedInformation.neusspray];
      this.$store.commit("saveMedication", output);
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
    getMedicineInformation() {
      return new Promise((resolve, reject) => {
      var vm = this;
      axios.get("http://localhost:8000/api/getmedication")
        .then(function (response) {
          resolve(response);
          var array = response.data;
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            switch(element.type) {
              case 'Luchtwegverwijders':
                switch(element.subType) {
                  case 'Kortwerkende betamimetica':
                    vm.apiMedicijen.luchtwegverwijders.kortwerkendeBetamimetica.push(element);
                    break;
                  case 'Kortwerkende anticholinergica':
                    vm.apiMedicijen.luchtwegverwijders.kortwerkendeAnticholinergica.push(element);
                    break;
                  case 'Langwerkende betamimetica':
                    vm.apiMedicijen.luchtwegverwijders.langwerkendeBetamimetica.push(element);
                    break;
                  case 'Langwerkende anticholinergica':
                    vm.apiMedicijen.luchtwegverwijders.langwerkendeAnticholinergica.push(element);
                    break;
                }
                break;
              case 'Luchtwegbeschermers':
                vm.apiMedicijen.luchtwegbeschermers.push(element);
                break;
              case 'Neusspray':
                vm.apiMedicijen.neusspray.push(element);
                break;
            }
          }
        })
        .catch(function (error) {
          reject(error);
        })
      });
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
      }).catch(function (error) {
        reject(error);
      })
      })
    },
    getChosenMedication() {
      return new Promise((resolve, reject) => {
        var vm = this;
        var string = this.inhalatorSelected.join();
        console.log(string);
        axios.get("http://localhost:8000/api/choseninhalators", {
            params: {
                values: string
            }
        }).then(function (response) {
            resolve(response);
            let array = response.data;
            for (let index = 0; index < array.length; index++) {
              const element = array[index];
              switch(element.type) {
                case 'Luchtwegverwijders': {
                  let kortwerkendeAnticholinergica = vm.apiMedicijen.luchtwegverwijders.kortwerkendeAnticholinergica;
                  let kortwerkendeBetamimetica = vm.apiMedicijen.luchtwegverwijders.kortwerkendeBetamimetica;
                  let langwerkendeAnticholinergica = vm.apiMedicijen.luchtwegverwijders.langwerkendeAnticholinergica;
                  let langwerkendeBetamimetica = vm.apiMedicijen.luchtwegverwijders.langwerkendeAnticholinergica;
                  for (let index = 0; index < kortwerkendeAnticholinergica.length; index++) {
                    let medicijn = kortwerkendeAnticholinergica[index];
                    if(medicijn.name.toLowerCase() === element.gebruikMedicijn) {
                      vm.medicineID = medicijn.id;
                    }
                  }
                  for (let index = 0; index < kortwerkendeBetamimetica.length; index++) {
                    let medicijn = kortwerkendeBetamimetica[index];
                    if(medicijn.name.toLowerCase() === element.gebruikMedicijn) {
                      vm.medicineID = medicijn.id;
                    }
                  }
                  for (let index = 0; index < langwerkendeAnticholinergica.length; index++) {
                    let medicijn = langwerkendeAnticholinergica[index];
                    if(medicijn.name.toLowerCase() === element.gebruikMedicijn) {
                      vm.medicineID = medicijn.id;
                    }
                  }
                  for (let index = 0; index < langwerkendeBetamimetica.length; index++) {
                    let medicijn = langwerkendeBetamimetica[index];
                    if(medicijn.name.toLowerCase() === element.gebruikMedicijn) {
                      vm.medicineID = medicijn.id;
                    }
                  }
                  let object = {
                    medicineID: vm.medicineID,
                    inhalatorName: element.inhalatorName,
                    gebruikMedicijn: element.gebruikMedicijn,
                    afbeelding: element.afbeelding,
                    type: element.type,
                    model: false,
                    counter: 1,
                    lijst: [
                      {
                        value: ''
                      },
                    ]
                  }
                  vm.inhalatorSelectedInformation.luchtwegverwijders.push(object);
                  vm.medicineID = 0;
                  break;
                }
                case 'Luchtwegbeschermers': {
                  let luchtwegbeschermers = vm.apiMedicijen.luchtwegbeschermers;
                  for (let index = 0; index < luchtwegbeschermers.length; index++) {
                    const medicijn = luchtwegbeschermers[index];
                    if(medicijn.name.toLowerCase() === element.gebruikMedicijn) {
                      vm.medicineID = medicijn.id;
                    }
                  }
                  let object1 = {
                    medicineID: vm.medicineID,
                    inhalatorName: element.inhalatorName,
                    afbeelding: element.afbeelding,
                    type: element.type,
                    model: false,
                    counter: 1,
                    lijst: [
                      {
                        value: ''
                      },
                    ]
                  }
                  vm.inhalatorSelectedInformation.luchtwegbeschermers.push(object1);
                  vm.medicineID = 0;
                  break;
                }
                case 'Neusspray': {
                  let neusspray = vm.apiMedicijen.neusspray;
                  for (let index = 0; index < neusspray.length; index++) {
                    const medicijn = neusspray[index];
                    if(medicijn.name.toLowerCase() === element.gebruikMedicijn) {
                      vm.medicineID = medicijn.id;
                    }
                  }
                  let object2 = {
                    medicineID: vm.medicineID,
                    inhalatorName: element.inhalatorName,
                    afbeelding: element.afbeelding,
                    type: element.type,
                    model: false,
                    counter: 1,
                    lijst: [
                      {
                        value: ''
                      },
                    ]
                  }
                  vm.inhalatorSelectedInformation.neusspray.push(object2);
                  vm.medicineID = 0;
                  break;
                }
              }
            }
        }).catch(function (error) {
            reject(error);
        })
      });
    },
    switchZone() {
      var vm = this;
      switch (this.zone) {
        case "groen":
          this.zone = "geel";
          this.triggersPage = true;
          this.groeneZone = false;
          this.e1 = 2;
          this.$store.commit("saveTriggers", this.triggers);
          break;
        case "geel":
          this.zone = "oranje";
          this.groeneZone = true;
          this.geleZone = false;
          this.$refs.form.resetValidation()
          break;
        case "oranje":
          this.zone = "rood";
          this.geleZone = true;
          this.oranjeZone = false;
          this.$refs.form.resetValidation()
          break;
        case "rood":
          this.zone = "medicatiegebruik";
          this.oranjeZone = true;
          this.rodeZone = false;
          this.$refs.form.resetValidation()
          break;
        case "medicatiegebruik":
          this.zone = "medicijngebruik"
          this.getMedicineInformation().then(function () {
              vm.rodeZone = true;
              vm.medicatieGebruik = false;
              vm.e1 = 3;
          })
          .catch(function () {
            console.log("Er is iets fout met de API")
          })
          this.$store.commit("saveActionPlan", this.actieplan);
          break;
        case "medicijngebruik": 
          this.zone = "reminderInstellen"
          this.getInhalatorInformation().then(function () {
            vm.medicatieGebruik = true;
            vm.medicijnGebruik = false;
          })
          .catch(function (error) {
            console.log(error);
          })
          break;
        case 'reminderInstellen':
          vm.zone = "reminderMedicijn"
          vm.medicijnGebruik = true;
          vm.reminderInstellen = false;
          vm.e1 = 4;
          break;
        case 'reminderMedicijn':
          vm.getChosenMedication().then(function () {
              vm.reminderInstellen = true;
              vm.reminderMedicijn = false;
          })
          .catch(function (error) {
            console.log(error);
          })
          break;
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
            let voorval = vm.inhalatorSelected.indexOf(element.id);
            vm.inhalatorSelected.splice(voorval, 1);
            }
          }
          else {
            if(inhalatorID === element.id) {
              element.state = !element.state
              if(element.state === true) {
                element.color = 'orange';
                vm.inhalatorSelected.push(element.id);
              }
            }
          }
        }
      }
    }
  },
  },
  watch: {
    inhalatorSelectedInformation: {
      handler: function () {
      var vm = this;
      let luchtwegverwijders = vm.inhalatorSelectedInformation.luchtwegverwijders;
      let luchtwegbeschermers = vm.inhalatorSelectedInformation.luchtwegbeschermers;
      let neusspray = vm.inhalatorSelectedInformation.neusspray;

      for (let index = 0; index < luchtwegverwijders.length; index++) {
        const luchtwegverwijder = luchtwegverwijders[index];
        const listUno = luchtwegverwijder.lijst;
        for (let index = 0; index < listUno.length; index++) {
          const element1 = listUno[index];
          if(element1.value === "") {
            console.log(element1.value);
            vm.reminderOK.luchtwegverwijders = false;
          }
          else {
            console.log(element1.value);
            vm.reminderOK.luchtwegverwijders = true;
          }
        }
        for (let index = 0; index < luchtwegbeschermers.length; index++) {
          const luchtwegbeschermer = luchtwegbeschermers[index];
          const listDos = luchtwegbeschermer.lijst;
          for (let index = 0; index < listDos.length; index++) {
            const element2 = listDos[index];
            if(element2.value === "") {
              vm.reminderOK.luchtwegbeschermers = false;
            }
            else {
              vm.reminderOK.luchtwegbeschermers = true;
            }
          }
          for (let index = 0; index < neusspray.length; index++) {
            const neus = neusspray[index];
            const listTres = neus.lijst;
            for (let index = 0; index < listTres.length; index++) {
              const element3 = listTres[index];
              if(element3.value === "") {
                vm.reminderOK.neusspray = false;
              }
              else {
                vm.reminderOK.neusspray = true;
              }
            }
          }
        }
      }

      if(vm.reminderOK.luchtwegverwijders === true && vm.reminderOK.luchtwegbeschermers === false && vm.reminderOK.neusspray === false) {
        vm.reminder = true;
      }
      else if(vm.reminderOK.luchtwegverwijders === false && vm.reminderOK.luchtwegbeschermers === true && vm.reminderOK.neusspray === false) {
        vm.reminder = true;
      }
      else if(vm.reminderOK.luchtwegverwijders === false && vm.reminderOK.luchtwegbeschermers === false && vm.reminderOK.neusspray === true) {
        vm.reminder = true;
      }
      else if(vm.reminderOK.luchtwegverwijders === false && vm.reminderOK.luchtwegbeschermers === false && vm.reminderOK.neusspray === false) {
        vm.reminder = false;
      }
      },
      deep: true
    },
    inhalatorSelected: function() {
      var vm = this;
      if(vm.inhalatorSelected.length >= 3) {
        vm.medicineSelected = true;
      }
      else {
        vm.medicineSelected = false;
      }
    },
    medicijnen: {
      handler: function() {
        var vm = this;
        if(vm.medicijnen.luchtwegverwijders.length === 1 & 
          vm.medicijnen.luchtwegbeschermers.length === 1 & vm.medicijnen.neusspray.length === 1) {
            vm.medicijnenOK = true;
        }
        else {
          vm.medicijnenOK = false;
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
          vm.areEnabled = true;
        }
        else {
          vm.triggersOK = true;
          vm.areEnabled = false;
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
.verplaatslinks {
  margin-left: 35%;
}
.verplaatsrechts {
  margin-right: 35%;
}
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