<template>
  <div class="max-w-7xl mx-auto space-y-8 animate-fade-in-up pb-20">
    <header class="space-y-6">
      <div>
        <h1 class="text-3xl font-black text-base-content tracking-tight">Espace Candidat</h1>
        <p class="text-sm font-semibold text-base-content/60 mt-1">
          Suivez vos postulations et gérez vos annonces de recherche d'emploi.
        </p>
      </div>

      <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="n in 4" :key="n" class="skeleton h-24 rounded-2xl"></div>
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black uppercase text-base-content/50">Envoyées</span>
            <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <i class="fa-solid fa-paper-plane text-sm"></i>
            </div>
          </div>
          <span class="text-2xl font-black">{{ candidatureStats.total }}</span>
        </div>
        <div class="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black uppercase text-base-content/50">En étude</span>
            <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <i class="fa-solid fa-hourglass-half text-sm"></i>
            </div>
          </div>
          <span class="text-2xl font-black">{{ candidatureStats.enEtude }}</span>
        </div>
        <div class="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black uppercase text-base-content/50">Acceptées</span>
            <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <i class="fa-solid fa-circle-check text-sm"></i>
            </div>
          </div>
          <span class="text-2xl font-black">{{ candidatureStats.accepted }}</span>
        </div>
        <div class="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black uppercase text-base-content/50">Refusées</span>
            <div class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <i class="fa-solid fa-circle-xmark text-sm"></i>
            </div>
          </div>
          <span class="text-2xl font-black">{{ candidatureStats.rejected }}</span>
        </div>
      </div>
      <!-- Carte "Entretiens" retirée : pas de système de planification d'entretien dans useDb -->
    </header>

    <div class="flex gap-4 border-b border-base-200 pb-px">
      <button @click="activeMainTab = 'candidatures'" class="pb-3 text-sm font-black transition-colors relative"
        :class="activeMainTab === 'candidatures' ? 'text-accent' : 'text-base-content/50 hover:text-base-content'">
        Mes candidatures
        <div v-if="activeMainTab === 'candidatures'" class="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full"></div>
      </button>
      <button @click="activeMainTab = 'demandes'" class="pb-3 text-sm font-black transition-colors relative"
        :class="activeMainTab === 'demandes' ? 'text-accent' : 'text-base-content/50 hover:text-base-content'">
        Mes demandes d'emploi
        <div v-if="activeMainTab === 'demandes'" class="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full"></div>
      </button>
    </div>

    <!-- CANDIDATURES -->
    <section v-if="activeMainTab === 'candidatures'" class="space-y-6">
      <div class="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div class="overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 hide-scrollbar">
          <div class="flex gap-2">
            <button v-for="tab in statusTabs" :key="tab.id" @click="activeStatus = tab.id"
              class="badge badge-lg border-none font-bold px-4 py-3 whitespace-nowrap cursor-pointer transition-all"
              :class="activeStatus === tab.id ? 'bg-base-content text-base-100 shadow-md' : 'bg-base-200 text-base-content/70 hover:bg-base-300'">
              {{ tab.label }}
              <span v-if="tab.count" class="ml-2 opacity-50 text-xs">{{ tab.count }}</span>
            </button>
          </div>
        </div>

        <div class="flex gap-2 w-full xl:w-auto shrink-0">
          <div class="join w-full sm:w-auto">
            <input v-model="searchQuery" class="input input-sm input-bordered join-item w-full sm:w-64 focus:border-accent"
              placeholder="Rechercher une entreprise ou un poste..." />
            <select v-model="domainFilter" class="select select-sm select-bordered join-item hidden sm:block focus:border-accent font-semibold">
              <option value="">Tous les domaines</option>
              <option v-for="cat in availableCategories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="n in 2" :key="n" class="skeleton h-40 rounded-2xl"></div>
      </div>

      <div v-else-if="filteredCandidatures.length === 0" class="bg-base-100 border border-base-200 rounded-2xl py-16 text-center">
        <p class="text-3xl mb-2">📭</p>
        <h3 class="font-black text-base-content tracking-tight text-lg mb-1">Aucune candidature</h3>
        <p class="text-xs text-base-content/50 font-medium max-w-sm mx-auto">
          {{ myCandidatures.length === 0
            ? "Vous n'avez pas encore postulé à une offre. Parcourez les offres disponibles pour commencer."
            : "Aucune candidature ne correspond à vos filtres actuels." }}
        </p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="candidature in filteredCandidatures" :key="candidature.id"
          class="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-5 hover:border-accent/50 transition-colors group">
          <div class="flex justify-between items-start mb-4">
            <div class="flex gap-4">
              <div class="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-briefcase text-orange-500 text-xl"></i>
              </div>
              <div>
                <h3 class="font-black text-base-content line-clamp-1 group-hover:text-accent transition-colors">{{ candidature.job }}</h3>
                <p class="text-xs font-bold text-base-content/60">{{ candidature.company }} • {{ candidature.location }}</p>
              </div>
            </div>
            <span class="badge badge-sm font-bold border-none" :class="getStatusBadgeClass(candidature.status)">
              {{ getStatusLabel(candidature.status) }}
            </span>
          </div>

          <div class="flex flex-wrap gap-2 text-[11px] font-bold text-base-content/70 mb-4">
            <span class="bg-base-50 px-2 py-1 rounded-md border border-base-200">
              <i class="fa-solid fa-file-contract mr-1"></i> {{ candidature.contractType }}
            </span>
            <span class="bg-base-50 px-2 py-1 rounded-md border border-base-200">
              <i class="fa-regular fa-clock mr-1"></i> {{ candidature.createdAt || "Date inconnue" }}
            </span>
            <span class="bg-base-50 px-2 py-1 rounded-md border border-base-200">
              <i class="fa-solid fa-money-bill-wave mr-1"></i> {{ candidature.salary }}
            </span>
          </div>

          <div class="divider my-2"></div>

          <div class="flex flex-col sm:flex-row gap-2 justify-between items-center mt-2">
            <p class="text-xs font-semibold text-base-content/50">
              <i class="fa-solid fa-paper-plane mr-1"></i> Envoyée le {{ candidature.createdAt }}
            </p>
            <div class="flex gap-2 w-full sm:w-auto">
              <button @click="handleWithdraw(candidature.id)" :disabled="withdrawingId === candidature.id"
                class="btn btn-xs btn-outline btn-error w-1/2 sm:w-auto">
                <i class="fa-solid fa-trash-can"></i> Retirer
              </button>
              <button @click="goToJobDetail(candidature.annonceId)" class="btn btn-xs btn-neutral w-1/2 sm:w-auto">
                Détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DEMANDES D'EMPLOI -->
    <section v-if="activeMainTab === 'demandes'" class="space-y-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-accent/5 p-6 rounded-2xl border border-accent/20">
        <div>
          <h2 class="text-lg font-black text-accent">Vous ne trouvez pas l'offre idéale ?</h2>
          <p class="text-sm font-semibold text-base-content/70 mt-1 max-w-xl">
            Publiez une annonce indiquant que vous êtes à la recherche d'opportunités. Les entreprises viendront directement à vous.
          </p>
        </div>
        <button @click="showDemandeModal = true" class="btn bg-accent text-white border-none shadow-lg shadow-accent/20 rounded-xl px-6 font-black shrink-0">
          <i class="fa-solid fa-plus"></i> Publier une demande
        </button>
      </div>

      <h3 class="font-black text-lg mt-8">Vos annonces actives</h3>

      <div v-if="isLoading" class="space-y-4">
        <div class="skeleton h-32 rounded-2xl"></div>
      </div>

      <div v-else-if="myDemandes.length === 0" class="bg-base-100 border border-base-200 rounded-2xl py-12 text-center">
        <p class="text-xs text-base-content/50 font-medium">Vous n'avez publié aucune demande d'emploi pour le moment.</p>
      </div>

      <div v-else class="space-y-4">
        <div v-for="demande in myDemandes" :key="demande.id"
          class="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div class="flex gap-4 flex-1">
            <div class="w-14 h-14 rounded-full bg-base-200 border-2 border-base-300 flex items-center justify-center shrink-0">
              <span class="font-black text-lg">{{ userInitials }}</span>
            </div>
            <div>
              <div class="flex items-center gap-3 flex-wrap">
                <h3 class="font-black text-lg text-base-content">{{ demande.title }}</h3>
                <span class="badge badge-sm badge-success font-bold text-white border-none">En ligne</span>
              </div>
              <p class="text-sm font-semibold text-base-content/70 mt-1 line-clamp-2">
                {{ demande.description || 'Aucune description fournie.' }}
              </p>
              <p class="text-[11px] font-bold text-base-content/40 mt-2">Publiée le {{ demande.createdAt }}</p>
            </div>
          </div>

          <div class="flex gap-2 w-full lg:w-auto shrink-0">
            <!-- "Mettre en pause"/"Modifier" retirés : pas de champ statut ni de fonction d'édition dans useDb -->
            <button @click="handleDeleteDemande(demande.id)" :disabled="deletingDemandeId === demande.id" class="btn btn-sm btn-outline btn-error">
              <i class="fa-solid fa-trash-can"></i> Supprimer
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- MODAL DEMANDE -->
    <div v-if="showDemandeModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-base-100 rounded-2xl border border-base-200 shadow-2xl w-full max-w-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-black text-base-content">Publier une demande d'emploi</h3>
          <button @click="closeDemandeModal" class="btn btn-sm btn-circle btn-ghost">✕</button>
        </div>

        <div v-if="demandeError" class="alert alert-error text-xs font-semibold mb-3">{{ demandeError }}</div>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-black uppercase tracking-wider text-base-content/50 mb-1.5">Titre du profil recherché *</label>
            <input v-model="demandeForm.title" type="text" placeholder="Ex: Développeur Vue.js Senior"
              class="input input-bordered w-full rounded-xl text-sm font-medium" />
          </div>
          <div>
            <label class="block text-xs font-black uppercase tracking-wider text-base-content/50 mb-1.5">Description *</label>
            <textarea v-model="demandeForm.description" rows="4"
              placeholder="Décrivez le poste que vous recherchez, votre expérience et vos disponibilités..."
              class="textarea textarea-bordered w-full rounded-xl text-sm font-medium"></textarea>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button @click="closeDemandeModal" class="btn btn-ghost btn-sm" :disabled="isSubmittingDemande">Annuler</button>
          <button @click="handleCreateDemande" class="btn btn-accent text-white btn-sm" :disabled="isSubmittingDemande">
            <span v-if="isSubmittingDemande" class="loading loading-spinner loading-xs"></span>
            Publier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth";
