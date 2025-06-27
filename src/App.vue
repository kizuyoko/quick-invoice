<script setup lang="ts">  
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
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