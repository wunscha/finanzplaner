<template>
  <q-card
    :style="{
      width: style.widths.item + '%',
      maxWidth: style.widths.itemMax + 'px',
      backgroundColor: style.colors.secondaryItem,
      color: style.colors.secondaryTextItem,
    }"
  >
    <q-card-section
      class="row items-center q-pa-md"
      :style="{
        backgroundColor: style.colors.primaryItem,
        color: style.colors.primaryTextItem,
        fontSize: style.fontSizes.titelElement + 'rem',
      }"
    >
      <div>{{ titel }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import style from 'src/_Data/style';


export default defineComponent({
  name: 'DialogContent',
  data() {
    return {
      style: style,
    }
  },
  props: ['titel'],
});
</script>
