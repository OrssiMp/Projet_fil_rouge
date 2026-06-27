<template>
  <Sidebar>
    <div class="min-h-screen bg-base-100">
      <div class="flex-1  flex-col min-w-0 bg-[#F8FAFC]">
        <main class="flex-1  p-6 md:p-10 overflow-y-auto">
          <slot />
        </main>
      </div>
    </div>
  </Sidebar>
</template>


<script setup>
// import EnterpriseSidebar from '../components/entreprise/EnterpriseSidebar.vue';
import Sidebar from '../layouts/Sidebar.vue';
// import EnterpriseTopbar from '../components/entreprise/EnterpriseTopbar.vue';
</script>