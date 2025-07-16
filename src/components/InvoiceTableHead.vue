<script setup lang="ts">
  defineProps<{
    showAction: boolean
  }>()
</script>

<template>
  <caption class="sr-only">Invoice Items</caption>
  <thead>
    <tr>
      <th scope="col" class="w-full text-left">Item&nbsp;Name</th>
      <th scope="col" class="text-center min-w-20">Qty</th>
      <th scope="col" class="text-center min-w-32">Unit</th>
      <th scope="col" class="w-1 text-center min-w-28">Total</th>
      <th v-if="showAction" scope="col" class="w-1 text-center">Action</th>
    </tr>
  </thead>
</template>