<script setup lang="ts">
import Button from '~/ui/Button.vue'; 
import { ref, computed } from 'vue';
import type { InvoiceItem } from '~/types/InvoiceItem';
import { useInvoiceStore } from '@/stores/useInvoiceStore';
import { storeToRefs } from 'pinia';
import { createTouchedValidator } from '@/utils/validators';

const invoiceStore = useInvoiceStore();
const { items } = storeToRefs(invoiceStore);

const newItem = ref<InvoiceItem>({
  id: '',
  name: '',
  quantity: 1,
  unitPrice: 1,
});

const {
  error: itemNameError,
  touched: itemNameTouched,
  validate: validateItemName,
} = createTouchedValidator(
  computed(() => newItem.value.name),
  (value) => value.trim() === '' ? 'Item name is required' : null
);

const {
  error: quantityError,
  touched: quantityTouched,
  validate: validateQuantity,
} = createTouchedValidator(
  computed(() => newItem.value.quantity),
  (value) => value <= 0 ? 'Quantity must be at least 1' : null
);

const {
  error: unitPriceError,
  touched: unitPriceTouched,
  validate: validateUnitPrice,
} = createTouchedValidator(
  computed(() => newItem.value.unitPrice),
  (value) => value < 0 ? 'Unit price must be 0 or more' : null
);


const totalPrice = (item: InvoiceItem) => {
  return item.unitPrice * item.quantity;
};

const isAddDisabled = computed (() => {
  return !newItem.value.name || newItem.value.quantity <= 0 || newItem.value.unitPrice < 0;
});

const addItem = () => {
  if (!isAddDisabled.value) {
    const id = Math.random().toString(36).substring(2, 15); // Generate a random ID
    invoiceStore.addItem({ ...newItem.value, id });
    newItem.value.name = '';
    newItem.value.quantity = 1;
    newItem.value.unitPrice = 1;

    itemNameTouched.value = false;
    quantityTouched.value = false;
    unitPriceTouched.value = false;
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
                id="item-name-input"
                v-model="newItem.name" 
                @blur="validateItemName"
                type="text" 
                class="w-full px-2 py-1 text-right border rounded sm:text-left" 
                :class="{ 'error-border': itemNameTouched && itemNameError }"
                placeholder="Item Name" 
                required
                aria-label="Item Name"
                :aria-invalid="itemNameTouched && !!itemNameError"
                :aria-describedby="itemNameError ? 'item-name-error' : undefined"
              />
            </div>
            <p
              v-if="itemNameTouched && itemNameError"
              id="item-name-error"
              class="error-text"
            >{{ itemNameError }}</p>
          </td>
          <td>
            <div class="flex items-center gap-1">
              <span class="font-semibold text-gray-600 sm:hidden">Quantity: </span>
              <input 
                v-model="newItem.quantity" 
                type="number" 
                class="w-full px-2 py-1 text-right border rounded" 
                placeholder="Quantity" 
                required
                aria-label="Quantity"
                min="1"
                :class="{ 'error-border': newItem.quantity <= 0 }"
                @blur="validateQuantity"
                :aria-invalid="quantityTouched && !!quantityError"
                :aria-describedby="quantityError ? 'quantity-error' : undefined"
              />
            </div>
            <p
              v-if="quantityTouched && quantityError"
              id="quantity-error"
              class="error-text"
            >{{ quantityError }}</p>
          </td>
          <td>
            <div class="flex items-center gap-1">
              <span class="font-semibold text-gray-600 sm:hidden">Unit&nbsp;Price: </span>$&nbsp;<input      
                v-model="newItem.unitPrice" 
                type="number" 
                class="w-full px-2 py-1 text-right border rounded" placeholder="Unit Price" 
                required
                aria-label="Unit Price"
                min="0"
                :class="{ 'error-border': newItem.unitPrice < 0 }"
                @blur="validateUnitPrice"
                :aria-invalid="unitPriceTouched && !!unitPriceError"
                :aria-describedby="unitPriceError ? 'unit-price-error' : undefined"
              />
            </div>
            <p
              v-if="unitPriceTouched && unitPriceError"
              id="unit-price-error"
              class="error-text"
            >{{ unitPriceError  }}</p>
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
              :disabled="isAddDisabled"
            >Add</Button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>