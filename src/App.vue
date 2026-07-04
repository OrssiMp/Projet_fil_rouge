<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import PublicLayout from "./layouts/PublicLayout.vue";
import DashboardLayout from "./layouts/DashboardLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";

const route = useRoute();

const layouts = {
  AppLayout: PublicLayout,
  DashboardLayout,
  AuthLayout,
};

const currentLayout = computed(() => layouts[route.meta.layout] || PublicLayout);

const layoutProps = computed(() => ({
  role: route.meta.role,
}));
</script>

<template>
  <component :is="currentLayout" v-bind="layoutProps">
    <router-view />
  </component>
</template>