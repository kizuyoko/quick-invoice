<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Client } from '~/types/Client';
import { clients } from '~/data/clients';
import { useInvoiceStore } from '@/stores/useInvoiceStore';

const invoiceStore = useInvoiceStore();

const clientList = ref<Client[]>(clients);

const clientOptions = computed(() => {
  return clientList.value.filter(client => client.id !== invoiceStore.billTo.id);
});

const billToOptions = computed(() => {
  return clientList.value.filter(client => client.id !== invoiceStore.client.id);
});

const selectedClientId = ref<string | null>('');
const selectedClient = computed(() => {
  return clientOptions.value.find(client => client.id === selectedClientId.value) || null;
});
const selectedBillToId = ref<string | null>('');
const selectedBillTo = computed(() => {
  return billToOptions.value.find(client => client.id === selectedBillToId.value) || null;
});

watch(selectedClientId, (newId) => {
  const foundClient = clientList.value.find(client => client.id === newId);
  if (foundClient) {
    invoiceStore.client = foundClient;
  } else {
    invoiceStore.client.id = '';
  }
});
watch(selectedBillToId, (newId) => {
  const foundBillTo = clientList.value.find(client => client.id === newId);
  if (foundBillTo) {
    invoiceStore.billTo = foundBillTo;
  } else {
    invoiceStore.billTo.id = '';
  }
});

</script>

<template>
  <section class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
      <div class="form-group">
        <label for="clientName">Client Name</label>
        <select id="clientName" v-model="selectedClientId">
          <option disabled value="">-- Select a client --</option>
          <option 
            v-for="client in clientOptions" 
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
          <option disabled value="">-- Select a client --</option>
          <option 
            v-for="client in billToOptions" 
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
          v-model="invoiceStore.id" 
        />
      </div>
      <div class="form-group">
        <label for="invoiceDate">Invoice Date</label>
        <input
          id="invoiceDate"
          type="date"
          class="input"
          v-model="invoiceStore.date"
        />
      </div>
    </section>
</template>