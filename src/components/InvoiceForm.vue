<script setup lang="ts">
import Button from '~/ui/Button.vue';
import InvoiceFields from '~/components/InvoiceFields.vue';
import InvoiceTable from '~/components/InvoiceTable.vue';
import InvoiceTotals from '~/components/InvoiceTotals.vue';
import InvoicePDF from '~/components/InvoicePDF.vue';
import Modal from '~/ui/Modal.vue';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { useInvoiceStore } from '@/stores/useInvoiceStore';

const invoiceStore = useInvoiceStore();

const isModalOpen = ref(false);

const previewInvoice = () => {
  isModalOpen.value = true;
  //pdfRef.value?.printInvoice();
};

const closeModal = () => {
  isModalOpen.value = false;
};

const pdfRef = ref<ComponentPublicInstance<{ printInvoice: () => void }> | null>(null);



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
        :disabled="!invoiceStore.isFormValid"
      >
        Preview Invoice
      </Button>
    </div>
    <client-only>
      <Modal 
        v-model="isModalOpen"
        @close="closeModal"
      >
        <InvoicePDF ref="pdfRef" /> 
      </Modal>
    </client-only>
  </form>
</template>