<template>
  <q-card
    :style="{
      width: style.widths.item + '%',
      maxWidth: style.widths.itemMax + 'px',
      backgroundColor: style.colors.secondaryItem,
      color: style.colors.secondaryTextItem,
    }"
  >
    <q-card-section
      class="flex flex-center q-pa-sm"
      :style="{
        backgroundColor: style.colors.primaryItem,
        color: style.colors.primaryTextItem,
        fontSize: style.fontSizes.titelElement + 'rem',
      }"
    >
      <div>{{ szenario.bezeichnung }}</div>
    </q-card-section>

    <q-card-section>
      <div
        :style="{
          position: 'relative',
          width: '100%',
        }"
      >
        <canvas :id="'diagramm-' + szenario.id"></canvas>
      </div>

      <!-- <apexchart
        type="bar"
        :options="diagramm.options"
        :series="diagramm.series"
      ></apexchart> -->
    </q-card-section>
  </q-card>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import style from 'src/_Data/style'
  import Chart from 'chart.js/auto'
  import ChartDataLabels from 'chartjs-plugin-datalabels'
  // import VueApexChart from 'vue3-apexcharts'



  export default defineComponent({
    name: 'ItemAnalyseZeitpunkt',
    components: {
      // apexchart: VueApexChart,
    },
    props: [
      'szenario',
      'kontenAktuell',
      'kontostaende',
      'kontostandMax',
      'kontostandMin',
    ],
    data() {
      return {
        style: style,
        chart: ref(null),
      }
    },
    methods: {
      zeichneDiagramm() {
        let labels = [];
        let datasets = [{data: []}];
        for (let konto of this.kontenAktuell) {
          labels.push(konto.bezeichnung);
          let kontostand = this.kontostaende[konto.id];
          datasets[0].data.push(kontostand);
        }
        if (this.chart) {
          this.chart.destroy();
        }
        this.chart = new Chart(
          document.getElementById('diagramm-' + this.szenario.id),
          {
            type: 'bar',
            plugins: [ChartDataLabels],
            options: {
              layout: {
                padding: 15,
              },
              scales: {
                y: {
                  min: this.kontostandMin,
                  max: this.kontostandMax,
                },
                x: {
                  position: {y: 0},
                  ticks: {
                    padding: -5,
                  }
                }
              },
              plugins: {
                legend: {
                  display: false,
                },
                datalabels: {
                  backgroundColor: 'black',
                  color: 'white',
                }
              }
            },
            data: {
              labels: labels,
              datasets: datasets,
            }
          }
        )
      }
    },
    mounted() {
      this.zeichneDiagramm();
    },
    updated() {
      this.zeichneDiagramm();
    }
  });
</script>
