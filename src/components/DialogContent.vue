<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{ titel }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section class="q-pa-md">
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'DialogContent',
  props: ['titel'],
});
</script>
