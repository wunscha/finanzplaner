<template>
  <q-page>
    <div class="row">
      <q-select
        class="col-6 q-pa-sm"
        filled
        multiple
        v-model="szenarienAktuell"
        label="Aktuelle Szenarien"
        :options="datastore.szenarien"
        option-label="bezeichnung"
      />

      <q-select
        class="col-6 q-pa-sm"
        filled
        multiple
        v-model="kontenAktuell"
        label="Aktuelle Konten"
        :options="datastore.konten"
        option-label="bezeichnung"
      />
    </div>

    <div class="flex flex-center q-pa-sm">
      <InputDatum :datum-init="datumAktuell" @update="datum => datumAktuell = datum" />
    </div>

    <q-separator />
      <!-- <q-input
        class="col-4 q-pa-sm"
        v-model="datumAktuell"
        label="Datum"
        :max="datastore.datumMax"
        type="date"
        stack-label
      /> -->

    <!-- Ladezustand -->
    <div
      v-if="ladeszustand"
      class="row justify-center q-pa-xl"
    >
      <q-spinner size="5rem" />
    </div>
    <div
      v-else
      class="column items-center q-gutter-md q-pa-md"
    >
      <ItemAnalyseZeitpunkt
        v-for="szenario in szenarienAktuell"
        :szenario="szenario"
        :konten-aktuell="kontenAktuell"
        :kontostaende="diagrammdaten.kontostaende[szenario.id]"
        :kontostand-min="diagrammdaten.kontostandMin"
        :kontostand-max="diagrammdaten.kontostandMax"
      />
    </div>
  </q-page>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import ItemAnalyseZeitpunkt from 'src/components/analysenZeitpunkt/ItemAnalyseZeitpunkt.vue'
  import InputDatum from 'src/components/InputDatum.vue'
  import datastore from '../_Data/datastore'
  import formatierer from 'src/_Application/formatierer'
  import { ENUM_BUCHUNGSINTERVALLE } from 'src/_Domain/models'

  export default defineComponent({
    name: 'Konten',
    components: {
      ItemAnalyseZeitpunkt,
      InputDatum,
    },
    data() {
      return {
        datastore: datastore,
        ladeszustand: ref(false),
        szenarienAktuell: ref([datastore.szenarien[0], ]),
        kontenAktuell: ref([]),
        datumAktuell: ref(formatierer.dateFuerInput(datastore.datumMax)),
      }
    },
    computed: {
      /**
       * Alle Informationen, die für rendern der Diagramm erforderlich sind werden zusammengefasst und zurückgegeben,
       * damit keine Probleme auftreten, weil manche Werte (zB kontenAktuell) früher zur Verfügung stehen als andere (zB kontostaende)
       */
      diagrammdaten() {

        let datum = new Date(this.datumAktuell);
        this.ladezustand = true;
        // filtere Buchungsreihen
        let idsKontenAktuell = this.kontenAktuell.map(ko => ko.id);
        let idsSzenarienAktuell = this.szenarienAktuell.map(sz => sz.id);
        let buchungsreihenGefiltert = this.datastore.buchungsreihen.filter(br =>
          (
            br.szenario.istAllgemein ||
            idsSzenarienAktuell.includes(br.szenario.id)
          )
            &&
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
        for (let szenario of this.szenarienAktuell) {
          kontostaende[szenario.id] = {};
          for (let konto of this.kontenAktuell) {
            kontostaende[szenario.id][konto.id] = konto.kontostandInitial;
          }
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
            if (kontostaende[buchungsreihe.szenario.id][buchungsreihe.quellkonto.id] != undefined) {
              // wenn Szenario Allgemein -> für alle Szenarien buchen
              if (buchungsreihe.szenario.istAllgemein) {
                for (let idSz of idsSzenarienAktuell) {
                  kontostaende[idSz][buchungsreihe.quellkonto.id] -= parseInt(buchungsreihe.betrag);
                }
              } else {
                kontostaende[buchungsreihe.szenario.id][buchungsreihe.quellkonto.id] -= parseInt(buchungsreihe.betrag);
              }
            }
            // Kontoeingang
            if (kontostaende[buchungsreihe.szenario.id][buchungsreihe.zielkonto.id] != undefined) {
              // wenn Szenario Allgemein -> für alle Szenarien buchen
              if (buchungsreihe.szenario.istAllgemein) {
                for (let idSz of idsSzenarienAktuell) {
                  kontostaende[idSz][buchungsreihe.zielkonto.id] += parseInt(buchungsreihe.betrag);
                }
              } else {
                kontostaende[buchungsreihe.szenario.id][buchungsreihe.zielkonto.id] += parseInt(buchungsreihe.betrag);
              }
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

        // zusammenfasse Diagrammdaten
        let diagrammdaten = {
          kontostaende: kontostaende,
          kontostandMax: 0,
          kontostandMin: 0,
          kontenAktuell: this.kontenAktuell,
        }

        // ermmitle KontsotandMax und KontostandMin
        for (let sz of Object.values(kontostaende)) {
          for (let ks of Object.values(sz)) {
            if (ks > diagrammdaten.kontostandMax) {
              diagrammdaten.kontostandMax = ks;
            }
            if (ks < diagrammdaten.kontostandMin) {
              diagrammdaten.kontostandMin = ks;
            }
          }
        }

        // Ladezustand beenden
        this.ladezustand = false;

        return diagrammdaten;
      }
    }
  });
</script>
