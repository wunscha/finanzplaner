<template>
  <div class="col column items-center q-gutter-md q-pa-md">
    <h6>{{ buchungsintervall }}</h6>

    <ItemUebersichtBuchungsreihe
      v-for="buchungsreihe in buchungsreihenSzenarioAktuell"
      :buchungsreihe="buchungsreihe"
    />
    <q-btn
      round
      color="green"
      icon="add"
      @click="() => $emit('erzeuge', buchungsintervall)"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ItemUebersichtBuchungsreihe from 'src/components/ItemUebersichtBuchungsreihe.vue'
import datastore from '../infrastructure/datastore'
import dialoge from '../infrastructure/dialoge'

export default defineComponent({
  name: 'SpalteUebersichtBuchungsreihen',
  props: ['buchungsintervall', 'szenarioAktuell'],
  components: {
    ItemUebersichtBuchungsreihe,
  },
  data() {
    return {
      datastore: datastore,
      dialoge: dialoge,
    }
  },
  computed: {
    buchungsreihenSzenarioAktuell() {
      return this.datastore.buchungsreihen.filter(br =>
        br.szenario.id == this.datastore.objekteAktuell.szenario.id &&
        br.buchungsintervall == this.buchungsintervall
      );
    },
  },
  emits: ['erzeuge'],
});
</script>
