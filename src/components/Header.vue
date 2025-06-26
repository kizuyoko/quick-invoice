<script setup lang="ts">
import Logo from '~/ui/Logo.vue';
import NavItem from '~/ui/NavItem.vue';
</script>
<template>
  <header>
    <section class="innerContainer">
      <Logo />
      <nav class="flex space-x-4">
        <NavItem href="/create">Create</NavItem>
        <NavItem href="/about">About</NavItem>
      </nav>
    </section>
  </header>
</template>
