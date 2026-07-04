<template>
  <div class="relative w-full max-w-2xl mx-auto z-50 px-4">

    <div class="relative flex items-center group min-w-0">
      <span class="absolute left-5 text-base-content/40 text-lg transition-colors group-focus-within:text-accent">
        <BaseIcon name="search" />
      </span>

      <input v-model="searchQuery" @focus="isOpen = true" @blur="handleBlur" type="text"
        placeholder="Rechercher une compétence, une offre, une entreprise..."
        class="w-full min-w-0 h-14 pl-14 pr-12 rounded-2xl bg-base-100 border-2 border-base-200/80 shadow-sm focus:outline-none focus:border-accent text-sm md:text-base font-semibold text-base-content transition-all placeholder:text-base-content/40" />

      <button v-show="searchQuery" @click="clearSearch"
        class="absolute right-3 btn btn-ghost btn-sm btn-circle text-base-content/40 hover:text-base-content">
        <BaseIcon name="close" />
      </button>
    </div>

    <Transition enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-2 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95">
      <div v-show="isOpen && searchQuery.length > 1"
        class="absolute top-full left-0 right-0 mt-3 bg-base-100 border border-base-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[420px] min-w-0">
        <div class="px-5 py-3 border-b border-base-200/60 bg-base-50 flex justify-between items-center shrink-0">
          <span class="text-[10px] font-black text-base-content/50 uppercase tracking-widest">
            Résultats pour "{{ searchQuery }}"
          </span>
          <span class="text-[10px] font-black text-accent bg-accent/10 px-2.5 py-1 rounded-md">
            {{ filteredResults.length }} trouvés
          </span>
        </div>

        <ul class="overflow-y-auto p-2 flex flex-col gap-1">
          <template v-if="filteredResults.length">
            <li v-for="result in filteredResults" :key="result.id">
              <a :href="result.link"
                class="flex items-center gap-4 p-3 rounded-xl hover:bg-base-200/60 transition-colors cursor-pointer group">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-base-200/50"
                  :class="result.type === 'job' ? 'bg-accent/10 text-accent' : 'bg-base-200 text-base-content/70'">
                  <BaseIcon v-if="result.type === 'job'" name="job" />
                  <BaseIcon v-else-if="result.type === 'company'" name="office" />
                </div>

                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-black text-base-content truncate group-hover:text-accent transition-colors">
                    {{ result.title }}
                  </h4>
                  <div
                    class="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-[11px] font-semibold text-base-content/60">
                    <span v-if="result.subtitle" class="text-base-content/80">{{ result.subtitle }}</span>
                    <span v-if="result.subtitle && result.location" class="hidden sm:inline">•</span>
                    <span v-if="result.location" class="flex items-center gap-1">
                      <BaseIcon name="location" class="text-[9px]" /> {{ result.location }}
                    </span>
                  </div>
                </div>

                <span
                  class="text-base-content/20 group-hover:text-accent group-hover:translate-x-1 transition-all pr-2">
                  <BaseIcon name="chevron-droite" class="text-xs" />
                </span>
              </a>
            </li>
          </template>

          <div v-else class="px-6 py-10 text-center flex flex-col items-center justify-center">
            <div class="w-12 h-12 bg-base-200 rounded-full flex items-center justify-center mb-3">
              <BaseIcon name="magnifying-glass-minus" class="text-xl text-base-content/30" />
            </div>
            <p class="text-sm font-black text-base-content">Aucun résultat trouvé</p>
            <p class="text-xs font-semibold text-base-content/50 mt-1 max-w-[250px]">
              Essayez de chercher des termes comme "Vue.js", "Brazzaville" ou "Développeur".
            </p>
          </div>
        </ul>

        <div v-if="filteredResults.length" class="p-3 border-t border-base-200/60 bg-base-50 shrink-0">
          <BaseButton variant="ghost" class="w-full text-xs font-black text-accent hover:bg-accent/10">
            Voir tous les résultats pour "{{ searchQuery }}" →
          </BaseButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';


const searchQuery = ref('');
const isOpen = ref(false);

// 🧹 Vider la recherche
const clearSearch = () => {
  searchQuery.value = '';
  // On garde le focus ou on ferme, au choix
  document.querySelector('input')?.focus();
};

// 🖱️ Gérer la fermeture au clic à l'extérieur
// L'utilisation d'un setTimeout permet d'éviter que le clic sur un résultat 
// ferme le dropdown avant que la navigation n'ait lieu
const handleBlur = () => {
  setTimeout(() => {
    isOpen.value = false;
  }, 200);
};

// 🗃️ Base de données simulée pour tester l'interface
const mockData = [
  { id: 1, type: 'job', title: 'Développeur Full-Stack (Vue.js / Node)', subtitle: 'TechSoft Congo', location: 'Brazzaville', link: '/offres/1' },
  { id: 2, type: 'job', title: 'Intégrateur Web (Tailwind CSS)', subtitle: 'ImmoCool', location: 'Brazzaville', link: '/offres/2' },
  { id: 3, type: 'company', title: 'Agence Digitale Bantou', subtitle: 'Entreprise ESN', location: 'Pointe-Noire', link: '/entreprises/details/3' },
  { id: 4, type: 'job', title: 'Administrateur Systèmes & Réseaux Linux', subtitle: 'Congo Telecom', location: 'Brazzaville', link: '/offres/4' },
];

// ⚙️ Logique de filtrage très basique
const filteredResults = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return [];

  return mockData.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.subtitle.toLowerCase().includes(query) ||
    item.location.toLowerCase().includes(query)
  );
});
</script>