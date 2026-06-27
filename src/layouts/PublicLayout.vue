<template>
  <div class="min-h-screen flex flex-col bg-white">
    <Navbar/>
    <main class="">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import TheFooter from '../components/TheFooter.vue';

</script>