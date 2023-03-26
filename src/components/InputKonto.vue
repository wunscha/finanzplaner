<template>

  <div class="column items-center">
    <q-btn
      round
      icon="savings"
      :style="{
        backgroundColor: style.colors.accent,
        color: style.colors.accentText,
      }"
    >
      <q-menu>
        <q-list>
          <q-item
            v-for="konto in datastore.konten"
            clickable
            v-close-popup
            @click="() => {onUpdate(konto)}"
          >
            {{ konto.bezeichnung }}
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <div>
      {{ kontoAktuell && kontoAktuell.bezeichnung }}
    </div>
  </div>


</template>

<script>
  import { defineComponent, ref } from 'vue'
  import style from 'src/_Data/style'
  import datastore from 'src/_Data/datastore'

  export default defineComponent({
    name: 'InputDatum',
    props: [
      'kontoInit',
    ],
    data() {
      return {
        style: style,
        datastore: datastore,
        kontoAktuell: ref(this.kontoInit),
      }
    },
    methods: {
      onUpdate(konto) {
        this.kontoAktuell = konto;
        this.$emit('update', konto);
      },
    },
    emits: [
      'update',
    ]
  });
</script>
