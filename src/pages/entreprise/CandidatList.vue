<template>
  <div class="min-h-screen bg-base-200/40 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto" data-aos="fade-up" data-aos-duration="400">
      
      <!-- En-tête de la page -->
      <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-3xl font-black text-base-content tracking-tight">
            Candidatures reçues
          </h1>
          <p class="text-sm text-base-content/60 font-medium mt-1">
            Gérez les talents qui ont postulé à vos offres d'emploi.
          </p>
        </div>
        
        <div class="bg-white border border-base-200 rounded-xl px-4 py-2 shadow-sm flex items-center gap-3">
          <span class="text-2xl">📥</span>
          <div>
            <p class="text-[10px] font-bold text-base-content/50 uppercase tracking-widest">Total reçues</p>
            <p class="text-lg font-black text-[#006643] leading-none">{{ candidaturesList.length }}</p>
          </div>
        </div>
      </div>

      <!-- Messages d'erreur globaux -->
      <div v-if="error" class="alert alert-error shadow-sm mb-6 rounded-xl text-sm font-medium">
        <span>⚠️ {{ error }}</span>
      </div>

      <!-- État de chargement -->
      <div v-if="loading && candidaturesList.length === 0" class="flex flex-col gap-4">
        <div v-for="n in 3" :key="n" class="skeleton w-full h-32 rounded-2xl bg-base-300/40"></div>
      </div>

      <!-- État vide -->
      <div v-else-if="candidaturesList.length === 0" class="bg-white border border-base-200 rounded-3xl py-16 px-6 text-center shadow-sm mt-4">
        <div class="text-5xl opacity-50 mb-4">📭</div>
        <h3 class="text-xl font-black text-base-content tracking-tight mb-2">Aucune candidature</h3>
        <p class="text-sm text-base-content/50 font-medium max-w-sm mx-auto">
          Vous n'avez pas encore reçu de candidatures pour vos offres d'emploi.
        </p>
      </div>

      <!-- Liste des candidatures -->
      <div v-else class="flex flex-col gap-4">
        <div 
          v-for="candidature in candidaturesList" 
          :key="candidature.id"
          class="bg-white border border-base-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex flex-col md:flex-row gap-5 items-start">
            
            <!-- Avatar / Initiale du candidat -->
            <div class="avatar placeholder hidden sm:flex">
              <div class="bg-base-200 text-base-content rounded-full w-14 h-14 ring-1 ring-base-300">
                <img 
                  v-if="candidature.candidatProfile?.avatar" 
                  :src="candidature.candidatProfile.avatar" 
                  alt="Avatar" 
                />
                <span v-else class="text-lg font-bold">
                  {{ candidature.candidatProfile?.name?.charAt(0) || 'C' }}
                </span>
              </div>
            </div>

            <!-- Informations principales -->
            <div class="flex-grow w-full">
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <div>
                  <h3 class="text-lg font-bold text-base-content">
                    {{ candidature.candidatProfile?.name || 'Candidat inconnu' }}
                  </h3>
                  <p class="text-xs font-semibold text-[#006643] flex items-center gap-1 mt-0.5">
                    <span>💼</span> Pour l'offre : {{ getAnnonceTitle(candidature.annonceId) }}
                  </p>
                </div>
                
                <!-- Badge de statut actuel -->
                <div class="flex items-center gap-2">
                  <span class="text-xs text-base-content/40 font-medium whitespace-nowrap mr-2">
                    Le {{ candidature.createdAt }}
                  </span>
                  <div :class="['badge badge-sm font-bold p-3', getStatusBadgeClass(candidature.status)]">
                    {{ getStatusLabel(candidature.status) }}
                  </div>
                </div>
              </div>

              <!-- Message du candidat -->
              <div class="bg-base-100/50 rounded-xl p-3 border border-base-200/60 mt-3">
                <p class="text-sm text-base-content/70 italic line-clamp-3">
                  "{{ candidature.message || 'Aucun message joint à cette candidature.' }}"
                </p>
              </div>

              <!-- Actions (Changement de statut) -->
              <div class="mt-4 pt-4 border-t border-base-100 flex flex-wrap gap-2 justify-end items-center">
                <span class="text-xs font-bold text-base-content/40 uppercase mr-auto hidden md:block">
                  Action requise :
                </span>
                
                <!-- Bouton Voir le profil complet (Optionnel, à lier à ta route) -->
                <button class="btn btn-sm btn-ghost border-base-300 text-base-content font-bold">
                  Voir le profil
                </button>

                <!-- Actions rapides -->
                <div class="flex gap-2" v-if="candidature.status === 'en_etude'">
                  <button 
                    @click="updateStatus(candidature.id, 'refusee')"
                    class="btn btn-sm bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-200 font-bold"
                  >
                    Décliner
                  </button>
                  <button 
                    @click="updateStatus(candidature.id, 'acceptee')"
                    class="btn btn-sm bg-[#006643] hover:bg-[#004d32] text-white border-none font-bold"
                  >
                    Accepter
                  </button>
                </div>
                
                <!-- Permettre de remettre en étude si déjà traité -->
                <button 
                  v-else
                  @click="updateStatus(candidature.id, 'en_etude')"
                  class="btn btn-sm btn-ghost text-base-content/60 font-semibold"
                >
                  Remettre en étude
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useDb } from '../../composables/useDb';


const { currentUser } = useAuth();
const { 
  loading, 
  error, 
  fetchCandidaturesForEntreprise, 
  fetchAnnonces,
  updateCandidatureStatus 
} = useDb();

// États locaux
const candidaturesList = ref([]);
const annoncesList = ref([]);

// Au chargement du composant
onMounted(async () => {
  if (currentUser.value?.id && currentUser.value?.role === 'entreprise') {
    // 1. Récupérer les annonces pour pouvoir mapper l'ID de l'annonce avec son Titre
    annoncesList.value = await fetchAnnonces();
    
    // 2. Récupérer les candidatures destinées à cette entreprise
    candidaturesList.value = await fetchCandidaturesForEntreprise(currentUser.value.id);
    
    // Optionnel : Trier par date la plus récente (si le format createdAt le permet, sinon on reverse le tableau)
    candidaturesList.value.reverse(); 
  }
});

// --- Méthodes utilitaires ---

/**
 * Trouve le titre de l'annonce à partir de son ID
 */
const getAnnonceTitle = (annonceId) => {
  const annonce = annoncesList.value.find(a => a.id === annonceId);
  return annonce ? annonce.title : 'Offre archivée / introuvable';
};

/**
 * Met à jour le statut et met à jour l'état local pour refléter le changement sans recharger
 */
const updateStatus = async (candidatureId, newStatus) => {
  const success = await updateCandidatureStatus(candidatureId, newStatus);
  if (success) {
    const index = candidaturesList.value.findIndex(c => c.id === candidatureId);
    if (index !== -1) {
      candidaturesList.value[index].status = newStatus;
    }
  }
};

/**
 * Traduit les clés de statut en labels lisibles
 */
const getStatusLabel = (status) => {
  const labels = {
    'en_etude': 'En cours d\'étude',
    'acceptee': 'Acceptée',
    'refusee': 'Refusée'
  };
  return labels[status] || 'Inconnu';
};

/**
 * Attribue une classe couleur DaisyUI en fonction du statut
 */
const getStatusBadgeClass = (status) => {
  const classes = {
    'en_etude': 'badge-warning text-warning-content border-none',
    'acceptee': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'refusee': 'bg-rose-100 text-rose-700 border-rose-200'
  };
  return classes[status] || 'badge-ghost';
};
</script>