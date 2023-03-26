<template>
  <DialogContent :titel="buchungsreiheAktuell.bezeichnung">
    <q-form @submit="onSubmit">
      <div class="q-gutter-md">
        <!-- Bezeichnung -->
        <q-input borderless v-model="formdata.bezeichnung"  label="Bezeichnung">
          <template v-slot:prepend>
            <q-icon name="title" />
          </template>
        </q-input>
        <q-separator />
        <!-- Betrag -->
        <q-input borderless v-model="formdata.betrag" label="Betrag" type="number">
          <template v-slot:prepend>
            <q-icon name="euro" />
          </template>
        </q-input>
        <q-separator />
        <!-- Datum Anfang / Ende -->
        <div class="row justify-between items-center q-pa-md">
          <div class="col-4 flex flex-center">
            <InputDatum :datum-init="formdata.datumAnfang" @update="datum => formdata.datumAnfang = datum" />
          </div>
          <div class="col-4 flex flex-center">
            <q-icon name="more_horiz" size="xl" />
          </div>
          <div class="col-4 flex flex-center">
            <InputDatum :datum-init="formdata.datumEnde" @update="datum => formdata.datumEnde = datum" />
          </div>
        </div>
        <q-separator />
        <!-- Quellkonto / Zielkonto -->
        <div class="row justify-between items-center q-pa-md">
          <div class="col-4 flex flex-center">
            <InputKonto @update="konto => formdata.quellkonto = konto" :konto-init="formdata.quellkonto"/>
          </div>
          <div class="col-4 flex flex-center">
            <q-icon name="trending_flat" size="xl"/>
          </div>
          <div class="col-4 flex flex-center">
            <InputKonto @update="konto => formdata.zielkonto = konto"  :konto-init="formdata.zielkonto"/>
          </div>
        </div>
        <q-separator />

        <!-- <q-input filled v-model="formdata.bezeichnung"  label="Bezeichnung" :rules="[val => val && val.length > 0] || 'Bitte Bezeichnung angeben'"/>
        <q-input filled v-model="formdata.beschreibung"  label="Beschreibung" type="textarea" />
        <q-input filled v-model="formdata.betrag" label="Betrag" type="number" />
        <q-select filled v-model="formdata.quellkonto" label="Quellkonto" :options="datastore.konten" option-label="bezeichnung"  />
        <q-select filled v-model="formdata.zielkonto" label="Zielkonto" :options="datastore.konten" option-label="bezeichnung" />
        <q-input filled v-model="formdata.datumAnfang" label="Datum Anfang" type="date"/>
        <q-input filled v-model="formdata.datumEnde" label="Datum Ende" type="date" />
        <div>{{ buchungsreiheAktuell.buchungsintervall }}</div>
         -->
        <div class="row justify-end">
          <q-btn
            type="submit"
            icon="check"
            :style="{
              color: style.colors.accentText,
              backgroundColor: style.colors.accent,
            }"
          />
        </div>
      </div>
    </q-form>
  </DialogContent>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import DialogContent from '../DialogContent.vue';
  import InputDatum from '../InputDatum.vue';
  import InputKonto from '../InputKonto.vue';
  import datastore from 'src/_Data/datastore';
  import datastoremanager from 'src/_DataManipulation/datastoremanager'
  import formatierer from 'src/_Application/formatierer';
  import style from 'src/_Data/style';

  export default defineComponent({
    name: 'DialogContentBuchungsreiheUpdate',
    components: {
      DialogContent,
      InputDatum,
      InputKonto,
    },
    props: [
      'buchungsreiheAktuell',
      'szenarioAktuell',
    ],
    data(){
      return {
        style: style,
        datastore: datastore,
        formdata: {
          bezeichnung: ref(this.buchungsreiheAktuell.bezeichnung),
          beschreibung: ref(this.buchungsreiheAktuell.beschreibung),
          betrag: ref(this.buchungsreiheAktuell.betrag),
          quellkonto: ref(this.buchungsreiheAktuell.quellkonto),
          zielkonto: ref(this.buchungsreiheAktuell.zielkonto),
          datumAnfang: ref(formatierer.dateFuerInput(this.buchungsreiheAktuell.datumAnfang)),
          datumEnde: ref(formatierer.dateFuerInput(this.buchungsreiheAktuell.datumEnde)),
        }
      }
    },
    methods: {
      onSubmit() {
        let buchungsreiheUpdate = {};
        Object.assign(buchungsreiheUpdate, this.buchungsreiheAktuell);
        Object.assign(buchungsreiheUpdate, this.formdata);
        datastoremanager.update(buchungsreiheUpdate, datastoremanager.keys.buchungsreihen);
        this.$emit('submit');
      },
    }
  });

</script>
