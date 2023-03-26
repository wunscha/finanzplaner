<template>
  <q-layout
    view="lHh Lpr lFf"
    :style="{
      backgroundColor: style.colors.secondary,
      color: style.colors.secondaryText,
      fontSize: style.fontSizes.text + 'rem',
    }"
  >
    <q-header
      elevated
     :style="{
       backgroundColor: style.colors.primary,
        color: style.colors.primaryText,
        fontSize: style.fontSizes.titelSeite + 'rem',
     }"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="style"
          @click="zeigeDrawerStyle = !zeigeDrawerStyle"
        />
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="zeigeDrawerNavigation = !zeigeDrawerNavigation"
        />

        <q-space />

        <!-- Datastore Speichern -->
        <q-btn
          flat
          dense
          round
          icon="save"
          @click="speichereDatastore"
        />
        <!-- Datastore Laden -->
        <input type="file" style="display: none;" v-on:change="ladeDatastore" id="ipt-file-datastore"/>
        <q-btn
          flat
          dense
          round
          icon="restore"
          @click="beiClickLadeDatastore"
        />
      </q-toolbar>
    </q-header>

    <!-- Drawer Style -->
    <q-drawer
      v-model="zeigeDrawerStyle"
      class="column justify-between"
      :style="{
        backgroundColor: style.colors.secondaryItem,
        color: style.colors.secondaryTextItem,
      }"
    >
      <q-list>
        <div class="row q-gutter-md q-pa-sm">
          <!-- Style speichern -->
          <q-btn
            flat
            round
            icon="save"
            :style="{
              color: style.colors.accentText,
              backgroundColor: style.colors.accent,
            }"
            @click="speichereStyle"
          />
          <!-- Style Laden -->
          <input type="file" style="display: none;" v-on:change="ladeStyle" id="ipt-file-style"/>
          <q-btn
            flat
            round
            icon="restore"
            :style="{
              color: style.colors.accentText,
              backgroundColor: style.colors.accent,
            }"
            @click="beiClickLadeStyle"
          />
        </div>

        <!-- Farben-->
        <q-separator />

        <!-- Allgemein -->
        <!-- Primary -->
        <q-item class="items-center justify-between">
          <div
            :style="{
              fontSize: style.fontSizes.ueberschrift + 'rem',
            }"
          >
            Pimär:
          </div>
          <div>
            <q-btn
              round
              :style="{
                backgroundColor: style.colors.primary,
              }"
            >
              <q-menu>
                <q-color v-model="style.colors.primary" />
              </q-menu>
            </q-btn>
            <q-btn
              round
              label="A"
              class="text-xl"
              :style="{
                color: style.colors.primaryText,
                backgroundColor: style.colors.primary,
              }"
            >
              <q-menu>
                <q-color v-model="style.colors.primaryText" />
              </q-menu>
            </q-btn>
          </div>
        </q-item>
        <!-- Secondary -->
        <q-item class="items-center justify-between">
          <div
            :style="{
              fontSize: style.fontSizes.ueberschrift + 'rem',
            }"
          >
            Sekundär:
          </div>
          <div>
            <q-btn
              round
              :style="{
                backgroundColor: style.colors.secondary,
              }"
            >
              <q-menu>
                <q-color v-model="style.colors.secondary" />
              </q-menu>
            </q-btn>
            <q-btn
              round
              label="A"
              class="text-xl"
              :style="{
                color: style.colors.secondaryText,
                backgroundColor: style.colors.secondary,
              }"
            >
              <q-menu>
                <q-color v-model="style.colors.secondaryText" />
              </q-menu>
            </q-btn>
          </div>
        </q-item>

        <q-separator />
        <!-- Item -->
        <!-- Primary Item -->
        <q-item class="items-center justify-between">
          <div
            :style="{
              fontSize: style.fontSizes.ueberschrift + 'rem',
            }"
          >
            Pimär Item:
          </div>
          <div>
            <q-btn
              round
              :style="{
                backgroundColor: style.colors.primaryItem,
              }"
            >
              <q-menu>
                <q-color v-model="style.colors.primaryItem" />
              </q-menu>
            </q-btn>
            <q-btn
              round
              label="A"
              class="text-xl"
              :style="{
                color: style.colors.primaryTextItem,
                backgroundColor: style.colors.primaryItem,
              }"
            >
              <q-menu>
                <q-color v-model="style.colors.primaryTextItem" />
              </q-menu>
            </q-btn>
          </div>
        </q-item>
        <!-- Secondary Item -->
        <q-item class="items-center justify-between">
          <div
            :style="{
              fontSize: style.fontSizes.ueberschrift + 'rem',
            }"
          >
            Pimär Item:
          </div>
          <div>
            <q-btn
              round
              :style="{
                backgroundColor: style.colors.secondaryItem,
              }"
            >
              <q-menu>
                <q-color v-model="style.colors.secondaryItem" />
              </q-menu>
            </q-btn>
            <q-btn
              round
              label="A"
              class="text-xl"
              :style="{
                color: style.colors.secondaryTextItem,
                backgroundColor: style.colors.secondaryItem,
              }"
            >
              <q-menu>
                <q-color v-model="style.colors.secondaryTextItem" />
              </q-menu>
            </q-btn>
          </div>
        </q-item>

        <q-separator />
        <!-- Accent -->
        <q-item class="items-center justify-between">
          <div
            :style="{
              fontSize: style.fontSizes.ueberschrift + 'rem',
            }"
          >
            Schaltflächen:
          </div>
          <div>
            <q-btn
              round
              :style="{
                backgroundColor: style.colors.accent,
              }"
            >
              <q-menu>
                <q-color v-model="style.colors.accent" />
              </q-menu>
            </q-btn>
            <q-btn
              round
              label="A"
              class="text-xl"
              :style="{
                color: style.colors.accentText,
                backgroundColor: style.colors.accent,
              }"
            >
              <q-menu>
                <q-color v-model="style.colors.accentText" />
              </q-menu>
            </q-btn>
          </div>
        </q-item>


        <!-- Breiten -->
        <q-separator />
        <div class="q-pa-md">
          <div
            :style="{
              fontSize: style.fontSizes.ueberschrift + 'rem',
            }"
          >
            Breite Elemente
          </div>
          <q-slider
            v-model="style.widths.item"
            :min="20"
            :max="100"
            :step="5"
            label
            label-always
          />
        </div>
        <div class="q-pa-md">
          <div
            :style="{
              fontSize: style.fontSizes.ueberschrift + 'rem',
            }"
          >
            Max. Breite Elemente
          </div>
          <q-slider
            v-model="style.widths.itemMax"
            :min="300"
            :max="2000"
            :step="50"
            label
            label-always
          />
        </div>
        <q-separator />


      </q-list>

      <q-list>
        <!-- Schriftgrößen -->
        <q-separator />
        <div class="q-pa-md">
          <div
            :style="{
              fontSize: style.fontSizes.titelElement + 'rem',
            }"
          >
            Titel
          </div>
          <q-slider
            v-model="style.fontSizes.titelElement"
            :min="0.05"
            :max="3.00"
            :step="0.05"
            label
            label-always
          />
        </div>
        <div class="q-pa-md">
          <div
            :style="{
              fontSize: style.fontSizes.ueberschrift + 'rem',
            }"
          >
            Überschrift
          </div>
          <q-slider
            v-model="style.fontSizes.ueberschrift"
            :min="0.05"
            :max="3.00"
            :step="0.05"
            label
            label-always
          />
        </div>
        <div class="q-pa-md">
          <div
            :style="{
              fontSize: style.fontSizes.text + 'rem',
            }"
          >
            Text
          </div>
          <q-slider
            v-model="style.fontSizes.text"
            :min="0.05"
            :max="3.00"
            :step="0.05"
            label
            label-always
          />
        </div>
      </q-list>
    </q-drawer>

    <!-- Drawer Navigation -->
    <q-drawer
      v-model="zeigeDrawerNavigation"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container
      :style="{
        backgroundColor: style.colors.secondary,
      }"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import EssentialLink from 'components/EssentialLink.vue'
  import datastoremanager from 'src/_DataManipulation/datastoremanager'
  import datastore from 'src/_Data/datastore'
  import style from 'src/_Data/style'

  const linksList = [
    {
      title: 'Szenarien',
      caption: 'Verwaltung Szenarien',
      link: 'szenarien',
    },
    {
      title: 'Konten',
      caption: 'Verwaltung Konten',
      link: 'konten',
    },
    {
      title: 'Buchungsreihen',
      caption: 'Verwaltung Buchungsreihen',
      link: 'buchungsreihen',
    },
    {
      title: 'Analyse Zeitpunkt',
      caption: 'Analyse Kontostände nach Zeitpunkt',
      link: 'analysen-zeitpunkt',
    },
    {
      title: 'Analyse Zeitreihe',
      caption: 'Analyse Entwicklung Kontostande über Zeitraum',
      link: 'analysen-zeitreihe',
    },
    {
      title: 'Jahresbericht Kontosalden',
      caption: 'Übersicht über Kontosalden für Jahr',
      link: 'jahresbericht-kontosalden',
    },
  ]

  export default defineComponent({
    name: 'MainLayout',

    components: {
      EssentialLink,
    },

    data() {
      return {
        zeigeDrawerNavigation: ref(false),
        zeigeDrawerStyle: ref(false),
        datastore: datastore,
        style: style,
        fileListInput: ref([]),
        essentialLinks: linksList,
      }
    },

    methods: {
      speichereDatastore() {
        // siehe https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
        let hrefString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(datastore));
        let anchorNode = document.createElement('a');
        anchorNode.setAttribute('href', hrefString);
        anchorNode.setAttribute('download', 'speicherstand_finanzplaner.json');
        anchorNode.style.display = 'none';
        document.body.appendChild(anchorNode);
        anchorNode.click();
        anchorNode.remove();
        this.$emit('submit');
      },
      ladeDatastore(evt) {
        let datei = evt.target.files[0];
        let filereader = new FileReader();
        filereader.onload = evt => {
          let dateiGeladen = JSON.parse(evt.target.result);
          datastoremanager.ueberschreibeDatastore(dateiGeladen);
        }
        filereader.readAsText(datei);
      },
      beiClickLadeDatastore() {
        let iptFileDatastore = document.querySelector('#ipt-file-datastore');
        iptFileDatastore.click();
      },
      // Style
      speichereStyle() {
        // siehe https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
        let hrefString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(style));
        let anchorNode = document.createElement('a');
        anchorNode.setAttribute('href', hrefString);
        anchorNode.setAttribute('download', 'speicherstand_style_finanzplaner.json');
        anchorNode.style.display = 'none';
        document.body.appendChild(anchorNode);
        anchorNode.click();
        anchorNode.remove();
        this.$emit('submit');
      },
      ladeStyle(evt) {
        let datei = evt.target.files[0];
        let filereader = new FileReader();
        filereader.onload = evt => {
          let dateiGeladen = JSON.parse(evt.target.result);
          Object.assign(this.style,dateiGeladen);
        }
        filereader.readAsText(datei);
      },
      beiClickLadeStyle() {
        let iptFileStyle = document.querySelector('#ipt-file-style');
        iptFileStyle.click();
      },
    }
  });
</script>
