<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{ buchungsreihe.bezeichnung }}</div>
      <q-space />
      <q-btn icon="close" flat round dense @click="loescheBuchungsreihe" />
    </q-card-section>

    <q-card-section>
      <div>{{ buchungsreihe.beschreibung }}</div>
      <div></div>
      <div>Quellkonto: {{ buchungsreihe.sollkonto.bezeichnung }}</div>
      <div>Zielkonto: {{ buchungsreihe.habenkonto.bezeichnung }}</div>
      <div>Betrag: {{ buchungsreihe.betrag }}</div>
      <div>Anfangsdatum: {{ buchungsreihe.datumAnfang }}</div>
      <div>Enddatum: {{ buchungsreihe.datumEnde }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
  import { defineComponent } from 'vue'
  import services from 'src/infrastructure/services';
  import datastore from 'src/infrastructure/datastore';

  export default defineComponent({
    name: 'ItemUebersichtBuchungsreihe',
    props: ['buchungsreihe'],
    data() {
      return {
        datastore: datastore,
      }
    },
    methods: {
      loescheBuchungsreihe() {
        services.datastoremanager.delete(this.buchungsreihe.id, 'buchungsreihen', this.datastore);
      }
    },
  })
</script>
