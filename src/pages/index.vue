<script setup lang="ts">
  import Button from '~/ui/Button.vue';
  import { useHead } from '@vueuse/head';

  useHead({
    title: 'QuickInvoice - Create Professional Invoices',
    meta: [
      {
        name: 'description',
        content: 'QuickInvoice helps freelancers and small businesses create clean, professional invoices in seconds.',
      },
    ],
  });
</script>

<template>
  <p class="text-center">
    QuickInvoice helps freelancers and small businesses create clean, professional invoices in seconds.
  </p>
  <p class="text-center">Just select your client, add items, and hit generate — it's that simple.</p>
  <Button to="/create">New Invoice</Button>
</template>