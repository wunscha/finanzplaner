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
      class="row items-center"
      :style="{
        backgroundColor: style.colors.primaryItem,
        color: style.colors.primaryTextItem,
        fontSize: style.fontSizes.titelElement + 'rem',
      }"
    >
      <div>{{ szenario.bezeichnung }}</div>
    </q-card-section>

    <q-card-section>
      <div class="text-bold">
        options:
      </div>
      <div>
        {{ diagramm.options }}
      </div>

      <div class="text-bold">
        series:
      </div>
      <div>
        {{ diagramm.series }}
      </div>

      <div class="text-bold">
        categories:
      </div>
      <div>
        {{ diagramm.categories }}
      </div>
      <!-- <apexchart
        v-if="diagrammdaten.options.xaxis.categories.length > 0"
        type="bar"
        height="350"
        :options="diagrammdaten.options"
        :series="diagrammdaten.series"
      ></apexchart> -->
    </q-card-section>
  </q-card>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import style from 'src/_Data/style';
  import VueApexChart from 'vue3-apexcharts';



  export default defineComponent({
    name: 'ItemAnalyseZeitpunkt',
    components: {
      apexchart: VueApexChart,
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
      }
    },
    computed: {
      /**
       * Alle Informationen, die für rendern der Diagramm erforderlich sind werden zusammengefasst und zurückgegeben,
       * damit keine Probleme auftreten, weil manche Werte früher zur Verfügung stehen als andere
       */
      diagramm() {
        let categories = [];
        let series = [{data: []}];
        for (let konto of this.kontenAktuell) {
          categories.push(konto.bezeichnung);
          let kontostand = this.kontostaende[konto.id];
          series[0].data.push(kontostand);
        }

        let options = 'nicht implementiert';
        return {
          series: series,
          categories: categories,
          options: options,
        }
      },
    },
  });
</script>
