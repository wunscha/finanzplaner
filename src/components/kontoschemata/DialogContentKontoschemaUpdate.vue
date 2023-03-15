<template>
  <DialogContent :titel="kontoschemaAktuell.bezeichnung">
    <q-form @submit="onSubmit">
      <div class="q-gutter-md">
        <q-input filled v-model="formdata.bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
        <q-input filled v-model="formdata.beschreibung"  label="Beschreibung" type="textarea" />
        <q-input filled v-model="formdata.kontostandInitial" label="Kontostand Initial" type="number" />
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

  export default defineComponent({
    name: 'DialogContentKontoschemaNeu',
    components: {
      DialogContent,
    },
    props: [
      'kontoschemaAktuell',
    ],
    data(){
      return {
        formdata: {
          bezeichnung: ref(this.kontoschemaAktuell.bezeichnung),
          beschreibung: ref(this.kontoschemaAktuell.beschreibung),
          kontostandInitial: ref(this.kontoschemaAktuell.kontostandInitial),
          istExtern: ref(this.kontoschemaAktuell.istExtern),
        }
      }
    },
    methods: {
      onSubmit() {
        let kontoschemaUpdate = {
          id: this.kontoschemaAktuell.id,
        };
        Object.assign(kontoschemaUpdate, this.formdata);
        datastoremanager.update(kontoschemaUpdate, datastoremanager.keys.kontoschemata);
        this.$emit('submit');
      },
    },
  });
</script>
