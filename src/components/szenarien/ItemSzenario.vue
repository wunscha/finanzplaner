<template>
  <q-card class="fp-item cursor-pointer" style="min-width: 500px;" @click="onClickItem">
    <q-card-section class="row items-center q-pb-none fp-item-head">
      <div>{{ szenario.bezeichnung }}</div>
      <q-space />
      <q-btn icon="close" flat round dense @click="onClickLoeschen" />
    </q-card-section>

    <q-card-section>
      {{ szenario.beschreibung }}
    </q-card-section>
  </q-card>
</template>

<script>
  import { defineComponent } from 'vue'
  import datastoremanager from 'src/_DataManipulation/datastoremanager'

  export default defineComponent({
    name: 'ItemSzenario',
    props: ['szenario'],
    methods: {
      onClickItem() {
        this.$emit('click', this.szenario);
      },
      onClickLoeschen() {
        datastoremanager.delete(this.szenario.id, datastoremanager.keys.szenarien);
      }
    },
    emits: [
      'click',
    ]
  });
</script>
