import Vue from 'vue'
import VueRouter from 'vue-router'

import AccountOverview from "@/views/Account/AccountOverview.vue";
import ChangePassword from "@/views/Account/ChangePassword.vue";
import ChangePersonalInformation from "@/views/Account/ChangePersonalInformation.vue";
import ManageNotifications from "@/views/Account/ManageNotifications.vue";
import ManageTriggers from "@/views/Account/ManageTriggers.vue";

import ActionPlanOverview from "@/views/ActionPlan/ActionPlanOverview.vue";
import ChangeActionPlan from "@/views/ActionPlan/ChangeActionPlan.vue";

import AirConcentration from "@/views/AirQuality/AirConcentration.vue";
import AirQuality from "@/views/AirQuality/AirQuality.vue";

import BreathingExerciseOverview from "@/views/BreathingExercise/BreathingExerciseOverview.vue";
import BreathingExercisesList from "@/views/BreathingExercise/BreathingExercisesList.vue";

import CpMeasurement from "@/views/BreathingExercise/CpMeasurement/CpMeasurement.vue";
import CP1 from "@/views/BreathingExercise/CpMeasurement/CP1.vue";
import CP1start from "@/views/BreathingExercise/CpMeasurement/CP1start.vue";
import CP2 from "@/views/BreathingExercise/CpMeasurement/CP2.vue";
import CP2start from "@/views/BreathingExercise/CpMeasurement/CP2start.vue";
import CpStatistics from "@/views/BreathingExercise/CpMeasurement/CpStatistics.vue";

import IntervalExplanation from "@/views/BreathingExercise/Interval/IntervalExplanation.vue";
import IntervalCountdown from "@/views/BreathingExercise/Interval/IntervalCountdown.vue";
import IntervalRuntime from "@/views/BreathingExercise/Interval/IntervalRuntime.vue";

import ButeykoExplanation from "@/views/BreathingExercise/Buteyko/ButeykoExplanation.vue";
import MiddenrifspierExplanation from "@/views/BreathingExercise/Middenrifspier/MiddenrifspierExplanation.vue";
import PapworthExplanation from "@/views/BreathingExercise/Papworth/PapworthExplanation.vue";
import WimhofExplanation from "@/views/BreathingExercise/Wimhof/WimhofExplanation.vue";

import AddMedication from "@/views/Medication/AddMedication.vue";
import MedicationOverview from "@/views/Medication/MedicationOverview.vue";
import MedicationDoing from "@/views/Medication/MedicationDoing.vue";
import MedicationHelp from "@/views/Medication/MedicationHelp.vue";

import AddPeakFlow from "@/views/PeakFlow/AddPeakFlow.vue";
import PeakFlowMeasurement from "@/views/PeakFlow/PeakFlowMeasurement.vue";
import PeakFlowOverview from "@/views/PeakFlow/PeakFlowOverview.vue";
import SharePeakFlow from "@/views/PeakFlow/SharePeakFlow.vue";

import Register from "@/views/Register/Register.vue";
import RegisterAstmaTrigger from "@/views/Register/RegisterAstmaTrigger.vue";
import SaveInformation from "@/views/Register/SaveInformation.vue";
import UserInformation from "@/views/Register/UserInformation.vue";

import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);

const beforeEnterNotAuth = (to, from, next) => {
    if (localStorage.getItem('token')) {
        next();
    } else {
        next('/login');
    }
};

const beforeEnterIsAuth = (to, from, next) => {
    if (localStorage.getItem('token')) {
        next('/dashboard');
    } else {
        next();
    }
};

