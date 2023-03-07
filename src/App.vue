<template>
  <router-view />
</template>

<script>
  import { defineComponent } from 'vue'
  import services from './infrastructure/services';

  export default defineComponent({
    name: 'App',
  })

  // STARTUP
  const DATUM_MAX = (new Date(Date.now())).setFullYear(2050);
  services.appInitialisierer.initalisiereApp();

</script>
