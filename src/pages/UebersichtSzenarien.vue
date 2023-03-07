<template>
  <q-page>
    <div class="column items-center q-gutter-md q-pa-md">
      <ItemUebersichtSzenario
        v-for="szenario in datastore.szenarien"
        :szenario="szenario"
      />
      <q-btn
        round
        color="green"
        icon="add"
        @click="dialoge.erzeugeSzenario.zeige = true"
      />
    </div>
  </q-page>

  <DialogErzeugeSzenario />
</template>

<script>
import { defineComponent } from 'vue'
import ItemUebersichtSzenario from 'src/components/ItemUebersichtSzenario.vue'
import DialogErzeugeSzenario from 'src/components/DialogErzeugeSzenario.vue'
import datastore from '../infrastructure/datastore'
import dialoge from '../infrastructure/dialoge'

export default defineComponent({
  name: 'UebersichtSzenarien',
  components: {
    ItemUebersichtSzenario,
    DialogErzeugeSzenario,
  },
  data() {
    return {
      datastore: datastore,
      dialoge: dialoge,
    }
  },
})
</script>
