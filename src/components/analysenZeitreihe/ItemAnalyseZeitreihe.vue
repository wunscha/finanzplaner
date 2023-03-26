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
    </q-card-section>
  </q-card>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import style from 'src/_Data/style'
  import Chart from 'chart.js/auto'
  import datastoremanager from 'src/_DataManipulation/datastoremanager';

  export default defineComponent({
    name: 'ItemAnalyseZeitreihe',
    props: [
      'szenario',
      'zeitreihenKontostaende',
      'kontenAktuell',
      'arrDatum',
      'datumAnfang',
      'datumEnde',
      'kontostandMin',
      'kontostandMax',
    ],
    data() {
      return {
        style: style,
        chart: ref(null),
      }
    },
    methods: {
      zeichneDiagramm() {
        let labels = this.arrDatum;
        let datasets = [];
        for (let konto of this.kontenAktuell) {
          datasets.push({
            label: konto.bezeichnung,
            data: this.zeitreihenKontostaende[konto.id],
          })
        }
        if (this.chart) {
          this.chart.destroy();
        }
        this.chart = new Chart(
          document.getElementById('diagramm-' + this.szenario.id),
          {
            type: 'line',
            options: {
              responsive: true,
              scales: {
                y: {
                  min: this.kontostandMin,
                  max: this.kontostandMax,
                },
                x: {
                  ticks: {
                    display: false,
                  }
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
    },
    computed: {
      // szenario() {
      //   return datastoremanager.read(this.idSzenario, datastoremanager.keys.szenarien);
      // },
      // diagrammdaten() {
      //   let optionsDiagramm = {
      //     chart: {
      //       animations: {enabled: false},
      //       type: 'line',
      //       height: 350
      //     },
      //     // plotOptions: {
      //     //   bar: {
      //     //     borderRadius: 4,
      //     //     horizontal: true,
      //     //   }
      //     // },
      //     // dataLabels: {
      //     //   enabled: false
      //     // },
      //     xaxis: {
      //       categories: this.arrDatum, // TODO: mit indexbereich gemäß datumsbereich einschränken
      //     },
      //   }

      //   let seriesDiagramm = [];
      //   for (let konto of this.kontenAktuell) {
      //     seriesDiagramm.push(
      //       {
      //         name: konto.bezeichnung,
      //         data: this.zeitreihenKontostaende[konto.id]
      //       }
      //     )

      //   }

      //   let diagrammdaten = {
      //     options: optionsDiagramm,
      //     series: seriesDiagramm,
      //   };

      //   return diagrammdaten;
      // }
    },
  });
</script>
