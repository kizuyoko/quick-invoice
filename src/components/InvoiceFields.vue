<template>
  <section class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
      <div class="form-group">
        <label for="clientName">Client Name</label>
        <select id="clientName">
          <option value="client1">Client 1</option>
          <option value="client2">Client 2</option>
          <option value="client3">Client 3</option>
        </select>
        <div class="arrow" aria-hidden="true">▼</div>
      </div>
      <div class="form-group">
        <label for="billTo">Bill to</label>
        <select id="billTo">
          <option value="client1">Client 1</option>
          <option value="client2">Client 2</option>
          <option value="client3">Client 3</option>
        </select>
        <div class="arrow" aria-hidden="true">▼</div>
      </div>
      <div class="form-group">
        <label for="invoiceNumber">Invoice Number</label>
        <input
          id="invoiceNumber"
          type="text"
          placeholder="Enter invoice number"
          class="input"
          autocomplete="off"
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
</template>