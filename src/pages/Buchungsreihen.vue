<template>
  <q-page>
    <q-select
      filled
      v-model="szenarioAktuell"
      label="Aktuelles Szenario"
      :options="datastore.szenarien"
      option-label="bezeichnung"
    />

    <div class="row justify-between">
      <SpalteBuchungsreihe
        v-for="buchungsintervall in ENUM_BUCHUNGSINTERVALLE"
        :buchungsintervall="buchungsintervall"
        :szenario-aktuell="szenarioAktuell"
        @erzeuge="beiClickBuchungsreiheNeu"
        @click-item-buchungsreihe="beiClickItemBuchungsreihe"
      />
    </div>
  </q-page>

  <q-dialog v-model="dialoge.buchungsreiheNeu.zeige">
    <DialogContentBuchungsreiheNeu
      v-if="buchungsintervallAktuell"
      :buchungsintervall-aktuell="buchungsintervallAktuell"
      :szenario-aktuell="szenarioAktuell"
      @submit="dialoge.buchungsreiheNeu.zeige = false"
    />
  </q-dialog>

  <q-dialog v-model="dialoge.buchungsreiheUpdate.zeige">
    <DialogContentBuchungsreiheUpdate
      v-if="buchungsreiheAktuell"
      :buchungsreihe-aktuell="buchungsreiheAktuell"
      @submit="dialoge.buchungsreiheUpdate.zeige = false"
    />
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import datastore from '../_Data/datastore'
import SpalteBuchungsreihe from 'src/components/buchungsreihen/SpalteBuchungsreihe.vue';
import DialogContentBuchungsreiheNeu from 'src/components/buchungsreihen/DialogContentBuchungsreiheNeu.vue';
import DialogContentBuchungsreiheUpdate from 'src/components/buchungsreihen/DialogContentBuchungsreiheUpdate.vue';
import { ENUM_BUCHUNGSINTERVALLE } from 'src/_Domain/models';

export default defineComponent({
  name: 'Buchungsreihen',
  components: {
    SpalteBuchungsreihe,
    DialogContentBuchungsreiheNeu,
    DialogContentBuchungsreiheUpdate,
  },
  data() {return {
    ENUM_BUCHUNGSINTERVALLE: ENUM_BUCHUNGSINTERVALLE,
    datastore: datastore,
    szenarioAktuell: ref(datastore.szenarien[0]),
    buchungsreiheAktuell: ref(null),
    buchungsintervallAktuell: ref(null),
    dialoge: {
      buchungsreiheNeu: {zeige: false},
      buchungsreiheUpdate: {zeige: false},
    }
  }},
  methods: {
    beiClickItemBuchungsreihe(buchungsreihe) {
      this.buchungsreiheAktuell = buchungsreihe;
      this.dialoge.buchungsreiheUpdate.zeige = true;
    },
    beiClickBuchungsreiheNeu(buchungsintervall) {
      this.buchungsintervallAktuell = buchungsintervall;
      this.dialoge.buchungsreiheNeu.zeige = true;
    }
  }
});
</script>
