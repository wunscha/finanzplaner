<template>
  <q-card class="fp-item cursor-pointer" style="min-width: 500px;" @click="onClickItem">
    <q-card-section class="row items-center q-pb-none fp-item-head">
      <div>{{ kontoschema.bezeichnung }}</div>
      <q-space />
      <q-btn icon="close" flat round dense @click="onClickLoeschen" />
    </q-card-section>

    <q-card-section>
      {{ kontoschema.beschreibung }}
    </q-card-section>
  </q-card>
</template>

<script>
  import { defineComponent } from 'vue'
  import datastoremanager from 'src/_DataManipulation/datastoremanager'

  export default defineComponent({
    name: 'ItemKontoschema',
    props: ['kontoschema'],
    methods: {
      onClickItem() {
        this.$emit('click', this.kontoschema);
      },
      onClickLoeschen() {
        datastoremanager.delete(this.kontoschema.id, datastoremanager.keys.kontoschemata);
      }
    },
    emits: [
      'click',
    ]
  });
</script>
