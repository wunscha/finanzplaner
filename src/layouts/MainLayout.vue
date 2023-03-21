<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>

        <q-space />

        <q-btn label="Einstellungen" @click="dialoge.menueEinstellungen.zeige = true" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Navigation
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <q-dialog v-model="dialoge.menueEinstellungen.zeige">
    <DialogContentMenueEinstellungen @submit="dialoge.menueEinstellungen.zeige = false" />
  </q-dialog>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import EssentialLink from 'components/EssentialLink.vue'
  import DialogContentMenueEinstellungen from 'src/components/einstellungen/DialogContentMenueEinstellungen.vue';

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
      DialogContentMenueEinstellungen,
    },

    data() {
      return {
        dialoge: {
          menueEinstellungen: {zeige: false}
        }
      }
    },

    setup () {
      const leftDrawerOpen = ref(false)

      return {
        essentialLinks: linksList,
        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        }
      }
    }
  });
</script>
