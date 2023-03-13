<template>
  <div class="col column items-center q-gutter-md q-pa-md">
    <h6>{{ szenario.bezeichnung }}</h6>

    <apexchart type="line" height="350" :options="chartOptions" :series="zeitreihenKontostaende" />

    <div class="row justify-between">
      <div class="col">
        <div><strong>Datum</strong></div>
        <div v-for="datum in arrDatum">
          {{ datum }}
        </div>
      </div>

      <div v-for="konto in arrKonten" class="col">
        <div><strong>{{ konto.bezeichnung }}</strong></div>
        <div v-for="kontostand in zeitreihenKontostaende[konto.bezeichnung]">
          {{ kontostand }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import services from '../infrastructure/services'
import datastore from '../_Data/datastore';

export default defineComponent({
  name: 'DiagrammKontostaendeZeitreihe',
  props: ['szenario', 'arrDatum', 'kontoschemata'],
  data() {
    return {
      datastore: datastore,
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          labels: {show: false},
          categories: this.arrDatum,
        }
      },
    }
  },
  computed: {
    arrKonten() {
      let arrKonten = [];
      for (let kontoschema of this.$props.kontoschemata) {
        let konto = this.datastore.konten.find(ko =>
          ko.szenario.id == this.szenario.id &&
          ko.kontoschema.id == kontoschema.id
        );
        arrKonten.push(konto);
      }
      return arrKonten;
    },
    zeitreihenKontostaende() {
      let zeitreihenKontostaende = [];
      for (let konto of this.arrKonten) {
        let zeitreiheKontostand = {
          name: konto.bezeichnung,
          data: services.kontomanager.berechneKontostandZeitreihe(konto, this.arrDatum, this.datastore),
        };
        zeitreihenKontostaende.push(zeitreiheKontostand);
      }
      return zeitreihenKontostaende;
    },
  },
});
</script>
