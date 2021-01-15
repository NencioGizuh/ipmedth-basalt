import { shallowMount, createLocalVue  } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import PeakFlowMeasurementCircle from '@/components/PeakFlow/PeakFlowMeasurementCircle.vue';
import AddPeakFlow from '@/views/PeakFlow/AddPeakFlow.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuex);

describe('PeakFlowMeasurementCircle.vue', () => {
    let getters;
    let store;

    beforeEach(() => {
        getters = {
            getPeakFlowZoneGreen: () => 600,
            getPeakFlowZoneYellow: () => 400
        }
        store = new Vuex.Store({
            getters
        })
    });

    it('renders props.value when passed', () => {
        const value = "300 l/min";
        const wrapper = shallowMount(PeakFlowMeasurementCircle, {
            store,
            localVue,
            propsData: { value }
        });
        expect(wrapper.text()).toMatch(value);
    });

    it('test method change color circle', () => {
        const value = "300";
        const wrapper = shallowMount(PeakFlowMeasurementCircle, {
            store,
            localVue,
            propsData: { value }
        });
        expect(wrapper.classes('circle__red')).toBe(true);
    });
});

describe('AddPeakFlow.vue', () => {
    let actions;
    let store;
    let vuetify;

    beforeEach(() => {
        actions = {
            addPeakFlow: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
        vuetify = new Vuetify()
    });

    it('fill measurements form', async() => {
        const wrapper = shallowMount(AddPeakFlow, {
            store,
            localVue,
            vuetify
        });

        expect(wrapper.vm.measurementOne).toEqual(null);
        expect(wrapper.vm.measurementTwo).toEqual(null);
        expect(wrapper.vm.measurementThree).toEqual(null);

        await wrapper.setData({
            measurementOne: 300,
            measurementTwo: 400,
            measurementThree: 500
        });

        expect(wrapper.vm.measurementOne).toEqual(300);
        expect(wrapper.vm.measurementTwo).toEqual(400);
        expect(wrapper.vm.measurementThree).toEqual(500);
    });
});
