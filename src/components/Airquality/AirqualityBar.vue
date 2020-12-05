<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['chartdata', 'options'],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  },
  watch: {
      chartData() {
          this.renderChart(this.chartdata, this.options)
      }
  }
}
</script>