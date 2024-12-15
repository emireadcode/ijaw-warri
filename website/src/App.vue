<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import Footer from './components/Footer.vue'
import SiteNavigation from './components/SiteNavigation.vue'
import { useUpdateScreenWidth } from './components/composables/UpdateScreenWidth.js';

const { screenWidth } = useUpdateScreenWidth();
</script>

<template>
  <div class="justify-content-center align-items-center flex-box flex-direction-column m-0 p-0" style="max-width:1600px !important;">
    <SiteHeader />
    <section class="w-100 m-0 p-0">
      <template v-if="(screenWidth >= 1200)">
        <SiteNavigation />
      </template>
      <div>
        <RouterView />
      </div>
    </section>
    <Footer />
  </div>
</template>

