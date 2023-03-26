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

    <div class="row justify-center q-pa-md">
      <div class="flex flex-center q-gutter-xl">
        <InputDatum :datum-init="datumAnfangAktuell" @update="datum => datumAnfangAktuell = datum" />
        <q-icon name="trending_flat" size="xl"/>
        <InputDatum :datum-init="datumEndeAktuell" @update="datum => datumEndeAktuell = datum" />
      </div>
    </div>
    <q-separator />

    <!-- <q-input
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
    /> -->

    <div class="column items-center q-gutter-md q-pa-md">
      <ItemAnalyseZeitreihe
        v-for="szenario in szenarienAktuell"
        :szenario="szenario"
        :konten-aktuell="kontenAktuell"
        :zeitreihen-kontostaende="diagrammdaten.zeitreihenKontostaende[szenario.id]"
        :kontostand-max="diagrammdaten.kontostandMax"
        :kontostand-min="diagrammdaten.kontostandMin"
        :arr-datum="arrDatum"
        :datum-anfang="datumAnfangAktuell"
        :datum-ende="datumEndeAktuell"
      />
    </div>
  </q-page>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import ItemAnalyseZeitreihe from 'src/components/analysenZeitreihe/ItemAnalyseZeitreihe.vue'
  import InputDatum from 'src/components/InputDatum.vue';
  import datastore from '../_Data/datastore'
  import formatierer from 'src/_Application/formatierer';
  import { ENUM_BUCHUNGSINTERVALLE } from 'src/_Domain/models';

  export default defineComponent({
    name: 'Konten',
    components: {
      ItemAnalyseZeitreihe,
      InputDatum,
    },
    data() {
      return {
        datastore: datastore,
        szenarienAktuell: ref([datastore.szenarien[0], ]),
        kontenAktuell: ref([]),
        // arrDatum: this.berechneArrDatum(),
        datumAnfangAktuell: ref(formatierer.dateFuerInput(datastore.datumMin)),
        datumEndeAktuell: ref(formatierer.dateFuerInput(datastore.datumMax)),
      }
    },
    methods: {
      berechneArrDatum() {
        let datum = new Date(this.datastore.datumMin);
        let datumMax = new Date(this.datastore.datumMax);
        let arrDatum = [];
        while (datum < datumMax) {
          arrDatum.push(datum);
          datum = new Date(datum.setMonth(datum.getMonth() + 1));
        }
        arrDatum = arrDatum.filter(dat =>
          new Date(dat) >= new Date(this.datumAnfangAktuell) &&
          new Date(dat) <= new Date(this.datumEndeAktuell)
        );
        return arrDatum;
      }
    },
    computed: {
      /**
       * Alle Informationen, die für rendern der Diagramm erforderlich sind werden zusammengefasst und zurückgegeben,
       * damit keine Probleme auftreten, weil manche Werte (zB kontenAktuell) früher zur Verfügung stehen als andere (zB kontostaende)
       */
      diagrammdaten() {
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

        // zusammenfasseDiagrammdaten
        let diagrammdaten = {
          zeitreihenKontostaende: zeitreihenKontostaende,
          kontostandMin: 0,
          kontostandMax: 0,
          kontenAktuell: this.kontenAktuell,
        }

        // ermittle KontostandMin und kontostandMax
        let idsSzenarienAktuell = this.szenarienAktuell.map(sz => sz.id);
        for (let [idSz, zeitreihenKontostaendeSz] of Object.entries(zeitreihenKontostaende)) {
          for (let zrKs of Object.values(zeitreihenKontostaendeSz)) {
            let kontoStandMaxZeitreihe = Math.max(...zrKs);
            if (idsSzenarienAktuell.includes(parseInt(idSz))) {
              if (kontoStandMaxZeitreihe > diagrammdaten.kontostandMax) {
                diagrammdaten.kontostandMax = kontoStandMaxZeitreihe;
              }
              let kontostandMinZeitreihe = Math.min(...zrKs);
              if (kontostandMinZeitreihe < diagrammdaten.kontostandMin) {
                diagrammdaten.kontostandMin = kontostandMinZeitreihe;
              }
            }
          }
        }

        return diagrammdaten;
      },
      arrDatum() {
        return this.berechneArrDatum()
      }
    }
  });
</script>
