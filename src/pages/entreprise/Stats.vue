<template>
    <div class="space-y-6 animate-fade-in-up">

        <!-- 📅 En-tête avec filtres -->
        <header
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
            <div>
                <h1 class="text-2xl font-black text-base-content tracking-tight">Analyse & Statistiques</h1>
                <p class="text-sm font-semibold text-base-content/60 mt-1">Suivez les performances de vos offres
                    d'emploi.</p>
            </div>

            <select v-model="timeRange"
                class="select select-bordered select-sm rounded-xl font-bold bg-base-50 focus:border-accent">
                <option value="7">7 derniers jours</option>
                <option value="30">30 derniers jours</option>
                <option value="90">Ce trimestre</option>
                <option value="all">Cette année</option>
            </select>
        </header>

        <!-- 📊 Cartes KPI (Key Performance Indicators) -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="kpi in kpis" :key="kpi.title"
                class="bg-base-100 p-5 rounded-2xl border border-base-200 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg" :class="kpi.colorClass">
                        <BaseIcon :name="kpi.icon" />
                    </div>
                    <span class="text-xs font-black px-2 py-1 rounded-md"
                        :class="kpi.trend > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'">
                        <BaseIcon :name="kpi.trend > 0 ? 'arrow-trend-up' : 'arrow-trend-down'" />
                        {{ Math.abs(kpi.trend) }}%
                    </span>
                </div>
                <h3 class="text-base-content/60 font-bold text-xs uppercase tracking-wider">{{ kpi.title }}</h3>
                <p class="text-3xl font-black text-base-content mt-1">{{ kpi.value }}</p>
            </div>
        </section>

        <!-- 📈 Graphiques Principaux -->
        <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <!-- Graphique d'évolution (Simulé en pur CSS/Tailwind) -->
            <div class="lg:col-span-2 bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm flex flex-col">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-lg font-black text-base-content">Candidatures reçues</h2>
                    <span class="text-xs font-bold text-base-content/50">Ce mois-ci</span>
                </div>

                <!-- Bar Chart CSS -->
                <div class="flex-1 flex items-end gap-2 sm:gap-4 h-48 mt-auto pt-4 border-b border-base-200/50">
                    <div v-for="bar in chartData" :key="bar.day"
                        class="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                        <!-- Tooltip au survol -->
                        <div
                            class="opacity-0 group-hover:opacity-100 transition-opacity bg-base-content text-base-100 text-[10px] font-bold py-1 px-2 rounded-md mb-1 relative pointer-events-none">
                            {{ bar.value }}
                            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-base-content rotate-45">
                            </div>
                        </div>
                        <!-- Barre -->
                        <div class="w-full bg-accent/20 group-hover:bg-accent rounded-t-md transition-colors relative"
                            :style="{ height: `${bar.percentage}%` }"></div>
                        <span class="text-[10px] font-bold text-base-content/40">{{ bar.day }}</span>
                    </div>
                </div>
            </div>

            <!-- Tunnel de conversion -->
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

        <!-- 📋 Tableau des performances par offre -->
        <section class="bg-base-100 rounded-2xl border border-base-200 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-base-200 flex justify-between items-center bg-base-50/50">
                <h2 class="text-lg font-black text-base-content">Performances par offre</h2>
                <button class="btn btn-sm btn-ghost text-xs font-bold text-accent">Voir tout →</button>
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
                                <div class="text-xs font-semibold text-base-content/50 mt-0.5">Publié le {{ job.date }}
                                </div>
                            </td>
                            <td class="font-bold text-sm">{{ job.views }}</td>
                            <td class="font-bold text-sm text-accent">{{ job.applications }}</td>
                            <td>
                                <span class="text-xs font-black bg-base-200 px-2 py-1 rounded-md">{{ job.conversionRate
                                }}%</span>
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

    </div>
</template>

<script setup>
import { ref } from 'vue';

// ⏱️ Filtre de période
const timeRange = ref('30');

// 📊 Données simulées pour les KPIs
const kpis = ref([
    { title: 'Vues totales', value: '4 821', trend: 12.5, icon: 'eye', colorClass: 'bg-blue-100 text-blue-600' },
    { title: 'Candidatures', value: '142', trend: 8.2, icon: 'file-lines', colorClass: 'bg-accent/10 text-accent' },
    { title: 'Entretiens', value: '18', trend: -2.4, icon: 'comments', colorClass: 'bg-purple-100 text-purple-600' },
    { title: 'Taux de réponse', value: '86%', trend: 5.0, icon: 'bolt', colorClass: 'bg-amber-100 text-amber-600' }
]);

// 📈 Données simulées pour le graphique en barres (Évolution sur 7 jours)
const chartData = ref([
    { day: 'Lun', value: 12, percentage: 30 },
    { day: 'Mar', value: 25, percentage: 65 },
    { day: 'Mer', value: 18, percentage: 45 },
    { day: 'Jeu', value: 38, percentage: 100 }, // Valeur max = 100%
    { day: 'Ven', value: 22, percentage: 55 },
    { day: 'Sam', value: 8, percentage: 20 },
    { day: 'Dim', value: 15, percentage: 40 },
]);

// 🌪️ Données pour le tunnel de conversion (Funnel)
const funnelData = ref([
    { label: 'Vues des annonces', value: '4 821', percentage: 100, color: 'bg-blue-400' },
    { label: 'Clics sur "Postuler"', value: '312', percentage: 45, color: 'bg-accent' },
    { label: 'Candidatures terminées', value: '142', percentage: 25, color: 'bg-purple-400' },
    { label: 'Entretiens planifiés', value: '18', percentage: 8, color: 'bg-emerald-400' }
]);

// 📋 Tableau des offres
const jobsStats = ref([
    { id: 1, title: 'Développeur Full-Stack (Vue.js / Node)', date: '12 Juin 2026', views: '1,240', applications: 45, conversionRate: 3.6, active: true },
    { id: 2, title: 'Intégrateur Web Junior', date: '08 Juin 2026', views: '890', applications: 62, conversionRate: 6.9, active: true },
    { id: 3, title: 'UI/UX Designer', date: '25 Mai 2026', views: '2,105', applications: 31, conversionRate: 1.4, active: false },
    { id: 4, title: 'Administrateur Systèmes Linux', date: '15 Mai 2026', views: '586', applications: 4, conversionRate: 0.6, active: true },
]);
</script>