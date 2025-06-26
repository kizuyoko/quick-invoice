<template>
  <component
    :is="isExternal ? 'a' : NuxtLink"
    :href="isExternal ? href : undefined"
    :to="!isExternal ? href : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NuxtLink } from '#components'

const props = defineProps<{
  href: string
  variant?: 'default' | 'footer'
}>()

const isExternal = computed(() => /^https?:\/\//.test(props.href))
</script>
