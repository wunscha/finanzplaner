<template>
  <q-card>
    <q-card-section class="text-h6">
      Vergleich Konten Zeitreihe
    </q-card-section>

    <q-separator />

    <q-card-section class="row justify-around">
      <q-select
        filled
        multiple
        v-model="kontoschemataGewaehlt"
        label="Konten"
        :options="datastore.kontoschemata"
        option-label="bezeichnung"
      />

      <q-input filled label="Anfangsdatum" v-model="datumAnfang" mask="date">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="datumAnfang">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="OK" color="primary" flat/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input filled label="Enddatum" v-model="datumEnde" mask="date">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="datumEnde">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="OK" color="primary" flat/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-card-section>

    <q-separator />

    <q-card-section class="row justify-around">
      <DiagrammKontostandZeitreihe
        v-for="szenario in szenarien"
        :szenario="szenario"
        :arr-datum="arrDatum"
        :kontoschemata="kontoschemataGewaehlt"
      />
    </q-card-section>
  </q-card>

</template>

<script>
import { defineComponent, ref } from 'vue'
import DiagrammKontostandZeitreihe from 'src/components/DiagrammKontostandZeitreihe.vue'
import services from 'src/infrastructure/services'
import datastore from 'src/infrastructure/datastore'
import dataseed from 'src/domain/dataseed'

export default defineComponent({
  name: 'VergleichKontostandZeitreihe',
  props: ['szenarien'],
  components: {
    DiagrammKontostandZeitreihe,
  },
  data() {
    return {
      datastore: datastore,
      datumAnfang: ref((new Date()).toISOString()),
      datumEnde: ref((new Date(dataseed.datumMax)).toISOString()),
      kontoschemataGewaehlt: ref([]),
    }
  },
  computed: {
    arrDatum() {
      return services.kontomanager.erstelleArrDatum(this.datumAnfang, this.datumEnde, 'monatlich');
    },
  }
});
</script>
