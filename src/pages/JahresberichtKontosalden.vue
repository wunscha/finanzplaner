<template>
  <q-page>
    <q-select
      filled
      v-model="szenarioAktuell"
      label="Szenario Aktuell"
      :options="datastore.szenarien"
      option-label="bezeichnung"
    />

    <q-select
      filled
      v-model="jahrAktuell"
      label="Jahr"
      :options="arrJahre"
      option-label="bezeichnung"
    />

    <div class="column items-center q-gutter-md q-pa-md">
      <div class="text-bold">jahrAktuell:</div>
      <div>{{ jahrAktuell }}</div>


      <div class="text-bold">saldenAktuell:</div>
      <div v-for="[key, val] of Object.entries(saldenAktuell)">
        {{key}}: {{ val }}
      </div>
    </div>


    <q-markup-table>
      <thead>
        <tr>
          <th>Konto</th>
          <th>Jänner</th>
          <th>Februar</th>
          <th>März</th>
          <th>April</th>
          <th>Mai</th>
          <th>Juni</th>
          <th>Juli</th>
          <th>August</th>
          <th>September</th>
          <th>Oktober</th>
          <th>November</th>
          <th>Dezember</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[key, val] in Object.entries(saldenAktuell)">
          <td>{{ key }}</td>
          <td>{{ val['1'] }}</td>
          <td>{{ val['2'] }}</td>
          <td>{{ val['3'] }}</td>
          <td>{{ val['4'] }}</td>
          <td>{{ val['5'] }}</td>
          <td>{{ val['6'] }}</td>
          <td>{{ val['7'] }}</td>
          <td>{{ val['8'] }}</td>
          <td>{{ val['9'] }}</td>
          <td>{{ val['10'] }}</td>
          <td>{{ val['11'] }}</td>
          <td>{{ val['12'] }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import datastore from '../_Data/datastore'
  import { ENUM_BUCHUNGSINTERVALLE } from 'src/_Domain/models';
import datastoremanager from 'src/_DataManipulation/datastoremanager';

  export default defineComponent({
    name: 'JahresberichtKontosalden',
    data() {
      return {
        datastore: datastore,
        szenarioAktuell: ref(datastore.szenarien[0]),
        jahrAktuell: ref(new Date().getFullYear()),
      }
    },
    computed: {
      arrJahre() {
        let arrJahre = [];
        let jahrMin = this.datastore.datumMin.getFullYear();
        let jahrMax = this.datastore.datumMax.getFullYear();
        let jahr = jahrMin;
        while (jahr <= jahrMax) {
          arrJahre.push(jahr);
          jahr++;
        }
        return arrJahre;
      },
      saldenAktuell() {
        // initialisiere kontrollparameterBuchungsreihen
        let kontrollparameterBuchungsreihen = {};
        for (let buchungsreihe of this.datastore.buchungsreihen) {
          let kontrollparameter = {
            datumNaechsteBuchung: new Date(buchungsreihe.datumAnfang),
            istAbgeschlossen: false,
          };
          let jahrAnfang = new Date(buchungsreihe.datumAnfang).getFullYear();
          let jahrEnde = new Date(buchungsreihe.datumEnde).getFullYear();
          if (jahrAnfang > this.jahrAktuell || jahrEnde < this.jahrAktuell) {
            kontrollparameter.istAbgeschlossen = true;
          }
          kontrollparameterBuchungsreihen[buchungsreihe.id] = kontrollparameter;
        };
        // initialisiereSaldenAktuell
        let saldenAktuell = {};
        for (let konto of datastore.konten) {
          saldenAktuell[konto.id] = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
          };
        }
        // iteriereBuchungsreihen
        for (let buchungsreihe of datastore.buchungsreihen) {
          let kontrollparameter = kontrollparameterBuchungsreihen[buchungsreihe.id];
          if (buchungsreihe.szenario.id != this.szenarioAktuell.id) {continue;}
          while (!kontrollparameter.istAbgeschlossen) {
            let jahrNaechsteBuchung = kontrollparameter.datumNaechsteBuchung.getFullYear();
            if (jahrNaechsteBuchung > this.jahrAktuell) {
              kontrollparameter.istAbgeschlossen = true;
              continue;
            }
            if (jahrNaechsteBuchung == this.jahrAktuell) {
              let monatNaechsteBuchung = kontrollparameter.datumNaechsteBuchung.getMonth();
              // Quellkonto
              saldenAktuell[buchungsreihe.quellkonto.id][monatNaechsteBuchung] -= parseInt(buchungsreihe.betrag);
              // Zielkonto
              saldenAktuell[buchungsreihe.zielkonto.id][monatNaechsteBuchung] += parseInt(buchungsreihe.betrag);

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
                let jahrAkt = kontrollparameter.datumNaechsteBuchung.getFullYear();
                kontrollparameter.datumNaechsteBuchung.setFullYear(jahrAkt + 1);
                break;
              case ENUM_BUCHUNGSINTERVALLE.einzel:
                kontrollparameter.istAbgeschlossen = true;
                break;
            }
            debugger
          }
        }

        // umwandle für Tabelle
        let saldenFuerTabelle = {}
        for (let [key, val] of Object.entries(saldenAktuell)) {
          let konto = datastoremanager.read(key, datastoremanager.keys.konten);
          saldenFuerTabelle[konto.bezeichnung] = val;
        }

        return saldenFuerTabelle;
      }
    }
  });
</script>
