<template>
  <section class="max-w-4xl mx-auto py-12">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="text-2xl md:text-3xl font-extrabold text-base-content mb-6">
          Le recrutement est souvent lent et complexe
        </h2>
        <ul class="space-y-4 mb-8">
          <li v-for="(prob, idx) in problems" :key="idx" class="flex items-start gap-3">
            <BaseIcon name="erreur" class="text-error mt-1 text-lg" />
            <span class="text-sm md:text-base text-base-content/70">{{ prob }}</span>
          </li>
        </ul>
        <p class="text-xl font-bold text-accent">
          Mosalah simplifie ce processus en un seul espace centralisé.
        </p>
      </div>
      <div class="bg-base-200/50 border border-base-200 rounded-2xl p-8 aspect-square flex flex-col items-center justify-center text-center">
        <BaseIcon name="dashboard" class="text-5xl text-base-content/40 mb-4" />
        <p class="text-sm font-medium text-base-content/60">Processus fragmentés actuels</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import BaseIcon from '../../ui/BaseIcon.vue';
const problems = [
  "Les entreprises ont du mal à trouver rapidement des candidats adaptés",
  "Les candidats perdent du temps sur des offres peu pertinentes",
  "Les processus de recrutement sont fragmentés et peu efficaces"
];
</script>