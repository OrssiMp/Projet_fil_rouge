<template>
  <div class="space-y-8 animate-fade-in select-none w-full">
    <div class="text-left">
      <h1 class="text-3xl font-black text-base-content tracking-tight">
        Bienvenue, {{ name || "Mosalah_user" }}
      </h1>
      <p class="text-sm text-base-content/60 font-medium mt-1">
        Voici un résumé de votre activité de recherche d'emploi.
      </p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <BaseCard
        v-for="(stat, idx) in stats"
        :key="idx"
        density="compact"
        class="h-28 relative overflow-hidden flex flex-col justify-between bg-white border border-base-200 rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.01)]"
      >
        <div>
          <p
            class="text-[11px] font-bold text-base-content/40 uppercase tracking-wider"
          >
            {{ stat.label }}
          </p>
          <p class="text-3xl font-black text-base-content mt-1 tracking-tight">
            {{ stat.value }}
          </p>
        </div>
        <div
          class="absolute right-4 bottom-4 text-base-content/10 text-3xl pointer-events-none"
        >
          <span class="text-2xl">{{ getStatEmoji(stat.icon) }}</span>
        </div>
      </BaseCard>
    </div>

    <div class="space-y-4">
      <div class="flex justify-between items-center px-1">
        <h2 class="text-lg font-black text-base-content tracking-tight">
          Mes dernières candidatures
        </h2>
        <RouterLink
          to="/candidat/applications"
          class="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
        >
          Voir tout
        </RouterLink>
      </div>

      <div class="space-y-3">
        <BaseCard
          v-for="app in applications"
          :key="app.id"
          density="compact"
          hoverable
          class="bg-white border border-base-200 rounded-2xl p-4 transition-all hover:border-base-300"
        >
          <div
            class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left"
          >
            <div class="flex items-center gap-4 min-w-0">
              <div
                class="w-11 h-11 rounded-xl bg-base-100 border border-base-200 flex items-center justify-center shrink-0 text-xl"
              >
                🏢
              </div>
              <div class="min-w-0">
                <h3
                  class="font-black text-base-content tracking-tight truncate"
                >
                  {{ app.role }}
                </h3>
                <p class="text-xs font-medium text-base-content/60 truncate">
                  {{ app.company }} •
                  <span class="text-base-content/40">{{ app.location }}</span>
                </p>
              </div>
            </div>

            <div
              class="flex items-center justify-between sm:justify-end gap-4 shrink-0"
            >
              <span class="text-xs font-medium text-base-content/40">
                {{ app.timeAgo }}
              </span>
              <span
                class="text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-md border"
                :class="statusClasses(app.status)"
              >
                {{ statusLabel(app.status) }}
              </span>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, computed, onMounted } from "vue";
import { useAuth } from "../../composables/useAuth";
import { useDb } from "../../composables/useDb";

//@ts-check
const { currentUser } = useAuth();
const { loading, error } = useDb();

const name = computed(() => currentUser.value?.name || "Mosalah_user");

// Charger toutes les candidatures depuis localStorage
const allCandidatures = ref([]);
const allAnnonces = ref([]);
const allUsers = ref([]);

// Charger les données au montage
onMounted(() => {
  allCandidatures.value = JSON.parse(
    localStorage.getItem("mosalah_database_candidatures") || "[]",
  );
  allAnnonces.value = JSON.parse(
    localStorage.getItem("mosalah_database_annonces") || "[]",
  );
  allUsers.value = JSON.parse(
    localStorage.getItem("mosalah_database_users") || "[]",
  );
});

// Filtrer les candidatures du candidat connecté
const myCandidatures = computed(() => {
  if (!currentUser.value?.id) return [];
  return allCandidatures.value
    .filter((c) => c.candidatId === currentUser.value.id)
    .map((c) => {
      const annonce = allAnnonces.value.find((a) => a.id === c.annonceId);
      const entreprise = annonce
        ? allUsers.value.find((u) => u.id === annonce.entrepriseId)
        : null;
      return {
        ...c,
        job: annonce?.title || "Poste inconnu",
        company: entreprise?.name || "Entreprise inconnue",
        location: annonce?.location || "Non spécifié",
      };
    });
});

// Calculer les statistiques dynamiquement
const stats = computed(() => {
  const candidatures = myCandidatures.value;
  const total = candidatures.length;
  const pending = candidatures.filter(
    (c) => c.status === "sent" || c.status === "pending",
  ).length;
  const accepted = candidatures.filter((c) => c.status === "accepted").length;
  const rejected = candidatures.filter((c) => c.status === "rejected").length;

  return [
    { label: "Candidatures envoyées", value: total, icon: "candidat" },
    { label: "En attente", value: pending, icon: "cloche" },
    { label: "Acceptées", value: accepted, icon: "validation" },
    { label: "Refusées", value: rejected, icon: "lock" },
  ];
});

// Formater les candidatures pour l'affichage
const applications = computed(() => {
  return myCandidatures.value.slice(0, 5).map((c) => ({
    id: c.id,
    role: c.job,
    company: c.company,
    location: c.location,
    timeAgo: c.createdAt ? `Publié le ${c.createdAt}` : "Date inconnue",
    status: c.status === "sent" ? "pending" : c.status,
  }));
});

const getStatEmoji = (icon) => {
  if (icon === "candidat") return "📁";
  if (icon === "cloche") return "⏳";
  if (icon === "validation") return "✅";
  return "❌";
};

const statusClasses = (status) => {
  switch (status) {
    case "accepted":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200/60";
    case "rejected":
      return "bg-rose-50 text-rose-700 border-rose-200/60";
    default:
      return "bg-base-200 text-base-content/70 border-transparent";
  }
};

const statusLabel = (status) => {
  if (status === "accepted") return "Acceptée";
  if (status === "pending") return "En attente";
  if (status === "rejected") return "Refusée";
  return status;
};
</script>