const routes = [
    { path: "/account", component: AccountOverview, beforeEnter: beforeEnterNotAuth },
    { path: "/account/changepassword", component: ChangePassword, beforeEnter: beforeEnterNotAuth },
    { path: "/account/changepersonalinformation", component: ChangePersonalInformation, beforeEnter: beforeEnterNotAuth },
    { path: "/account/managenotifications", component: ManageNotifications, beforeEnter: beforeEnterNotAuth },
    { path: "/account/managetriggers", component: ManageTriggers, beforeEnter: beforeEnterNotAuth },
    { path: "/actionplan", component: ActionPlanOverview, beforeEnter: beforeEnterNotAuth },
    { path: "/actionplan/change", component: ChangeActionPlan, beforeEnter: beforeEnterNotAuth },
    { path: "/dashboard/:name_of_city/concentration/:name_of_concentration", component: AirConcentration, beforeEnter: beforeEnterNotAuth },
    { path: "/dashboard/:name_of_city/airquality", component: AirQuality, beforeEnter: beforeEnterNotAuth },
    { path: "/breathingexercise", component: BreathingExerciseOverview, beforeEnter: beforeEnterNotAuth },
    { path: "/breathingexercise/list", component: BreathingExercisesList, beforeEnter: beforeEnterNotAuth },
    //Interval
    { path: "/breathingexercise/list/interval", component: IntervalExplanation, beforeEnter: beforeEnterNotAuth },
    { path: "/breathingexercise/list/interval/countdown", component: IntervalCountdown, beforeEnter: beforeEnterNotAuth },
    { path: "/breathingexercise/list/interval/runtime", component: IntervalRuntime, beforeEnter: beforeEnterNotAuth },

    { path: "/breathingexercise/list/buteyko", component: ButeykoExplanation, beforeEnter: beforeEnterNotAuth },
    { path: "/breathingexercise/list/middenrifspier", component: MiddenrifspierExplanation, beforeEnter: beforeEnterNotAuth },
    { path: "/breathingexercise/list/papworth", component: PapworthExplanation, beforeEnter: beforeEnterNotAuth },
    { path: "/breathingexercise/list/wimhof", component: WimhofExplanation, beforeEnter: beforeEnterNotAuth },
    //CP Meting
    { path: "/breathingexercise/cpmeasurement", component: CpMeasurement, beforeEnter: beforeEnterNotAuth },
    { path: "/breathingexercise/cpmeasurement/CP1", component: CP1, beforeEnter: beforeEnterNotAuth },
    { path: "/breathingexercise/cpmeasurement/CP1/CP1start", component: CP1start, beforeEnter: beforeEnterNotAuth },
    { path: "/breathingexercise/cpmeasurement/CP2", component: CP2, beforeEnter: beforeEnterNotAuth },
    { path: "/breathingexercise/cpmeasurement/CP2/CP2start", component: CP2start, beforeEnter: beforeEnterNotAuth },
    { path: "/breathingexercise/cpstatistics", component: CpStatistics, beforeEnter: beforeEnterNotAuth },
    //Medicatie
    { path: "/medication/add", component: AddMedication, beforeEnter: beforeEnterNotAuth },
    { path: "/medication", component: MedicationOverview, beforeEnter: beforeEnterNotAuth },
    { path: "/medication/doing", component: MedicationDoing, beforeEnter: beforeEnterNotAuth },
    { path: "/medication/help", component: MedicationHelp, beforeEnter: beforeEnterNotAuth },
    //registratie
    { path: "/register", component: Register },
    { path: "/register/astmatrigger", component: RegisterAstmaTrigger, name: "RegisterAstmaTrigger" },

    { path: "/peakflow/add", component: AddPeakFlow, beforeEnter: beforeEnterNotAuth },
    { path: "/peakflow/:peak_flow_id", component: PeakFlowMeasurement, beforeEnter: beforeEnterNotAuth },
    { path: "/peakflow", component: PeakFlowOverview, beforeEnter: beforeEnterNotAuth },
    { path: "/peakflow/:peak_flow_id/share", component: SharePeakFlow, beforeEnter: beforeEnterNotAuth },
    { path: "/saveinformation", component: SaveInformation },
    { path: "/userinformation", component: UserInformation },
    { path: "/dashboard", component: Dashboard, beforeEnter: beforeEnterNotAuth },
    { path: "/login", component: Login, beforeEnter: beforeEnterIsAuth },
    { path: "/", redirect: "/login" },
]

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 };
    }
})

export default router
