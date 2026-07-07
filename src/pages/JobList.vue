<template>
  <div class="min-h-screen bg-base-200/40 pb-16 flex flex-col">
    <header class="bg-white border-b border-base-200 py-10 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-black text-base-content tracking-tight mb-6">
          Trouvez votre prochain emploi
        </h1>
        <p class="text-sm text-base-content/60 font-medium -mt-4 mb-6">
          Explorez les offres publiées par les entreprises.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-3 bg-white">
          <div
            class="md:col-span-5 flex items-center bg-base-100 rounded-xl px-3 border border-base-300"
          >
            <span class="opacity-40 text-sm">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Poste, entreprise ou compétence"
              class="w-full bg-transparent p-3 text-sm font-medium text-base-content placeholder-base-content/40 focus:outline-none"
            />
          </div>

          <div
            class="md:col-span-5 flex items-center bg-base-100 rounded-xl px-3 border border-base-300"
          >
            <span class="opacity-40 text-sm">📍</span>
            <input
              v-model="locationQuery"
              type="text"
              placeholder="Localisation (ex: Brazzaville)"
              class="w-full bg-transparent p-3 text-sm font-medium text-base-content placeholder-base-content/40 focus:outline-none"
            />
          </div>

          <button
            @click="resetFilters"
            class="md:col-span-2 btn btn-md bg-emerald-500 hover:bg-emerald-600 border-none text-white font-bold rounded-xl h-full"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl w-full mx-auto px-4 mt-8 flex-grow">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Barre latérale des filtres -->
        <aside
          class="lg:col-span-3 flex flex-col gap-5 text-left bg-white p-5 rounded-2xl border border-base-200"
        >
          <h2 class="text-lg font-black text-base-content tracking-tight mb-1">
            Filtres
          </h2>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-base-content/70"
              >Type de contrat</label
            >
            <select
              v-model="filters.type"
              class="select select-bordered w-full rounded-xl bg-white text-sm font-medium border-base-300 focus:outline-none"
            >
              <option value="all">Tous les types</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
            </select>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-base-content/70"
              >Secteur d'activité</label
            >
            <select
              v-model="filters.sector"
              class="select select-bordered w-full rounded-xl bg-white text-sm font-medium border-base-300 focus:outline-none"
            >
              <option value="all">Tous les secteurs</option>
              <option value="Tech">Technologie / Informatique</option>
              <option value="Data">Data & Business Intelligence</option>
              <option value="Marketing">Marketing & Communication</option>
            </select>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-base-content/70"
              >Région</label
            >
            <select
              v-model="filters.region"
              class="select select-bordered w-full rounded-xl bg-white text-sm font-medium border-base-300 focus:outline-none"
            >
              <option value="all">Toutes les régions</option>
              <option value="Brazzaville">Brazzaville</option>
              <option value="Pointe-Noire">Pointe-Noire</option>
              <option value="Remote">100% Remote</option>
            </select>
          </div>
        </aside>

        <!-- Liste des offres -->
        <section class="lg:col-span-9 flex flex-col gap-4">
          <div
            class="text-xs font-bold text-base-content/60 text-left px-1 mb-1"
          >
            {{ filteredJobs.length }}
            {{ filteredJobs.length > 1 ? "offres trouvées" : "offre trouvée" }}
          </div>

          <div v-if="loading" class="flex justify-center items-center py-12">
            <span
              class="loading loading-spinner loading-lg text-emerald-500"
            ></span>
          </div>

          <div
            v-else-if="filteredJobs.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <JobCard
              v-for="job in filteredJobs"
              :key="job.id"
              :job="job"
              :id="job.id"
            />
          </div>

          <div
            v-else
            class="text-center py-12 text-base-content/50 font-medium bg-white rounded-2xl border border-base-200"
          >
            Aucun poste ne correspond à vos critères de recherche actuels.
          </div>

          <!-- Pagination (Statique) -->
          <div
            v-if="filteredJobs.length > 0 && !loading"
            class="flex justify-center items-center gap-1 mt-8"
          >
            <button
              class="btn btn-sm bg-white border border-base-300 hover:bg-base-100 text-base-content px-2 rounded-lg"
            >
              ‹
            </button>
            <button
              class="btn btn-sm bg-emerald-500 hover:bg-emerald-600 border-none text-white font-bold px-3 rounded-lg"
            >
              1
            </button>
            <button
              class="btn btn-sm bg-white border border-base-300 hover:bg-base-100 text-base-content px-3 rounded-lg"
            >
              2
            </button>
            <span class="text-xs px-1 text-base-content/40">...</span>
            <button
              class="btn btn-sm bg-white border border-base-300 hover:bg-base-100 text-base-content px-2 rounded-lg"
            >
              ›
            </button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { useDb } from "../composables/useDb";
