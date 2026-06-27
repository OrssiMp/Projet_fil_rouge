<template>
  <div class="w-full text-left select-none" data-aos="fade-up">
    <!-- EN-TÊTE DE LA PAGE -->
    <div
      class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      <div>
        <h1
          class="text-2xl md:text-3xl font-black text-base-content tracking-tight mb-1"
        >
          Entreprises qui recrutent
        </h1>
        <p class="text-sm text-base-content/60 font-medium">
          Découvrez les structures, agences et entreprises inscrites sur
          Mosalah.
        </p>
      </div>
      <!-- Statistique rapide -->
      <div
        class="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2 self-start md:self-auto"
      >
        <p
          class="text-xs font-bold text-emerald-800/60 uppercase tracking-wider"
        >
          Partenaires actifs
        </p>
        <p class="text-xl font-black text-[#006643]">
          {{ filteredCompanies.length }} entreprises
        </p>
      </div>
    </div>

    <!-- RECHERCHE ET FILTRES PAR SECTEUR -->
    <div class="flex flex-col gap-3 mb-8">
      <div class="relative w-full">
        <span class="absolute inset-y-0 left-3 flex items-center opacity-40">
          🔍
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher une entreprise par nom, secteur, ville..."
          class="input input-bordered w-full pl-10 rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] h-11"
        />
      </div>

      <!-- Filtres rapides par secteur d'activité -->
      <div class="flex flex-wrap gap-2 items-center">
        <span
          class="text-xs font-bold text-base-content/40 uppercase tracking-wide mr-1"
          >Secteurs :</span
        >
        <button
          v-for="sector in popularSectors"
          :key="sector"
          @click="toggleSectorFilter(sector)"
          class="btn btn-xs rounded-lg font-bold border transition-all normal-case"
          :class="
            selectedSectors.includes(sector)
              ? 'bg-[#006643] text-white border-transparent shadow-sm'
              : 'bg-white border-base-300 text-base-content/70 hover:bg-base-200/50'
          "
        >
          {{ sector }}
        </button>
        <button
          v-if="selectedSectors.length > 0"
          @click="selectedSectors = []"
          class="text-xs font-bold text-rose-600 hover:underline ml-2"
        >
          Effacer les filtres
        </button>
      </div>
    </div>

    <!-- GRILLE DES CARTES ENTREPRISES -->
    <div
      v-if="filteredCompanies.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <BaseCard
        v-for="company in filteredCompanies"
        :key="company.id"
        class="bg-white border border-base-300 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-200 group"
      >
        <div>
          <!-- Top de la Card : Logo + Nombre d'offres dispo -->
          <div class="flex items-start justify-between gap-4 mb-4">
            <div class="avatar">
              <div
                class="w-14 h-14 rounded-2xl border border-base-200 overflow-hidden bg-base-100 flex items-center justify-center font-black text-xl text-emerald-800"
              >
                <BaseImage
                  v-if="company.logo"
                  :src="company.logo"
                  :alt="company.name"
                  class="object-cover w-full h-full"
                />
                <span v-else>{{ company.name.slice(0, 2).toUpperCase() }}</span>
              </div>
            </div>

            <span
              class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border bg-emerald-50 border-emerald-200 text-[#006643]"
            >
              {{ company.activeJobs }}
              {{ company.activeJobs > 1 ? "offres" : "offre" }}
            </span>
          </div>

          <!-- Milieu de la Card : Identité et secteur -->
          <div class="mb-3">
            <h3
              class="font-black text-base-content tracking-tight text-lg leading-snug group-hover:text-[#006643] transition-colors"
            >
              {{ company.name }}
            </h3>
            <p class="text-xs font-bold text-emerald-700/80 mt-0.5">
              {{ company.sector }}
            </p>
            <p
              class="text-xs text-base-content/40 font-semibold mt-1 flex items-center gap-1"
            >
              📍 {{ company.location }}
            </p>
          </div>

          <!-- Description courte -->
          <p
            class="text-xs text-base-content/60 font-medium leading-relaxed line-clamp-2 mb-4"
          >
            {{
              company.description ||
              "Aucune description disponible pour le moment."
            }}
          </p>
        </div>

        <div>
          <!-- Mots-clés / Spécificités de l'entreprise -->
          <div
            class="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-base-100"
          >
            <span
              v-for="tag in company.tags"
              :key="tag"
              class="bg-base-200/60 text-base-content/80 font-bold text-[11px] px-2.5 py-0.5 rounded-lg whitespace-nowrap"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Bouton d'action bas de carte -->
          <div class="w-full mt-2">
            <router-link :to="'/entreprises/details/' + company.id">
              <BaseButton variant="accent" class="w-full">
                Voir les détails
              </BaseButton>
            </router-link>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- ÉTAT VIDE SI AUCUNE ENTREPRISE TROUVÉE -->
    <div
      v-else
      class="bg-white border border-base-300 rounded-2xl py-16 px-4 text-center max-w-xl mx-auto mt-6"
    >
      <p class="text-3xl mb-2">🏢</p>
      <h3 class="font-black text-base-content tracking-tight text-lg mb-1">
        Aucune entreprise trouvée
      </h3>
      <p
        class="text-xs text-base-content/50 font-medium max-w-sm mx-auto leading-relaxed"
      >
        Nous n'avons trouvé aucune structure correspondant à vos critères de
        recherche actuels. Modifiez votre saisie ou vos filtres.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const searchQuery = ref("");
const selectedSectors = ref([]);

// Liste des secteurs principaux présents sur l'application
const popularSectors = [
  "Technologies / IT",
  "Immobilier",
  "Services",
  "Finance",
  "Design / Média",
];

// Données fictives simulant les entreprises inscrites
const companies = ref([
  {
    id: 1,
    name: "TechCongo Solutions",
    sector: "Technologies / IT",
    location: "Brazzaville, Congo",
    logo: "", // Laissé vide pour tester l'affichage des initiales par défaut
    description:
      "Agence spécialisée dans le développement de solutions web, d'applications mobiles sur mesure et l'intégration d'architectures cloud.",
    activeJobs: 3,
    tags: ["Vue.js", "Node.js", "Mobile", "Cloud"],
  },
  {
    id: 2,
    name: "IMMOcool Agency",
    sector: "Immobilier",
    location: "Brazzaville, Congo",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=150&auto=format&fit=crop",
    description:
      "Plateforme moderne et agence de services immobiliers connectant propriétaires et locataires partout en République du Congo.",
    activeJobs: 1,
    tags: ["Gestion", "Location", "Vente", "Service Client"],
  },
  {
    id: 3,
    name: "Bantou Digital",
    sector: "Design / Média",
    location: "Pointe-Noire, Congo",
    logo: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=150&auto=format&fit=crop",
    description:
      "Studio créatif axé sur l'identité visuelle, la production de médias numériques interactifs, le prototypage UI/UX et la communication.",
    activeJobs: 2,
    tags: ["Figma", "UI/UX", "Branding", "Motion"],
  },
  {
    id: 4,
    name: "AfricArtech Hub",
    sector: "Technologies / IT",
    location: "Kinshasa, RDC",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=150&auto=format&fit=crop",
    description:
      "Accélérateur et incubateur de projets technologiques innovants en Afrique Centrale, organisateur d'événements et de hackathons.",
    activeJobs: 5,
    tags: ["IA", "Fintech", "Incubateur", "Formations"],
  },
  {
    id: 5,
    name: "Elikia Finances",
    sector: "Finance",
    location: "Brazzaville, Congo",
    logo: "",
    description:
      "Institution de microfinance moderne accompagnant les entrepreneurs locaux et les PME dans le développement de leurs activités.",
    activeJobs: 0,
    tags: ["Comptabilité", "Crédit", "Audit"],
  },
]);

// Gestion des filtres par secteur
const toggleSectorFilter = (sector) => {
  if (selectedSectors.value.includes(sector)) {
    selectedSectors.value = selectedSectors.value.filter((s) => s !== sector);
  } else {
    selectedSectors.value.push(sector);
  }
};

// Logique de filtrage réactive combinée (Saisie textuelle + Secteurs)
const filteredCompanies = computed(() => {
  return companies.value.filter((company) => {
    // 1. Filtrage textuel général
    const searchLower = searchQuery.value.toLowerCase();
    const matchesSearch =
      company.name.toLowerCase().includes(searchLower) ||
      company.sector.toLowerCase().includes(searchLower) ||
      company.location.toLowerCase().includes(searchLower) ||
      company.tags.some((tag) => tag.toLowerCase().includes(searchLower));

    // 2. Filtrage par secteur (si aucun secteur n'est sélectionné, on laisse passer tout le monde)
    const matchesSector =
      selectedSectors.value.length === 0 ||
      selectedSectors.value.includes(company.sector);

    return matchesSearch && matchesSector;
  });
});

const viewCompanyProfile = (id) => {
  console.log(`Navigation vers la page vitrine de l'entreprise ID : ${id}`);
};
</script>
