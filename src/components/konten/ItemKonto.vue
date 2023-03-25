<template>
  <q-card class="cursor-pointer"
    :style="{
      width: style.widths.item + '%',
      maxWidth: style.widths.itemMax + 'px',
      backgroundColor: style.colors.secondaryItem,
      color: style.colors.secondaryTextItem,
    }"
    @click="onClickItem"
  >
    <q-card-section
      class="row items-center q-pa-md"
      :style="{
        backgroundColor: style.colors.primaryItem,
        color: style.colors.primaryTextItem,
        fontSize: style.fontSizes.titelElement + 'rem',
      }"
    >
      <div>{{ konto.bezeichnung }}</div>
      <q-space />
      <q-btn icon="delete" flat round dense @click="onClickLoeschen" />
    </q-card-section>

    <q-card-section>
      {{ konto.beschreibung }}
    </q-card-section>
  </q-card>
</template>

<script>
  import { defineComponent } from 'vue'
  import datastoremanager from 'src/_DataManipulation/datastoremanager'
  import style from 'src/_Data/style';

  export default defineComponent({
    name: 'ItemKonto',
    props: ['konto'],
    data() {
      return {
        style: style,
      }
    },
    methods: {
      onClickItem() {
        this.$emit('click', this.konto);
      },
      onClickLoeschen() {
        datastoremanager.delete(this.konto.id, datastoremanager.keys.konten);
      }
    },
    emits: [
      'click',
    ]
  });
</script>
