<template>
  <q-page>
    <q-select
      filled
      multiple
      v-model="szenarienAktuell"
      label="Aktuelle Szenarien"
      :options="datastore.szenarien"
      option-label="bezeichnung"
    />

    <q-select
      filled
      multiple
      v-model="kontenAktuell"
      label="Aktuelle Konten"
      :options="datastore.konten"
      option-label="bezeichnung"
    />

    <q-input
      v-model="datumAnfangAktuell"
      label="Datum Anfang"
      :min="datastore.datumMin"
      :max="datastore.datumMax"
      type="date"
      stack-label
    />

    <q-input
      v-model="datumEndeAktuell"
      label="Datum Ende"
      :min="datastore.datumMin"
      :max="datastore.datumMax"
      type="date"
      stack-label
    />

    <div class="column items-center q-gutter-md q-pa-md">
      <!-- <p>
        <div class="text-bold">Arr Datum</div>
        <div>{{ arrDatum && arrDatum.length }}</div>
        <div>{{ arrDatum }}</div>

        <div class="text-bold">Zeitreihen Kontostaende</div>
        <div>{{ zeitreihenKontostaende && zeitreihenKontostaende['0']['4'].length }}</div>
        <div>{{ zeitreihenKontostaende }}</div>
      </p> -->

      <template v-if="zeitreihenKontostaende">
        <ItemAnalyseZeitreihe
          v-for="[idSzenario, zeitreihenKontostaende] in Object.entries(zeitreihenKontostaende)"
          :id-szenario="idSzenario"
          :zeitreihen-kontostaende="zeitreihenKontostaende"
          :konten-aktuell="kontenAktuell"
          :arr-datum="arrDatum"
          :datum-anfang-aktuell="datumAnfangAktuell"
          :datum-ende-aktuell="datumEndeAktuell"
        />
      </template>
    </div>
  </q-page>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import ItemAnalyseZeitreihe from 'src/components/analysenZeitreihe/ItemAnalyseZeitreihe.vue'
  import datastore from '../_Data/datastore'
  import formatierer from 'src/_Application/formatierer';
  import { ENUM_BUCHUNGSINTERVALLE } from 'src/_Domain/models';

  export default defineComponent({
    name: 'Konten',
    components: {
      ItemAnalyseZeitreihe,
    },
    data() {
      return {
        datastore: datastore,
        szenarienAktuell: ref([datastore.szenarien[0], ]),
        kontenAktuell: ref([]),
        arrDatum: this.berechneArrDatum(),
        datumAnfangAktuell: ref(formatierer.dateFuerInput(datastore.datumMin)),
        datumEndeAktuell: ref(formatierer.dateFuerInput(datastore.datumMax)),
      }
    },
    methods: {
      berechneArrDatum() {
        let datum = new Date(datastore.datumMin);
        let arrDatum = [];
        while (datum < datastore.datumMax) {
          arrDatum.push(datum);
          datum = new Date(datum.setMonth(datum.getMonth() + 1));
        }
        return arrDatum;
      }
    },
    computed: {
      zeitreihenKontostaende() {
        // arrDatum
        let arrDatum = this.berechneArrDatum();
        // initialisiere kontrollparameterBuchungsreihen
        let kontrollparameterBuchungsreihen = {};
        for (let buchungsreihe of this.datastore.buchungsreihen) {
          let kontrollparameter = {
            datumNaechsteBuchung: new Date(buchungsreihe.datumAnfang),
          };
          kontrollparameterBuchungsreihen[buchungsreihe.id] = kontrollparameter;
        };
        // initialisiere kontostaendeAktuell
        let kontostaendeAktuell = {};
        for (let szenario of this.datastore.szenarien) {
          kontostaendeAktuell[szenario.id] = {};
          for (let konto of this.datastore.konten) {
            kontostaendeAktuell[szenario.id][konto.id] = konto.kontostandInitial;
          }
        }
        // initialisiere zeitreihenKontostaende
        let zeitreihenKontostaende = {};
        for (let szenario of this.datastore.szenarien) {
          zeitreihenKontostaende[szenario.id] = {};
          for (let konto of this.datastore.konten) {
            zeitreihenKontostaende[szenario.id][konto.id] = [];
          }
        }
        // berechne Kontostaende
        for (let datum of arrDatum) {
          for (let buchungsreihe of this.datastore.buchungsreihen) {
            let idSzenario = buchungsreihe.szenario.id;
            let idQuellkonto = buchungsreihe.quellkonto.id;
            let idZielkonto = buchungsreihe.zielkonto.id;
            let kontrollparameter = kontrollparameterBuchungsreihen[buchungsreihe.id];
            let datumEndeBuchungsreihe = new Date(buchungsreihe.datumEnde);
            kontrollparameter.istAbgeschlossen =
              kontrollparameter.istAbgeschlossen ||
              kontrollparameter.datumNaechsteBuchung > datumEndeBuchungsreihe;
            if (kontrollparameter.istAbgeschlossen) {
              continue;
            }
            else {
              while (kontrollparameter.datumNaechsteBuchung <= datum) {
                if (buchungsreihe.szenario.istAllgemein) {
                  // Allgemeines Szenario
                  for (let szenario of datastore.szenarien) {
                    kontostaendeAktuell[szenario.id][idQuellkonto] -= parseInt(buchungsreihe.betrag);
                    kontostaendeAktuell[szenario.id][idZielkonto] += parseInt(buchungsreihe.betrag);
                  }
                } else {
                  // Bestimmtes Szenario
                  kontostaendeAktuell[idSzenario][idQuellkonto] -= parseInt(buchungsreihe.betrag);
                  kontostaendeAktuell[idSzenario][idZielkonto] += parseInt(buchungsreihe.betrag);
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
          }
          for (let szenario of datastore.szenarien) {
            for (let konto of datastore.konten) {
              zeitreihenKontostaende[szenario.id][konto.id].push(
                kontostaendeAktuell[szenario.id][konto.id]
              );
            }
          }
        }

        return zeitreihenKontostaende;
      }
    }
  });
</script>