import { useDb } from "../../composables/useDb";

const router = useRouter();
const { currentUser } = useAuth();
const {
  fetchCandidaturesForCandidat,
  withdrawCandidature,
  fetchDemandesByCandidat,
  createDemandeEmploi,
  deleteDemandeEmploi,
} = useDb();

const activeMainTab = ref("candidatures");
const activeStatus = ref("all");
const searchQuery = ref("");
const domainFilter = ref("");

const isLoading = ref(true);
const myCandidatures = ref([]);
const myDemandes = ref([]);

const withdrawingId = ref(null);
const deletingDemandeId = ref(null);

const showDemandeModal = ref(false);
const isSubmittingDemande = ref(false);
const demandeError = ref("");
const demandeForm = ref({ title: "", description: "" });

const userInitials = computed(() => {
  const name = currentUser.value?.name;
  if (!name) return "??";
  return name.trim().split(/\s+/).filter(Boolean).map((n) => n[0]).join("").substring(0, 2).toUpperCase();
});

const loadData = async () => {
  isLoading.value = true;
  if (!currentUser.value) {
    isLoading.value = false;
    return;
  }
  const [candidatures, demandes] = await Promise.all([
    fetchCandidaturesForCandidat(currentUser.value.id),
    fetchDemandesByCandidat(currentUser.value.id),
  ]);
  myCandidatures.value = candidatures || [];
  myDemandes.value = demandes || [];
  isLoading.value = false;
};

