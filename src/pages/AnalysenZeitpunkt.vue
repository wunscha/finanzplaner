<template>
  <q-page>
    <q-select
      filled
      multiple
      v-model="szenarienAktuell"
      label="Aktuelle Szenarien"
      :options="datastore.szenarien"
      option-label="bezeichnung"
    />

    <q-select
      filled
      multiple
      v-model="kontenAktuell"
      label="Aktuelle Konten"
      :options="datastore.konten"
      option-label="bezeichnung"
    />

    <q-input
      v-model="datumAktuell"
      label="Datum"
      :max="datastore.datumMax"
      type="date"
      stack-label
    />

    <div class="column items-center q-gutter-md q-pa-md">
      <ItemAnalyseZeitpunkt
        v-for="szenario in szenarienAktuell"
        :szenario="szenario"
        :konten-aktuell="kontenAktuell"
        :datum-aktuell="datumAktuell"
      />
    </div>
  </q-page>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import ItemAnalyseZeitpunkt from 'src/components/analysenZeitpunkt/ItemAnalyseZeitpunkt.vue'
  import datastore from '../_Data/datastore'
  import formatierer from 'src/_Application/formatierer';

  export default defineComponent({
    name: 'Konten',
    components: {
      ItemAnalyseZeitpunkt,
    },
    data() {
      return {
        datastore: datastore,
        szenarienAktuell: ref([datastore.szenarien[0], ]),
        kontenAktuell: ref([]),
        datumAktuell: ref(formatierer.dateFuerInput(datastore.datumMax)),
      }
    },
  });
</script>
