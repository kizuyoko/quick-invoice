import type { Client } from './Client';
import type { InvoiceItem } from './InvoiceItem';

export interface Invoice {
  id: string;
  client: Client;
  items: InvoiceItem[];
  total: number;
  subTotal: number;
  taxRate: number; // e.g., 0.20 for 20%
  tax: number; // Calculated as subTotal * taxRate
}