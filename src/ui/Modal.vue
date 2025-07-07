<script lang="ts" setup>
import Button from './Button.vue';
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>

<template>
  <teleport to="body">
    <div 
      v-if="modelValue" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="emit('update:modelValue', false)"
    >
      <div class="relative w-full max-w-3xl p-6 bg-white rounded shadow-lg max-h-[80vh] overflow-y-auto">
        <button 
          @click="emit('update:modelValue', false)" 
          class="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
          aria-label="Close modal"
        >
          ✕
        </button>
        <slot />
      </div>
    </div>
  </teleport>
</template>


