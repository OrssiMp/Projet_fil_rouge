<template>
  <BaseCard hoverable density="normal"
    class="h-full flex flex-col justify-between overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl">
    <div>
      <div class="flex justify-between items-start gap-3 mb-4">
        <div class="space-y-2">
          <h3 class="font-black text-lg text-base-content tracking-tight line-clamp-2">
            {{ job.title }}
          </h3>
          <p class="text-xs uppercase tracking-[0.24em] text-base-content/40 font-bold">
            {{ job.category || 'Offre d\'emploi' }}
          </p>
        </div>

        <BaseBadge :type="badgeType" size="sm" outline>
          {{ job.contractType }}
        </BaseBadge>
      </div>

      <div class="flex items-center gap-3 mb-4">
        <div class="grid place-items-center w-10 h-10 rounded-2xl bg-accent/10 text-accent font-black text-sm">
          {{ job.company[0] }}
        </div>
        <div>
          <p class="text-emerald-500 font-bold text-sm">{{ job.company }}</p>
          <p class="text-xs text-base-content/60">{{ job.companyTag }}</p>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3 text-xs text-base-content/60 mb-5 font-semibold">
        <div class="flex items-center gap-1">
          <BaseIcon name="location" class="text-sm opacity-70" />
          <span>{{ job.location }}</span>
        </div>
        <div class="flex items-center gap-1">
          <BaseIcon name="schedule" class="text-sm opacity-70" />
          <span>{{ job.postedAt }}</span>
        </div>
        <div class="flex items-center gap-1">
          <BaseIcon name="zap" class="text-sm opacity-70" />
          <span>{{ job.salary }}</span>
        </div>
      </div>

      <p class="text-sm text-base-content/70 leading-relaxed line-clamp-3 mb-6">
        {{ job.description }}
      </p>
    </div>

    <div class="flex flex-col gap-3 pt-4 border-t border-base-200/70">
      <div v-if="job.highlight"
        class="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-2 text-xs font-bold text-accent w-max">
        <BaseIcon name="check" class="text-[11px]" />
        {{ job.highlight }}
      </div>
      <RouterLink :to="`/offres/${id}`" class="block w-full">
        <BaseButton variant="accent" class="w-full justify-center gap-2">
          Voir l'offre
          <BaseIcon name="chevron-droite" class="text-xs" />
        </BaseButton>
      </RouterLink>
    </div>
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