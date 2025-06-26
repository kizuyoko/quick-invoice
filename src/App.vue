<script setup lang="ts">  
import Header from './components/Header.vue';import Footer from './components/Footer.vue';  
import Button from './ui/Button.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex flex-col items-center justify-center flex-1 innerContainer">
      <p class="text-center">
        QuickInvoice helps freelancers and small businesses create clean, professional invoices in seconds.
      </p>
      <p class="text-center">Just select your client, add items, and hit generate — it's that simple.</p>
      <Button>New Invoice</Button>  
    </main>
    <Footer />
  </div>
</template>