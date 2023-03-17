<template>
  <DialogContent titel="Buchungsreihe Neu">
    <q-form @submit="onSubmit">
      <div class="q-gutter-md">
        <q-input filled v-model="formdata.bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
        <q-input filled v-model="formdata.beschreibung"  label="Beschreibung" type="textarea" />
        <q-input filled v-model="formdata.betrag" label="Betrag" type="number" />
        <q-select filled v-model="formdata.habenkonto" label="Quellkonto" :options="datastore.kontoschemata" option-label="kontoschema.bezeichnung" />
        <q-select filled v-model="formdata.sollkonto" label="Zielkonto" :options="datastore.kontoschemata" option-label="kontoschema.bezeichnung" />
        <q-input filled v-model="formdata.datumAnfang" label="Datum Anfang" type="date" />
        <q-input filled v-model="formdata.datumEnde" label="Datum Ende" type="date" />
        <div>{{ buchungsintervallAktuell }}</div>
        <q-btn label="OK" type="submit" color="primary"/>
      </div>
    </q-form>
  </DialogContent>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import DialogContent from '../DialogContent.vue';
  import datastoremanager from 'src/_DataManipulation/datastoremanager';
  import datastore from 'src/_Data/datastore';
  import { Buchungsreihe } from 'src/_Domain/models';

  // TODO: const mit Initialwerten für formdata

  export default defineComponent({
    name: 'DialogContentBuchungsreiheNeu',
    props: [
      'buchungsintervallAktuell',
      'szenarioAktuell',
    ],
    data(){
      return {
        formdata: {
          bezeichnung: ref(''),
          beschreibung: ref(''),
          betrag: ref(0),
          sollkonto: ref(null),
          habenkonto: ref(null),
          datumAnfang: ref(datastore.datumMin),
          datumEnde: ref(datastore.datumMax),
        }
      }
    },
    methods: {
      zuruecksetzeFormular() {
        this.formdata.bezeichnung = ref('');
        this.formdata.beschreibung = ref('');
        this.formdata.betrag = ref(0);
        this.formdata.sollkonto = ref(null);
        this.formdata.habenkonto = ref(null);
        this.formdata.datumAnfang = ref(datastore.datumMin);
        this.formdata.datumEnde = ref(datastore.datumMax);
      },
      onSubmit() {
        let buchungsreiheNeu = new Buchungsreihe({
          szenario: this.szenarioAktuell,
          buchungsintervall: this.buchungsintervallAktuell,
        });
        Object.assign(buchungsreiheNeu, this.formdata);
        datastoremanager.create(buchungsreiheNeu, datastoremanager.keys.buchungsreihen);
        this.zuruecksetzeFormular();
        this.$emit('submit');
      },
    },
  });
</script>
