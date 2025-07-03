<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
  defineProps({
    error: {
      type: Object,
      required: true,
    },
  })
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-col justify-center flex-1 innerContainer">
      <h2>{{ error.statusCode }}</h2>
      <p>
        {{ error.message || 'Page not found.' }}
      </p>
      <NuxtLink
        to="/create"
        class="button"
      >
        Go Back
      </NuxtLink>
    </main>
    <Footer />
  </div>
</template>


