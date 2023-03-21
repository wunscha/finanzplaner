<template>
  <DialogContent titel="Einstellungen">
    <div>
      <q-btn label="Speichern" color="primary" @click="beiClickSpeichern" />
    </div>

    <q-form @submit="beiSubmitLaden">
      <div class="q-gutter-md">
        <q-input filled v-model="fileListInput"  label="Datei" type="file" />
        <q-btn label="Speicherstand Laden" type="submit" color="primary"/>
      </div>
    </q-form>
  </DialogContent>
</template>

<script>
  import { defineComponent, ref, reactive } from 'vue';
  import DialogContent from '../DialogContent.vue';
  import datastoremanager from 'src/_DataManipulation/datastoremanager';
  import datastore from 'src/_Data/datastore';

  // TODO: const mit Initialwerten für formdata

  export default defineComponent({
    name: 'DialogContentMenueEinstellungen',
    components: {
      DialogContent,
    },
    data(){
      return {
        datastore: datastore,
        fileListInput: ref([]),
      }
    },
    methods: {
      zuruecksetzeFormular() {
        this.fileListInput = ref([]);
      },
      beiClickSpeichern() {
        // siehe https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
        let hrefString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(datastore));
        let anchorNode = document.createElement('a');
        anchorNode.setAttribute('href', hrefString);
        anchorNode.setAttribute('download', 'speicherstand_finanzplaner.json');
        anchorNode.style.display = 'none';
        document.body.appendChild(anchorNode);
        anchorNode.click();
        anchorNode.remove();
        this.$emit('submit');
      },
      beiSubmitLaden() {
        let datei = this.fileListInput[0];
        let filereader = new FileReader();
        filereader.onload = evt => {
          let dateiGeladen = JSON.parse(evt.target.result);
          datastoremanager.ueberschreibeDatastore(dateiGeladen);
        }
        filereader.readAsText(datei);
        this.zuruecksetzeFormular();
        this.$emit('submit');
      },
    },
    emits: [
      'submit',
    ]
  });
</script>
