<script setup lang="ts">
import Logo from '~/ui/Logo.vue';
import NavItem from '~/ui/NavItem.vue';
</script>
<template>
  <header>
    <section class="flex flex-col items-center justify-between gap-4 innerContainer sm:flex-row">
      <Logo />
      <nav class="flex space-x-4">
        <NavItem href="/create">Create</NavItem>
        <NavItem href="/about">About</NavItem>
      </nav>
    </section>
  </header>
</template>
