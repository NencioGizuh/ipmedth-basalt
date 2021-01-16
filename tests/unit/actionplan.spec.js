import { shallowMount, createLocalVue  } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import ActionPlanOverview from '@/views/ActionPlan/ActionPlanOverview.vue';
import ChangeActionPlan from '@/views/ActionPlan/ChangeActionPlan.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ActionPlanOverview.vue', () => {
    let actions;
    let getters;
    let store;
    let vuetify;

    let actionplan = {
        zoneGreenPeakFlowBeforeMedicines: 600,
        zoneGreenPeakFlowAfterMedicines: null,
        zoneGreenExplanation: null,
        zoneYellowPeakFlowBelow: 599,
        zoneYellowPeakFlowAbove: 400,
        zoneYellowMedicines: null,
        zoneYellowExplanation: null,
        phoneNumberGP: null,
        phoneNumberLungSpecialist: null,
        zoneOrangeExplanation: null,
        zoneRedPeakFlow: 200,
        zoneRedMedicines: null,
        zoneRedExplanation: null,
    };

    beforeEach(() => {
        actions = {
            setDefaultAppbar: jest.fn()
        }
        getters = {
            getPeakFlowZoneGreen: () => 600,
            getPeakFlowZoneYellow: () => 400,
            getPeakFlowZoneRed: () => 200,
            getPhoneNumberGP: () => "0612345678",
            getPhoneNumberLungSpecialist: () => "0687654321",
            getActionPlan: () => actionplan,
            loadingActionPlan: () => false,
        }
        store = new Vuex.Store({
            actions,
            getters
        })
        vuetify = new Vuetify()
    });

    it('check href button GP', () => {
        const wrapper = shallowMount(ActionPlanOverview, {
            store,
            localVue,
            vuetify
        });

        const buttonGP = wrapper.find("#buttonGP");
        expect(buttonGP.attributes().href).toBe(`tel:${getters.getPhoneNumberGP()}`);
    });

    it('check href button lung specialist', () => {
        const wrapper = shallowMount(ActionPlanOverview, {
            store,
            localVue,
            vuetify
        });

        const buttonLungSpecialist = wrapper.find("#buttonLungSpecialist");
        expect(buttonLungSpecialist.attributes().href).toBe(`tel:${getters.getPhoneNumberLungSpecialist()}`);
    });
});

describe('ChangeActionPlan.vue', () => {
    let actions;
    let store;
    let vuetify;

    beforeEach(() => {
        actions = {
            postActionPlan: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
        vuetify = new Vuetify()
    });

    it('fill actionplan form', async() => {
        const wrapper = shallowMount(ChangeActionPlan, {
            store,
            localVue,
            vuetify
        });

        expect(wrapper.vm.zoneGreenPeakFlowBeforeMedicines).toEqual(null);
        expect(wrapper.vm.zoneGreenPeakFlowAfterMedicines).toEqual(null);
        expect(wrapper.vm.zoneGreenExplanation).toEqual(null);
        expect(wrapper.vm.zoneYellowPeakFlowBelow).toEqual(null);
        expect(wrapper.vm.zoneYellowPeakFlowAbove).toEqual(null);
        expect(wrapper.vm.zoneYellowMedicines).toEqual(null);
        expect(wrapper.vm.zoneYellowExplanation).toEqual(null);
        expect(wrapper.vm.phoneNumberGP).toEqual(null);
        expect(wrapper.vm.phoneNumberLungSpecialist).toEqual(null);
        expect(wrapper.vm.zoneRedPeakFlow).toEqual(null);
        expect(wrapper.vm.zoneRedMedicines).toEqual(null);
        expect(wrapper.vm.zoneRedExplanation).toEqual(null);

        await wrapper.setData({
            zoneGreenPeakFlowBeforeMedicines: 600,
            zoneGreenPeakFlowAfterMedicines: 700,
            zoneGreenExplanation: "Medicatie nemen zoals afgesproken",
            zoneYellowPeakFlowBelow: 599,
            zoneYellowPeakFlowAbove: 350,
            zoneYellowMedicines: "Medicine 1",
            zoneYellowExplanation: "Niet te lang in zone geel blijven hangen",
            phoneNumberGP: "0612345678",
            phoneNumberLungSpecialist: "0687654321",
            zoneRedPeakFlow: 349,
            zoneRedMedicines: "Medicine 2",
            zoneRedExplanation: "Bij grote problemen, direct contact opnemen",
        });

        expect(wrapper.vm.zoneGreenPeakFlowBeforeMedicines).toEqual(600);
        expect(wrapper.vm.zoneGreenPeakFlowAfterMedicines).toEqual(700);
        expect(wrapper.vm.zoneGreenExplanation).toEqual("Medicatie nemen zoals afgesproken");
        expect(wrapper.vm.zoneYellowPeakFlowBelow).toEqual(599);
        expect(wrapper.vm.zoneYellowPeakFlowAbove).toEqual(350);
        expect(wrapper.vm.zoneYellowMedicines).toEqual("Medicine 1");
        expect(wrapper.vm.zoneYellowExplanation).toEqual("Niet te lang in zone geel blijven hangen");
        expect(wrapper.vm.phoneNumberGP).toEqual("0612345678");
        expect(wrapper.vm.phoneNumberLungSpecialist).toEqual("0687654321");
        expect(wrapper.vm.zoneRedPeakFlow).toEqual(349);
        expect(wrapper.vm.zoneRedMedicines).toEqual("Medicine 2");
        expect(wrapper.vm.zoneRedExplanation).toEqual("Bij grote problemen, direct contact opnemen");
    });
});
