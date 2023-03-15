<template>
  <DialogContent titel="Kontoschema Neu">
    <q-form @submit="onSubmit">
      <div class="q-gutter-md">
        <q-input filled v-model="kontoschema.bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
        <q-input filled v-model="kontoschema.beschreibung"  label="Beschreibung" type="textarea"/>
        <q-input filled v-model="kontoschema.kontostandInitial"  label="Kontostand Initial"  type="number"/>
        <q-checkbox v-model="formdata.istExtern" label="Extern" />
        <q-btn label="OK" type="submit" color="primary"/>
      </div>
    </q-form>
  </DialogContent>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import DialogContent from '../DialogContent.vue';
  import datastoremanager from 'src/_DataManipulation/datastoremanager'
  import { Kontoschema, Konto } from 'src/_Domain/models'

  export default defineComponent({
    name: 'DialogContentKontoschemaNeu',
    components: {
      DialogContentKontoschemaNeu,
    },
    data(){
      return {
        formdata: {
          bezeichnung: ref(''),
          beschreibung: ref(''),
          kontostandInitial: ref(0),
          istExtern: ref(false),
        }
      }
    },
    methods: {
      zuruecksetzeFormular() {
        this.formdata.bezeichnung = '';
        this.formdata.beschreibung = '';
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
        let kontoschemaNeu = datastoremanager.create(new Kontoschema(dataKontoschemaNeu), datastoremanager.keys.kontoschemata);
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
    },
  });
</script>
