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
      <!-- Statistique rapide -->
      <div class="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2 self-start md:self-auto">
        <p class="text-xs font-bold text-emerald-800/60 uppercase tracking-wider">Candidats inscrits</p>
        <p class="text-xl font-black text-[#006643]">{{ filteredCandidates.length }} profils</p>
      </div>
    </div>

    <!-- RECHERCHE ET RECHERCHE PAR TAGS -->
    <div class="flex flex-col gap-3 mb-8">
      <div class="relative w-full">
        <span class="absolute inset-y-0 left-3 flex items-center opacity-40">
          🔍
        </span>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Rechercher par nom, métier, mot-clé (ex: Vue.js, Node.js)..." 
          class="input input-bordered w-full pl-10 rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] h-11"
        />
      </div>

      <!-- Filtres rapides par technologie/compétence -->
      <div class="flex flex-wrap gap-2 items-center">
        <span class="text-xs font-bold text-base-content/40 uppercase tracking-wide mr-1">Filtres populaires :</span>
        <button 
          v-for="tech in popularSkills" 
          :key="tech"
          @click="toggleSkillFilter(tech)"
          class="btn btn-xs rounded-lg font-bold border transition-all normal-case"
          :class="selectedSkills.includes(tech) 
            ? 'bg-[#006643] text-white border-transparent shadow-sm' 
            : 'bg-white border-base-300 text-base-content/70 hover:bg-base-200/50'"
        >
          {{ tech }}
        </button>
        <button 
          v-if="selectedSkills.length > 0" 
          @click="selectedSkills = []" 
          class="text-xs font-bold text-rose-600 hover:underline ml-2"
        >
          Effacer les filtres
        </button>
      </div>
    </div>

    <!-- GRILLE DES CARTES CANDIDATS -->
    <div v-if="filteredCandidates.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <BaseCard 
        v-for="candidate in filteredCandidates" 
        :key="candidate.id"
        class="bg-white border border-base-300 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-200 group"
      >
        <div>
          <!-- Top de la Card : Avatar + Disponibilité -->
          <div class="flex items-start justify-between gap-4 mb-4">
            <div class="avatar">
              <div class="w-14 h-14 rounded-2xl border border-base-200 overflow-hidden bg-base-100">
                <BaseImage :src="candidate.avatar" :alt="candidate.name" class="object-cover w-full h-full" />
              </div>
            </div>
            <span 
              class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border"
              :class="candidate.isAvailable 
                ? 'bg-emerald-50 border-emerald-200 text-[#006643]' 
                : 'bg-base-100 border-base-200 text-base-content/40'"
            >
              {{ candidate.isAvailable ? 'Disponible' : 'En poste' }}
            </span>
          </div>

          <!-- Milieu de la Card : Identité -->
          <div class="mb-3">
            <h3 class="font-black text-base-content tracking-tight text-lg leading-snug group-hover:text-[#006643] transition-colors">
              {{ candidate.name }}
            </h3>
            <p class="text-xs font-bold text-base-content/70 mt-0.5">{{ candidate.headline }}</p>
            <p class="text-xs text-base-content/40 font-semibold mt-1 flex items-center gap-1">
              📍 {{ candidate.location }}
            </p>
          </div>

          <!-- Biographie courte -->
          <p class="text-xs text-base-content/60 font-medium leading-relaxed line-clamp-2 mb-4">
            {{ candidate.bio || "Aucune description fournie pour le moment." }}
          </p>
        </div>

        <div>
          <!-- Tags de compétences -->
          <div class="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-base-100">
            <span 
              v-for="skill in candidate.skills" 
              :key="skill"
              class="bg-base-200/60 text-base-content/80 font-bold text-[11px] px-2.5 py-0.5 rounded-lg whitespace-nowrap"
            >
              {{ skill }}
            </span>
          </div>

          <!-- Bouton d'action bas de carte -->
          <div class="flex gap-2 w-full mt-2">
            <BaseButton
              @click="openContactModal(candidate)"
              class="flex-1"
              variant="accent"
            >
             Voir le profil
            </BaseButton>
            <button 
              @click="toggleBookmark(candidate.id)"
              class="btn btn-sm btn-square btn-bordered bg-white border-base-300 rounded-xl text-xs h-9 w-9 hover:bg-base-100"
            >
              {{ candidate.isBookmarked ? '⭐' : '☆' }}
            </button>
          </div>
        </div>

      </BaseCard>

    </div>

    <!-- ÉTAT VIDE SI AUCUN CANDIDAT TROUVÉ -->
    <div v-else class="bg-white border border-base-300 rounded-2xl py-16 px-4 text-center max-w-xl mx-auto mt-6">
      <p class="text-3xl mb-2">🔍</p>
      <h3 class="font-black text-base-content tracking-tight text-lg mb-1">Aucun talent trouvé</h3>
      <p class="text-xs text-base-content/50 font-medium max-w-sm mx-auto leading-relaxed">
        Nous n'avons trouvé aucun profil correspondant à vos critères de recherche actuels. Modifiez vos mots-clés ou filtres.
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');
const selectedSkills = ref([]);