onMounted(loadData);

const candidatureStats = computed(() => {
  const list = myCandidatures.value;
  return {
    total: list.length,
    enEtude: list.filter((c) => (c.status || "en_etude") === "en_etude").length,
    accepted: list.filter((c) => c.status === "acceptee").length,
    rejected: list.filter((c) => c.status === "refusee").length,
  };
});

const statusTabs = computed(() => [
  { id: "all", label: "Toutes", count: candidatureStats.value.total },
  { id: "en_etude", label: "En étude", count: candidatureStats.value.enEtude },
  { id: "acceptee", label: "Acceptées", count: candidatureStats.value.accepted },
  { id: "refusee", label: "Refusées", count: candidatureStats.value.rejected },
]);

// Domaines réellement présents dans mes candidatures (pas de liste inventée)
const availableCategories = computed(() => {
  return Array.from(new Set(myCandidatures.value.map((c) => c.category).filter(Boolean)));
});

const filteredCandidatures = computed(() => {
  return myCandidatures.value.filter((c) => {
    const matchesStatus = activeStatus.value === "all" || c.status === activeStatus.value;
    const search = searchQuery.value.toLowerCase();
    const matchesSearch = !search || c.company.toLowerCase().includes(search) || c.job.toLowerCase().includes(search);
    const matchesDomain = !domainFilter.value || c.category === domainFilter.value;
    return matchesStatus && matchesSearch && matchesDomain;
  });
});

