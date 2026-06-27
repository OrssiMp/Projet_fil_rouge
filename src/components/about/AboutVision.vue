<template>
  <section class="grid md:grid-cols-2 gap-12 py-12 border-t border-base-100 mt-6">
    <div>
      <h2 class="text-2xl md:text-3xl font-extrabold text-base-content mb-6">
        Une plateforme pensée pour la simplicité
      </h2>
      <ul class="space-y-4">
        <li v-for="(item, idx) in points" :key="idx" class="flex items-center gap-3">
          <BaseIcon name="validation" class="text-accent text-lg" />
          <span class="text-sm md:text-base text-base-content/80 font-medium">{{ item }}</span>
        </li>
      </ul>
    </div>
    <div>
      <h2 class="text-2xl md:text-3xl font-extrabold text-base-content mb-6">
        Construire un accès plus simple à l’emploi local
      </h2>
      <p class="text-sm md:text-base text-base-content/60 leading-relaxed">
        Mosalah vise à améliorer la connexion entre talents et entreprises en proposant une solution accessible, rapide et adaptée au marché local. Nous croyons que la technologie doit s'effacer pour laisser place à l'essentiel : la rencontre entre une compétence et un besoin.
      </p>
    </div>
  </section>
</template>

<script setup>
import BaseIcon from '../../ui/BaseIcon.vue';
const points = [
  "Suppression des processus inutiles",
  "Interface simple et rapide",
  "Expérience utilisateur fluide",
  "Accès direct entre candidats et entreprises"
];
</script>