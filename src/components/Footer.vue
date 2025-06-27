<script setup lang="ts">
import NavItem from '~/ui/NavItem.vue';
</script>
<template>
  <footer>
    <section class="innerContainer">
      <nav class="flex items-center justify-center w-full gap-8">
        <NavItem 
          href="https://github.com/kizuyoko/quick-invoice" 
          variant="footer"
        >
          GitHub
        </NavItem>
        <NavItem 
          href="https://www.linkedin.com/in/kizuyoko" 
          variant="footer"
        >
          LinkedIn
        </NavItem>
      </nav>
    </section>
  </footer>
</template>
