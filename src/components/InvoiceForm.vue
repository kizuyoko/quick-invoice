<script setup lang="ts">
import Button from '~/ui/Button.vue';
import InvoiceFields from '~/components/InvoiceFields.vue';
import InvoiceTable from '~/components/InvoiceTable.vue';
import InvoiceTotals from '~/components/InvoiceTotals.vue';
import InvoicePDF from '~/components/InvoicePDF.vue';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';

const pdfRef = ref<ComponentPublicInstance<{ printInvoice: () => void }> | null>(null);

const previewInvoice = () => {
  pdfRef.value?.printInvoice();
};
</script>

<template>
  <form 
    @submit.prevent="previewInvoice"
    class="flex flex-col p-6 mt-4 bg-white border border-slate-300">
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
        Preview Invoice
      </Button>
    </div>

    <client-only>
      <InvoicePDF ref="pdfRef" />
    </client-only>
  </form>
</template>