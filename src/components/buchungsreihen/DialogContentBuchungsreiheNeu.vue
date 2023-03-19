<template>
  <DialogContent titel="Buchungsreihe Neu">
    <q-form @submit="onSubmit">
      <div class="q-gutter-md">
        <q-input filled v-model="formdata.bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
        <q-input filled v-model="formdata.beschreibung"  label="Beschreibung" type="textarea" />
        <q-input filled v-model="formdata.betrag" label="Betrag" type="number" />
        <q-select filled v-model="formdata.quellkonto" label="Quellkonto" :options="datastore.konten" option-label="bezeichnung" />
        <q-select filled v-model="formdata.zielkonto" label="Zielkonto" :options="datastore.konten" option-label="bezeichnung" />
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
  import formatierer from 'src/_Application/formatierer';
  import datastore from 'src/_Data/datastore';
  import { Buchungsreihe } from 'src/_Domain/models';

  // TODO: const mit Initialwerten für formdata

  export default defineComponent({
    name: 'DialogContentBuchungsreiheNeu',
    components: {
      DialogContent,
    },
    props: [
      'buchungsintervallAktuell',
      'szenarioAktuell',
    ],
    data(){
      return {
        datastore: datastore,
        formdata: {
          bezeichnung: ref(''),
          beschreibung: ref(''),
          betrag: ref(0),
          quellkonto: ref(null),
          zielkonto: ref(null),
          datumAnfang: ref(formatierer.dateFuerInput(datastore.datumMin)),
          datumEnde: ref(formatierer.dateFuerInput(datastore.datumMax)),
        }
      }
    },
    methods: {
      zuruecksetzeFormular() {
        this.formdata.bezeichnung = ref('');
        this.formdata.beschreibung = ref('');
        this.formdata.betrag = ref(0);
        this.formdata.quellkonto = ref(null);
        this.formdata.zielkonto = ref(null);
        this.formdata.datumAnfang = ref(formatierer.dateFuerInput(datastore.datumMin));
        this.formdata.datumEnde = ref(formatierer.dateFuerInput(datastore.datumMax));
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
