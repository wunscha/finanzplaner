<template>
  <q-page>
    <q-select
      filled
      multiple
      v-model="szenarien"
      label="Szenarien für Vergleich"
      :options="datastore.szenarien"
      option-label="bezeichnung"
    />

    <VergleichKontostandZeitreihe
      :szenarien="szenarien"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import VergleichKontostandZeitreihe from 'src/components/VergleichKontostandZeitreihe.vue';
import datastore from 'src/_Data/datastore';

export default defineComponent({
  name: 'UebersichtSzenarienvergleich',
  components: {
    VergleichKontostandZeitreihe
  },
  data() {
    return {
      datastore: datastore,
      szenarien: ref([]),
    }
  },
  methods: {
  }
});
</script>
