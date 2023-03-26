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
      <div>{{ buchungsreihe.bezeichnung }}</div>
    </q-card-section>

    <q-card-section>
      <div class="q-gutter-sm">
        <!-- Betrag -->
        <div class="flex flex-center q-gutter-sm">
          <q-icon name="euro" />
          <div>{{ buchungsreihe.betrag }}</div>
        </div>
        <q-separator />
        <!-- Datum Anfang / Ende -->
        <div class="row items-center">
          <div class="col-4 flex flex-center">
            {{ datumAnfangFormatiert }}
          </div>
          <div class="col-4 flex flex-center">
            <q-icon name="more_horiz" />
          </div>
          <div class="col-4 flex flex-center">
            {{ datumEndeFormatiert }}
          </div>
        </div>
        <q-separator />
        <!-- Quellkonto / Zielkonto -->
        <div class="row items-center">
          <div class="col-4 flex flex-center">
            {{ buchungsreihe.quellkonto.bezeichnung }}
          </div>
          <div class="col-4 flex flex-center">
            <q-icon name="trending_flat" />
          </div>
          <div class="col-4 flex flex-center">
            {{ buchungsreihe.zielkonto.bezeichnung }}
          </div>
        </div>
      </div>


    </q-card-section>
  </q-card>
</template>

<script>
  import { defineComponent } from 'vue'
  import datastoremanager from 'src/_DataManipulation/datastoremanager'
  import style from 'src/_Data/style';
import formatierer from 'src/_Application/formatierer';

  export default defineComponent({
    name: 'ItemBuchungsreihe',
    props: [
      'buchungsreihe'
    ],
    data() {
      return {
        style: style,
      }
    },
    methods: {
      onClickItem() {
        this.$emit('click', this.buchungsreihe);
      },
      onClickLoeschen() {
        datastoremanager.delete(this.buchungsreihe.id, datastoremanager.keys.buchungsreihen);
      }
    },
    computed: {
      datumAnfangFormatiert() {
        return formatierer.dateFuerQuasarInput(this.buchungsreihe.datumAnfang);
      },
      datumEndeFormatiert() {
        return formatierer.dateFuerQuasarInput(this.buchungsreihe.datumEnde);
      }
    },
    emits: [
      'click',
    ]
  });
</script>
