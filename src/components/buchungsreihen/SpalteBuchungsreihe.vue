<template>
  <div class="col column items-center q-gutter-md q-pa-md">
    <h6>{{ buchungsintervall }}</h6>

    <ItemBuchungsreihe
      v-for="buchungsreihe in buchungsreihenSzenarioAktuell"
      :buchungsreihe="buchungsreihe"
      @click="(buchungsreihe) => $emit('clickItemBuchungsreihe', buchungsreihe)"
    />
    <q-btn
      v-if="szenarioAktuell"
      round
      color="green"
      icon="add"
      @click="() => $emit('erzeuge', buchungsintervall)"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ItemBuchungsreihe from './ItemBuchungsreihe.vue';
import datastore from 'src/_Data/datastore'

export default defineComponent({
  name: 'SpalteBuchungsreihe',
  props: [
    'buchungsintervall',
    'szenarioAktuell'
  ],
  components: {
    ItemBuchungsreihe,
  },
  data() {
    return {
      datastore: datastore,
    }
  },
  computed: {
    buchungsreihenSzenarioAktuell() {
      return this.datastore.buchungsreihen.filter(br =>
        br.szenario.id == this.szenarioAktuell.id &&
        br.buchungsintervall == this.buchungsintervall
      );
    },
  },
  emits: [
    'erzeuge',
    'clickItemBuchungsreihe',
  ],
});
</script>
