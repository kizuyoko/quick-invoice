<script setup lang="ts">
import { useInvoiceStore } from '@/stores/useInvoiceStore';
import { storeToRefs } from 'pinia';
import InvoiceTableHead from './InvoiceTableHead.vue';
import InvoiceTableRow from './InvoiceTableRow.vue';
import InvoiceTableNewRow from './InvoiceTableNewRow.vue';

const invoiceStore = useInvoiceStore();
const { items } = storeToRefs(invoiceStore);

</script>
<template>
  <section class="overflow-x-auto invoice-table" aria-labelledby="invoice-items-heading" role="region">
    <h3 id="invoice-items-heading" class="sr-only">Invoice Items</h3>
    <table class="min-w-full">
      <InvoiceTableHead :showAction="true" />
      <tbody>
        <InvoiceTableRow 
          :invoiceItems="items"
          :isPDF="false"
        />
        <InvoiceTableNewRow />
      </tbody>
    </table>
  </section>
</template>