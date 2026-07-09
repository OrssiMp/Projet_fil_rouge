<template>
  <div class="w-full text-left select-none" data-aos="fade-up">
    <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-2xl md:text-3xl font-black text-base-content tracking-tight mb-1">
          Entreprises qui recrutent
        </h1>
        <p class="text-sm text-base-content/60 font-medium">
          Découvrez les structures, agences et entreprises inscrites sur Mosalah.
        </p>
      </div>
      <div class="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2 self-start md:self-auto">
        <p class="text-xs font-bold text-emerald-800/60 uppercase tracking-wider">Partenaires actifs</p>
        <p class="text-xl font-black text-[#006643]">{{ filteredCompanies.length }} entreprises</p>
      </div>
    </div>

    <div class="flex flex-col gap-3 mb-8">
      <div class="relative w-full">
        <span class="absolute inset-y-0 left-3 flex items-center opacity-40">🔍</span>
        <input v-model="searchQuery" type="text" placeholder="Rechercher une entreprise par nom, ville..."
          class="input input-bordered w-full pl-10 rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] h-11" />
      </div>

      <!-- Filtres basés sur les vraies catégories d'offres publiées, pas un secteur inventé -->
      <div v-if="availableCategories.length > 0" class="flex flex-wrap gap-2 items-center">
        <span class="text-xs font-bold text-base-content/40 uppercase tracking-wide mr-1">Domaines de recrutement :</span>
        <button v-for="category in availableCategories" :key="category" @click="toggleCategoryFilter(category)"
          class="btn btn-xs rounded-lg font-bold border transition-all normal-case"
          :class="selectedCategories.includes(category)
            ? 'bg-[#006643] text-white border-transparent shadow-sm'
            : 'bg-white border-base-300 text-base-content/70 hover:bg-base-200/50'">
          {{ category }}
        </button>
        <button v-if="selectedCategories.length > 0" @click="selectedCategories = []"
          class="text-xs font-bold text-rose-600 hover:underline ml-2">
          Effacer les filtres
        </button>
      </div>
    </div>

    <!-- CHARGEMENT -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 3" :key="n" class="skeleton h-64 rounded-2xl"></div>
    </div>

    <div v-else-if="filteredCompanies.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCard v-for="company in filteredCompanies" :key="company.id"
        class="bg-white border border-base-300 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-200 group">
        <div>
          <div class="flex items-start justify-between gap-4 mb-4">
            <div class="avatar">
              <div class="w-14 h-14 rounded-2xl border border-base-200 overflow-hidden bg-base-100 flex items-center justify-center">
                <BaseImage v-if="company.logo" :src="company.logo" :alt="company.name" class="object-cover w-full h-full" />
                <div v-else class="w-full h-full flex items-center justify-center font-black text-lg" :class="[company.avatarColor.bg, company.avatarColor.text]">
                  {{ company.initials }}
                </div>
              </div>
            </div>

            <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border"
              :class="company.activeJobs > 0 ? 'bg-emerald-50 border-emerald-200 text-[#006643]' : 'bg-base-100 border-base-200 text-base-content/40'">
              {{ company.activeJobs }} {{ company.activeJobs > 1 ? "offres" : "offre" }}
            </span>
          </div>

          <div class="mb-3">
            <h3 class="font-black text-base-content tracking-tight text-lg leading-snug group-hover:text-[#006643] transition-colors">
              {{ company.name || 'Nom non renseigné' }}
            </h3>
            <p class="text-xs text-base-content/40 font-semibold mt-1 flex items-center gap-1">
              📍 {{ company.location || 'Localisation non renseignée' }}
            </p>
          </div>

          <p class="text-xs text-base-content/60 font-medium leading-relaxed line-clamp-2 mb-4">
            {{ company.description || "Aucune description disponible pour le moment." }}
          </p>
        </div>

        <div>
          <div v-if="company.tags.length > 0" class="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-base-100">
            <span v-for="tag in company.tags" :key="tag"
              class="bg-base-200/60 text-base-content/80 font-bold text-[11px] px-2.5 py-0.5 rounded-lg whitespace-nowrap">
              {{ tag }}
            </span>
          </div>
          <p v-else class="text-xs text-base-content/30 font-semibold italic pt-3 border-t border-base-100 mb-4">
            Aucune offre publiée pour le moment
          </p>

          <router-link :to="'/entreprises/details/' + company.id" class="w-full block mt-2">
            <BaseButton variant="accent" class="w-full">Voir les détails</BaseButton>
          </router-link>
        </div>
      </BaseCard>
    </div>

    <div v-else class="bg-white border border-base-300 rounded-2xl py-16 px-4 text-center max-w-xl mx-auto mt-6">
      <p class="text-3xl mb-2">🏢</p>
      <h3 class="font-black text-base-content tracking-tight text-lg mb-1">Aucune entreprise trouvée</h3>
      <p class="text-xs text-base-content/50 font-medium max-w-sm mx-auto leading-relaxed">
        <template v-if="searchQuery || selectedCategories.length > 0">
          Aucune structure ne correspond à vos critères actuels. Modifiez votre saisie ou vos filtres.
        </template>
        <template v-else>
          Aucune entreprise n'est encore inscrite sur Mosalah.
        </template>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDb } from "../../composables/useDb";

const { loading, getEntreprises, fetchAnnonces } = useDb();

const searchQuery = ref("");
const selectedCategories = ref([]);
const rawEntreprises = ref([]);
const allAnnonces = ref([]);

onMounted(async () => {
  const [entreprises, annonces] = await Promise.all([getEntreprises(), fetchAnnonces()]);
  rawEntreprises.value = entreprises || [];
  allAnnonces.value = annonces || [];
});

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
};
const avatarPalette = [
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-sky-100', text: 'text-sky-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-violet-100', text: 'text-violet-700' },
  { bg: 'bg-rose-100', text: 'text-rose-700' },
];

// Entreprises enrichies avec leurs vraies offres (nombre + catégories = "tags")
const companies = computed(() => {
  return rawEntreprises.value.map((e) => {
    const myAnnonces = allAnnonces.value.filter((a) => a.entrepriseId === e.id);
    const tags = Array.from(new Set(myAnnonces.map((a) => a.category).filter(Boolean)));
    const key = String(e.id ?? e.name ?? 'default');

    return {
      id: e.id,
      name: e.name,
      location: e.location,
      logo: e.avatar,
      description: e.bio,
      activeJobs: myAnnonces.length,
      tags,
      initials: (e.name || '?').trim().split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase(),
      avatarColor: avatarPalette[hashString(key) % avatarPalette.length],
    };
  });
});

// Catégories réellement présentes, calculées depuis toutes les offres (pas une liste inventée)
const availableCategories = computed(() => {
  return Array.from(new Set(allAnnonces.value.map((a) => a.category).filter(Boolean)));
});

const toggleCategoryFilter = (category) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter((c) => c !== category);
  } else {
    selectedCategories.value.push(category);
  }
};

const filteredCompanies = computed(() => {
  return companies.value.filter((company) => {
    const searchLower = searchQuery.value.toLowerCase();
    const matchesSearch =
      (company.name || '').toLowerCase().includes(searchLower) ||
      (company.location || '').toLowerCase().includes(searchLower) ||
      company.tags.some((tag) => tag.toLowerCase().includes(searchLower));

    const matchesCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.some((c) => company.tags.includes(c));

    return matchesSearch && matchesCategory;
  });
});
</script>