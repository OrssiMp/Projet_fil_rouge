<template>
  <div class="w-full text-left select-none" data-aos="fade-up">

    <!-- EN-TÊTE DE LA PAGE -->
    <div class="mb-6">
      <h1 class="text-2xl md:text-3xl font-black text-base-content tracking-tight mb-1">Candidats Reçus</h1>
      <p class="text-sm text-base-content/60 font-medium">Visualisez et filtrez les candidats ayant postulé à vos
        offres.</p>
    </div>

    <!-- RECHERCHE ET FILTRES -->
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <div class="relative flex-1">
        <span class="absolute inset-y-0 left-3 flex items-center opacity-40">
          🔍
        </span>
        <input v-model="searchQuery" type="text" placeholder="Rechercher un candidat, compétence, offre..."
          class="input input-bordered w-full pl-10 rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] h-11" />
      </div>

      <div class="flex gap-2">
        <select v-model="statusFilter"
          class="select select-bordered rounded-xl text-sm font-bold bg-white border-base-300 focus:outline-none focus:border-[#006643] h-11 min-h-[44px]">
          <option value="All">Tous les statuts</option>
          <option value="Postulé">Postulé</option>
          <option value="En entretien">En entretien</option>
          <option value="Sélectionné">Sélectionné</option>
          <option value="En attente">En attente</option>
          <option value="Rejeté">Rejeté</option>
        </select>

        <button
          class="btn bg-[#006643] hover:bg-[#004d32] border-none text-white font-bold rounded-xl px-5 flex items-center gap-2 text-sm h-11 min-h-[44px]">
          <span>LayoutFiltrer</span> Filtrer
        </button>
      </div>
    </div>

    <!-- LISTE DES CANDIDATS EN CARTES -->
    <div v-if="filteredCandidates.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <CandidateCard v-for="candidate in filteredCandidates" :key="candidate.id" :candidate="candidate"
        @bookmark="toggleBookmark">
        <template #actions>
          <div class="grid gap-3 w-full mt-2">
            <div class="grid grid-cols-2 gap-2 text-xs text-base-content/70">
              <span class="bg-base-100 border border-base-200 rounded-2xl px-3 py-2 font-bold text-left">
                {{ candidate.status }}
              </span>
              <span class="bg-base-100 border border-base-200 rounded-2xl px-3 py-2 font-bold text-left">
                {{ candidate.applicationsCount }} {{ candidate.applicationsCount > 1 ? 'offres' : 'offre' }}
              </span>
            </div>
            <div class="flex gap-2">
              <RouterLink :to="`/candidats/details/${candidate.id}`" @click="viewProfile(candidate.id)"
                class="flex-1 btn btn-sm btn-accent rounded-xl text-xs font-bold">
                Voir
              </RouterLink>
              <button @click="rateCandidate(candidate.id)"
                class="flex-1 btn btn-sm btn-outline rounded-xl text-xs font-bold">
                Noter
              </button>
            </div>
          </div>
        </template>
      </CandidateCard>
    </div>

    <div v-else class="bg-white border border-base-300 rounded-2xl py-16 px-4 text-center max-w-xl mx-auto mt-6">
      <p class="text-3xl mb-2">🔍</p>
      <h3 class="font-black text-base-content tracking-tight text-lg mb-1">Aucun candidat trouvé</h3>
      <p class="text-xs text-base-content/50 font-medium max-w-sm mx-auto leading-relaxed">
        Aucun candidat trouvé correspondant à vos critères. Modifiez votre recherche ou sélectionnez un autre statut.
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CandidateCard from '../../components/CandidateCard.vue';

const searchQuery = ref('');
const statusFilter = ref('All');

// Données brutes calquées exactement sur la liste de l'image watermarked_img_3899879711368558579.png
const candidates = ref([
  {
    id: 1,
    name: 'Jean Dupont',
    headline: 'Développeur Fullstack React/Node.js',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop', // Exemple d'avatar propre
    status: 'En entretien',
    applicationsCount: 1,
    date: '01/11/2024',
    skills: ['React.js', 'Node.js', 'SQL']
  },
  {
    id: 2,
    name: 'Sophie Martin',
    headline: 'Data Analyst Senior',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    status: 'Postulé',
    applicationsCount: 2,
    date: '30/10/2024',
    skills: ['SQL', 'Python', 'PowerBI']
  },
  {
    id: 3,
    name: 'Michel Nguessan',
    headline: 'Chef de Projet Digital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    status: 'Rejeté',
    applicationsCount: 1,
    date: '28/10/2024',
    skills: []
  },
  {
    id: 4,
    name: 'Isabelle Moreau',
    headline: 'Sécretaire Administrative',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    status: 'En attente',
    applicationsCount: 1,
    date: '26/10/2024',
    skills: ['Excel', 'Access', 'Organisation', 'Communication', 'Secretariat']
  },
  {
    id: 5,
    name: 'Yassine Benali',
    headline: 'Développeur Frontend Vue.js',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    status: 'Sélectionné',
    applicationsCount: 1,
    date: '25/10/2024',
    skills: ['Vue.js', 'CSS3', 'JavaScript']
  },
  {
    id: 6,
    name: 'Marie Kouamé',
    headline: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=150&auto=format&fit=crop',
    status: 'Postulé',
    applicationsCount: 1,
    date: '24/10/2024',
    skills: []
  }
]);

// Logique combinée de recherche textuelle et de filtrage par menu déroulant
const filteredCandidates = computed(() => {
  return candidates.value.filter(candidate => {
    const matchesStatus = statusFilter.value === 'All' || candidate.status === statusFilter.value;

    const searchLower = searchQuery.value.toLowerCase();
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.headline.toLowerCase().includes(searchLower) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchLower));

    return matchesStatus && matchesSearch;
  });
});

// Attribution dynamique des classes Tailwind pour correspondre aux pastilles colorées de la maquette
const getStatusClass = (status) => {
  switch (status) {
    case 'Postulé':
      return 'bg-blue-50 border-blue-200 text-blue-700';
    case 'En entretien':
      return 'bg-amber-50 border-amber-200 text-amber-700';
    case 'Sélectionné':
      return 'bg-emerald-50 border-emerald-200 text-emerald-700';
    case 'En attente':
      return 'bg-gray-100 border-gray-300 text-gray-600';
    case 'Rejeté':
      return 'bg-rose-50 border-rose-200 text-rose-600';
    default:
      return 'bg-base-200 border-base-300 text-base-content/80';
  }
};

const viewProfile = (id) => {
  console.log(`Navigation vers le profil complet du candidat ID : ${id}`);
};

const rateCandidate = (id) => {
  console.log(`Ouverture du volet de notation pour le candidat ID : ${id}`);
};
</script>