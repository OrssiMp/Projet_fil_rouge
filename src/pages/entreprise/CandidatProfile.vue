<template>
  <div class="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
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

    <div v-if="pageLoading" class="flex justify-center py-20">
      <span class="loading loading-spinner loading-lg text-accent"></span>
    </div>

    <div v-else-if="notFound" class="alert alert-warning">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <span>Candidat non trouvé</span>
    </div>

    <div v-else class="space-y-6">
      <!-- EN-TÊTE DU PROFIL -->
      <div class="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6">
        <div class="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div class="w-24 h-24 rounded-2xl bg-accent/10 border-2 border-accent/20 flex items-center justify-center shrink-0 overflow-hidden">
            <img v-if="candidat.avatar" :src="candidat.avatar" :alt="candidat.name" class="w-full h-full object-cover" />
            <span v-else class="text-3xl font-black text-accent">{{ candidatInitials }}</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 flex-wrap">
              <h2 class="text-2xl font-black text-base-content">{{ candidat.name || 'Nom non renseigné' }}</h2>
              <span class="badge badge-success font-bold text-white border-none">Candidat</span>
            </div>
            <p class="text-sm font-semibold text-base-content/60 mt-1">{{ candidat.email || 'Email non renseigné' }}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              <span class="badge badge-outline badge-sm font-bold text-base-content/60">
                <i class="fa-solid fa-location-dot mr-1"></i> {{ candidat.location || 'Non spécifié' }}
              </span>
              <span class="badge badge-outline badge-sm font-bold text-base-content/60">
                <i class="fa-solid fa-clock mr-1"></i> {{ availabilityLabel }}
              </span>
            </div>
          </div>
          <div class="flex gap-2 w-full md:w-auto">
            <button class="btn btn-accent text-white border-none flex-1 md:flex-none">
              <i class="fa-solid fa-envelope mr-2"></i> Contacter
            </button>
            <button class="btn btn-outline flex-1 md:flex-none" disabled title="CV non disponible pour l'instant">
              <i class="fa-solid fa-download mr-2"></i> CV
            </button>
          </div>
        </div>
      </div>

      <!-- DEMANDES D'EMPLOI -->
      <div class="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6">
        <h3 class="text-lg font-black text-base-content mb-4">
          <i class="fa-solid fa-briefcase mr-2 text-accent"></i>
          Demandes d'emploi actives
        </h3>
        <div v-if="candidatDemandes.length === 0" class="text-center py-8 text-base-content/50 font-semibold">
          Aucune demande d'emploi active
        </div>
        <div v-else class="space-y-4">
          <div v-for="demande in candidatDemandes" :key="demande.id" class="bg-base-50 rounded-xl border border-base-200 p-4">
            <div class="flex justify-between items-start gap-4">
              <div>
                <h4 class="font-black text-base-content">{{ demande.title }}</h4>
                <p class="text-sm font-semibold text-base-content/60 mt-1 line-clamp-2">
                  {{ demande.description || 'Aucune description' }}
                </p>
              </div>
              <span class="text-xs font-semibold text-base-content/40 shrink-0">
                {{ demande.createdAt || 'Date inconnue' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- COMPÉTENCES : tirées directement du profil candidat (useAuth), pas des demandes -->
      <div class="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6">
        <h3 class="text-lg font-black text-base-content mb-4">
          <i class="fa-solid fa-star mr-2 text-accent"></i>
          Compétences
        </h3>
        <div v-if="!candidat.skills || candidat.skills.length === 0" class="text-center py-8 text-base-content/50 font-semibold">
          Aucune compétence renseignée
        </div>
        <div v-else class="flex flex-wrap gap-2">
          <span v-for="skill in candidat.skills" :key="skill" class="badge badge-lg bg-accent/10 text-accent border-accent/20 font-bold">
            {{ skill }}
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
          <div v-for="candidature in candidatAnnonces" :key="candidature.id" class="bg-base-50 rounded-xl border border-base-200 p-4">
            <div class="flex flex-col md:flex-row justify-between items-start gap-4">
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

              <div class="flex flex-col items-end gap-2 shrink-0">
                <span class="badge badge-sm font-bold border-none" :class="getStatusBadgeClass(candidature.status)">
                  {{ getStatusLabel(candidature.status) }}
                </span>
                <p class="text-xs font-semibold text-base-content/40">
                  {{ candidature.createdAt || 'Date inconnue' }}
                </p>

                <div class="flex gap-1 mt-1">
                  <button
                    v-if="candidature.status !== 'acceptee'"
                    :disabled="updatingStatusId === candidature.id"
                    @click="handleStatusChange(candidature.id, 'acceptee')"
                    class="btn btn-xs rounded-lg font-bold normal-case bg-emerald-50 text-emerald-700 border-0 hover:bg-emerald-100"
                  >
                    Accepter
                  </button>
                  <button
                    v-if="candidature.status !== 'refusee'"
                    :disabled="updatingStatusId === candidature.id"
                    @click="handleStatusChange(candidature.id, 'refusee')"
                    class="btn btn-xs rounded-lg font-bold normal-case bg-red-50 text-red-700 border-0 hover:bg-red-100"
                  >
                    Refuser
                  </button>
                </div>
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
import { useDb } from '../../composables/useDb';

const route = useRoute();
const { currentUser } = useAuth();
const {
  getUserById,
  fetchDemandesByCandidat,
  fetchAnnonces,
  fetchCandidaturesForEntreprise,
  updateCandidatureStatus,
} = useDb();

const candidat = ref(null);
const candidatDemandes = ref([]);
const candidatAnnonces = ref([]);
const pageLoading = ref(true);
const notFound = ref(false);
const updatingStatusId = ref(null);

const candidatId = computed(() => Number(route.params.id));

const candidatInitials = computed(() => {
  if (!candidat.value?.name) return '??';
  return candidat.value.name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
});

const availabilityLabel = computed(() => {
  const a = candidat.value?.availability;
  if (a === true) return 'Disponible immédiatement';
  if (a === false) return 'Non disponible';
  return a || 'Non précisé';
});

const statusLabels = {
  en_etude: "En cours d'étude",
  acceptee: 'Acceptée',
  refusee: 'Refusée',
};
const statusClasses = {
  en_etude: 'bg-purple-100 text-purple-700',
  acceptee: 'bg-emerald-100 text-emerald-700',
  refusee: 'bg-red-100 text-red-700',
};
const getStatusLabel = (status) => statusLabels[status] || "En cours d'étude";
const getStatusBadgeClass = (status) => statusClasses[status] || 'bg-base-200 text-base-content/70';

const loadCandidatProfile = async () => {
  pageLoading.value = true;

  const found = await getUserById(candidatId.value);
  if (!found || found.role !== 'candidat') {
    notFound.value = true;
    pageLoading.value = false;
    return;
  }
  candidat.value = found;

  candidatDemandes.value = await fetchDemandesByCandidat(candidatId.value);

  if (currentUser.value?.role === 'entreprise') {
    const [allAnnonces, mesCandidatures] = await Promise.all([
      fetchAnnonces(),
      fetchCandidaturesForEntreprise(currentUser.value.id),
    ]);

    candidatAnnonces.value = mesCandidatures
      .filter((c) => c.candidatId === candidatId.value)
      .map((c) => {
        const annonce = allAnnonces.find((a) => a.id === c.annonceId);
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

  pageLoading.value = false;
};

onMounted(loadCandidatProfile);

// Change le statut d'une candidature (déclenche aussi la notification au candidat via useDb)
const handleStatusChange = async (candidatureId, newStatus) => {
  updatingStatusId.value = candidatureId;
  const success = await updateCandidatureStatus(candidatureId, newStatus);
  if (success) {
    const item = candidatAnnonces.value.find((c) => c.id === candidatureId);
    if (item) item.status = newStatus;
  }
  updatingStatusId.value = null;
};
</script>