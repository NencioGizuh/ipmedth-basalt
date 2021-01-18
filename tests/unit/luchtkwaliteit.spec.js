import { shallowMount, createLocalVue  } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AirqualityOverview.vue', () => {
    let actions;
    let getters;
    let store;
    let vuetify;

    beforeEach(() => {
        actions = {
        }
        getters = {
        }
        store = new Vuex.Store({
        })
        vuetify = new Vuetify()
    });

    it('', () => {
    });
});