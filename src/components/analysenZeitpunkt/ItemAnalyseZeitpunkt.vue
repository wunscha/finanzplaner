<template>
  <q-card style="with: 100%">
    <q-card-section class="row">
      <h6>{{ szenario.bezeichnung }}</h6>
    </q-card-section>

    <q-card-section>
      <div>{{ datum }}</div>
      <q-spinner v-if="ladezustand" />
      <div v-else>
        <p>
          <div class="text-bold">diagrammdaten.options:</div>
          <div>{{ diagrammdaten.options }}</div>
        </p>

        <p>
          <div class="text-bold">diagrammdaten.series:</div>
          <div>{{ diagrammdaten.series }}</div>
        </p>
      </div>
      <apexchart
        v-if="diagrammdaten.options.xaxis.categories.length > 0"
        type="bar"
        height="350"
        :options="diagrammdaten.options"
        :series="diagrammdaten.series"
      ></apexchart>
    </q-card-section>
  </q-card>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import datastore from 'src/_Data/datastore';
  import { ENUM_BUCHUNGSINTERVALLE } from 'src/_Domain/models';
  import datastoremanager from 'src/_DataManipulation/datastoremanager';
  import VueApexChart from 'vue3-apexcharts';



  export default defineComponent({
    name: 'ItemAnalyseZeitpunkt',
    components: {
      apexchart: VueApexChart,
    },
    props: [
      'szenario',
      'kontenAktuell',
      'datumAktuell',
    ],
    data() {
      return {
        datastore: datastore,
        ladezustand: ref(false),
      }
    },
    computed: {
      datum() {return new Date(this.datumAktuell);},
      diagrammdaten() {
        let datum = new Date(this.datumAktuell);
        this.ladezustand = true;
        // filtere Buchungsreihen
        let idsKontenAktuell = this.kontenAktuell.map(k => k.id);
        let buchungsreihenGefiltert = this.datastore.buchungsreihen.filter(br =>
          (br.szenario.id == this.szenario.id || br.szenario.istAllgemein) &&
          (
            idsKontenAktuell.includes(br.quellkonto.id) ||
            idsKontenAktuell.includes(br.zielkonto.id)
          )
        );
        // initialisiere kontrollparameterBuchungsreihen
        let kontrollparameterBuchungsreihen = {};
        for (let buchungsreihe of buchungsreihenGefiltert) {
          let kontrollparameter = {
            datumNaechsteBuchung: new Date(buchungsreihe.datumAnfang),
          };
          kontrollparameterBuchungsreihen[buchungsreihe.id] = kontrollparameter;
        };
        // initialisiere kontostaende
        let kontostaende = {};
        for (let konto of this.kontenAktuell) {
          kontostaende[konto.id] = konto.kontostandInitial;
        }
        // berechne Kontostaende
        for (let buchungsreihe of buchungsreihenGefiltert) {
          let kontrollparameter = kontrollparameterBuchungsreihen[buchungsreihe.id];
          let datumEndeBuchungsreihe = new Date(buchungsreihe.datumEnde);
          while (!kontrollparameter.istAbgeschlossen) {
            kontrollparameter.istAbgeschlossen =
              kontrollparameter.istAbgeschlossen ||
              kontrollparameter.datumNaechsteBuchung > datum ||
              kontrollparameter.datumNaechsteBuchung > datumEndeBuchungsreihe;
            if (kontrollparameter.istAbgeschlossen) { continue; }
            // Kontoausgang
            if (kontostaende[buchungsreihe.quellkonto.id] != undefined) {
              kontostaende[buchungsreihe.quellkonto.id] -= parseInt(buchungsreihe.betrag);
            }
            // Kontoeingang
            if (kontostaende[buchungsreihe.zielkonto.id] != undefined) {
              kontostaende[buchungsreihe.zielkonto.id] += parseInt(buchungsreihe.betrag);
            }
            // berechne datumNaehsteBuchung
            switch (buchungsreihe.buchungsintervall) {
              case ENUM_BUCHUNGSINTERVALLE.woechentlich:
                let tagAktuell = kontrollparameter.datumNaechsteBuchung.getDate();
                kontrollparameter.datumNaechsteBuchung.setDate(tagAktuell + 7);
                break;
              case ENUM_BUCHUNGSINTERVALLE.monatlich:
                let monatAktuell = kontrollparameter.datumNaechsteBuchung.getMonth();
                kontrollparameter.datumNaechsteBuchung.setMonth(monatAktuell + 1);
                break;
              case ENUM_BUCHUNGSINTERVALLE.jaehrlich:
                let jahrAktuell = kontrollparameter.datumNaechsteBuchung.getFullYear();
                kontrollparameter.datumNaechsteBuchung.setFullYear(jahrAktuell + 1);
                break;
              case ENUM_BUCHUNGSINTERVALLE.einzel:
                kontrollparameter.istAbgeschlossen = true;
                break;
            }
          }
        }
        // erzeuge diagrammdaten für Apex-Charts


        let optionsDiagramm = {
          chart: {
            animations: {enabled: false},
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: [],
          },
        }
        let data = [];
        for (let [key, val] of Object.entries(kontostaende)) {
          let konto = datastoremanager.read(key, datastoremanager.keys.konten);
          optionsDiagramm.xaxis.categories.push(konto.bezeichnung);
          // TODO: Wenn Probleme mit Rendern von Chart auftreten: wenn val == 0 wird von apexcharts immer "expectedValue"-Error geworfen ==> ggf. irgendeneinen Pseudowert verwenden, wenn Kontostand = 0
          data.push(val);

        }
        let diagrammdaten = {
          options: optionsDiagramm,
          series: [{data: data}]
        };
        // Ladezustand beenden
        this.ladezustand = false;

        return diagrammdaten;
      }
    },
  });
</script>
