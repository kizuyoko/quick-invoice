<script setup lang="ts">
import Button from '~/ui/Button.vue';
import InvoiceFields from '~/components/InvoiceFields.vue';
import InvoiceTable from '~/components/InvoiceTable.vue';
import InvoiceTotals from '~/components/InvoiceTotals.vue';
import { useInvoiceStore } from '@/stores/useInvoiceStore';
const invoiceStore = useInvoiceStore();

const submitInvoice = () => {
  const testData = {
    client: invoiceStore.client,
    billTo: invoiceStore.billTo,
    items: invoiceStore.items,
  };

  const testText = `
    Client: ${testData.client.name}
    Bill To: ${testData.billTo.name}
    Items: ${testData.items.map(item => `${item.name} - Qty: ${item.quantity}, Price: $${item.unitPrice}`).join('\n')}
  `;
  alert(testText);
};
</script>

<template>
  <form 
    @submit.prevent="submitInvoice"
    class="p-6 mt-4 border border-slate-300 flex flex-col min-h-[600px]">
    <InvoiceFields />
    <InvoiceTable />
    <InvoiceTotals />
    <div class="flex-1"></div>
    <div class="flex justify-end mt-6">
      <Button 
        type="submit" 
        class="bg-blue-700 hover:bg-blue-800"
        aria-label="Print Invoice"
      >
        Print Invoice
      </Button>
    </div>
  </form>
</template>