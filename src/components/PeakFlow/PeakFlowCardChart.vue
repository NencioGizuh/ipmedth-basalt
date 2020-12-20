<template>
    <v-card class="mt-3">
        <v-card-text>

            <v-btn-toggle v-model="selectTimeRangeChart" mandatory color="primary" class="selectTimeRangeBtnGroup pb-5">
                <v-row no-gutters>
                    <v-col class="d-flex justify-space-around">
                        <v-btn 
                            value="week" 
                            x-small 
                            text 
                            class="selectTimeRangeBtn" 
                            :color="selectTimeRangeChart==='week' ? 'primary' : 'normal'"
                        >
                            Laatste week
                        </v-btn>
                    </v-col>
                    <v-col class="d-flex justify-space-around">
                        <v-btn 
                            value="twoweeks" 
                            x-small 
                            text 
                            class="selectTimeRangeBtn" 
                            :color="selectTimeRangeChart==='twoweeks' ? 'primary' : 'normal'"
                        >
                            Laatste twee weken
                        </v-btn>
                    </v-col>
                    <v-col class="d-flex justify-space-around">
                        <v-btn 
                            value="month" 
                            x-small 
                            text 
                            class="selectTimeRangeBtn" 
                            :color="selectTimeRangeChart==='month' ? 'primary' : 'normal'"
                        >
                            Laatste maand
                        </v-btn>
                    </v-col>
                </v-row>
            </v-btn-toggle>

            <peak-flow-chart :height='200' :chartData="chartData" :options="chartOptions" />

        </v-card-text>
    </v-card>
</template>

<script>
import PeakFlowChart from "@/components/PeakFlow/PeakFlowChart.vue";
import moment from "moment";

export default {
    name: "PeakFlowCardChart",
    data() {
        return {
            selectTimeRangeChart: "week",
            chartData: {},
            chartOptions: {
                scales: {
                    yAxes: [{
                        ticks:{
                            beginAtZero: true,
                            stepSize: 200,
                        },
                        gridLines: {
                            display: false,
                        },
                    }],
                    xAxes: [{
                        type: "time",
                        time: {
                            unit: "days",
                            displayFormats: {
                                days: 'DD-MM'
                            },
                            tooltipFormat: 'DD-MM-YYYY HH:mm'
                        },
                        ticks: {
                            display: true,
                            min: moment().subtract(7, 'days').format(),
                            max: moment().format()
                        },
                        gridLines: {
                            display: false,
                        },
                    }],
                },
                legend: {
                    display: false,
                },
                responsive: true,
                maintainAspectRatio: false,
            },
        }
    },
    components: {
        PeakFlowChart,
    },
    created() {
        this.getChartData();
    },
    watch: {
        selectTimeRangeChart() {
            this.getChartData();
        },
    },
    methods: {
        getHighestPeakFlowMeasurement(measurementOne, measurementTwo, measurementThree) {
            return Math.max(measurementOne, measurementTwo, measurementThree);
        },
        getChartData(){
            let peakflowMeasurements = this.$store.getters.getPeakFlow;

            switch(this.selectTimeRangeChart) {
                case "week":
                    peakflowMeasurements = peakflowMeasurements.filter(el => {
                        return el.date >= moment().subtract(7, 'days').format();
                    }).reverse();
                    this.chartOptions.scales.xAxes[0].ticks.min = moment().subtract(7, 'days').format();
                    break;
                case "twoweeks":
                    peakflowMeasurements = peakflowMeasurements.filter(el => {
                        return el.date >= moment().subtract(14, 'days').format();
                    }).reverse();
                    this.chartOptions.scales.xAxes[0].ticks.min = moment().subtract(14, 'days').format();
                    break;
                case "month":
                    peakflowMeasurements = peakflowMeasurements.filter(el => {
                        return el.date >= moment().subtract(1, 'month').format();
                    }).reverse();
                    this.chartOptions.scales.xAxes[0].ticks.min = moment().subtract(1, 'month').format();
                    break;
                default:
                    peakflowMeasurements = peakflowMeasurements.reverse();
            }

            let labels = [];
            let measurements = [];
            let backgroundColor = [];

            for(let i=0; i<peakflowMeasurements.length; i++) {
                labels.push(new Date(peakflowMeasurements[i].date + " " + peakflowMeasurements[i].time));
                measurements.push(this.getHighestPeakFlowMeasurement(
                    peakflowMeasurements[i].measurement_one, 
                    peakflowMeasurements[i].measurement_two, 
                    peakflowMeasurements[i].measurement_three
                ));

                if (measurements[i] > this.$store.getters.getPeakFlowZoneGreen) {
                    backgroundColor.push('#b0d8a4');
                } else if (measurements[i] > this.$store.getters.getPeakFlowZoneYellow) {
                    backgroundColor.push('#fee191');
                } else {
                    backgroundColor.push('#e84258');
                }
            }

            this.chartData = {
                labels,
                datasets: [{
                    label: "Peak Flow meting",
                    backgroundColor,
                    data: measurements,
                }]
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .selectTimeRangeBtnGroup {
        width: 100% !important;
    }

    .selectTimeRangeBtn {
        letter-spacing: 0px !important;
        font-size: 0.6rem !important;
        margin: 0 !important;
        padding: 0 0.4rem !important;
    }
</style>
