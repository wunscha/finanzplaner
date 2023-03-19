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
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import EssentialLink from 'components/EssentialLink.vue'

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
      title: 'Analysen Zeitpunkt',
      caption: 'Analyse Kontostände nach Zeitpunkt',
      link: 'analysen-zeitpunkt',
    },
  ]

  export default defineComponent({
    name: 'MainLayout',

    components: {
      EssentialLink
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
