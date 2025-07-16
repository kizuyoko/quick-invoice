<script setup lang="ts">
  import type { InvoiceItem } from '~/types/InvoiceItem';
  import { useInvoiceStore } from '@/stores/useInvoiceStore';

  const invoiceStore = useInvoiceStore();
  
  defineProps<{
    invoiceItems: InvoiceItem[]
    isPDF: boolean,
    removeItem?: (id: string) => void
  }>()

  const totalPrice = (item: InvoiceItem) => {
    return item.unitPrice * item.quantity;
  };

  const removeItem = (id: string) => {
    invoiceStore.removeItem(id);
  };

</script> 

<template>
  <tr v-for="(item, index) in invoiceItems" :key="item.id">
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
    <td v-if="!isPDF">
      <Button
        class="py-1 text-sm bg-gray-500 button text-regular hover:bg-gray-400"
        type="button"
        aria-label="Remove item"
        @click="removeItem && removeItem(item.id)"
      >Remove</Button>
    </td>
  </tr>  
</template>