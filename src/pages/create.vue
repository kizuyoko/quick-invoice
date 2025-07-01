<script setup lang="ts">
import { useHead } from '@vueuse/head';
import InvoiceForm from '~/components/InvoiceForm.vue';
useHead({
  title: 'Create Invoice - QuickInvoice',
  meta: [
    {
      name: 'description',
      content: 'Create professional invoices quickly and easily with QuickInvoice.',
    },
  ],
});

</script>

<template>
  <main class="flex-col flex-1 innerContainer">
    <section class="w-full mt-4">
      <h2>Create Invoice</h2>
      <InvoiceForm />
    </section>
  </main>
</template>