<template>
  <q-card style="with: 100%">
    <q-card-section class="row">
      <h6>{{ szenario.bezeichnung }}</h6>
    </q-card-section>

    <q-card-section>
      <!-- <div>
        <p>
          <div class="text-bold">diagrammdaten.options:</div>
          <div>{{ diagrammdaten.options }}</div>
        </p>

        <p>
          <div class="text-bold">diagrammdaten.series:</div>
          <div>{{ diagrammdaten.series }}</div>
        </p>
      </div> -->
      <apexchart
        :options="diagrammdaten.options"
        :series="diagrammdaten.series"
      ></apexchart>
    </q-card-section>
  </q-card>
</template>

<script>
  import { defineComponent } from 'vue'
  import VueApexChart from 'vue3-apexcharts';
  import datastoremanager from 'src/_DataManipulation/datastoremanager';

  export default defineComponent({
    name: 'ItemAnalyseZeitreihe',
    components: {
      apexchart: VueApexChart,
    },
    props: [
      'idSzenario',
      'zeitreihenKontostaende',
      'kontenAktuell',
      'arrDatum',
      'datumAnfangAktuell',
      'datumEndeAktuell',
    ],
    data() {
      return {
      }
    },
    computed: {
      szenario() {
        return datastoremanager.read(this.idSzenario, datastoremanager.keys.szenarien);
      },
      diagrammdaten() {
        let optionsDiagramm = {
          chart: {
            animations: {enabled: false},
            type: 'line',
            height: 350
          },
          // plotOptions: {
          //   bar: {
          //     borderRadius: 4,
          //     horizontal: true,
          //   }
          // },
          // dataLabels: {
          //   enabled: false
          // },
          xaxis: {
            categories: this.arrDatum, // TODO: mit indexbereich gemäß datumsbereich einschränken
          },
        }

        let seriesDiagramm = [];
        for (let konto of this.kontenAktuell) {
          seriesDiagramm.push(
            {
              name: konto.bezeichnung,
              data: this.zeitreihenKontostaende[konto.id]
            }
          )

        }

        let diagrammdaten = {
          options: optionsDiagramm,
          series: seriesDiagramm,
        };

        return diagrammdaten;
      }
    },
  });
</script>
