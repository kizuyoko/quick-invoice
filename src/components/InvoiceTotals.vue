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
          <dd>$50.00</dd>
        </div>
        <div class="flex justify-between">
          <dt class="text-gray-600">Tax (10%):</dt>
          <dd>$5.00</dd>
        </div>
        <div class="flex justify-between pt-2 font-bold text-gray-800 border-t border-slate-500">
          <dt>Total:</dt>
          <dd>$55.00</dd>
        </div>
      </dl>
    </div>
  </section>
</template>