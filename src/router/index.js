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
import AirQualityIndex from "@/views/AirQuality/AirQualityIndex.vue";

import BreathingExerciseOverview from "@/views/BreathingExercise/BreathingExerciseOverview.vue";
import BreathingExercisesList from "@/views/BreathingExercise/BreathingExercisesList.vue";
import CpMeasurement from "@/views/BreathingExercise/CpMeasurement.vue";
import CpStatistics from "@/views/BreathingExercise/CpStatistics.vue";

import AddMedication from "@/views/Medication/AddMedication.vue";
import MedicationOverview from "@/views/Medication/MedicationOverview.vue";
import MedicationDoing from "@/views/Medication/MedicationDoing.vue";
import MedicationHelp from "@/views/Medication/MedicationHelp.vue";

import AddPeakFlow from "@/views/PeakFlow/AddPeakFlow.vue";
import PeakFlowMeasurement from "@/views/PeakFlow/PeakFlowMeasurement.vue";
import PeakFlowOverview from "@/views/PeakFlow/PeakFlowOverview.vue";
import SharePeakFlow from "@/views/PeakFlow/SharePeakFlow.vue";

import Register from "@/views/Register/Register.vue";
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
    { path: "/dashboard/airquality/index", component: AirQualityIndex },
    { path: "/breathingexercise", component: BreathingExerciseOverview },
    { path: "/breathingexercise/list", component: BreathingExercisesList },
    { path: "/breathingexercise/cpmeasurement", component: CpMeasurement },
    { path: "/breathingexercise/cpstatistics", component: CpStatistics },
    { path: "/medication/add", component: AddMedication },
    { path: "/medication", component: MedicationOverview },
    { path: "/medication/doing", component: MedicationDoing },
    { path: "/medication/help", component: MedicationHelp },
    { path: "/peakflow/add", component: AddPeakFlow },
    { path: "/peakflow/:peak_flow_id", component: PeakFlowMeasurement },
    { path: "/peakflow", component: PeakFlowOverview },
    { path: "/peakflow/:peak_flow_id/share", component: SharePeakFlow },
    { path: "/register", component: Register },
    { path: "/saveinformation", component: SaveInformation },
    { path: "/userinformation", component: UserInformation },
    { path: "/dashboard", component: Dashboard },
    { path: "/login", component: Login },
    { path: "/", redirect: "/login" },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
