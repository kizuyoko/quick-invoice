<script lang="ts" setup>
import { useInvoiceStore } from '@/stores/useInvoiceStore';
import { storeToRefs } from 'pinia';

const invoiceStore = useInvoiceStore();
const { subTotal, tax, total } = storeToRefs(invoiceStore);

</script>

<template>
  <section
    class="flex justify-end mt-6 invoice-totals"
    aria-labelledby="invoice-totals-heading"
    role="region"
  >
    <div class="w-full max-w-xs space-y-2 text-right sm:text-lg">
      <h3 id="invoice-totals-heading" class="sr-only">Invoice Totals</h3>
      <dl>
        <div class="flex justify-between">
          <dt class="text-gray-600">Sub Total:</dt>
          <dd>${{ subTotal.toFixed(2) }}</dd>
        </div>
        <div class="flex justify-between">
          <dt class="text-gray-600">Tax (10%):</dt>
          <dd>${{ tax.toFixed(2) }}</dd>
        </div>
        <div class="flex justify-between pt-2 text-xl font-bold text-gray-800 border-t totalAll border-slate-500">
          <dt>Total:</dt>
          <dd>${{ total.toFixed(2) }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>