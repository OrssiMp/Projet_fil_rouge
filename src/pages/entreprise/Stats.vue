<template>
    <div class="space-y-6 animate-fade-in-up">

        <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
            <div>
                <h1 class="text-2xl font-black text-base-content tracking-tight">Analyse & Statistiques</h1>
                <p class="text-sm font-semibold text-base-content/60 mt-1">Suivez les performances de vos offres d'emploi.</p>
            </div>

            <select v-model="timeRange" class="select select-bordered select-sm rounded-xl font-bold bg-base-50 focus:border-accent">
                <option value="7">7 derniers jours</option>
                <option value="30">30 derniers jours</option>
                <option value="90">Ce trimestre</option>
                <option value="all">Tout l'historique</option>
            </select>
        </header>

        <!-- CHARGEMENT -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="n in 4" :key="n" class="skeleton h-32 rounded-2xl"></div>
        </div>

        <!-- AUCUNE ANNONCE : pas de stats possibles -->
        <div v-else-if="myAnnonces.length === 0" class="bg-base-100 border border-base-200 rounded-2xl py-16 px-4 text-center">
            <p class="text-3xl mb-2">📊</p>
            <h3 class="font-black text-base-content tracking-tight text-lg mb-1">Aucune statistique pour le moment</h3>
            <p class="text-xs text-base-content/50 font-medium max-w-sm mx-auto leading-relaxed">
                Publiez votre première offre d'emploi pour commencer à suivre vos vues, candidatures et taux de conversion.
            </p>
        </div>

        <template v-else>
            <!-- Cartes KPI -->
            <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="kpi in kpis" :key="kpi.title"
                    class="bg-base-100 p-5 rounded-2xl border border-base-200 shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex justify-between items-start mb-4">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg" :class="kpi.colorClass">
                            <BaseIcon :name="kpi.icon" />
                        </div>
                        <span v-if="kpi.trend !== null" class="text-xs font-black px-2 py-1 rounded-md"
                            :class="kpi.trend > 0 ? 'bg-emerald-100 text-emerald-700' : (kpi.trend < 0 ? 'bg-red-100 text-red-700' : 'bg-base-200 text-base-content/50')">
                            <BaseIcon :name="kpi.trend > 0 ? 'arrow-trend-up' : (kpi.trend < 0 ? 'arrow-trend-down' : 'minus')" />
                            {{ Math.abs(kpi.trend) }}%
                        </span>
                        <span v-else class="text-xs font-black px-2 py-1 rounded-md bg-base-200 text-base-content/40">
                            —
                        </span>
                    </div>
                    <h3 class="text-base-content/60 font-bold text-xs uppercase tracking-wider">{{ kpi.title }}</h3>
                    <p class="text-3xl font-black text-base-content mt-1">{{ kpi.value }}</p>
                </div>
            </section>

            <!-- Graphiques Principaux -->
            <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div class="lg:col-span-2 bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm flex flex-col">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-lg font-black text-base-content">Candidatures reçues</h2>
                        <span class="text-xs font-bold text-base-content/50">7 derniers jours</span>
                    </div>

                    <div class="flex-1 flex items-end gap-2 sm:gap-4 h-48 mt-auto pt-4 border-b border-base-200/50">
                        <div v-for="bar in chartData" :key="bar.day"
                            class="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                            <div class="opacity-0 group-hover:opacity-100 transition-opacity bg-base-content text-base-100 text-[10px] font-bold py-1 px-2 rounded-md mb-1 relative pointer-events-none">
                                {{ bar.value }}
                                <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-base-content rotate-45"></div>
                            </div>
                            <div class="w-full bg-accent/20 group-hover:bg-accent rounded-t-md transition-colors relative"
                                :style="{ height: `${bar.percentage}%` }"></div>
                            <span class="text-[10px] font-bold text-base-content/40">{{ bar.day }}</span>
                        </div>
                    </div>
                </div>

                <div class="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
                    <h2 class="text-lg font-black text-base-content mb-6">Tunnel de recrutement</h2>
                    <div class="space-y-5">
                        <div v-for="(step, index) in funnelData" :key="index">
                            <div class="flex justify-between text-xs font-bold mb-1">
                                <span class="text-base-content/70">{{ step.label }}</span>
                                <span class="text-base-content">{{ step.value }}</span>
                            </div>
                            <div class="w-full h-2.5 bg-base-200 rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-1000" :class="step.color"
                                    :style="{ width: `${step.percentage}%` }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Tableau des performances par offre (cumulatif, indépendant du filtre) -->
            <section class="bg-base-100 rounded-2xl border border-base-200 shadow-sm overflow-hidden">
                <div class="p-6 border-b border-base-200 flex justify-between items-center bg-base-50/50">
                    <h2 class="text-lg font-black text-base-content">Performances par offre</h2>
                    <router-link to="/entreprise/dashboard/offres" class="btn btn-sm btn-ghost text-xs font-bold text-accent">
                        Voir tout →
                    </router-link>
                </div>

                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <thead>
                            <tr class="bg-base-50 text-base-content/60 uppercase text-[10px] tracking-wider font-black">
                                <th class="py-4">Poste</th>
                                <th>Vues</th>
                                <th>Candidats</th>
                                <th>Taux Conv.</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="job in jobsStats" :key="job.id"
                                class="hover:bg-base-200/30 transition-colors border-b border-base-200/50">
                                <td class="py-4">
                                    <div class="font-black text-sm text-base-content">{{ job.title }}</div>
                                    <div class="text-xs font-semibold text-base-content/50 mt-0.5">Publié le {{ job.date }}</div>
                                </td>
                                <td class="font-bold text-sm">{{ job.views }}</td>
                                <td class="font-bold text-sm text-accent">{{ job.applications }}</td>
                                <td>
                                    <span class="text-xs font-black bg-base-200 px-2 py-1 rounded-md">{{ job.conversionRate }}%</span>
                                </td>
                                <td>
                                    <div class="badge badge-sm font-bold border-none"
                                        :class="job.active ? 'bg-emerald-100 text-emerald-700' : 'bg-base-200 text-base-content/50'">
                                        {{ job.active ? 'En ligne' : 'Clôturée' }}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </template>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useDb } from '../../composables/useDb';

