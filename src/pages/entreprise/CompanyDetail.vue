<template>
  <!-- ÉTAT DE CHARGEMENT -->
  <div v-if="loading" class="min-h-screen flex flex-col items-center justify-center bg-base-200/50">
    <span class="loading loading-spinner loading-lg text-[#006643]"></span>
    <p class="text-xs font-bold text-base-content/40 uppercase tracking-wider mt-4">Chargement de la vitrine...</p>
  </div>

  <!-- ÉTAT INTROUVABLE / ERREUR -->
  <div v-else-if="!company"
    class="min-h-screen flex flex-col items-center justify-center bg-base-200/50 px-4 text-center">
    <p class="text-5xl mb-4">🏢</p>
    <h1 class="text-2xl font-black text-base-content tracking-tight mb-2">Entreprise introuvable</h1>
    <p class="text-xs text-base-content/50 font-medium max-w-sm leading-relaxed mb-6">
      Désolé, la structure ou l'agence associée à cet identifiant n'existe pas ou a désactivé son compte.
    </p>
    <BaseButton to="/companies" variant="primary" class="text-xs h-10">
      Retourner au catalogue
    </BaseButton>
  </div>

  <!-- INTERFACE DÉTAILS DE L'ENTREPRISE -->
  <div v-else class="min-h-screen bg-base-200/50 pb-16 select-none">

    <header class="relative bg-base-100 border-b border-base-200">
      <div class="h-48 md:h-64 w-full bg-base-200 overflow-hidden">
        <BaseImage :src="company.coverImage" :alt="`Bannière de couverture de ${company.name}`" ratio="auto" priority
          rounded="none" class="w-full h-full object-cover" />
      </div>

      <div class="max-w-6xl mx-auto px-4 pb-6">
        <div
          class="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20 relative z-10 text-center md:text-left">

          <div
            class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-base-100 bg-white shadow-xl overflow-hidden shrink-0 flex items-center justify-center">
            <BaseImage v-if="company.logo" :src="company.logo" :alt="`Logo officiel de ${company.name}`" ratio="1/1"
              priority rounded="full" />
            <!-- Fallback textuel si pas de logo -->
            <span v-else class="text-3xl font-black text-emerald-800 uppercase tracking-tight">
              {{ company.name.slice(0, 2) }}
            </span>
          </div>

          <div class="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
            <div data-aos="fade-right">
              <h1 class="text-2xl md:text-4xl font-black text-base-content tracking-tight mb-2">
                {{ company.name }}
              </h1>
              <div
                class="flex flex-wrap justify-center md:justify-start gap-2 text-xs md:text-sm font-semibold text-base-content/60">
                <span class="flex items-center gap-1">
                  <i class="opacity-70">📍</i> {{ company.location }}
                </span>
                <span>•</span>
                <span class="text-emerald-700 font-bold">{{ company.sector }}</span>
                <span>•</span>
                <span>{{ company.size }} employés</span>
              </div>
            </div>

            <div class="flex items-center justify-center gap-2 shrink-0" data-aos="fade-left">
              <BaseButton variant="ghost" icon="bell" class="border border-base-300">
                Suivre
              </BaseButton>
              <BaseButton :href="company.website" target="_blank" variant="primary" icon="send">
                Visiter le site
              </BaseButton>
            </div>
          </div>

        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 mt-8">
      <BaseBreadCrumbs class="mb-6" :items="breadcrumbs" />
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <div class="lg:col-span-8 flex flex-col gap-8">

          <BaseCard density="spacious" data-aos="fade-up">
            <h2 class="text-xl font-black text-base-content tracking-tight mb-4">
              À propos de l'entreprise
            </h2>
            <p class="text-sm md:text-base text-base-content/70 leading-relaxed font-medium whitespace-pre-line">
              {{ company.description }}
            </p>
          </BaseCard>

          <div class="flex flex-col gap-4" data-aos="fade-up" data-aos-delay="100">
            <div class="flex items-center justify-between px-1">
              <h2 class="text-xl font-black text-base-content tracking-tight">
                Offres d'emploi disponibles
              </h2>
              <span class="badge bg-[#006643] border-none text-white font-bold px-3 py-2 text-xs h-7">
                {{ company.jobs?.length || 0 }} postes ouverts
              </span>
            </div>

            <div v-if="company.jobs && company.jobs.length > 0" class="flex flex-col gap-3">
              <BaseCard v-for="job in company.jobs" :key="job.id" density="normal"
                class="card-interactive border-base-200/60 hover:border-emerald-200 transition-all duration-300">
                <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 w-full">
                  <div class="flex flex-col gap-1 text-left">
                    <h3
                      class="text-lg font-extrabold text-base-content tracking-tight hover:text-emerald-700 transition-colors">
                      {{ job.title }}
                    </h3>
                    <div class="flex flex-wrap items-center gap-3 text-xs text-base-content/60 font-semibold">
                      <span
                        class="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md text-[11px] font-black tracking-wide uppercase">
                        {{ job.type }}
                      </span>
                      <span>💰 {{ job.salary }}</span>
                      <span>⏳ Publié {{ job.postedAt }}</span>
                    </div>
                  </div>

                  <BaseButton :to="`/jobs/${job.id}`" variant="accent" class="sm:w-auto w-full text-xs h-10">
                    Voir l'offre
                  </BaseButton>
                </div>
              </BaseCard>
            </div>

            <BaseCard v-else class="text-center py-12 text-base-content/50 font-medium">
              Aucune offre d'emploi n'est publiée pour le moment.
            </BaseCard>
          </div>

        </div>

        <div class="lg:col-span-4 flex flex-col gap-6" data-aos="fade-up" data-aos-delay="200">

          <BaseCard density="normal" class="border-base-200/60">
            <h3 class="text-base font-black text-base-content tracking-tight mb-4 uppercase text-base-content/40">
              Informations clés
            </h3>

            <div class="flex flex-col gap-4 text-sm font-medium">
              <div class="flex justify-between items-center py-2 border-b border-b-base-100">
                <span class="text-base-content/50">Fondation</span>
                <span class="text-base-content font-bold">{{ company.founded }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-b-base-100">
                <span class="text-base-content/50">Siège social</span>
                <span class="text-base-content font-bold">{{ company.headquarters }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-b-base-100">
                <span class="text-base-content/50">Type de structure</span>
                <span class="text-base-content font-bold">{{ company.structureType }}</span>
              </div>
            </div>
          </BaseCard>

          <div
            class="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 text-xs font-semibold text-amber-800 leading-relaxed flex gap-2.5">
            <span>💡</span>
            <p>Mosalah certifie la légalité de cette entreprise sur le territoire national.</p>
          </div>

        </div>

      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDb } from '../../composables/useDb'; // Vérifie bien ce chemin vers tes composables

const route = useRoute();
const { getUserById, fetchAnnonces } = useDb();

const loading = ref(true);
const company = ref(null);

const breadcrumbs = computed(() => [
  { title: 'Entreprises', path: '/entreprises' },
  { title: company.value?.name || 'Détails entreprise', path: route.fullPath },
]);

onMounted(async () => {
  // 1. Tenter de convertir l'ID en Nombre car useAuth génère des ID numériques avec Date.now()
  const paramId = route.params.id;
  const companyId = isNaN(paramId) ? paramId : Number(paramId);

  try {
    // 2. Récupération du profil depuis le localStorage via useDb[cite: 1]
    const fetchedUser = await getUserById(companyId);

    // Debugging pour voir ce que l'application reçoit réellement (à ouvrir dans la console F12)
    console.log("ID recherché :", companyId, "Type :", typeof companyId);
    console.log("Utilisateur trouvé :", fetchedUser);

    if (fetchedUser && fetchedUser.role === 'entreprise') {
      // 3. Récupération des annonces globales[cite: 1]
      const allAnnonces = await fetchAnnonces() || [];
      
      // Sécurité sur le filtrage (on compare en transformant en String pour éviter les conflits)
      const companyJobs = allAnnonces.filter(annonce => 
        String(annonce.entrepriseId) === String(companyId)
      );

      // 4. Mapping complet pour ton template
      company.value = {
        id: fetchedUser.id,
        name: fetchedUser.name,
        sector: fetchedUser.sector || "Technologies / IT",
        location: fetchedUser.location || "Brazzaville, Congo",
        size: fetchedUser.size || "10-25",
        founded: fetchedUser.founded || "—",
        headquarters: fetchedUser.headquarters || fetchedUser.location || "—",
        structureType: fetchedUser.structureType || "SARL",
        website: fetchedUser.website || "#",
        logo: fetchedUser.avatar || fetchedUser.logo || "",
        coverImage: fetchedUser.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
        description: fetchedUser.bio || "Aucune description disponible pour le moment.",
        jobs: companyJobs.map(job => ({
          id: job.id,
          title: job.title,
          type: job.type,
          salary: job.salary || "À débattre",
          postedAt: job.createdAt || "Récemment"
        }))
      };
    }
  } catch (error) {
    console.error("Erreur critique lors du chargement :", error);
  } finally {
    loading.value = false;
  }
});
</script>