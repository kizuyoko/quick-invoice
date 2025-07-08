<script setup lang="ts">
import { defineEmits } from 'vue';
import { useInvoiceStore } from '@/stores/useInvoiceStore';
import { storeToRefs } from 'pinia';
import Button from '~/ui/Button.vue';

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
const emit = defineEmits(['close']);
</script>

<template>
  <section id="invoice">
    <h2 class="mb-4">Invoice</h2>
    <section class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
      <div class="form-group">
        <h3>Client Information</h3>
        <div class="py-1 text-sm text-gray-600">
          <p><strong>Name:</strong> {{ client.name }}</p>
          <p><strong>Address:</strong> {{ client.address }}</p>
          <p><strong>Phone:</strong> {{ client.phone }}</p>
          <p><strong>Email:</strong> {{ client.email }}</p>
        </div>
      </div>
      <div class="form-group">
        <h3>Bill To</h3>
        <div class="py-1 text-sm text-gray-600">
          <p><strong>Name:</strong> {{ billTo.name }}</p>
          <p><strong>Address:</strong> {{ billTo.address }}</p>
          <p><strong>Phone:</strong> {{ billTo.phone }}</p>
          <p><strong>Email:</strong> {{ billTo.email }}</p>
        </div>
      </div>
      <div class="form-group">
        <h3>Invoice Number</h3>
        <p>{{ invoiceStore.id }}</p>
      </div>
      <div class="form-group">
        <h3>Invoice Date</h3>
        <p>{{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' }) }}</p>
      </div>
    </section>
    <section class="overflow-x-auto invoice-table" aria-labelledby="invoice-items-heading" role="region">
      <h3 id="invoice-items-heading" class="sr-only">Invoice Items</h3>
      <table class="min-w-full">
        <caption class="sr-only">Invoice Items</caption>
        <thead>
          <tr>
            <th scope="col" class="w-full text-left">Item&nbsp;Name</th>
            <th scope="col" class="text-center min-w-20">Qty</th>
            <th scope="col" class="text-center min-w-32">Unit</th>
            <th scope="col" class="w-1 text-center min-w-28">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="item.id">
            <td class="sm:text-left">{{ item.name }}</td>
            <td class="text-center">{{ item.quantity }}</td>
            <td class="text-center">${{ item.unitPrice.toFixed(2) }}</td>
            <td class="text-center">${{ (item.quantity * item.unitPrice).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="flex flex-col items-end mt-6 invoice-totals" aria-labelledby="invoice-totals-heading" role="region">
      <h3 id="invoice-totals-heading" class="sr-only">Invoice Totals</h3>
      <div class="w-full max-w-xs space-y-2 text-right sm:text-lg">
        <dl>
          <div class="flex justify-between">
            <dt class="text-gray-600">Sub Total:</dt>
            <dd>${{ items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0).toFixed(2) }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-gray-600">Tax (10%):</dt>
            <dd>${{ (items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0) * 0.1).toFixed(2) }}</dd>
          </div>
          <div class="flex justify-between pt-2 mt-4 text-2xl font-bold text-gray-800 border-t totalAll border-slate-500">
            <dt>Total:</dt>
            <dd>${{ (items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0) * 1.1).toFixed(2) }}</dd>
          </div>
        </dl>
      </div>
    </section>
    <section class="mt-6">
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          @click="$emit('close')"
        >
          Close
        </Button>
        <Button
          type="button" 
          @click="printInvoice" 
          class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          aria-label="Print Invoice"
        >
          Print Invoice
        </Button>
      </div>
    </section>
  </section>  
</template>