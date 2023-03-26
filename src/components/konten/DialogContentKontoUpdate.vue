<template>
  <DialogContent :titel="kontoAktuell.bezeichnung">
    <q-form @submit="onSubmit">
      <div class="q-gutter-md">
        <q-input filled v-model="formdata.bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
        <q-input filled v-model="formdata.beschreibung"  label="Beschreibung" type="textarea" />
        <q-input filled v-model="formdata.kontostandInitial" label="Kontostand Initial" type="number" />
        <!-- <q-checkbox v-model="formdata.istExtern" label="Extern" /> -->
        <div class="row justify-end">
          <q-btn
            type="submit"
            icon="check"
            :style="{
              color: style.colors.accentText,
              backgroundColor: style.colors.accent,
            }"
          />
        </div>
      </div>
    </q-form>
  </DialogContent>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import DialogContent from '../DialogContent.vue';
  import datastoremanager from 'src/_DataManipulation/datastoremanager'
  import style from 'src/_Data/style';

  export default defineComponent({
    name: 'DialogContentKontoNeu',
    components: {
      DialogContent,
    },
    props: [
      'kontoAktuell',
    ],
    data(){
      return {
        style: style,
        formdata: {
          bezeichnung: ref(this.kontoAktuell.bezeichnung),
          beschreibung: ref(this.kontoAktuell.beschreibung),
          kontostandInitial: ref(this.kontoAktuell.kontostandInitial),
          istExtern: ref(this.kontoAktuell.istExtern),
        }
      }
    },
    methods: {
      onSubmit() {
        let kontoUpdate = {};
        Object.assign(kontoUpdate, this.kontoAktuell);
        Object.assign(kontoUpdate, this.formdata);
        datastoremanager.update(kontoUpdate, datastoremanager.keys.konten);
        this.$emit('submit');
      },
    },
  });
</script>
