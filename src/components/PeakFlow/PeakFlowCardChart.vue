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
                        ticks: {
                            display: false,
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

            // TODO: Not slice, but change based on date
            switch(this.selectTimeRangeChart) {
                case "week":
                    peakflowMeasurements = peakflowMeasurements.slice(0, 4).reverse();
                    break;
                case "twoweeks":
                    peakflowMeasurements = peakflowMeasurements.slice(0, 8).reverse();
                    break;
                case "month":
                    peakflowMeasurements = peakflowMeasurements.slice(0, 16).reverse();
                    break;
                default:
                    peakflowMeasurements = peakflowMeasurements.reverse();
            }

            let labels = [];
            let measurements = [];
            let backgroundColor = [];

            for(let i=0; i<peakflowMeasurements.length; i++) {
                labels.push(peakflowMeasurements[i].date + ", " + peakflowMeasurements[i].time);
                measurements.push(this.getHighestPeakFlowMeasurement(
                    peakflowMeasurements[i].measurementOne, 
                    peakflowMeasurements[i].measurementTwo, 
                    peakflowMeasurements[i].measurementThree
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