const getStatusLabel = (status) => ({
  en_etude: "En cours d'étude",
  acceptee: "Acceptée",
  refusee: "Refusée",
}[status] || "En cours d'étude");

const getStatusBadgeClass = (status) => ({
  en_etude: "bg-purple-100 text-purple-700",
  acceptee: "bg-emerald-100 text-emerald-700",
  refusee: "bg-red-100 text-red-700",
}[status] || "bg-base-200 text-base-content/70");

const goToJobDetail = (annonceId) => router.push({ name: "JobDetail", params: { id: annonceId } });

const handleWithdraw = async (candidatureId) => {
  if (!confirm("Voulez-vous vraiment retirer cette candidature ?")) return;
  withdrawingId.value = candidatureId;
  const success = await withdrawCandidature(candidatureId);
  if (success) myCandidatures.value = myCandidatures.value.filter((c) => c.id !== candidatureId);
  withdrawingId.value = null;
};

const closeDemandeModal = () => {
  showDemandeModal.value = false;
  demandeError.value = "";
  demandeForm.value = { title: "", description: "" };
};

const handleCreateDemande = async () => {
  demandeError.value = "";
  if (!demandeForm.value.title || !demandeForm.value.description) {
    demandeError.value = "Merci de remplir le titre et la description.";
    return;
  }
  isSubmittingDemande.value = true;
  const newDemande = await createDemandeEmploi({
    candidatId: currentUser.value.id,
    title: demandeForm.value.title,
    description: demandeForm.value.description,
  });
  isSubmittingDemande.value = false;

  if (newDemande) {
    myDemandes.value.unshift(newDemande);
    closeDemandeModal();
  } else {
    demandeError.value = "Une erreur est survenue lors de la publication.";
  }
};

const handleDeleteDemande = async (demandeId) => {
  if (!confirm("Voulez-vous vraiment supprimer cette demande ?")) return;
  deletingDemandeId.value = demandeId;
  const success = await deleteDemandeEmploi(demandeId);
  if (success) myDemandes.value = myDemandes.value.filter((d) => d.id !== demandeId);
  deletingDemandeId.value = null;
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>