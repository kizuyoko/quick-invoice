import type { Client } from './Client';
import type { InvoiceItem } from './InvoiceItem';

export interface Invoice {
  id: string;
  client: Client;
  items: InvoiceItem[];
  total: number;
}