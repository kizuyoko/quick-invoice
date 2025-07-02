<template>
  <section class="overflow-x-auto invoice-table" aria-labelledby="invoice-items-heading" role="region">
    <table class="min-w-full" aria-describedby="invoice-items-desc">
      <caption id="invoice-items-heading" class="sr-only">Invoice Items</caption>
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Qty</th>
          <th scope="col">Unit Price</th>
          <th scope="col">Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sm:text-left">
            <span class="font-semibold text-gray-600 sm:hidden">Item: </span>
            Item 1
          </td>
          <td>
            <span class="font-semibold text-gray-600 sm:hidden">Quantity: </span>
            1
          </td>
          <td>
            <span class="font-semibold text-gray-600 sm:hidden">Unit Price: </span>
            $10.00
          </td>
          <td>
            <span class="font-semibold text-gray-600 sm:hidden">Total Price: </span>
            $10.00
          </td>
        </tr>
        <tr>
          <td class="sm:text-left">
            <span class="font-semibold text-gray-600 sm:hidden">Item: </span>
            Item 2
          </td>
          <td>
            <span class="font-semibold text-gray-600 sm:hidden">Qty: </span>
            2
          </td>
          <td>
            <span class="font-semibold text-gray-600 sm:hidden">Unit Price: </span>
            $20.00
          </td>
          <td>
            <span class="font-semibold text-gray-600 sm:hidden">Total Price: </span>
            $40.00
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-end mt-4">
      <Button
        class="button"
        type="button"
        aria-label="Add a new invoice item"
        @click="$emit('addItem')"
      >
        Add Item
      </Button>
    </div>
  </section>
</template>