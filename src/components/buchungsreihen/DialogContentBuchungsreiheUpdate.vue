<template>
  <DialogContent :titel="buchungsreiheAktuell.bezeichnung">
    <q-form @submit="onSubmit">
      <div class="q-gutter-md">
        <q-input filled v-model="formdata.bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
        <q-input filled v-model="formdata.beschreibung"  label="Beschreibung" type="textarea" />
        <q-input filled v-model="formdata.betrag" label="Betrag" type="number" />
        <q-select filled v-model="formdata.habenkonto" label="Quellkonto" :options="datastore.kontoschemata" option-label="kontoschema.bezeichnung" option-value="id" emit-value map-options />
        <q-select filled v-model="formdata.sollkonto" label="Zielkonto" :options="datastore.kontoschemata" option-label="kontoschema.bezeichnung" option-value="id" emit-value map-options />
        <q-input filled v-model="formdata.datumAnfang" label="Datum Anfang" type="date"/>
        <q-input filled v-model="formdata.datumEnde" label="Datum Ende" type="date" />
        <div>{{ buchungsreiheAktuell.buchungsintervall }}</div>
        <q-btn label="OK" type="submit" color="primary"/>
      </div>
    </q-form>
  </DialogContent>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import DialogContent from '../DialogContent.vue';
  import datastore from 'src/_Data/datastore';
  import datastoremanager from 'src/_DataManipulation/datastoremanager'

  export default defineComponent({
    name: 'DialogContentBuchungsreiheUpdate',
    components: {
      DialogContent,
    },
    props: [
      'buchungsreiheAktuell',
      'szenarioAktuell',
    ],
    data(){
      return {
        formdata: {
          bezeichnung: ref(this.buchungsreiheAktuell.bezeichnung),
          beschreibung: ref(this.buchungsreiheAktuell.beschreibung),
          betrag: ref(this.buchungsreiheAktuell.betrag),
          sollkonto: ref(this.buchungsreiheAktuell.sollkonto),
          habenkonto: ref(this.buchungsreiheAktuell.habenkonto),
          datumAnfang: ref(this.buchungsreiheAktuell.datumAnfang),
          datumEnde: ref(this.buchungsreiheAktuell.datumEnde),
        }
      }
    },
    methods: {
      onSubmit() {
        let buchungsreiheUpdate = {};
        Object.assign(buchungsreiheUpdate, this.buchungsreiheAktuell);
        Object.assign(buchungsreiheUpdate, this.formdata);
        datastoremanager.update(buchungsreiheUpdate, datastoremanager.keys.buchungsreihen);
        this.$emit('submit');
      },
    }
  });

</script>
