<template>
  <DialogContent :titel="buchungsreiheAktuell.bezeichnung">
    <q-form @submit="onSubmit">
      <div class="q-gutter-md">
        <q-input filled v-model="formdata.bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
        <q-input filled v-model="formdata.beschreibung"  label="Beschreibung" type="textarea" />
        <q-input filled v-model="formdata.betrag" label="Betrag" type="number" />
        <q-select filled v-model="formdata.quellkonto" label="Quellkonto" :options="datastore.konten" option-label="bezeichnung"  />
        <q-select filled v-model="formdata.zielkonto" label="Zielkonto" :options="datastore.konten" option-label="bezeichnung" />
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
  import formatierer from 'src/_Application/formatierer';

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
        datastore: datastore,
        formdata: {
          bezeichnung: ref(this.buchungsreiheAktuell.bezeichnung),
          beschreibung: ref(this.buchungsreiheAktuell.beschreibung),
          betrag: ref(this.buchungsreiheAktuell.betrag),
          quellkonto: ref(this.buchungsreiheAktuell.quellkonto),
          zielkonto: ref(this.buchungsreiheAktuell.zielkonto),
          datumAnfang: ref(formatierer.dateFuerInput(this.buchungsreiheAktuell.datumAnfang)),
          datumEnde: ref(formatierer.dateFuerInput(this.buchungsreiheAktuell.datumEnde)),
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
