<script setup lang="ts">
import { ref } from 'vue';
import Logo from '~/ui/Logo.vue';
import NavItem from '~/ui/NavItem.vue';
import HamburgerButton from '~/ui/HamburgerButton.vue';

const menuOpen = ref(false);
</script>
<template>
  <header>
    <section class="flex flex-col items-center justify-between gap-6 innerContainer sm:flex-row">
      <div class="flex justify-between w-full">
        <Logo />
        <HamburgerButton :open="menuOpen" @toggle="menuOpen = !menuOpen" />
      </div>
      <nav
        class="flex-row gap-6"
        :class="[menuOpen ? 'flex' : 'hidden', 'sm:flex']"
      >
        <NavItem href="/create">Create</NavItem>
        <NavItem href="/about">About</NavItem>
      </nav>
    </section>
  </header>
</template>
