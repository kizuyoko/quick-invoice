<script setup lang="ts">
import Button from '~/ui/Button.vue';

</script>

<template>
  <form class="p-6 mt-4 border border-slate-300 flex flex-col min-h-[600px]">
    <section class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
      <div class="form-group">
        <label for="clientName">Client Name</label>
        <select id="clientName">
          <option value="client1">Client 1</option>
          <option value="client2">Client 2</option>
          <option value="client3">Client 3</option>
        </select>
      </div>
      <div class="form-group">
        <label for="billTo">Bill to</label>
        <select id="billTo">
          <option value="client1">Client 1</option>
          <option value="client2">Client 2</option>
          <option value="client3">Client 3</option>
        </select>
      </div>
      <div class="form-group">
        <label for="invoiceNumber">Invoice Number</label>
        <input
          id="invoiceNumber"
          type="text"
          placeholder="Enter invoice number"
          class="input"
        />
      </div>
      <div class="form-group">
        <label for="invoiceDate">Invoice Date</label>
        <input
          id="invoiceDate"
          type="date"

          class="input"
        />
      </div>
    </section>
    <section class="overflow-x-auto invoice-table">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">Item 1</td>
            <td>1</td>
            <td>$10.00</td>
            <td>$10.00</td>
          </tr>
          <tr>
            <td class="text-left">Item 2</td>
            <td>2</td>
            <td>$20.00</td>
            <td>$40.00</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end mt-4">
        <Button
          type="button"
          @click="$emit('addItem')"
        >
          Add Item
        </Button>
      </div>
    </section>
    <section class="flex justify-end mt-6 invoice-totals">
      <div class="w-full max-w-xs space-y-2 text-right sm:text-lg">
        <div class="flex justify-between">
          <span class="text-gray-600">Sub Total:</span>
          <span>$50.00</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Tax (10%):</span>
          <span>$5.00</span>
        </div>
        <div class="flex justify-between pt-2 font-bold text-gray-800 border-t">
          <span>Total:</span>
          <span>$55.00</span>
        </div>
      </div>
    </section>
    <div class="flex-1"></div>
    <div class="flex justify-end mt-6">
      <Button type="submit" class="bg-blue-600">Print Invoice</Button>
    </div>
  </form>
</template>