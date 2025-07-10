<script setup lang="ts">
import Button from '~/ui/Button.vue'; 
import { ref, reactive } from 'vue';
import type { InvoiceItem } from '~/types/InvoiceItem';
import { useInvoiceStore } from '@/stores/useInvoiceStore';
import { storeToRefs } from 'pinia';

const invoiceStore = useInvoiceStore();
const { items } = storeToRefs(invoiceStore);

const newItem = ref<InvoiceItem>({
  id: '',
  name: '',
  quantity: 1,
  unitPrice: 1,
});

const totalPrice = (item: InvoiceItem) => {
  return item.unitPrice * item.quantity;
};

const addItem = () => {
  if (newItem.value.name && newItem.value.quantity > 0 && newItem.value.unitPrice >= 0) {
    const id = Math.random().toString(36).substring(2, 15); // Generate a random ID
    invoiceStore.addItem({ ...newItem.value, id });
    newItem.value.name = '';
    newItem.value.quantity = 1;
    newItem.value.unitPrice = 1;
  } else {
    alert('Please fill in all fields correctly.');
  } 
};

const removeItem = (id: string) => {
  const index = invoiceStore.items.findIndex(item => item.id === id);
  if (index !== -1) {
    invoiceStore.removeItem(id);
  }
};

</script>
<template>
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
          <th scope="col" class="w-1 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <td class="text-xl sm:text-left">
            <span class="font-semibold text-gray-600 sm:hidden">Item: </span>
            {{ item.name }}
          </td>
          <td>
            <span class="font-semibold text-gray-600 sm:hidden">Quantity: </span>
            {{ item.quantity }}
          </td>
          <td>
            <span class="font-semibold text-gray-600 sm:hidden">Unit Price: </span> 
            $&nbsp;{{ item.unitPrice }}
          </td>
          <td>
            <span class="font-semibold text-gray-600 sm:hidden">Total Price: </span> 
            $&nbsp;{{ totalPrice(item) }}
          </td>
          <td>
            <Button
              class="py-1 text-sm bg-gray-500 button text-regular hover:bg-gray-400"
              type="button"
              aria-label="Remove item"
              @click="removeItem(item.id)"
            >Remove</Button>
          </td>
        </tr>
        <tr>
          <td class="sm:text-left">
            <div class="flex items-center gap-1">
              <span class="font-semibold text-gray-600 sm:hidden">Item: </span>
              <input 
                v-model="newItem.name" 
                type="text" 
                class="w-full px-2 py-1 text-right border rounded sm:text-left" placeholder="Item Name" 
              />
            </div>
          </td>
          <td>
            <div class="flex items-center gap-1">
              <span class="font-semibold text-gray-600 sm:hidden">Quantity: </span>
              <input 
                v-model="newItem.quantity" 
                type="number" 
                class="w-full px-2 py-1 text-right border rounded" 
                placeholder="Quantity"            
              />
            </div>
          </td>
          <td>
            <div class="flex items-center gap-1">
              <span class="font-semibold text-gray-600 sm:hidden">Unit&nbsp;Price: </span>$&nbsp;<input      
                v-model="newItem.unitPrice" 
                type="number" 
                class="w-full px-2 py-1 text-right border rounded" placeholder="Unit Price" 
              />
            </div>
          </td>
          <td>
            <span class="font-semibold text-gray-600 sm:hidden">Total Price: </span>$&nbsp;{{ totalPrice(newItem) }}
          </td>
          <td>
            <Button
              class="py-1 text-sm button text-regular"
              type="button"
              aria-label="Add a new invoice item"
              @click="addItem"
            >Add</Button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>