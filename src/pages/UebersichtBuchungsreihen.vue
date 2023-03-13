<template>
  <q-page>
    <q-select
      filled
      v-model="datastore.objekteAktuell.szenario"
      label="Aktuelles Szenario"
      :options="datastore.szenarien"
      option-label="bezeichnung"
    />

    <div class="row justify-between">
      <SpalteUebersichtBuchungsreihen
        v-for="buchungsintervall in dataseed.buchungsintervalle"
        :buchungsintervall="buchungsintervall"
        @erzeuge="beiClickErzeugeBuchungsreihe"
      />
    </div>
  </q-page>
  <DialogErzeugeBuchungsreihe />
</template>

<script>
import { defineComponent, ref } from 'vue'
import SpalteUebersichtBuchungsreihen from 'src/components/SpalteUebersichtBuchungsreihen.vue'
import DialogErzeugeBuchungsreihe from 'src/components/DialogErzeugeBuchungsreihe.vue'
import datastore from '../_Data/datastore'
import dialoge from '../infrastructure/dialoge'
import dataseed from 'src/domain/dataseed'

export default defineComponent({
  name: 'UebersichtBuchungsreihen',
  components: {
    SpalteUebersichtBuchungsreihen,
    DialogErzeugeBuchungsreihe,
  },
  data() {return {
    datastore: datastore,
    dialoge: dialoge,
    dataseed: dataseed,
  }},
  methods: {
    beiClickErzeugeBuchungsreihe(buchungsintervall) {
      this.datastore.objekteAktuell.buchungsintervall = buchungsintervall;
      this.dialoge.erzeugeBuchungsreihe.zeige = true;
    }
  }
});
</script>
