<template>
  <BaseCard 
    hoverable 
    density="normal"
    class="h-full flex flex-col justify-between"
  >
    <div>
      <div class="flex justify-between items-start gap-2 mb-1">
        <h3 class="font-black text-lg text-base-content tracking-tight line-clamp-1">
          {{ job.title }}
        </h3>
        <BaseBadge :type="badgeType" size="sm" outline>
          {{ job.contractType }}
        </BaseBadge>
      </div>

      <p class="text-emerald-500 font-bold text-sm mb-4">{{ job.company }}</p>

      <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-base-content/60 mb-4 font-semibold">
        <div class="flex items-center gap-1">
          <BaseIcon name="location" class="text-sm opacity-70" />
          <span>{{ job.location }}</span>
        </div>
        <div class="flex items-center gap-1">
          <BaseIcon name="schedule" class="text-sm opacity-70" /> 
          <span>{{ job.postedAt }}</span>
        </div>
      </div>

      <p class="text-sm text-base-content/70 leading-relaxed line-clamp-2 mb-6">
        {{ job.description }}
      </p>
    </div>

    <RouterLink :to="`/offres/${id}`" class="block w-full">
      <BaseButton variant="accent" class="w-full">
        Voir l'offre
      </BaseButton>
    </RouterLink>
  </BaseCard>
</template>

<script setup>
import { computed } from 'vue';


const props = defineProps({
  job: {
    type: Object,
    required: true
  },
  id: {
    type: [String, Number],
    required: true
  }
});

// Adapte dynamiquement la couleur du badge en fonction du type de contrat
const badgeType = computed(() => {
  const type = props.job.contractType?.toLowerCase();
  if (type === 'cdi') return 'primary';
  if (type === 'freelance') return 'info';
  if (type === 'cdd') return 'warning';
  return 'neutral';
});
</script>