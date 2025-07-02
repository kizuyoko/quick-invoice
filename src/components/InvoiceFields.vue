<script setup lang="ts">
import { ref } from 'vue';
import type { Client } from '~/types/Client';
import { clients } from '~/data/clients';

const clientList = ref<Client[]>(clients);

const selectedClientId = ref<string | null>(null);
const selectedClient = computed(() => {
  return clientList.value.find(client => client.id === selectedClientId.value) || null;
});
const selectedBillToId = ref<string | null>(null);
const selectedBillTo = computed(() => {
  return clientList.value.find(client => client.id === selectedBillToId.value) || null;
});

</script>

<template>
  <section class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
      <div class="form-group">
        <label for="clientName">Client Name</label>
        <select id="clientName" v-model="selectedClientId">
          <option disabled value="">Select a client</option>
          <option 
            v-for="client in clientList" 
            :key="client.id" 
            :value="client.id"
          >
            {{ client.name }}
          </option>
        </select>
        <div class="arrow" aria-hidden="true">▼</div>
        <transition name="fade-slide" mode="out-in">
          <div v-if="selectedClient" :key="selectedClient.id" class="py-2 text-sm text-gray-600">
            <p><strong>Address:</strong> {{ selectedClient.address }}</p>
            <p><strong>Phone:</strong> {{ selectedClient.phone }}</p>
            <p><strong>Email:</strong> {{ selectedClient.email }}</p>
          </div>
        </transition>
      </div>
      <div class="form-group">
        <label for="billTo">Bill to</label>
        <select id="billTo" v-model="selectedBillToId">
          <option disabled value="">Select a client</option>
          <option 
            v-for="client in clientList" 
            :key="client.id" 
            :value="client.id"
          >
            {{ client.name }}
          </option>
        </select>
        <div class="arrow" aria-hidden="true">▼</div>
        <transition name="fade-slide" mode="out-in">
          <div v-if="selectedBillTo" :key="selectedBillTo.id" class="p-2 text-sm text-gray-600">
            <p><strong>Address:</strong> {{ selectedBillTo.address }}</p>
            <p><strong>Phone:</strong> {{ selectedBillTo.phone }}</p>
            <p><strong>Email:</strong> {{ selectedBillTo.email }}</p>
          </div>
        </transition>
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