import JobCard from "../components/JobCard.vue";

const route = useRoute();
const { currentUser } = useAuth();
const { fetchAnnonces, annonces, fetchUsers, users, loading } = useDb();

const searchQuery = ref(route.query.q || "");
const locationQuery = ref("");

const filters = reactive({
  type: "all",
  sector: "all",
  region: "all",
});

onMounted(async () => {
  // Chargement propre des données via ton composable de base de données
  await fetchUsers();
  await fetchAnnonces();
});

// Données statiques locales alignées sur les filtres réels
const mockJobs = ref([
  {
    id: "mock_1",
    title: "Développeur Fullstack React/Node.js",
    company: "TechNova Solutions",
    location: "Brazzaville (Hybride)",
    region: "Brazzaville",
    type: "CDI",
    sector: "Tech",
    postedAt: "2 jours",
    salary: "À débattre",
    description:
      "Nous recherchons un développeur Fullstack expérimenté pour rejoindre notre équipe produit...",
    shortDescription:
      "Nous recherchons un développeur Fullstack expérimenté...",
    hasApplied: false,
  },
  {
    id: "mock_2",
    title: "Data Analyst Senior",
    company: "FinData Partners",
    location: "Pointe-Noire",
    region: "Pointe-Noire",
    type: "CDI",
    sector: "Data",
    postedAt: "4 jours",
    salary: "À débattre",
    description:
      "En tant que Data Analyst Senior, vous accompagnerez nos clients dans la compréhension de leurs données financières...",
    shortDescription:
      "En tant que Data Analyst Senior, vous accompagnerez nos clients...",
    hasApplied: false,
  },
  {
    id: "mock_3",
    title: "Chef de Projet Marketing Digital",
    company: "Agence Creative Pulse",
    location: "100% Remote",
    region: "Remote",
    type: "CDD",
    sector: "Marketing",
    postedAt: "1 semaine",
    salary: "À débattre",
    description:
      "Pilotez nos campagnes digitales pour des clients internationaux. Vous coordonnerez les équipes de création...",
    shortDescription:
      "Pilotez nos campagnes digitales pour des clients internationaux...",
    hasApplied: false,
  },
]);

// Traitement des annonces dynamiques issues de la BDD locale
const dbJobs = computed(() => {
  return annonces.value.map((annonce) => {
    const entreprise = users.value.find((u) => u.id === annonce.entrepriseId);

    // Récupération sécurisée du statut de candidature
    const allCandidatures = JSON.parse(
      localStorage.getItem("mosalah_database_candidatures") || "[]",
    );
    const hasApplied = currentUser.value
      ? allCandidatures.some(
          (c) =>
            c.annonceId === annonce.id && c.candidatId === currentUser.value.id,
        )
      : false;

    return {
      id: annonce.id,
      title: annonce.title,
      company: entreprise?.name || "Entreprise Locale",
      location: annonce.location || "Brazzaville",
      region: annonce.location || "Brazzaville",
      type: annonce.type || "CDI",
      sector: annonce.sector || "Tech",
      postedAt: annonce.createdAt || "Récemment",
      salary: annonce.salary || "À débattre",
      description: annonce.description || "",
      shortDescription: annonce.description
        ? annonce.description.substring(0, 150) + "..."
        : "Aucune description.",
      hasApplied,
    };
  });
});

// Regroupement global (Données de test + Données dynamiques de useDb)
const jobs = computed(() => {
  return [...mockJobs.value, ...dbJobs.value];
});

// Synchro des requêtes via la route URL
watch(
  () => route.query.q,
  (newQuery) => {
    searchQuery.value = newQuery || "";
  },
);

// Moteur de recherche à filtres croisés en temps réel
const filteredJobs = computed(() => {
  return jobs.value.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesLocationInput =
      job.location.toLowerCase().includes(locationQuery.value.toLowerCase()) ||
      job.region.toLowerCase().includes(locationQuery.value.toLowerCase());

    const matchesType = filters.type === "all" || job.type === filters.type;
    const matchesSector =
      filters.sector === "all" || job.sector === filters.sector;
    const matchesRegion =
      filters.region === "all" || job.region === filters.region;

    return (
      matchesSearch &&
      matchesLocationInput &&
      matchesType &&
      matchesSector &&
      matchesRegion
    );
  });
});

const resetFilters = () => {
  searchQuery.value = "";
  locationQuery.value = "";
  filters.type = "all";
  filters.sector = "all";
  filters.region = "all";
};
</script>
