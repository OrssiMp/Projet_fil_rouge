<template>
  <div class="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
    <!-- HEADER -->
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="btn btn-circle btn-ghost">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <div>
        <h1 class="text-2xl font-black text-base-content tracking-tight">
          Profil du candidat
        </h1>
        <p class="text-sm font-semibold text-base-content/60 mt-1">
          Consultez les informations détaillées du candidat
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

    <!-- CANDIDAT NOT FOUND -->
    <div v-else-if="!candidat" class="alert alert-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <span>Candidat non trouvé</span>
    </div>

    <!-- CANDIDAT PROFILE -->
    <div v-else class="space-y-6">
      <!-- PROFILE HEADER -->
      <div class="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6">
        <div class="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div class="w-24 h-24 rounded-2xl bg-accent/10 border-2 border-accent/20 flex items-center justify-center shrink-0">
            <span class="text-3xl font-black text-accent">{{ candidatInitials }}</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 flex-wrap">
              <h2 class="text-2xl font-black text-base-content">{{ candidat.name }}</h2>
              <span class="badge badge-success font-bold text-white border-none">Candidat</span>
            </div>
            <p class="text-sm font-semibold text-base-content/60 mt-1">{{ candidat.email }}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              <span class="badge badge-outline badge-sm font-bold text-base-content/60">
                <i class="fa-solid fa-location-dot mr-1"></i> {{ candidat.location || 'Non spécifié' }}
              </span>
              <span class="badge badge-outline badge-sm font-bold text-base-content/60">
                <i class="fa-solid fa-phone mr-1"></i> {{ candidat.phone || 'Non spécifié' }}
              </span>
            </div>
          </div>
          <div class="flex gap-2 w-full md:w-auto">
            <button class="btn btn-accent text-white border-none flex-1 md:flex-none">
              <i class="fa-solid fa-envelope mr-2"></i> Contacter
            </button>
            <button class="btn btn-outline flex-1 md:flex-none">
              <i class="fa-solid fa-download mr-2"></i> CV
            </button>
          </div>
        </div>
      </div>

      <!-- DEMANDES D'EMPLOI DU CANDIDAT -->
      <div class="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6">
        <h3 class="text-lg font-black text-base-content mb-4">
          <i class="fa-solid fa-briefcase mr-2 text-accent"></i>
          Demandes d'emploi actives
        </h3>
        <div v-if="candidatDemandes.length === 0" class="text-center py-8 text-base-content/50 font-semibold">
          Aucune demande d'emploi active
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="demande in candidatDemandes"
            :key="demande.id"
            class="bg-base-50 rounded-xl border border-base-200 p-4"
          >
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-black text-base-content">{{ demande.title }}</h4>
                <p class="text-sm font-semibold text-base-content/60 mt-1 line-clamp-2">
                  {{ demande.presentation || 'Aucune description' }}
                </p>
                <div class="flex flex-wrap gap-2 mt-2">
                  <span class="badge badge-sm badge-outline font-bold text-base-content/60">
                    {{ demande.job || 'Poste recherché non spécifié' }}
                  </span>
                  <span class="badge badge-sm badge-outline font-bold text-base-content/60">
                    {{ demande.location || 'Localisation non spécifiée' }}
                  </span>
                  <span class="badge badge-sm badge-outline font-bold text-base-content/60">
                    Dispo: {{ demande.availability || 'Non spécifié' }}
                  </span>
                </div>
              </div>
              <span class="text-xs font-semibold text-base-content/40">
                {{ demande.createdAt || 'Date inconnue' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- COMPÉTENCES -->
      <div class="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6">
        <h3 class="text-lg font-black text-base-content mb-4">
          <i class="fa-solid fa-star mr-2 text-accent"></i>
          Compétences
        </h3>
        <div v-if="candidatDemandes.length === 0 || !candidatDemandes[0]?.skills" class="text-center py-8 text-base-content/50 font-semibold">
          Aucune compétence renseignée
        </div>
        <div v-else class="flex flex-wrap gap-2">
          <span
            v-for="skill in allSkills"
            :key="skill.name"
            class="badge badge-lg bg-accent/10 text-accent border-accent/20 font-bold"
          >
            {{ skill.name }} <span class="ml-1 opacity-50">({{ skill.level }})</span>
          </span>
        </div>
      </div>

      <!-- CANDIDATURES À VOS ANNONCES -->
      <div class="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6">
        <h3 class="text-lg font-black text-base-content mb-4">
          <i class="fa-solid fa-paper-plane mr-2 text-accent"></i>
          Candidatures à vos annonces
        </h3>
        <div v-if="candidatAnnonces.length === 0" class="text-center py-8 text-base-content/50 font-semibold">
          Ce candidat n'a pas postulé à vos annonces
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="candidature in candidatAnnonces"
            :key="candidature.id"
            class="bg-base-50 rounded-xl border border-base-200 p-4"
          >
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-black text-base-content">{{ candidature.job }}</h4>
                <p class="text-sm font-semibold text-base-content/60 mt-1">
                  {{ candidature.company }} • {{ candidature.location }}
                </p>
                <div class="flex flex-wrap gap-2 mt-2">
                  <span class="badge badge-sm badge-outline font-bold text-base-content/60">
                    {{ candidature.contractType }}
                  </span>
                  <span class="badge badge-sm badge-outline font-bold text-base-content/60">
                    {{ candidature.salary }}
                  </span>
                </div>
              </div>
              <div class="text-right">
                <span
                  class="badge badge-sm font-bold border-none"
                  :class="getStatusBadgeClass(candidature.status)"
                >
                  {{ getStatusLabel(candidature.status) }}
                </span>
                <p class="text-xs font-semibold text-base-content/40 mt-2">
                  {{ candidature.createdAt || 'Date inconnue' }}
                </p>
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
import { useRoute } from 'vue-router';
import { useAuth } from '../../composables/useAuth';

const route = useRoute();
const { currentUser } = useAuth();

const loading = ref(true);
const error = ref(null);
const candidat = ref(null);
const candidatDemandes = ref([]);
const candidatAnnonces = ref([]);
const allAnnonces = ref([]);
const allUsers = ref([]);
const allCandidatures = ref([]);

// Récupérer l'ID du candidat depuis les paramètres de route
const candidatId = computed(() => route.params.id);

// Initiales du candidat pour l'avatar
const candidatInitials = computed(() => {
  if (!candidat.value?.name) return '??';
  return candidat.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
});

// Toutes les compétences du candidat
const allSkills = computed(() => {
  const skills = [];
  candidatDemandes.value.forEach(demande => {
    if (demande.skills && Array.isArray(demande.skills)) {
      demande.skills.forEach(skill => {
        if (!skills.find(s => s.name === skill.name)) {
          skills.push(skill);
        }
      });
    }
  });
  return skills;
});

// Fonction pour obtenir le label de statut
const getStatusLabel = (status) => {
  const labels = {
    'sent': 'Envoyée',
    'pending': 'En attente',
    'viewed': 'En cours d\'étude',
    'interview_scheduled': 'Entretien planifié',
    'interview_completed': 'Entretien passé',
    'accepted': 'Acceptée',
    'rejected': 'Refusée',
  };
  return labels[status] || status;
};

// Fonction pour obtenir la classe de badge de statut
const getStatusBadgeClass = (status) => {
  const classes = {
    'sent': 'bg-blue-100 text-blue-700',
    'pending': 'bg-orange-100 text-orange-700',
    'viewed': 'bg-purple-100 text-purple-700',
    'interview_scheduled': 'bg-purple-100 text-purple-700',
    'interview_completed': 'bg-purple-100 text-purple-700',
    'accepted': 'bg-emerald-100 text-emerald-700',
    'rejected': 'bg-red-100 text-red-700',
  };
  return classes[status] || 'bg-base-200 text-base-content/70';
};

onMounted(() => {
  try {
    // Charger les données depuis localStorage
    allUsers.value = JSON.parse(localStorage.getItem('mosalah_database_users') || '[]');
    allAnnonces.value = JSON.parse(localStorage.getItem('mosalah_database_annonces') || '[]');
    allCandidatures.value = JSON.parse(localStorage.getItem('mosalah_database_candidatures') || '[]');
    const allDemandes = JSON.parse(localStorage.getItem('mosalah_database_demandes') || '[]');

    // Trouver le candidat
    candidat.value = allUsers.value.find(u => u.id === candidatId.value && u.role === 'candidat');

    if (!candidat.value) {
      error.value = 'Candidat non trouvé';
      loading.value = false;
      return;
    }

    // Charger les demandes d'emploi du candidat
    candidatDemandes.value = allDemandes.filter(d => d.candidatId === candidatId.value);

    // Charger les candidatures du candidat aux annonces de l'entreprise connectée
    if (currentUser.value?.role === 'entreprise') {
      const mesAnnoncesIds = allAnnonces.value
        .filter(a => a.entrepriseId === currentUser.value.id)
        .map(a => a.id);

      candidatAnnonces.value = allCandidatures.value
        .filter(c => c.candidatId === candidatId.value && mesAnnoncesIds.includes(c.annonceId))
        .map(c => {
          const annonce = allAnnonces.value.find(a => a.id === c.annonceId);
          return {
            ...c,
            job: annonce?.title || 'Poste inconnu',
            company: currentUser.value.name,
            location: annonce?.location || 'Non spécifié',
            contractType: annonce?.contractType || 'Non spécifié',
            salary: annonce?.salary || 'À débattre',
          };
        });
    }
  } catch (err) {
    console.error('Erreur lors du chargement du profil:', err);
    error.value = 'Erreur lors du chargement du profil';
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
