<template>
  <div>
    <!-- Calendar -->
    <div id="app">
      <v-app id="inspire" class="my-datepicker">
        <v-row justify="space-around">
          <v-date-picker
            full-width
            v-model="picker"
            color="blue lighten-1"
            class="date-picker"
          ></v-date-picker>
        </v-row>
      </v-app>
    </div>

    <!-- Checklist -->
    <div class="taskbox">
      <h4 class="taskbox__title">Uitgevoerde oefeningen</h4>
      <div>
        <input type="checkbox" id="todosID1" name="todo" value="todo" v-model="completedID1">
        <router-link class="label" to="/breathingexercise/cpmeasurement/CP1">{{ task1 }}</router-link>
      </div>
      <div>
        <input type="checkbox" id="todosID2" name="todo" value="todo" v-model="completedID2">
        <router-link class="label" for="todo" to="/breathingexercise/list/interval">{{ task2 }}</router-link>
      </div>
      <div>
        <input type="checkbox" id="todosID3" name="todo" value="todo" v-model="completedID3">
        <router-link class="label" for="todo" to="/breathingexercise/cpmeasurement/CP2">{{ task3 }}</router-link>
      </div>
    </div>

    <!-- Knoppen -->
    <div class="breathingexersice__button">
      <v-btn outlined block class="breathingexercise__button--child" color="primary" to="/breathingexercise/cpstatistics">
        CP Metingen statistieken
      </v-btn>
      <v-btn outlined block class="breathingexercise__button--child" color="primary" to="/breathingexercise/list">
        Oefeningen
      </v-btn>
    </div>
  </div> 
</template>

<script>
import Vuetify from "vuetify";

export default {
  name: "BreathingExerciseOverview",
  created() {
    this.$store.dispatch("setDefaultAppbar");
  },
  vuetify: new Vuetify(),
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10),
      task1: "CP Meting 1", 
      task2: "Interval", 
      task3: "CP Meting 2",
      completedID1: localStorage.getItem('completedID1'),
      completedID2: localStorage.getItem('completedID2'),
      completedID3: localStorage.getItem('completedID3'),
      test: false
    };
  },
};
</script>

<style lang="scss" scoped>
.taskbox {
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  padding: 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin: 35px 0 30px 0;
  transform: scale(0.999);

  &__input {
    margin: 0 0 10px 0;
    font-size: 18px;
  }

  &__title {
    margin: 0 0 10px 0;
  }
}

.my-datepicker {
  width: 100%;
  height: 330px;
}

.breathingexercise__button--child{
  margin: 20px auto;
}

.date-picker {
  padding: 10px;
}

// ------------------------------------------------------------------------
$black: #363839;
$lightgray: #9c9e9f;
$gray: #bdc1c6;
$white: #fff;
$green: #06842c;

* {
  box-sizing: border-box;
  &::before, &::after {
    box-sizing: border-box;
  }
}

input[type="checkbox"] {
  position: relative;
  width: 1.5em;
  height: 1.5em;
  color: $black;
  border: 1px solid $gray;
  border-radius: 4px;
  appearance: none;
  outline: 0;
  cursor: pointer;
  transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
  margin: 0 10px 0 0;
  &::before {
    position: absolute;
    content: '';
    display: block;
    top: 2px;
    left: 7px;
    width: 8px;
    height: 14px;
    border-style: solid;
    border-color: $white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
  }
  &:checked {
    color: $white;
    border-color: $green;
    background: $green;
    &::before {
      opacity: 1;
    }
    ~ label::before {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
}

.label {
  position: absolute;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  padding: 0 0.25em 0;
  user-select: none;
  color: black;
  text-decoration: none;
  &::before {
    position: absolute;
    content: attr(data-content);
    color: $lightgray;
    clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
    text-decoration: line-through;
    text-decoration-thickness: 3px;
    text-decoration-color: $black;
    transition: clip-path 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
}
</style>