const { currentUser } = useAuth();
const { fetchAnnonces, fetchCandidaturesForEntreprise } = useDb();

const timeRange = ref('30'); // '7' | '30' | '90' | 'all'
const isLoading = ref(true);

const myAnnonces = ref([]);
const myCandidatures = ref([]);

const parseFrDate = (str) => {
  if (!str) return null;
  const [day, month, year] = str.split('/').map(Number);
  if (!day) return null;
  return new Date(year, month - 1, day);
};

const loadStats = async () => {
  isLoading.value = true;
  if (!currentUser.value) {
    isLoading.value = false;
    return;
  }

  const [allAnnonces, candidatures] = await Promise.all([
    fetchAnnonces(),
    fetchCandidaturesForEntreprise(currentUser.value.id),
  ]);

  myAnnonces.value = (allAnnonces || []).filter(
    (a) => a.entrepriseId === currentUser.value.id,
  );
  myCandidatures.value = candidatures || [];

  isLoading.value = false;
};

onMounted(loadStats);

// --- Fenêtres temporelles dérivées du filtre sélectionné ---
const rangeDays = computed(() =>
  timeRange.value === 'all' ? null : parseInt(timeRange.value, 10),
);

const withinRange = (dateStr, days, referenceDate = new Date()) => {
  if (days === null) return true;
  const date = parseFrDate(dateStr);
  if (!date) return false;
  const diff = (referenceDate - date) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff < days;
};

const currentPeriodCandidatures = computed(() =>
  myCandidatures.value.filter((c) => withinRange(c.createdAt, rangeDays.value)),
);

// Période précédente de même durée, uniquement pour une tendance réelle
const previousPeriodCandidatures = computed(() => {
  if (rangeDays.value === null) return [];
  const referenceDate = new Date();
  referenceDate.setDate(referenceDate.getDate() - rangeDays.value);
  return myCandidatures.value.filter((c) =>
    withinRange(c.createdAt, rangeDays.value, referenceDate),
  );
});

