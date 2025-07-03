import { defineStore } from 'pinia';
import type { InvoiceItem } from '@/types/InvoiceItem';

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    items: [] as InvoiceItem[],
    taxRate: 20 / 100, // 20% tax rate
    client: {
      name: '',
      email: '',
      address: '',
    },
    id: '' as string,
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