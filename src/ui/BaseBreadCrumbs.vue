<template>
  <div class="breadcrumbs text-xs font-semibold text-base-content/60 select-none" aria-label="Breadcrumb">
    <ul class="flex flex-wrap items-center gap-2">
      <li>
        <RouterLink to="/" class="hover:text-accent transition-colors gap-1.5 flex items-center">
          <BaseIcon name="dashboard" class="text-[11px]" />
          Accueil
        </RouterLink>
      </li>

      <li v-for="(crumb, index) in crumbs" :key="index" class="flex items-center gap-2">
        <span class="text-base-content/40">/</span>
        <RouterLink v-if="!crumb.isLast" :to="crumb.path" class="hover:text-accent transition-colors">
          {{ crumb.title }}
        </RouterLink>
        <span v-else class="text-base-content font-black">
          {{ crumb.title }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseIcon from '../ui/BaseIcon.vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const route = useRoute();

const crumbs = computed(() => {
  if (props.items.length) {
    return props.items.map((crumb, index) => ({
      title: crumb.title,
      path: crumb.path || '/',
      isLast: index === props.items.length - 1,
    }));
  }

  const matchedRoutes = route.matched.filter((r) => r.meta && r.meta.title);
  return matchedRoutes.map((routeRecord, index) => ({
    title: routeRecord.meta.title,
    path: routeRecord.meta.breadcrumbPath || routeRecord.path || '/',
    isLast: index === matchedRoutes.length - 1,
  }));
});

</script>