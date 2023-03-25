<template>
  <q-separator vertical />
  <div
    class="col column items-center q-gutter-md q-pa-md"
  >
    <div
      :style="{
        fontSize: style.fontSizes.titelElement + 'rem',
      }"
    >
      {{ buchungsintervall }}
    </div>

    <ItemBuchungsreihe
      v-for="buchungsreihe in buchungsreihenSzenarioAktuell"
      :buchungsreihe="buchungsreihe"
      @click="(buchungsreihe) => $emit('clickItemBuchungsreihe', buchungsreihe)"
    />
    <q-btn
      v-if="szenarioAktuell"
      round
      :style="{
        color: style.colors.accentText,
        backgroundColor: style.colors.accent,
      }"
      icon="add"
      @click="() => $emit('erzeuge', buchungsintervall)"
    />
  </div>
  <q-separator vertical />
</template>

<script>
import { defineComponent } from 'vue'
import ItemBuchungsreihe from './ItemBuchungsreihe.vue';
import datastore from 'src/_Data/datastore'
import style from 'src/_Data/style';

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
      style: style,
      datastore: datastore,
    }
  },
  computed: {
    buchungsreihenSzenarioAktuell() {
      return this.datastore.buchungsreihen.filter(br =>
        (br.szenario.id == this.szenarioAktuell.id || br.szenario.istAllgemein) &&
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
