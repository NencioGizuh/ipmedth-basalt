<script>
import { Bar, mixins } from "vue-chartjs";

export default {
    name: "PeakFlowChart",
    mixins: [mixins.reactiveProp],
    extends: Bar,
    props: {
        chartData: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    },
    watch: {
        chartData() {
            const chart = this.$data._chart
            chart.options = this.options
            chart.update()
        }
    }
}
</script>