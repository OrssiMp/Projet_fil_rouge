<template>
  <div class="w-full text-left select-none" data-aos="fade-up">

    <!-- EN-TÊTE DE LA PAGE -->
    <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-2xl md:text-3xl font-black text-base-content tracking-tight mb-1">
          Mosalah de Talents
        </h1>
        <p class="text-sm text-base-content/60 font-medium">
          Explorez et contactez les profils disponibles sur Mosalah.
        </p>
      </div>
      <div class="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2 self-start md:self-auto">
        <p class="text-xs font-bold text-emerald-800/60 uppercase tracking-wider">Candidats inscrits</p>
        <p class="text-xl font-black text-[#006643]">{{ filteredCandidates.length }} profils</p>
      </div>
    </div>

    <!-- RECHERCHE ET FILTRES -->
    <div class="flex flex-col gap-3 mb-8">
      <div class="relative w-full">
        <span class="absolute inset-y-0 left-3 flex items-center opacity-40">
          <BaseIcon name="search" />
        </span>
        <input v-model="searchQuery" type="text"
          placeholder="Rechercher par nom, métier, mot-clé (ex: Vue.js, Node.js)..."
          class="input input-bordered w-full pl-10 rounded-2xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] h-12" />
      </div>

      <!-- Filtres calculés dynamiquement à partir des vraies compétences des candidats -->
      <div v-if="popularSkills.length > 0" class="flex flex-wrap gap-2 items-center">
        <span class="text-xs font-bold text-base-content/40 uppercase tracking-wide mr-1">Filtres populaires :</span>
        <button v-for="tech in popularSkills" :key="tech" @click="toggleSkillFilter(tech)"
          class="btn btn-xs rounded-lg font-bold border transition-all normal-case" :class="selectedSkills.includes(tech)
            ? 'bg-[#006643] text-white border-transparent shadow-sm'
            : 'bg-white border-base-300 text-base-content/70 hover:bg-base-200/50'">
          {{ tech }}
        </button>
        <button v-if="selectedSkills.length > 0" @click="selectedSkills = []"
          class="text-xs font-bold text-rose-600 hover:underline ml-2">
          Effacer les filtres
        </button>
      </div>
    </div>

    <!-- ÉTAT DE CHARGEMENT -->
    <div v-if="loading" class="flex flex-col gap-4">
      <div v-for="n in 3" :key="n" class="skeleton w-full h-32 rounded-2xl"></div>
    </div>

    <!-- LISTE DES CANDIDATS : chaque card prend toute la largeur -->
    <div v-else-if="filteredCandidates.length > 0" class="flex flex-col gap-4">
      <CandidateCard
        v-for="candidate in filteredCandidates"
        :key="candidate.id"
        :candidate="candidate"
        @view="openCandidateProfile"
      />
    </div>

    <!-- ÉTAT VIDE SI AUCUN CANDIDAT TROUVÉ -->
    <div v-else class="bg-white border border-base-300 rounded-2xl py-16 px-4 text-center max-w-xl mx-auto mt-6">
      <p class="text-3xl mb-2">🔍</p>
      <h3 class="font-black text-base-content tracking-tight text-lg mb-1">Aucun talent trouvé</h3>
      <p class="text-xs text-base-content/50 font-medium max-w-sm mx-auto leading-relaxed">
        Nous n'avons trouvé aucun profil correspondant à vos critères de recherche actuels. Modifiez vos mots-clés ou
        filtres.
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDb } from '../../composables/useDb';
import CandidateCard from '../../components/CandidateCard.vue';

const router = useRouter();
const { loading, getCandidates } = useDb();

const searchQuery = ref('');
const selectedSkills = ref([]);
const globalCandidates = ref([]);

onMounted(async () => {
  // getCandidates() = fetchUsers('candidat') dans useDb, données sans mot de passe
  const candidates = await getCandidates();
  globalCandidates.value = candidates || [];
});

// Top compétences les plus fréquentes parmi les vrais candidats
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