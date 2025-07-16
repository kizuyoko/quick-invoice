<script setup lang="ts">
  import type { InvoiceItem } from '~/types/InvoiceItem';
  import { useInvoiceStore } from '@/stores/useInvoiceStore';
  import { createTouchedValidator } from '@/utils/validators';

  const invoiceStore = useInvoiceStore();
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

</script>

<template>
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

</template>