<template>
  <DialogContent titel="Buchungsreihe Neu">
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
  import { defineComponent, ref } from 'vue';
  import DialogContent from '../DialogContent.vue';
  import datastoremanager from 'src/_DataManipulation/datastoremanager';
  import datastore from 'src/_Data/datastore';
  import { Buchungsreihe } from 'src/_Domain/models';

  export default defineComponent({
    name: 'DialogContentBuchungsreiheNeu',
    components: {
      DialogContentBuchungsreiheNeu,
    },
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
        this.formdata.bezeichnung = '';
        this.formdata.beschreibung = '';
        this.fo
        this.formdata.kontostandInitial = 0;
        this.formdata.istExtern = false;
      },
      onSubmit() {
        let dataKontoschemaNeu = {
          bezeichnung: this.formdata.bezeichnung,
          beschreibung: this.formdata.beschreibung,
          sollInitial: this.formdata.kontostandInitial >= 0 ? this.formdata.kontostandInitial : 0,
          habenInitial: this.formdata.kontostandInitial < 0 ? Math.abs(this.formdata.kontostandInitial) : 0,
          istExtern: this.formdata.istExtern,
        };
        let kontoschemaNeu = datastoremanager.create(new Kontoschema(dataKontoschemaNeu), datastoremanager.keys.szenarien);
        for (let szenario of datastoremanager.datastore[datastoremanager.keys.szenarien]) {
          let kontoNeu = new Konto({
            kontoschema: kontoschemaNeu,
            szenario: szenario,
          });
          datastoremanager.create(kontoNeu, datastoremanager.keys.konten);
        };
        this.zuruecksetzeFormular();
        this.$emit('submit');
      },
      computed: {
        kontenSzenarioAktuell() {
          if (!this.szenarioAktuell) {
            return [];
          }
          return datastore.konten.filter(ko => ko.szenario.id == this.szenarioAktuell.id)
        },
      }
    },
  });
</script>