const computeTrend = (current, previous) => {
  if (rangeDays.value === null) return null;
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
};

// --- KPIs ---
const totalViews = computed(() =>
  myAnnonces.value.reduce((acc, a) => acc + (a.views || 0), 0),
);

const totalApplications = computed(() => currentPeriodCandidatures.value.length);
const previousApplications = computed(() => previousPeriodCandidatures.value.length);

const acceptedApplications = computed(
  () => currentPeriodCandidatures.value.filter((c) => c.status === 'acceptee').length,
);
const previousAccepted = computed(
  () => previousPeriodCandidatures.value.filter((c) => c.status === 'acceptee').length,
);

const conversionRate = computed(() => {
  if (!totalViews.value) return 0;
  return Math.round((totalApplications.value / totalViews.value) * 1000) / 10;
});

const kpis = computed(() => [
  {
    title: 'Vues totales',
    value: totalViews.value.toLocaleString('fr-FR'),
    trend: null, // pas d'historique de vues par jour disponible
    icon: 'eye',
    colorClass: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Candidatures reçues',
    value: totalApplications.value,
    trend: computeTrend(totalApplications.value, previousApplications.value),
    icon: 'file-lines',
    colorClass: 'bg-accent/10 text-accent',
  },
  {
    title: 'Candidatures acceptées',
    value: acceptedApplications.value,
    trend: computeTrend(acceptedApplications.value, previousAccepted.value),
    icon: 'check',
    colorClass: 'bg-emerald-100 text-emerald-600',
  },
  {
    title: 'Taux de conversion',
    value: `${conversionRate.value}%`,
    trend: null, // basé sur des vues cumulées, non comparable période à période
    icon: 'bolt',
    colorClass: 'bg-amber-100 text-amber-600',
  },
]);

// --- Graphique en barres : candidatures des 7 derniers jours ---
const chartData = computed(() => {
  const days = [];
  const today = new Date();
  const dayLabels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push({ date, label: dayLabels[date.getDay()] });
  }

  const counts = days.map(({ date }) =>
    myCandidatures.value.filter((c) => {
      const cDate = parseFrDate(c.createdAt);
      return (
        cDate &&
        cDate.getFullYear() === date.getFullYear() &&
        cDate.getMonth() === date.getMonth() &&
        cDate.getDate() === date.getDate()
      );
    }).length,
  );

  const max = Math.max(...counts, 1);

  return days.map(({ label }, i) => ({
    day: label,
    value: counts[i],
    percentage: Math.round((counts[i] / max) * 100),
  }));
});

// --- Tunnel de recrutement ---
const funnelData = computed(() => {
  const views = totalViews.value;
  const applications = totalApplications.value;
  const enEtude = currentPeriodCandidatures.value.filter((c) => c.status === 'en_etude').length;
  const acceptees = acceptedApplications.value;
  const max = views || 1;

  return [
    { label: 'Vues des annonces (total)', value: views.toLocaleString('fr-FR'), percentage: 100, color: 'bg-blue-400' },
    { label: 'Candidatures reçues', value: applications, percentage: Math.min(100, Math.round((applications / max) * 100)), color: 'bg-accent' },
    { label: "En cours d'étude", value: enEtude, percentage: Math.min(100, Math.round((enEtude / max) * 100)), color: 'bg-purple-400' },
    { label: 'Candidatures acceptées', value: acceptees, percentage: Math.min(100, Math.round((acceptees / max) * 100)), color: 'bg-emerald-400' },
  ];
});

// --- Tableau de performance par offre (cumulatif) ---
const jobsStats = computed(() =>
  myAnnonces.value.map((job) => {
    const views = job.views || 0;
    const applications = job.applications || 0;
    const rate = views ? Math.round((applications / views) * 1000) / 10 : 0;
    return {
      id: job.id,
      title: job.title,
      date: job.createdAt,
      views: views.toLocaleString('fr-FR'),
      applications,
      conversionRate: rate,
      active: true, // pas de fonctionnalité "clôturer l'offre" dans useDb pour l'instant
    };
  }),
);
</script>