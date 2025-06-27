<script setup lang="ts">
import { defineProps } from 'vue'
import { NuxtLink } from '#components'

const props = defineProps<{
  to?: string
  type?: 'button' | 'submit' | 'reset'
}>()
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : type || 'button'"
    class="button"
  >
    <slot />
  </component>
</template>
