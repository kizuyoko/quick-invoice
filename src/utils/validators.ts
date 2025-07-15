import { ref, watch } from 'vue';
import type { Ref } from 'vue';

export const createTouchedValidator = <T>(
  value: Ref<T>,
  validateFn: (value: T) => string | null
): { error: Ref<string | null>; touched: Ref<boolean>; validate: () => void } => {
  const error = ref<string | null>(null);
  const touched = ref(false);

  const validate = () => {
    touched.value = true;
    error.value = validateFn(value.value);
  };

  watch(value, () => {
    if (touched.value) {
      error.value = validateFn(value.value);
    }
  });

  return { error, touched, validate };
};

export const invoiceIdPattern = /^[a-zA-Z0-9-]+$/;

export const isValidInvoiceId = (id: string): boolean => {
  return invoiceIdPattern.test(id);
};

export const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format

export type ISODateString = `${number}-${number}-${number}`;

export const isValidDate = (date: ISODateString): boolean => {
  const testDatePattern = datePattern.test(date);
  const testDateIsFuture = new Date() <= new Date(date);
  return testDatePattern && !testDateIsFuture;
};