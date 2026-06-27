<template>
  <div class="w-full text-left select-none" data-aos="fade-up">
    
    <!-- EN-TÊTE DE LA PAGE -->
    <div class="mb-6">
      <h1 class="text-2xl md:text-3xl font-black text-base-content tracking-tight mb-1">Candidats Reçus</h1>
      <p class="text-sm text-base-content/60 font-medium">Visualisez et filtrez les candidats ayant postulé à vos offres.</p>
    </div>

    <!-- RECHERCHE ET FILTRES -->
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <div class="relative flex-1">
        <span class="absolute inset-y-0 left-3 flex items-center opacity-40">
          🔍
        </span>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Rechercher un candidat, compétence, offre..." 
          class="input input-bordered w-full pl-10 rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] h-11"
        />
      </div>
      
      <div class="flex gap-2">
        <select 
          v-model="statusFilter"
          class="select select-bordered rounded-xl text-sm font-bold bg-white border-base-300 focus:outline-none focus:border-[#006643] h-11 min-h-[44px]"
        >
          <option value="All">Tous les statuts</option>
          <option value="Postulé">Postulé</option>
          <option value="En entretien">En entretien</option>
          <option value="Sélectionné">Sélectionné</option>
          <option value="En attente">En attente</option>
          <option value="Rejeté">Rejeté</option>
        </select>

        <button class="btn bg-[#006643] hover:bg-[#004d32] border-none text-white font-bold rounded-xl px-5 flex items-center gap-2 text-sm h-11 min-h-[44px]">
          <span>LayoutFiltrer</span> Filtrer
        </button>
      </div>
    </div>

    <!-- TABLEAU DES CANDIDATS -->
    <div class="bg-white border border-base-300 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
      <div class="overflow-x-auto">
        <table class="table w-full border-collapse">
          <!-- Entête du tableau -->
          <thead>
            <tr class="border-b border-base-200 bg-base-100/50 text-base-content/80 font-black text-xs uppercase tracking-wider">
              <th class="py-4 px-6">Candidat</th>
              <th class="py-4 px-4">Status</th>
              <th class="py-4 px-4">Offres Appliquées</th>
              <th class="py-4 px-4">Date de Candidature</th>
              <th class="py-4 px-4">Compétences Clés</th>
              <th class="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          
          <!-- Corps du tableau -->
          <tbody class="divide-y divide-base-200">
            <tr 
              v-for="candidate in filteredCandidates" 
              :key="candidate.id"
              class="hover:bg-base-200/20 transition-colors font-medium text-sm text-base-content/90"
            >
              <!-- Colonne : Infos Candidat -->
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="w-11 h-11 rounded-xl border border-base-200 overflow-hidden">
                      <img :src="candidate.avatar" :alt="candidate.name" class="object-cover w-full h-full" />
                    </div>
                  </div>
                  <div class="min-w-0">
                    <h3 class="font-black text-base-content tracking-tight text-sm md:text-base leading-tight">{{ candidate.name }}</h3>
                    <p class="text-xs text-base-content/50 truncate mt-0.5">{{ candidate.headline }}</p>
                  </div>
                </div>
              </td>

              <!-- Colonne : Statut avec Badge coloré -->
              <td class="py-4 px-4 whitespace-nowrap">
                <span 
                  class="badge font-bold text-xs px-2.5 py-1.5 border"
                  :class="getStatusClass(candidate.status)"
                >
                  {{ candidate.status }}
                </span>
              </td>

              <!-- Colonne : Offres appliquées -->
              <td class="py-4 px-4 whitespace-nowrap text-base-content/70">
                {{ candidate.applicationsCount }} {{ candidate.applicationsCount > 1 ? 'offres' : 'offre' }}
              </td>

              <!-- Colonne : Date -->
              <td class="py-4 px-4 whitespace-nowrap text-base-content/60 text-xs font-semibold">
                {{ candidate.date }}
              </td>

              <!-- Colonne : Tags Compétences -->
              <td class="py-4 px-4">
                <div class="flex flex-wrap gap-1 max-w-[240px]">
                  <span 
                    v-for="skill in candidate.skills" 
                    :key="skill"
                    class="bg-emerald-50 text-[#006643] border border-emerald-100/80 font-bold text-[11px] px-2 py-0.5 rounded-lg whitespace-nowrap"
                  >
                    {{ skill }}
                  </span>
                  <span v-if="!candidate.skills || candidate.skills.length === 0" class="text-xs text-base-content/30 italic">
                    Aucun tag
                  </span>
                </div>
              </td>

              <!-- Colonne : Boutons d'action -->
              <td class="py-4 px-6 whitespace-nowrap">
                <div class="flex flex-col items-center gap-1">
                  <RouterLink :to="`/candidats/details/${candidate.id}`"
                    @click="viewProfile(candidate.id)"
                    class="btn btn-xs bg-[#006643] hover:bg-[#004d32] border-none text-white font-bold rounded-lg px-4"
                  >
                    Voir
                  </RouterLink>
                  <button 
                    @click="rateCandidate(candidate.id)"
                    class="text-[11px] font-bold text-base-content/50 hover:text-base-content transition-colors"
                  >
                    Noter
                  </button>
                </div>
              </td>
            </tr>

            <!-- État vide si aucune correspondance -->
            <tr v-if="filteredCandidates.length === 0">
              <td colspan="6" class="text-center py-12 text-base-content/40 italic font-medium">
                Aucun candidat trouvé correspondant à vos critères.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- FOOTER DE PAGINATION INTERNE (Fidèle à l'indicateur 'pagination' de la maquette) -->
      <div class="bg-base-100 border-t border-base-200 px-6 py-4 flex items-center justify-between sm:justify-end gap-2">
        <span class="text-xs font-bold text-emerald-800/60 bg-emerald-50 px-2.5 py-1 rounded-lg sm:mr-auto">
          pagination
        </span>
        <div class="join">
          <button class="join-item btn btn-sm btn-bordered bg-white border-base-300 text-xs font-bold">‹</button>
          <button class="join-item btn btn-sm bg-[#006643] text-white border-none text-xs font-bold">1</button>
          <button class="join-item btn btn-sm btn-bordered bg-white border-base-300 text-xs font-bold">2</button>
          <button class="join-item btn btn-sm btn-bordered bg-white border-base-300 text-xs font-bold">3</button>
          <button class="join-item btn btn-sm btn-bordered bg-white border-base-300 text-xs font-bold">...</button>
          <button class="join-item btn btn-sm btn-bordered bg-white border-base-300 text-xs font-bold">›</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

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
    headline: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    status: 'En attente',
    applicationsCount: 1,
    date: '26/10/2024',
    skills: ['Figma', 'Web Design']
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