<template>
  <q-card
    class="cursor-pointer"
    :style="{
      width: style.widths.item + '%',
      maxWidth: style.widths.itemMax + 'px',
      backgroundColor: style.colors.secondaryItem,
      color: style.colors.secondaryTextItem,
    }"
    @click="onClickItem"
  >
    <q-menu context-menu>
      <q-btn icon="delete" color="negative" size="xl" @click="onClickLoeschen" />
    </q-menu>

    <q-card-section
      class="flex flex-center q-pa-sm"
      :style="{
        backgroundColor: style.colors.primaryItem,
        color: style.colors.primaryTextItem,
        fontSize: style.fontSizes.titelElement + 'rem',
      }"
    >
      <div>{{ szenario.bezeichnung }}</div>
    </q-card-section>

    <template v-if="szenario.beschreibung && szenario.beschreibung.length > 0">
      <q-card-section>
        {{ szenario.beschreibung }}
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
  import { defineComponent } from 'vue'
  import datastoremanager from 'src/_DataManipulation/datastoremanager'
  import style from 'src/_Data/style'

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
    data() {
      return {
        style: style,
      }
    },
    emits: [
      'click',
    ]
  });
</script>
