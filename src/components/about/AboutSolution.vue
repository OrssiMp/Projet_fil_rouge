<template>
  <section class="py-12">
    <h2 class="text-2xl md:text-3xl font-extrabold text-center text-base-content mb-12">
      Une plateforme unique pour publier, postuler et recruter
    </h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="(card, idx) in solutions" :key="idx" class="border border-base-200 p-6 rounded-2xl hover:shadow-md transition-all duration-300 bg-white group">
        <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-xl mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
          <BaseIcon :name="card.icon" />
        </div>
        <h3 class="font-bold text-lg text-base-content mb-2">{{ card.title }}</h3>
        <p class="text-sm text-base-content/60 leading-relaxed">{{ card.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>

const solutions = [
  { icon: 'offre', title: 'Publication simplifiée', desc: 'Publication d’offres simplifiée pour les entreprises.' },
  { icon: 'search', title: 'Recherche rapide', desc: 'Recherche d’emploi rapide pour les candidats.' },
  { icon: 'dashboard', title: 'Gestion centralisée', desc: 'Gestion centralisée des candidatures en un seul lieu.' },
  { icon: 'rapide', title: 'Interface rapide', desc: 'Interface simple et rapide à utiliser pour tous.' }
];
</script>