<template>
  <div class="min-h-screen bg-base-200 text-base-content font-body-md select-none flex">

    <!-- SIDEBAR -->
    <SidebarCandidat class="shrink-0" v-slot="{userName}">
      <slot :userName="userName"/>
    </SidebarCandidat>

    
  </div>
</template>

<script setup>

import Dashboard from '../pages/candidat/Dashboard.vue';
import SidebarCandidat from './SidebarCandidat.vue';

</script>

<style scoped>
summary::-webkit-details-marker,
summary::marker {
  display: none;
}
</style>