// Liste des filtres technologiques populaires en rapport avec les stacks de l'app
const popularSkills = ['React.js', 'Vue.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PHP','Figma', 'SQL', 'Python', 'Excel', 'Secretariat'];

// Données fictives simulant l'ensemble des candidats enregistrés sur la plateforme
const globalCandidates = ref([
  {
    id: 101,
    name: 'Jean Dupont',
    headline: 'Développeur Fullstack React/Node.js',
    location: 'Brazzaville, Congo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    bio: 'Passionné par la création d\'architectures web robustes et scalables. Expertise principale sur les écosystèmes Javascript/Typescript.',
    skills: ['React.js', 'Node.js', 'TypeScript', 'SQL'],
    isAvailable: true,
    isBookmarked: false
  },
  {
    id: 102,
    name: 'Sophie Martin',
    headline: 'Data Analyst Senior',
    location: 'Pointe-Noire, Congo',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    bio: 'Spécialiste dans l\'analyse de données complexes, la modélisation sous Python et la création de dashboards interactifs performants.',
    skills: ['SQL', 'Python', 'PowerBI'],
    isAvailable: true,
    isBookmarked: true
  },
  {
    id: 103,
    name: 'Yassine Benali',
    headline: 'Développeur Frontend Vue.js',
    location: 'Owando, Congo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    bio: 'Grand amoureux du framework Vue.js et de l\'optimisation des performances côté client. Intégrateur pixel-perfect.',
    skills: ['Vue.js', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    isAvailable: false,
    isBookmarked: false
  },
  {
    id: 104,
    name: 'Isabelle Moreau',
    headline: 'Sécretaire Administrative',
    location: 'Ouesso, Congo',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    bio: 'Professionnelle de l\'administration et de la gestion de bureau, avec une forte expérience dans la coordination d\'équipes et la gestion documentaire.',
    skills: ['Excel', 'Access', 'Organisation', 'Communication','Secretariat'],
    isAvailable: true,
    isBookmarked: false
  },
  {
    id: 105,
    name: 'Loïc Malonga',
    headline: 'Développeur Backend PHP / Laravel',
    location: 'Brazzaville, Congo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    bio: 'Développeur spécialisé dans la mise en place d\'API REST sécurisées avec Laravel et la gestion de bases de données relationnelles.',
    skills: ['PHP', 'Laravel', 'SQL', 'Docker'],
    isAvailable: true,
    isBookmarked: false
  }
]);

// Gestion de la sélection multiple des filtres de compétences
const toggleSkillFilter = (skill) => {
  if (selectedSkills.value.includes(skill)) {
    selectedSkills.value = selectedSkills.value.filter(s => s !== skill);
  } else {
    selectedSkills.value.push(skill);
  }
};

// Algorithme de filtrage croisé (Champ de recherche + Liste de tags sélectionnés)
const filteredCandidates = computed(() => {
  return globalCandidates.value.filter(candidate => {
    // 1. Filtrage textuel général
    const searchLower = searchQuery.value.toLowerCase();
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.headline.toLowerCase().includes(searchLower) ||
      candidate.location.toLowerCase().includes(searchLower) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchLower));

    // 2. Filtrage par compétences cumulatives (le candidat doit posséder TOUS les tags sélectionnés)
    const matchesSkills = selectedSkills.value.every(skill => 
      candidate.skills.includes(skill)
    );

    return matchesSearch && matchesSkills;
  });
});

const openContactModal = (candidate) => {
  console.log(`Ouverture du profil ou dossier complet pour : ${candidate.name}`);
  router.push('candidats/details/'+candidate.id);
};

const toggleBookmark = (id) => {
  const candidate = globalCandidates.value.find(c => c.id === id);
  if (candidate) {
    candidate.isBookmarked = !candidate.isBookmarked;
    console.log(`Statut favori modifié pour le profil ID ${id} : ${candidate.isBookmarked}`);
  }
};
</script>