<template>
  <DialogContent titel="Konto Neu">
    <q-form @submit="onSubmit">
      <div class="q-gutter-md">
        <q-input filled v-model="formdata.bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
        <q-input filled v-model="formdata.beschreibung"  label="Beschreibung" type="textarea"/>
        <q-input filled v-model="formdata.kontostandInitial"  label="Kontostand Initial"  type="number"/>
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
  import { Konto } from 'src/_Domain/models'

  export default defineComponent({
    name: 'DialogContentKontoNeu',
    components: {
      DialogContent,
    },
    data(){
      return {
        style: style,
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
        let dataKontoNeu = {
          bezeichnung: this.formdata.bezeichnung,
          beschreibung: this.formdata.beschreibung,
          sollInitial: this.formdata.kontostandInitial >= 0 ? this.formdata.kontostandInitial : 0,
          habenInitial: this.formdata.kontostandInitial < 0 ? Math.abs(this.formdata.kontostandInitial) : 0,
          istExtern: this.formdata.istExtern,
        };
        let kontoNeu = new Konto(dataKontoNeu);
        datastoremanager.create(kontoNeu, datastoremanager.keys.konten);
        this.zuruecksetzeFormular();
        this.$emit('submit');
      },
    },
  });
</script>
