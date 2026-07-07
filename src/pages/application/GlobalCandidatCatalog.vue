<template>
  <div class="min-h-screen bg-base-200/40 pb-16 flex flex-col text-left select-none" data-aos="fade-up">
    
    <!-- EN-TÊTE DE LA PAGE -->
    <header class="bg-white border-b border-base-200 pt-10 pb-6 px-4">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 class="text-3xl font-black text-base-content tracking-tight mb-2">
            Mosalah de Talents
          </h1>
          <p class="text-sm text-base-content/60 font-medium">
            Explorez et contactez les meilleurs profils disponibles sur la plateforme.
          </p>
        </div>
        
        <!-- Compteur stylisé -->
        <div class="bg-emerald-50/50 border border-emerald-100/80 rounded-2xl px-5 py-3 shadow-sm self-start md:self-auto flex items-center gap-4">
          <div class="p-2 bg-emerald-100 rounded-xl text-emerald-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <p class="text-[10px] font-bold text-emerald-800/60 uppercase tracking-widest mb-0.5">Candidats inscrits</p>
            <p class="text-xl font-black text-[#006643] leading-none">{{ filteredCandidates.length }} profils</p>
          </div>
        </div>
      </div>
    </header>

    <!-- RECHERCHE ET FILTRES (Fixes au scroll) -->
    <div class="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-base-200 py-5 px-4 transition-all duration-200">
      <div class="max-w-5xl mx-auto flex flex-col gap-4">
        
        <!-- Barre de recherche -->
        <div class="relative w-full group">
          <span class="absolute inset-y-0 left-4 flex items-center opacity-40 group-focus-within:opacity-100 group-focus-within:text-[#006643] transition-colors">
            <BaseIcon name="search" />
          </span>
          <input 
            v-model="searchQuery" 
            type="text"
            placeholder="Rechercher par nom, métier ou technologie (ex: Vue.js, Node.js)..."
            class="input input-bordered w-full pl-12 rounded-xl text-sm font-medium bg-base-100/50 border-base-300 focus:outline-none focus:border-[#006643] focus:ring-1 focus:ring-[#006643] h-12 transition-all shadow-inner" 
          />
        </div>

        <!-- Filtres dynamiques -->
        <div v-if="popularSkills.length > 0" class="flex flex-wrap gap-2 items-center">
          <span class="text-xs font-bold text-base-content/40 uppercase tracking-wide mr-2">Filtres populaires :</span>
          
          <button 
            v-for="tech in popularSkills" 
            :key="tech" 
            @click="toggleSkillFilter(tech)"
            class="btn btn-xs rounded-lg font-bold border transition-all normal-case px-3" 
            :class="selectedSkills.includes(tech)
              ? 'bg-[#006643] text-white border-[#006643] shadow-md scale-105'
              : 'bg-white border-base-300 text-base-content/70 hover:bg-base-200 hover:border-base-400'"
          >
            {{ tech }}
          </button>
          
          <button 
            v-if="selectedSkills.length > 0" 
            @click="selectedSkills = []"
            class="btn btn-xs btn-ghost text-rose-500 hover:bg-rose-50 hover:text-rose-600 font-bold ml-1 rounded-lg"
          >
            ✕ Effacer
          </button>
        </div>
      </div>
    </div>

    <!-- CONTENU PRINCIPAL -->
    <main class="max-w-5xl w-full mx-auto px-4 mt-8 flex-grow">
      
      <!-- ÉTAT DE CHARGEMENT -->
      <div v-if="loading" class="flex flex-col gap-4">
        <div v-for="n in 3" :key="n" class="skeleton w-full h-36 rounded-2xl bg-base-300/40"></div>
      </div>

      <!-- LISTE DES CANDIDATS (Avec animation de transition) -->
      <div v-else-if="filteredCandidates.length > 0" class="flex flex-col gap-4">
        <TransitionGroup name="list" tag="div" class="flex flex-col gap-4">
          <CandidateCard
            v-for="candidate in filteredCandidates"
            :key="candidate.id"
            :candidate="candidate"
            @view="openCandidateProfile"
            class="w-full"
          />
        </TransitionGroup>
      </div>

      <!-- ÉTAT VIDE -->
      <div v-else class="bg-white border border-base-200 rounded-3xl py-20 px-6 text-center max-w-xl mx-auto mt-4 shadow-sm">
        <div class="w-20 h-20 bg-base-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span class="text-4xl opacity-50">🔍</span>
        </div>
        <h3 class="text-xl font-black text-base-content tracking-tight mb-2">Aucun talent trouvé</h3>
        <p class="text-sm text-base-content/50 font-medium max-w-sm mx-auto leading-relaxed">
          Nous n'avons trouvé aucun profil correspondant à "<span class="text-base-content font-bold">{{ searchQuery }}</span>". 
          Essayez de modifier vos mots-clés ou de réinitialiser vos filtres.
        </p>
        <button 
          v-if="searchQuery || selectedSkills.length > 0"
          @click="searchQuery = ''; selectedSkills = []" 
          class="btn btn-outline btn-sm mt-6 border-base-300 text-base-content hover:bg-base-100 rounded-xl font-bold"
        >
          Réinitialiser la recherche
        </button>
      </div>
      
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDb } from '../../composables/useDb';
import CandidateCard from '../../components/CandidateCard.vue';

// On suppose que BaseIcon est enregistré globalement ou importé ailleurs, 
// sinon n'oublie pas de l'importer si nécessaire.

const router = useRouter();
const { loading, getCandidates } = useDb();

const searchQuery = ref('');
const selectedSkills = ref([]);
const globalCandidates = ref([]);

onMounted(async () => {
  const candidates = await getCandidates();
  globalCandidates.value = candidates || [];
});

const popularSkills = computed(() => {
  const skillCount = {};
  globalCandidates.value.forEach((c) => {
    (c.skills || []).forEach((skill) => {
      skillCount[skill] = (skillCount[skill] || 0) + 1;
    });
  });
  return Object.entries(skillCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([skill]) => skill);
});

const toggleSkillFilter = (skill) => {
  if (selectedSkills.value.includes(skill)) {
    selectedSkills.value = selectedSkills.value.filter((s) => s !== skill);
  } else {
    selectedSkills.value.push(skill);
  }
};

const filteredCandidates = computed(() => {
  return globalCandidates.value.filter((candidate) => {
    const searchLower = searchQuery.value.toLowerCase();
    const skills = candidate.skills || [];

    const matchesSearch =
      (candidate.name || '').toLowerCase().includes(searchLower) ||
      (candidate.bio || '').toLowerCase().includes(searchLower) ||
      (candidate.location || '').toLowerCase().includes(searchLower) ||
      skills.some((skill) => skill.toLowerCase().includes(searchLower));

    const matchesSkills = selectedSkills.value.every((skill) =>
      skills.includes(skill)
    );

    return matchesSearch && matchesSkills;
  });
});

const openCandidateProfile = (candidate) => {
  router.push({ name: 'CandidatDetail', params: { id: candidate.id } });
};
</script>

<style scoped>
/* Animations pour TransitionGroup */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
/* Permet un repositionnement fluide des autres cartes quand l'une d'elles disparaît */
.list-move {
  transition: transform 0.4s ease;
}
</style>