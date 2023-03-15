<template>
  <DialogContent :titel="buchungsreiheAktuell.bezeichnung">
    <q-form @submit="onSubmit">
      <div class="q-gutter-md">
        <q-input filled v-model="formdata.bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
        <q-input filled v-model="formdata.beschreibung"  label="Beschreibung" type="textarea" />
        <q-input filled v-model="formdata.betrag" label="Betrag" type="number" />
        <q-select filled v-model="formdata.habenkonto" label="Quellkonto" :options="kontenSzenarioAktuell" option-label="kontoschema.bezeichnung" option-value="id" emit-value map-options />
        <q-select filled v-model="formdata.sollkonto" label="Zielkonto" :options="kontenSzenarioAktuell" option-label="kontoschema.bezeichnung" option-value="id" emit-value map-options />
        <q-input filled v-model="formdata.datumAnfang" label="Datum Anfang" type="date" @update="beiUpdateDatumAnfang"/>
        <q-input filled v-model="formdata.datumEnde" label="Datum Ende" type="date" />
        <div>{{ buchungsintervall }}</div>
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
  import zeitreihenmanager from 'src/_Application/zeitreihenmanager';

  export default defineComponent({
    name: 'DialogContentBuchungsreiheUpdate',
    components: {
      DialogContent,
    },
    props: [
      'buchungsintervall',
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
        let buchungsreiheUpdate = {
          id: this.buchungsreiheAktuell.id,
        };
        Object.assign(buchungsreiheUpdate, this.formdata);
        datastoremanager.update(buchungsreiheUpdate, datastoremanager.keys.buchungsreihen);
        this.$emit('submit');
      },
      beiUpdateDatumAnfang() {
        this.formdata.datumAnfang = zeitreihenmanager.ermittleDatumAnfang(this.formdata.datumAnfang);
      },
      beiUpdateDatumEnde() {
        this.formdata.datumEnde = zeitreihenmanager.ermittleDatumEnde(this.formdata.datumEnde);
      },
    },
    computed: {
      kontenSzenarioAktuell() {
        if (!this.szenarioAktuell) {
          return [];
        }
        return datastore.konten.filter(ko => ko.szenario.id == this.szenarioAktuell.id)
      }
    }
  });

</script>
