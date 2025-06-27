<script setup lang="ts">  
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { useHead } from '@vueuse/head';
useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex flex-col items-center justify-center flex-1 innerContainer">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>