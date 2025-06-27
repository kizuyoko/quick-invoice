<template>
  <component
    :is="isExternal ? 'a' : NuxtLink"
    :href="isExternal ? href : undefined"
    :to="!isExternal ? href : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :class="[{ 'underline': isActive }, variant]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NuxtLink } from '#components'
import { useRoute } from 'vue-router'

const props = defineProps<{
  href: string
  variant?: 'default' | 'footer'
}>()

const route = useRoute()

const isExternal = computed(() => /^https?:\/\//.test(props.href))
const isActive = computed(() => {
  if (isExternal.value) return false
  // Remove trailing slash for comparison
  const current = route.path.replace(/\/$/, '')
  const target = props.href.replace(/\/$/, '')
  return current === target
})
</script>


