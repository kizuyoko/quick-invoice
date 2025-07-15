<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Client } from '~/types/Client';
import { clients } from '~/data/clients';
import { useInvoiceStore } from '@/stores/useInvoiceStore';
import { createTouchedValidator, isValidInvoiceId, isValidDate } from '@/utils/validators';
import type { ISODateString } from '@/utils/validators';

const invoiceStore = useInvoiceStore();

const clientList = ref<Client[]>(clients);

const clientOptions = computed(() => {
  return clientList.value.filter(client => client.id !== invoiceStore.billTo.id);
});

const selectedClientId = ref<string | null>('');
const selectedClient = computed(() => {
  return clientOptions.value.find(client => client.id === selectedClientId.value) || null;
});

const {
  error: selectedClientError,
  touched: clientTouched,
  validate: validateClientSelection,
} = createTouchedValidator(selectedClientId, (val) =>
  !val ? 'Please select a client.' : null
);

watch(selectedClientId, (newId) => {
  clientTouched.value = true;
  const foundClient = clientList.value.find(client => client.id === newId);
  if (foundClient) {
    invoiceStore.client = foundClient;
    selectedClientError.value = null;
  } else if (clientTouched.value) {
    selectedClientError.value = 'Please select a client.';
    invoiceStore.client.id = '';
  }
});

const billToOptions = computed(() => {
  return clientList.value.filter(client => client.id !== invoiceStore.client.id);
});

const selectedBillToId = ref<string | null>('');
const selectedBillTo = computed(() => {
  return billToOptions.value.find(client => client.id === selectedBillToId.value) || null;
});

const {
  error: selectedBillToError,
  touched: billToTouched,
  validate: validateBillToSelection,
} = createTouchedValidator(selectedBillToId, (val) =>
  !val ? 'Please select a billing client.' : null
);

watch(selectedBillToId, (newId) => {
  billToTouched.value = true;
  const foundBillTo = clientList.value.find(client => client.id === newId);
  if (foundBillTo) {
    invoiceStore.billTo = foundBillTo;
    selectedBillToError.value = null;
  } else if (billToTouched.value) {
    selectedBillToError.value = 'Please select a billing client.';
    invoiceStore.billTo.id = '';
  }
});

const invoiceId = computed(() => invoiceStore.id);
const {
  error: invoiceIdError,
  touched: invoiceIdTouched,
  validate: validateInvoiceId,
} = createTouchedValidator(invoiceId, (val) =>
  !val ? 'Please type invoice ID' :
  !isValidInvoiceId(val) ? 'Invalid invoice ID format.' : null
);


watch(() => invoiceStore.id, (newId) => {
  invoiceIdTouched.value = true;
  if (!isValidInvoiceId(newId)) {
    invoiceIdError.value = 'Invalid invoice ID format.';
  } else {
    invoiceIdError.value = null;
  }
});

const invoiceDateError = ref<string | null>(null);
watch(() => invoiceStore.date, (newDate) => {
  if (!isValidDate(newDate as ISODateString)) {
    invoiceDateError.value = 'Invalid date format. Use YYYY-MM-DD.';
  } else {
    invoiceDateError.value = null;
  }
});

</script>

<template>
  <section class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
      <div class="form-group">
        <label 
          for="clientName" 
          :class="{ 'error-text': selectedClientError }"
        >Client Name</label>
        <select 
          id="clientName" 
          v-model="selectedClientId" 
          required
          :class="{ 'error-border': selectedClientError }"
          @blur="validateClientSelection"
        >
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
        <p v-if="selectedClientError" class="error-text">
          {{ selectedClientError }}
        </p>
        <transition name="fade-slide" mode="out-in">
          <div v-if="selectedClient" :key="selectedClient.id" class="py-2 text-sm text-gray-600">
            <p><strong>Address:</strong> {{ selectedClient.address }}</p>
            <p><strong>Phone:</strong> {{ selectedClient.phone }}</p>
            <p><strong>Email:</strong> {{ selectedClient.email }}</p>
          </div>
        </transition>
      </div>
      <div class="form-group">
        <label 
          for="billTo"
          :class="{ 'error-text': selectedBillToError}"
        >Bill to</label>
        <select 
          id="billTo" 
          v-model="selectedBillToId" 
          required
          :class="{ 'error-border': selectedBillToError }"
          @blur="validateBillToSelection"
        >
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
        <p v-if="selectedBillToError" class="error-text">
          {{ selectedBillToError }}
        </p>
        <transition name="fade-slide" mode="out-in">
          <div v-if="selectedBillTo" :key="selectedBillTo.id" class="p-2 text-sm text-gray-600">
            <p><strong>Address:</strong> {{ selectedBillTo.address }}</p>
            <p><strong>Phone:</strong> {{ selectedBillTo.phone }}</p>
            <p><strong>Email:</strong> {{ selectedBillTo.email }}</p>
          </div>
        </transition>
      </div>
      <div class="form-group">
        <label 
          for="invoiceNumber" 
          :class="{ 'error-text': invoiceIdError}"
        >Invoice Number</label>
        <input
          id="invoiceNumber"
          type="text"
          placeholder="Enter invoice number"
          class="input"
          autocomplete="off"
          v-model="invoiceStore.id"
          required
          :class="{ 'error-border': invoiceIdError }"
          @input="invoiceStore.id = invoiceStore.id.replace(/[^a-zA-Z0-9-]/g, '')"
          title="Only alphanumeric characters and hyphens are allowed"
          @blur="validateInvoiceId"
        />
        <p v-if="invoiceIdError" class="error-text">
          {{ invoiceIdError }}
        </p>
      </div>
      <div class="form-group">
        <label 
          for="invoiceDate" 
          :class="{'error-text': invoiceDateError}"
        >Invoice Date</label>
        <input
          id="invoiceDate"
          type="date"
          class="input"
          v-model="invoiceStore.date"
          required
          :class="{ 'error-border': invoiceDateError }"
          @input="invoiceStore.date = invoiceStore.date.replace(/[^0-9-]/g, '')"
          title="Date must be in MM-DD-YYYY format and not in the future."
          :max="new Date().toISOString().split('T')[0]"
        />
        <p v-if="invoiceDateError" class="error-text">
          {{ invoiceDateError }}
        </p>
      </div>
    </section>
</template>