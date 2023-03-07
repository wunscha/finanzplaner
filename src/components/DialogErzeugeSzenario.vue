<template>
  <q-dialog v-model="dialoge.erzeugeSzenario.zeige">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Szenario Erstellen</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pa-md">
        <q-form
          @submit="beiSubmit"
          class="q-gutter-md"
        >
          <q-input filled v-model="formdata.bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
          <q-input filled v-model="formdata.beschreibung"  label="Beschreibung" type="textarea"/>

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
import dataseed from 'src/domain/dataseed'
import dialoge from '../infrastructure/dialoge'
import services from '../infrastructure/services'
import { Szenario } from '../domain/models'


export default defineComponent({
  name: 'DialogErzeugeSzenario',
  data(){
    return {
      datastore: datastore,
      dialoge: dialoge,
      formdata: {
        bezeichnung: ref(''),
        beschreibung: ref(''),
      }
    }
  },
  methods: {
    zuruecksetzeFormular() {
      this.formdata.bezeichnung = '';
      this.formdata.beschreibung = '';
    },
    beiSubmit() {
      let szenarioNeu = services.datastoremanager.create(new Szenario(this.formdata), 'szenarien', this.datastore);
      szenarioNeu.seedeKonten(services.datastoremanager, this.datastore);
      this.dialoge.erzeugeSzenario.zeige = false;
    },
  },
})
</script>
