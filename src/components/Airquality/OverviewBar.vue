<script>
import { Bar} from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['chartdata', 'labels', 'backgroundColor'],
  mounted () {
    this.render()
  },
  watch: {
    'chartdata' () {
      this.render()
    }
  },
  methods: {
    render() {
      this.renderChart({
        labels: this.labels,
        datasets: [{
            minBarLength: 2,
            backgroundColor: this.backgroundColor,
            data: this.chartdata
        }]
      }, {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            },
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              display: false, //this will remove all the x-axis grid lines 
            },
          ],
          xAxes: [
            {
              categoryPercentage: 1.2,
              barPercentage: 0.4,
              gridLines: {
                display: false,
              },
              type: "time",
              time: {
                unit: "minute",
                displayFormats: {
                    'minute': 'HH:mm',
                },
              },
              ticks: { 
                  source: 'data',
              }
            },
          ],
        },
      });
    }
  }
}
</script>