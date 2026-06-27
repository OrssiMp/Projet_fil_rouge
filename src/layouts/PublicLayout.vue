<template>
  <div class="min-h-screen flex flex-col bg-white">
    <NavBar/>
    <main class="">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>

<script setup>

import TheFooter from '../components/TheFooter.vue';

</script>