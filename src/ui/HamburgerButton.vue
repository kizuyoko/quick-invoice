<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const props = defineProps<{ open: boolean }>();
const emit = defineEmits(['toggle']);
</script>
<template>
  <button
    class="relative flex flex-col items-center justify-center w-8 h-8 sm:hidden focus:outline-none"
    @click="$emit('toggle')"
    aria-label="Toggle menu"
  >
    <span
      class="block w-6 h-0.5 bg-gray-800 mb-1 transition-transform duration-300"
      :class="props.open ? 'rotate-45 translate-y-1.5' : ''"
    ></span>
    <span
      class="block w-6 h-0.5 bg-gray-800 mb-1 transition-all duration-300"
      :class="props.open ? 'opacity-0' : ''"
    ></span>
    <span
      class="block w-6 h-0.5 bg-gray-800 transition-transform duration-300"
      :class="props.open ? '-rotate-45 -translate-y-1.5' : ''"
    ></span>
  </button>
</template>
