<template>
  <q-card class="fp-item cursor-pointer" @click="onClickItem">
    <q-card-section class="row items-center q-pb-none fp-item-head">
      <div>{{ buchungsreihe.bezeichnung }}</div>
      <q-space />
      <q-btn icon="close" flat round dense @click="onClickLoeschen" />
    </q-card-section>

    <q-card-section>
      {{ buchungsreihe.beschreibung }}
    </q-card-section>
  </q-card>
</template>

<script>
  import { defineComponent } from 'vue'
  import datastoremanager from 'src/_DataManipulation/datastoremanager'

  export default defineComponent({
    name: 'ItemBuchungsreihe',
    props: [
      'buchungsreihe'
    ],
    methods: {
      onClickItem() {
        this.$emit('click', this.buchungsreihe);
      },
      onClickLoeschen() {
        datastoremanager.delete(this.buchungsreihe.id, datastoremanager.keys.buchungsreihen);
      }
    },
    emits: [
      'click',
    ]
  });
</script>
