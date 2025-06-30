<template>
  <form>
      <label for="clientName">Client Name</label>
      <input
        id="clientName"
        type="text"
   
        placeholder="Enter client name"
        class="input"
      />

      <label for="invoiceDate">Invoice Date</label>
      <input
        id="invoiceDate"
        type="date"

        class="input"
      />

      <label for="items">Items</label>
      <textarea
        id="items"
      
        placeholder="Enter items (one per line)"
        class="input"
      ></textarea>

      <button type="submit" class="button">Print Invoice</button>
  </form>
</template>