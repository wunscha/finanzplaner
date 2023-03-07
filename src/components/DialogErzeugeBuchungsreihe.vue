<template>
  <q-dialog v-model="dialoge.erzeugeBuchungsreihe.zeige">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Buchungsreihe Erstellen</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pa-md">
        <q-form
          @submit="beiSubmit"
          class="q-gutter-md"
        >
          <q-input filled v-model="bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
          <q-input filled v-model="beschreibung"  label="Beschreibung" type="textarea"/>
          <q-input filled v-model="betrag"  label="Betrag" type="number"/>
          <q-select
            filled
            v-model="habenkonto"
            label="Quellkonto"
            :options="kontenSzenarioAktuell"
            option-label="bezeichnung"
          />
          <q-select
            filled
            v-model="sollkonto"
            label="Zielkonto"
            :options="kontenSzenarioAktuell"
            option-label="bezeichnung"
          />

          <q-input filled label="Anfangsdatum" v-model="datumAnfang" mask="date">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="datumAnfang">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="OK" color="primary" flat/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input filled label="Enddatum" v-model="datumEnde" mask="date">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="datumEnde">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="OK" color="primary" flat/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <div>Aktuelles Szenario: {{ datastore.objekteAktuell.szenario.bezeichnung }}</div>
          <div>Buchungsinterval: {{ datastore.objekteAktuell.buchungsintervall }}</div>

          <div>
            <q-btn label="OK" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import datastore from 'src/infrastructure/datastore'
import dialoge from '../infrastructure/dialoge'
import services from '../infrastructure/services'
import { Buchungsreihe } from '../domain/models'
import aktuelleObjekte from 'src/infrastructure/aktuelleObjekte'
import dataseed from 'src/domain/dataseed'


export default defineComponent({
  name: 'DialogErzeugeBuchungsreihe',
  data(){
    return {
      datastore: datastore,
      dialoge: dialoge,
      bezeichnung: ref(''),
      beschreibung: ref(''),
      betrag: ref(null),
      sollkonto: ref(null),
      habenkonto: ref(null),
      datumAnfang: ref(new Date().toISOString()),
      datumEnde: ref((new Date(dataseed.datumMax)).toISOString()),
    }
  },
  methods: {
    zuruecksetzeFormular() {
      this.bezeichnung = ref('');
      this.beschreibung = ref('');
      this.betrag = ref(null);
      this.sollkonto = ref(null);
      this.habenkonto = ref(null);
      this.datumAnfang = ref(null);
      this.datumEnde = ref(null);
    },
    beiSubmit() {
      let data = {
        bezeichnung: this.bezeichnung,
        beschreibung: this.beschreibung,
        betrag: this.betrag,
        sollkonto: this.sollkonto,
        habenkonto: this.habenkonto,
        datumAnfang: new Date(this.datumAnfang),
        datumEnde: new Date(this.datumEnde),
        buchungsintervall: this.datastore.objekteAktuell.buchungsintervall,
        szenario: this.datastore.objekteAktuell.szenario,
      };
      services.datastoremanager.create(new Buchungsreihe(data), 'buchungsreihen', this.datastore);
      services.buchungsmanager.aktualisiereBuchungen(this.datastore, services.datastoremanager);
      this.dialoge.erzeugeBuchungsreihe.zeige = false;
    },
  },
  computed: {
    kontenSzenarioAktuell() {
      let kontenSzenarioAktuell = this.datastore.konten.filter(ko => ko.szenario.id == this.datastore.objekteAktuell.szenario.id);
      return kontenSzenarioAktuell;
    },
  }
});
</script>
