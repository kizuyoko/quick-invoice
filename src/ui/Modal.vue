<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

const closeModal = () => {
  console.log('Modal.vue: closeModal called');
  emit('update:modelValue', false);
  emit('close');
};

</script>

<template>
  <teleport to="body">
    <div 
      v-if="modelValue" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click="closeModal"
    >
      <div class="relative w-full max-w-3xl p-6 bg-white rounded shadow-lg max-h-[80vh] overflow-y-auto m-4">
        <button 
          type="button"
          @keydown.esc="closeModal"
          @click="closeModal" 
          class="absolute text-gray-500 top-1 right-2 hover:text-gray-800"
          aria-label="Close modal"
        >
          ✕
        </button>
        <slot />
      </div>
    </div>
  </teleport>
</template>


