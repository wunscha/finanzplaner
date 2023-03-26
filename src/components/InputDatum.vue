<template>

  <div class="column items-center">
    <q-btn
      round
      icon="event"
      :style="{
        backgroundColor: style.colors.accent,
        color: style.colors.accentText,
      }"
    >
      <q-popup-proxy
        cover
      >
        <q-date v-model="datumAktuell" color="primary">
          <div
            class="row items-center justify-end q-gutter-sm"
          >
            <q-btn
              round
              flat
              icon="close"
              color="negative"
              v-close-popup
            />
            <q-btn
              round
              flat
              icon="check"
              color="positive"
              @click="onUpdate"
              v-close-popup
            />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-btn>

    <div>
      {{ datumAktuell }}
    </div>
  </div>


</template>

<script>
  import { defineComponent, ref } from 'vue'
  import formatierer from 'src/_Application/formatierer'
  import style from 'src/_Data/style'
  import datastore from 'src/_Data/datastore'

  export default defineComponent({
    name: 'InputDatum',
    props: [
      'datumInit',
      'datumMin',
      'datumMax',
    ],
    data() {
      return {
        style: style,
        datastore: datastore,
        datumAktuell: ref(formatierer.dateFuerQuasarInput(this.datumInit)),
      }
    },
    methods: {
      onUpdate() {
        this.$emit('update', new Date(this.datumAktuell));
      },
    },
    emits: [
      'update',
    ]
  });
</script>
