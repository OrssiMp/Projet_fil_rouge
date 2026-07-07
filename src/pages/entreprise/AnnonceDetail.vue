<template>
  <div class="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20">
    <!-- HEADER -->
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="btn btn-circle btn-ghost">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <div>
        <h1 class="text-2xl font-black text-base-content tracking-tight">
          Détails de l'annonce
        </h1>
        <p class="text-sm font-semibold text-base-content/60 mt-1">
          Gérez les candidatures reçues pour cette offre
        </p>
      </div>
    </div>

    <!-- LOADING STATE -->
    <div v-if="loading" class="flex justify-center py-20">
      <span class="loading loading-spinner loading-lg text-accent"></span>
    </div>

    <!-- ERROR STATE -->
    <div v-else-if="error" class="alert alert-error">
      <i class="fa-solid fa-circle-exclamation"></i>
      <span>{{ error }}</span>
    </div>

    <!-- ANNONCE NON TROUVÉE -->
    <div v-else-if="!annonce" class="alert alert-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <span>Annonce non trouvée</span>
    </div>

    <!-- CONTENU PRINCIPAL -->
    <div v-else class="space-y-6">
      <!-- INFO ANNONCE -->
      <div class="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6">
        <div class="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div class="flex gap-4">
            <div class="w-16 h-16 rounded-2xl bg-accent/10 border-2 border-accent/20 flex items-center justify-center shrink-0">
              <i class="fa-solid fa-briefcase text-2xl text-accent"></i>
            </div>
            <div>
              <h2 class="text-2xl font-black text-base-content">{{ annonce.title }}</h2>
              <p class="text-sm font-semibold text-base-content/60 mt-1">{{ annonce.company }}</p>
              <div class="flex flex-wrap gap-2 mt-3">
                <span class="badge badge-outline badge-sm font-bold text-base-content/60">
                  <i class="fa-solid fa-location-dot mr-1"></i> {{ annonce.location }}
                </span>
                <span class="badge badge-outline badge-sm font-bold text-base-content/60">
                  <i class="fa-solid fa-file-contract mr-1"></i> {{ annonce.contractType }}
                </span>
                <span class="badge badge-outline badge-sm font-bold text-base-content/60">
                  <i class="fa-solid fa-money-bill-wave mr-1"></i> {{ annonce.salary }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex gap-2 w-full md:w-auto">
            <button class="btn btn-outline flex-1 md:flex-none">
              <i class="fa-solid fa-pen mr-2"></i> Modifier
            </button>
            <button class="btn btn-error btn-outline flex-1 md:flex-none">
              <i class="fa-solid fa-trash-can mr-2"></i> Supprimer
            </button>
          </div>
        </div>
      </div>

      <!-- STATISTIQUES -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black uppercase text-base-content/50">Total</span>
            <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <i class="fa-solid fa-users text-sm"></i>
            </div>
          </div>
          <span class="text-2xl font-black">{{ candidatures.length }}</span>
        </div>
        <div class="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black uppercase text-base-content/50">Reçues</span>
            <div class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
              <i class="fa-solid fa-inbox text-sm"></i>
            </div>
          </div>
          <span class="text-2xl font-black">{{ stats.received }}</span>
        </div>
        <div class="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black uppercase text-base-content/50">En étude</span>
            <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <i class="fa-solid fa-magnifying-glass text-sm"></i>
            </div>
          </div>
          <span class="text-2xl font-black">{{ stats.review }}</span>
        </div>
        <div class="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black uppercase text-base-content/50">Acceptées</span>
            <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <i class="fa-solid fa-check text-sm"></i>
            </div>
          </div>
          <span class="text-2xl font-black">{{ stats.accepted }}</span>
        </div>
      </div>

      <!-- FILTRES -->
      <div class="flex flex-wrap gap-2">
        <button
          @click="filterStatus = 'all'"
          class="btn btn-sm"
          :class="filterStatus === 'all' ? 'btn-accent' : 'btn-outline'"
        >
          Toutes ({{ candidatures.length }})
        </button>
        <button
          @click="filterStatus = 'sent'"
          class="btn btn-sm"
          :class="filterStatus === 'sent' ? 'btn-accent' : 'btn-outline'"
        >
          Reçues ({{ stats.received }})
        </button>
        <button
          @click="filterStatus = 'viewed'"
          class="btn btn-sm"
          :class="filterStatus === 'viewed' ? 'btn-accent' : 'btn-outline'"
        >
          En étude ({{ stats.review }})
        </button>
        <button
          @click="filterStatus = 'accepted'"
          class="btn btn-sm"
          :class="filterStatus === 'accepted' ? 'btn-accent' : 'btn-outline'"
        >
          Acceptées ({{ stats.accepted }})
        </button>
        <button
          @click="filterStatus = 'rejected'"
          class="btn btn-sm"
          :class="filterStatus === 'rejected' ? 'btn-accent' : 'btn-outline'"
        >
          Refusées ({{ stats.rejected }})
        </button>
      </div>

      <!-- LISTE DES CANDIDATURES -->
      <div class="space-y-4">
        <h3 class="font-black text-lg">Candidatures reçues</h3>
        
        <div v-if="filteredCandidatures.length === 0" class="text-center py-8 text-base-content/50 font-semibold">
          Aucune candidature pour ce filtre
        </div>

        <div
          v-for="candidature in filteredCandidatures"
          :key="candidature.id"
          class="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6"
        >
          <div class="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div class="flex gap-4">
              <div class="w-14 h-14 rounded-full bg-base-200 border-2 border-base-300 flex items-center justify-center shrink-0">
                <span class="font-black text-lg">{{ getCandidatInitials(candidature.candidatId) }}</span>
              </div>
              <div>
                <h4 class="font-black text-lg text-base-content">{{ getCandidatName(candidature.candidatId) }}</h4>
                <p class="text-sm font-semibold text-base-content/60">{{ getCandidatEmail(candidature.candidatId) }}</p>
                <p class="text-xs font-semibold text-base-content/40 mt-1">
                  Candidat le {{ candidature.createdAt || 'Date inconnue' }}
                </p>
              </div>
            </div>

            <div class="flex flex-col gap-3 w-full md:w-auto">
              <select
                v-model="candidature.status"
                @change="updateCandidatureStatus(candidature)"
                class="select select-bordered select-sm w-full md:w-auto"
              >
                <option value="sent">Reçu</option>
                <option value="viewed">En étude</option>
                <option value="interview_scheduled">Entretien planifié</option>
                <option value="accepted">Accepté</option>
                <option value="rejected">Refusé</option>
              </select>
              <div class="flex gap-2">
                <button
                  @click="viewCandidatProfile(candidature.candidatId)"
                  class="btn btn-sm btn-outline flex-1 md:flex-none"
                >
                  <i class="fa-solid fa-user mr-1"></i> Profil
                </button>
                <button
                  @click="contactCandidat(candidature.candidatId)"
                  class="btn btn-sm btn-accent flex-1 md:flex-none"
                >
                  <i class="fa-solid fa-envelope mr-1"></i> Contacter
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
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth';

const route = useRoute();
const router = useRouter();
const { currentUser } = useAuth();

const loading = ref(true);
const error = ref(null);
const annonce = ref(null);
const candidatures = ref([]);
const allUsers = ref([]);
const allAnnonces = ref([]);
const filterStatus = ref('all');

const annonceId = computed(() => route.params.id);

// Statistiques des candidatures
const stats = computed(() => {
  return {
    received: candidatures.value.filter(c => c.status === 'sent').length,
    review: candidatures.value.filter(c => c.status === 'viewed').length,
    accepted: candidatures.value.filter(c => c.status === 'accepted').length,
    rejected: candidatures.value.filter(c => c.status === 'rejected').length,
  };
});

// Filtrer les candidatures selon le statut
const filteredCandidatures = computed(() => {
  if (filterStatus.value === 'all') return candidatures.value;
  return candidatures.value.filter(c => c.status === filterStatus.value);
});

// Obtenir les initiales du candidat
const getCandidatInitials = (candidatId) => {
  const candidat = allUsers.value.find(u => u.id === candidatId);
  if (!candidat?.name) return '??';
  return candidat.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

// Obtenir le nom du candidat
const getCandidatName = (candidatId) => {
  const candidat = allUsers.value.find(u => u.id === candidatId);
  return candidat?.name || 'Candidat inconnu';
};

// Obtenir l'email du candidat
const getCandidatEmail = (candidatId) => {
  const candidat = allUsers.value.find(u => u.id === candidatId);
  return candidat?.email || 'Email inconnu';
};

// Mettre à jour le statut d'une candidature
const updateCandidatureStatus = (candidature) => {
  try {
    const allCandidatures = JSON.parse(localStorage.getItem('mosalah_database_candidatures') || '[]');
    const index = allCandidatures.findIndex(c => c.id === candidature.id);
    
    if (index !== -1) {
      allCandidatures[index].status = candidature.status;
      localStorage.setItem('mosalah_database_candidatures', JSON.stringify(allCandidatures));
    }
  } catch (err) {
    console.error('Erreur lors de la mise à jour du statut:', err);
    alert('Erreur lors de la mise à jour du statut');
  }
};

// Voir le profil du candidat
const viewCandidatProfile = (candidatId) => {
  router.push(`/entreprise/candidats/${candidatId}`);
};

// Contacter le candidat
const contactCandidat = (candidatId) => {
  const candidat = allUsers.value.find(u => u.id === candidatId);
  if (candidat?.email) {
    window.open(`mailto:${candidat.email}`, '_blank');
  } else {
    alert('Email du candidat non disponible');
  }
};

onMounted(() => {
  try {
    // Vérifier que l'utilisateur est une entreprise
    if (currentUser.value?.role !== 'entreprise') {
      error.value = 'Accès non autorisé';
      loading.value = false;
      return;
    }

    // Charger les données depuis localStorage
    allAnnonces.value = JSON.parse(localStorage.getItem('mosalah_database_annonces') || '[]');
    allUsers.value = JSON.parse(localStorage.getItem('mosalah_database_users') || '[]');
    const allCandidaturesData = JSON.parse(localStorage.getItem('mosalah_database_candidatures') || '[]');

    // Trouver l'annonce
    annonce.value = allAnnonces.value.find(a => a.id === annonceId.value && a.entrepriseId === currentUser.value.id);

    if (!annonce.value) {
      error.value = 'Annonce non trouvée ou accès non autorisé';
      loading.value = false;
      return;
    }

    // Charger les candidatures pour cette annonce
    candidatures.value = allCandidaturesData.filter(c => c.annonceId === annonceId.value);
  } catch (err) {
    console.error('Erreur lors du chargement:', err);
    error.value = 'Erreur lors du chargement des données';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
