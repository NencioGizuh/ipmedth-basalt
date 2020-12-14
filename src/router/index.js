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

Vue.use(VueRouter)

const routes = [
    { path: "/account", component: AccountOverview },
    { path: "/account/changepassword", component: ChangePassword },
    { path: "/account/changepersonalinformation", component: ChangePersonalInformation },
    { path: "/account/managenotifications", component: ManageNotifications },
    { path: "/account/managetriggers", component: ManageTriggers },
    { path: "/actionplan", component: ActionPlanOverview },
    { path: "/actionplan/change", component: ChangeActionPlan },
    { path: "/dashboard/:name_of_city/concentration/:name_of_concentration", component: AirConcentration },
    { path: "/dashboard/:name_of_city/airquality", component: AirQuality },
    { path: "/breathingexercise", component: BreathingExerciseOverview },
    { path: "/breathingexercise/list", component: BreathingExercisesList },
    //Interval
    { path: "/breathingexercise/list/interval", component: IntervalExplanation },
    { path: "/breathingexercise/list/interval/countdown", component: IntervalCountdown },
    { path: "/breathingexercise/list/interval/runtime", component: IntervalRuntime },
    //CP Meting
    { path: "/breathingexercise/cpmeasurement", component: CpMeasurement },
    { path: "/breathingexercise/cpmeasurement/CP1", component: CP1 },
    { path: "/breathingexercise/cpmeasurement/CP1/CP1start", component: CP1start },
    { path: "/breathingexercise/cpmeasurement/CP2", component: CP2 },
    { path: "/breathingexercise/cpmeasurement/CP2/CP2start", component: CP2start },
    { path: "/breathingexercise/cpstatistics", component: CpStatistics },
    //Medicatie
    { path: "/medication/add", component: AddMedication },
    { path: "/medication", component: MedicationOverview },
    { path: "/medication/doing", component: MedicationDoing },
    { path: "/medication/help", component: MedicationHelp },
    //registratie
    { path: "/register", component: Register },
    { path: "/register/astmatrigger", component: RegisterAstmaTrigger, name: "RegisterAstmaTrigger" },

    { path: "/peakflow/add", component: AddPeakFlow },
    { path: "/peakflow/:peak_flow_id", component: PeakFlowMeasurement },
    { path: "/peakflow", component: PeakFlowOverview },
    { path: "/peakflow/:peak_flow_id/share", component: SharePeakFlow },
    { path: "/saveinformation", component: SaveInformation },
    { path: "/userinformation", component: UserInformation },
    { path: "/dashboard", component: Dashboard },
    { path: "/login", component: Login },
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
