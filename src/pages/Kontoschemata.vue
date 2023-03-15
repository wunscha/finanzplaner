<template>
  <q-page>
    <div class="column items-center q-gutter-md q-pa-md">
      <ItemKontoschema
        v-for="kontoschema in datastore.kontoschemata"
        :kontoschema="kontoschema"
        @click="onClickItemKontoschema"
      />
      <q-btn
        round
        color="green"
        icon="add"
        @click="dialoge.kontoschemaNeu.zeige = true"
      />
    </div>
  </q-page>

  <q-dialog v-model="dialoge.kontoschemaNeu.zeige">
    <DialogContentKontoschemaNeu @submit="dialoge.kontoschemaNeu.zeige = false" />
  </q-dialog>

  <q-dialog v-model="dialoge.kontoschemaUpdate.zeige">
    <DialogContentKontoschemaUpdate v-if="kontoschemaAktuell" :kontoschema-aktuell="kontoschemaAktuell" @submit="dialoge.kontoschemaUpdate.zeige = false"/>
  </q-dialog>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import ItemKontoschema from 'src/components/kontoschemata/ItemKontoschema.vue'
  import DialogContentKontoschemaNeu from 'src/components/kontoschemata/DialogContentKontoschemaNeu.vue'
  import DialogContentKontoschemaUpdate from 'src/components/kontoschemata/DialogContentKontoschemaUpdate.vue';
  import datastore from '../_Data/datastore'

  export default defineComponent({
    name: 'UebersichtKontoschemata',
    components: {
      ItemKontoschema,
      DialogContentKontoschemaNeu,
      DialogContentKontoschemaUpdate,
      ItemKontoschema
    },
    data() {
      return {
        datastore: datastore,
        kontoschemaAktuell: ref(null),
        dialoge: {
          kontoschemaNeu: {zeige: false},
          kontoschemaUpdate: {zeige: false},
        },
      }
    },
    methods: {
      onClickItemKontoschema(kontoschema) {
        this.kontoschemaAktuell = kontoschema;
        this.dialoge.kontoschemaUpdate.zeige = true;
      }
    }
  });
</script>
