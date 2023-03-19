<template>
  <q-page>
    <div class="column items-center q-gutter-md q-pa-md">
      <ItemKonto
        v-for="konto in datastore.konten"
        :konto="konto"
        @click="onClickItemKonto"
      />
      <q-btn
        round
        color="green"
        icon="add"
        @click="dialoge.kontoNeu.zeige = true"
      />
    </div>
  </q-page>

  <q-dialog v-model="dialoge.kontoNeu.zeige">
    <DialogContentKontoNeu @submit="dialoge.kontoNeu.zeige = false" />
  </q-dialog>

  <q-dialog v-model="dialoge.kontoUpdate.zeige">
    <DialogContentKontoUpdate v-if="kontoAktuell" :konto-aktuell="kontoAktuell" @submit="dialoge.kontoUpdate.zeige = false"/>
  </q-dialog>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import ItemKonto from 'src/components/konten/ItemKonto.vue'
  import DialogContentKontoNeu from 'src/components/konten/DialogContentKontoNeu.vue'
  import DialogContentKontoUpdate from 'src/components/konten/DialogContentKontoUpdate.vue';
  import datastore from '../_Data/datastore'

  export default defineComponent({
    name: 'Konten',
    components: {
      ItemKonto,
      DialogContentKontoNeu,
      DialogContentKontoUpdate,
      ItemKonto
    },
    data() {
      return {
        datastore: datastore,
        kontoAktuell: ref(null),
        dialoge: {
          kontoNeu: {zeige: false},
          kontoUpdate: {zeige: false},
        },
      }
    },
    methods: {
      onClickItemKonto(konto) {
        this.kontoAktuell = konto;
        this.dialoge.kontoUpdate.zeige = true;
      }
    }
  });
</script>
