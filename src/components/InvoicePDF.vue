<script setup lang="ts">
import { useInvoiceStore } from '@/stores/useInvoiceStore';
import { storeToRefs } from 'pinia';

const invoiceStore = useInvoiceStore();
const { client, billTo, items } = storeToRefs(invoiceStore);

let html2pdf: any;

onMounted(async() => {
  if (typeof window !== 'undefined') {
    const module = await import('html2pdf.js');
    html2pdf = module.default;
  }
});

const printInvoice = () => {
  const invoiceElement = document.getElementById('invoice');
  if (invoiceElement) {
    const options = {
      margin: 1,
      filename: `invoice-${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf()
      .from(invoiceElement)
      .set(options)
      .save();
  } else {
    console.error('Invoice element not found');
  }
  defineExpose({
    printInvoice
  });
};
</script>

<template>
  <div id="invoice" class="p-6 bg-white border border-slate-300">
    <h1 class="mb-4 text-2xl font-bold">Invoice</h1>
    <div class="mb-4">
      <h2 class="text-lg font-semibold">Client Information</h2>
      <p><strong>Name:</strong> {{ client.name }}</p>
      <p><strong>Address:</strong> {{ client.address }}</p>
      <p><strong>Phone:</strong> {{ client.phone }}</p>
      <p><strong>Email:</strong> {{ client.email }}</p>
    </div>
    <div class="mb-4">
      <h2 class="text-lg font-semibold">Bill To</h2>
      <p><strong>Name:</strong> {{ billTo.name }}</p>
      <p><strong>Address:</strong> {{ billTo.address }}</p>
      <p><strong>Phone:</strong> {{ billTo.phone }}</p>
      <p><strong>Email:</strong> {{ billTo.email }}</p>
    </div>
    <div class="mb-4">
      <h2 class="text-lg font-semibold">Items</h2>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }} - Qty: {{ item.quantity }}, Price: ${{ item.unitPrice }}
        </li>
      </ul>
    </div>
    <div class="mb-4">
      <h2 class="text-lg font-semibold">Total</h2>
      <p>${{ items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0).toFixed(2) }}</p> 
    </div>
    <div class="flex justify-end">
      <button 
        @click="printInvoice" 
        class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        aria-label="Print Invoice"
      >
        Print Invoice
      </button>
    </div>
  </div>  
</template>