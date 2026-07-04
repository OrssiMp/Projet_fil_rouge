<template>
  <div class="min-h-screen bg-base-200/40 pb-16 select-none flex flex-col">

    <header class="bg-white border-b border-base-200 py-10 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-black text-base-content tracking-tight mb-6">
          Trouvez votre prochain emploi
        </h1>
        <p class="text-sm text-base-content/60 font-medium -mt-4 mb-6">
          Explorez les offres publiées par les entreprises.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-3 bg-white">
          <div class="md:col-span-5 flex items-center bg-base-100 rounded-xl px-3 border border-base-300">
            <span class="opacity-40 text-sm">🔍</span>
            <input v-model="searchQuery" type="text" placeholder="Poste ou compétence"
              class="w-full bg-transparent p-3 text-sm font-medium text-base-content placeholder-base-content/40 focus:outline-none" />
          </div>

          <div class="md:col-span-5 flex items-center bg-base-100 rounded-xl px-3 border border-base-300">
            <span class="opacity-40 text-sm">📍</span>
            <input v-model="locationQuery" type="text" placeholder="Localisation"
              class="w-full bg-transparent p-3 text-sm font-medium text-base-content placeholder-base-content/40 focus:outline-none" />
          </div>

          <button
            class="md:col-span-2 btn btn-md bg-emerald-500 hover:bg-emerald-600 border-none text-white font-bold rounded-xl h-full">
            Rechercher
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl w-full mx-auto px-4 mt-8 flex-grow">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <aside class="lg:col-span-3 flex flex-col gap-5 text-left">
          <h2 class="text-lg font-black text-base-content tracking-tight mb-1">Filtres</h2>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-base-content/70">Type de contrat</label>
            <select v-model="filters.type"
              class="select select-bordered w-full rounded-xl bg-white text-sm font-medium border-base-300 focus:outline-none">
              <option value="all">Tous les types</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD (6 mois)</option>
              <option value="Stage">Stage</option>
            </select>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-base-content/70">Secteur d'activité</label>
            <select v-model="filters.sector"
              class="select select-bordered w-full rounded-xl bg-white text-sm font-medium border-base-300 focus:outline-none">
              <option value="all">Tous les secteurs</option>
              <option value="Tech">Technologie / Informatique</option>
              <option value="Data">Data & Business Intelligence</option>
              <option value="Marketing">Marketing & Communication</option>
            </select>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-base-content/70">Localisation</label>
            <select v-model="filters.region"
              class="select select-bordered w-full rounded-xl bg-white text-sm font-medium border-base-300 focus:outline-none">
              <option value="all">Toutes les régions</option>
              <option value="Brazzaville">Brazzaville</option>
              <option value="Pointe-Noire">Pointe-Noire</option>
              <option value="Remote">100% Remote</option>
            </select>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-base-content/70">Date de publication</label>
            <select v-model="filters.date"
              class="select select-bordered w-full rounded-xl bg-white text-sm font-medium border-base-300 focus:outline-none">
              <option value="all">Toute date</option>
              <option value="recent">Moins d'une semaine</option>
            </select>
          </div>
        </aside>

        <section class="lg:col-span-9 flex flex-col gap-4">
          <div class="text-xs font-bold text-base-content/60 text-left px-1 mb-1">
            {{ filteredJobs.length }} offres trouvées
          </div>

          <div v-if="filteredJobs.length > 0" class="flex flex-col gap-4">
            <BaseCard v-for="job in filteredJobs" :key="job.id" density="normal"
              class="border-base-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-md transition-all duration-200">
              <div class="flex flex-col sm:flex-row justify-between items-start gap-4 w-full text-left">

                <div class="flex items-start gap-4">
                  <div
                    class="w-12 h-12 rounded-xl bg-base-200/60 flex items-center justify-center border border-base-200 shrink-0">
                    <span v-if="job.sector === 'Tech'" class="text-xl">🏢</span>
                    <span v-else-if="job.sector === 'Data'" class="text-xl">🔷</span>
                    <span v-else class="text-xl">📢</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <div class="flex flex-wrap items-center gap-3">
                      <h3 class="text-lg font-black text-base-content tracking-tight">
                        {{ job.title }}
                      </h3>
                      <span v-if="job.hasApplied"
                        class="badge border border-emerald-500 bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-2 uppercase flex items-center gap-0.5">
                        ✓ Postulé
                      </span>
                    </div>

                    <p class="text-xs font-bold text-base-content/50 -mt-0.5">{{ job.company }}</p>

                    <div class="flex flex-wrap gap-2 mt-1.5 text-xs font-bold">
                      <span
                        class="bg-base-200/80 text-base-content/70 px-2.5 py-1 rounded-md border border-base-300/30">
                        📍 {{ job.location }}
                      </span>
                      <span class="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-100">
                        💼 {{ job.type }}
                      </span>
                    </div>

                    <p class="text-xs md:text-sm text-base-content/70 font-medium leading-relaxed mt-2 max-w-2xl">
                      {{ job.shortDescription }}
                    </p>
                  </div>
                </div>

                <div class="flex flex-col justify-between items-end h-full self-stretch justify-self-end shrink-0 pt-1">
                  <span class="text-[11px] font-semibold text-base-content/40 whitespace-nowrap mb-6 sm:mb-0">
                    Il y a {{ job.postedAt }}
                  </span>

                  <router-link :to="job.hasApplied ? `/offres/${job.id}/candidature` : `/offres/${job.id}`">
                    <BaseButton :variant="job.hasApplied ? 'ghost' : 'accent'"
                      class="w-full sm:w-auto text-xs h-10 px-4 border border-base-300 font-bold shadow-sm">
                      {{ job.hasApplied ? 'Voir ma candidature' : "Voir l'offre" }}
                    </BaseButton>
                  </router-link>
                </div>

              </div>
            </BaseCard>
          </div>

          <BaseCard v-else class="text-center py-12 text-base-content/50 font-medium bg-white">
            Aucun poste ne correspond à vos critères de recherche actuels.
          </BaseCard>

          <div v-if="filteredJobs.length > 0" class="flex justify-center items-center gap-1 mt-8">
            <button
              class="btn btn-sm bg-white border border-base-300 hover:bg-base-100 text-base-content px-2 rounded-lg">‹</button>
            <button
              class="btn btn-sm bg-emerald-500 hover:bg-emerald-600 border-none text-white font-bold px-3 rounded-lg">1</button>
            <button
              class="btn btn-sm bg-white border border-base-300 hover:bg-base-100 text-base-content px-3 rounded-lg">2</button>
            <button
              class="btn btn-sm bg-white border border-base-300 hover:bg-base-100 text-base-content px-3 rounded-lg">3</button>
            <span class="text-xs px-1 text-base-content/40">...</span>
            <button
              class="btn btn-sm bg-white border border-base-300 hover:bg-base-100 text-base-content px-3 rounded-lg">8</button>
            <button
              class="btn btn-sm bg-white border border-base-300 hover:bg-base-100 text-base-content px-2 rounded-lg">›</button>
          </div>

        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const searchQuery = ref(route.query.q || '');
