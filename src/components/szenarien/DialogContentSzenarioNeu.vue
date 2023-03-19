<template>
  <DialogContent titel="Szenario Neu">
    <q-form @submit="onSubmit">
      <div class="q-gutter-md">
        <q-input filled v-model="formdata.bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
        <q-input filled v-model="formdata.beschreibung"  label="Beschreibung" type="textarea"/>
        <q-btn label="OK" type="submit" color="primary"/>
      </div>
    </q-form>
  </DialogContent>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import DialogContent from '../DialogContent.vue';
  import datastoremanager from 'src/_DataManipulation/datastoremanager'
  import { Konto, Szenario } from 'src/_Domain/models'

  export default defineComponent({
    name: 'DialogContentSzenarioNeu',
    components: {
      DialogContent,
    },
    data(){
      return {
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
      onSubmit() {
        let szenarioNeu = new Szenario(this.formdata);
        datastoremanager.create(szenarioNeu, datastoremanager.keys.szenarien);
        this.zuruecksetzeFormular();
        this.$emit('submit');
      },
    },
  });
</script>
