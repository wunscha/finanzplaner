<template>
  <q-page>
    <div class="column items-center q-gutter-md q-pa-md">
      <ItemSzenario
        v-for="szenario in datastore.szenarien"
        :szenario="szenario"
        @click="onClickItemSzenario"
      />
      <q-btn
        round
        color="green"
        icon="add"
        @click="dialoge.szenarioNeu.zeige = true"
      />
    </div>
  </q-page>

  <q-dialog v-model="dialoge.szenarioNeu.zeige">
    <DialogContentSzenarioNeu @submit="dialoge.szenarioNeu.zeige = false" />
  </q-dialog>

  <q-dialog v-model="dialoge.szenarioUpdate.zeige">
    <DialogContentSzenarioUpdate v-if="szenarioAktuell" :szenario-aktuell="szenarioAktuell" @submit="dialoge.szenarioUpdate.zeige = false"/>
  </q-dialog>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import ItemSzenario from 'src/components/szenarien/ItemSzenario.vue'
  import DialogContentSzenarioNeu from 'src/components/szenarien/DialogContentSzenarioNeu.vue'
  import DialogContentSzenarioUpdate from 'src/components/szenarien/DialogContentSzenarioUpdate.vue';
  import datastore from '../_Data/datastore'

  export default defineComponent({
    name: 'Szenarien',
    components: {
      ItemSzenario,
      DialogContentSzenarioNeu,
      DialogContentSzenarioUpdate,
    },
    data() {
      return {
        datastore: datastore,
        szenarioAktuell: ref(null),
        dialoge: {
          szenarioNeu: {zeige: false},
          szenarioUpdate: {zeige: false},
        },
      }
    },
    methods: {
      onClickItemSzenario(szenario) {
        this.szenarioAktuell = szenario;
        this.dialoge.szenarioUpdate.zeige = true;
      }
    }
  });
</script>