const locationQuery = ref('');

const filters = reactive({
  type: 'all',
  sector: 'all',
  region: 'all',
  date: 'all'
});

// Données mockées alignées fidèlement sur l'image envoyée
const jobs = ref([
  {
    id: 1,
    title: "Développeur Fullstack React/Node.js",
    company: "TechNova Solutions",
    location: "Paris (Hybride)",
    region: "Brazzaville", // Mapper selon les besoins de test local
    type: "CDI",
    sector: "Tech",
    postedAt: "2 jours",
    hasApplied: true, // Affiche l'état "Postulé" et "Voir ma candidature"
    shortDescription: "Nous recherchons un développeur Fullstack expérimenté pour rejoindre notre équipe produit. Vous travaillerez sur des applications web à fort trafic, en utilisant les dernières technologies de l'écosystème..."
  },
  {
    id: 2,
    title: "Data Analyst Senior",
    company: "FinData Partners",
    location: "Lyon",
    region: "Pointe-Noire",
    type: "CDI",
    sector: "Data",
    postedAt: "4 jours",
    hasApplied: false,
    shortDescription: "En tant que Data Analyst Senior, vous accompagnerez nos clients dans la compréhension de leurs données financières. Maîtrise de SQL, Python et des outils de BI (Tableau, PowerBI) indispensable."
  },
  {
    id: 3,
    title: "Chef de Projet Marketing Digital",
    company: "Agence Creative Pulse",
    location: "100% Remote",
    region: "Remote",
    type: "CDD (6 mois)",
    sector: "Marketing",
    postedAt: "1 semaine",
    hasApplied: false,
    shortDescription: "Pilotez nos campagnes digitales pour des clients internationaux. Vous coordonnerez les équipes de création et de média pour assurer le succès et le ROI des opérations."
  }
]);

// Moteur de recherche et de filtres croisés
// Keep searchQuery in sync with the route `q` param so the hero can prefill it.
watch(() => route.query.q, (q) => {
  searchQuery.value = q || '';
});

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesLocation = job.location.toLowerCase().includes(locationQuery.value.toLowerCase());
    const matchesType = filters.type === 'all' || job.type.includes(filters.type);
    const matchesSector = filters.sector === 'all' || job.sector === filters.sector;
    const matchesRegion = filters.region === 'all' || job.region === filters.region;

    return matchesSearch && matchesLocation && matchesType && matchesSector && matchesRegion;
  });
});
</script>