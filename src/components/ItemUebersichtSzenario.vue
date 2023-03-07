<template>
  <q-card style="min-width: 500px;">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{ szenario.bezeichnung }}</div>
      <q-space />
      <q-btn icon="close" flat round dense @click="loescheSzenario" />
    </q-card-section>

    <q-card-section>
      {{ szenario.beschreibung }}
    </q-card-section>
  </q-card>
</template>

<script>
  import { defineComponent } from 'vue'
  import services from 'src/infrastructure/services';
  import datastore from 'src/infrastructure/datastore';

  export default defineComponent({
    name: 'ItemUebersichtSzenario',
    props: ['szenario'],
    data() {
      return {
        datastore: datastore,
      }
    },
    methods: {
      loescheSzenario() {
        services.datastoremanager.delete(this.szenario.id, 'szenarien', this.datastore);
      }
    },
  })
</script>
