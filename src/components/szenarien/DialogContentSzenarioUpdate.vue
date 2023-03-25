<template>
  <DialogContent :titel="szenarioAktuell.bezeichnung">
    <q-form @submit="onSubmit">
      <div class="q-gutter-md">
        <q-input filled v-model="formdata.bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
        <q-input filled v-model="formdata.beschreibung"  label="Beschreibung" type="textarea"/>
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
  import DialogContent from '../DialogContent.vue'
  import datastoremanager from 'src/_DataManipulation/datastoremanager'
  import style from 'src/_Data/style';

  export default defineComponent({
    name: 'DialogContentSzenarioNeu',
    components: {
      DialogContent,
    },
    props: [
      'szenarioAktuell',
    ],
    data(){
      return {
        style: style,
        formdata: {
          bezeichnung: ref(this.szenarioAktuell.bezeichnung),
          beschreibung: ref(this.szenarioAktuell.beschreibung),
        }
      }
    },
    methods: {
      onSubmit() {
        let szenarioUpdate = {};
        Object.assign(szenarioUpdate, this.szenarioAktuell);
        Object.assign(szenarioUpdate, this.formdata);
        datastoremanager.update(szenarioUpdate, datastoremanager.keys.szenarien);
        this.$emit('submit');
      },
    },
  });
</script>
