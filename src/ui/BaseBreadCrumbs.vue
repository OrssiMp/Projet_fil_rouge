<template>
  <div class="breadcrumbs text-xs font-semibold text-base-content/60 select-none">
    <ul>
      <li>
        <RouterLink to="/" class="hover:text-accent transition-colors gap-1.5 flex items-center">
          <BaseIcon name="dashboard" class="text-[11px]" />
          Accueil
        </RouterLink>
      </li>

      <li v-for="(crumb, index) in crumbs" :key="index">
        <span v-if="index === crumbs.length - 1" class="text-base-content font-black">
          {{ crumb.title }}
        </span>
        <RouterLink v-else :to="crumb.path" class="hover:text-accent transition-colors">
          {{ crumb.title }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseIcon from '../ui/BaseIcon.vue';

const route = useRoute();

const crumbs = computed(() => {
  // On récupère toutes les routes imbriquées traversées pour arriver ici
  const matchedRoutes = route.matched;
  
  return matchedRoutes
    .filter(r => r.meta && r.meta.title) // On ne garde que les routes qui ont un titre défini
    .map(r => ({
      title: r.meta.title,
      path: r.path || '/'
    }));
});


</script>