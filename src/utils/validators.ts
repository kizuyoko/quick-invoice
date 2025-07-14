export const invoiceIdPattern = /^[a-zA-Z0-9-]+$/;

export const isValidInvoiceId = (id: string): boolean => {
  return invoiceIdPattern.test(id);
};
