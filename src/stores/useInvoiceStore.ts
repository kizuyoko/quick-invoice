import { defineStore } from 'pinia';
import type { InvoiceItem } from '@/types/InvoiceItem';
import type { Client } from '@/types/Client';
import { invoiceIdPattern, datePattern }  from '@/utils/validators';

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    items: [] as InvoiceItem[],
    taxRate: 20 / 100, // 20% tax rate
    id: '' as string,
    client: {
      id: '',
      name: '',
    } as Client,
    billTo: {
      id: '',
      name: '',
    } as Client,
    date: new Date().toISOString().split('T')[0], // Default to today's date
  }),

  getters: {
    subTotal: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    },
    tax(): number {
      return this.subTotal * this.taxRate;
    },
    total(): number {
      return this.subTotal + this.tax;
    },
    isFormValid(state): boolean {
      return (
        state.client.id !== '' &&
        state.billTo.id !== '' &&
        state.id !== '' &&
        invoiceIdPattern.test(state.id) &&
        state.date !== '' &&
        datePattern.test(state.date) &&
        state.items.length > 0 &&
        state.items.every(item => item.name !== '' && item.quantity > 0 && item.unitPrice > 0)
      );
    }
  },

  actions: {
    addItem(item: InvoiceItem) {
      this.items.push(item);
    },
    removeItem(id: string) {
      this.items = this.items.filter(item => item.id !== id);
    },
  },
});