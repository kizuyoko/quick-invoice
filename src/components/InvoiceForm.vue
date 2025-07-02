<script setup lang="ts">
import Button from '~/ui/Button.vue';
import InvoiceFields from '~/components/InvoiceFields.vue';
import InvoiceTable from '~/components/InvoiceTable.vue';
import InvoiceTotals from '~/components/InvoiceTotals.vue';
</script>

<template>
  <form class="p-6 mt-4 border border-slate-300 flex flex-col min-h-[600px]">
    <InvoiceFields />
    <InvoiceTable />
    <InvoiceTotals />
    <div class="flex-1"></div>
    <div class="flex justify-end mt-6">
      <Button 
        type="submit" 
        class="bg-blue-600"
        aria-label="Print Invoice"
      >
        Print Invoice
      </Button>
    </div>
  </form>
</template>