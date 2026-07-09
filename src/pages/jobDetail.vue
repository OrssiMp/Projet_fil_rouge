<template>
  <div class="max-w-7xl mx-auto px-4 lg:px-8 py-8 select-none">
    <BaseBreadCrumbs class="mb-6" :items="breadcrumbs" />

    <BaseCard density="spacious" class="mb-8">
      <div
        class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6"
      >
        <div class="flex items-start gap-4">
          <div
            class="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-2xl shrink-0"
          >
            <BaseIcon name="offre" />
          </div>

          <div>
            <h1
              class="text-xl md:text-3xl font-black text-base-content tracking-tight"
            >
              {{ job.title }}
            </h1>

            <div
              class="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-xs md:text-sm text-base-content/70 font-semibold"
            >
              <div class="flex items-center gap-1.5 text-base-content">
                <BaseIcon
                  name="entreprise"
                  class="text-base-content/40 text-xs"
                />
                {{ job.company }}
              </div>
              <div class="flex items-center gap-1.5">
                <BaseIcon
                  name="location"
                  class="text-base-content/40 text-xs"
                />
                {{ job.location }}
              </div>
              <div class="flex items-center gap-1.5">
                <BaseIcon name="offre" class="text-base-content/40 text-xs" />
                {{ job.contractType }}
              </div>
              <div class="flex items-center gap-1.5 text-accent">
                <BaseIcon name="cloche" class="text-xs" />
                {{ job.postedAt }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <BaseButton variant="outline" icon="reglage" class="w-full sm:w-auto">
            Sauvegarder
          </BaseButton>

          <BaseButton
            :variant="hasApplied ? 'neutral' : 'accent'"
            :icon="hasApplied ? 'validation' : 'chevron-droite'"
            :disabled="hasApplied || loading"
            class="lg:w-50 sm:w-auto"
            @click="postule()"
          >
            {{
              hasApplied
                ? "Déjà postulé"
                : loading
                  ? "Envoi..."
                  : "Postuler maintenant"
            }}
          </BaseButton>
        </div>
      </div>
    </BaseCard>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 space-y-6">
        <BaseCard density="spacious">
          <div
            class="flex items-center gap-2.5 mb-4 border-b border-base-100 pb-3"
          >
            <BaseIcon name="candidat" class="text-accent text-base" />
            <h2 class="text-lg font-black text-base-content tracking-tight">
              Description du poste
            </h2>
          </div>
          <div
            class="space-y-4 text-sm md:text-base text-base-content/80 leading-relaxed"
          >
            <p v-for="(p, idx) in job.description" :key="idx">{{ p }}</p>
          </div>
        </BaseCard>

        <!-- Responsabilités -->
<BaseCard density="spacious">
  <div class="flex items-center gap-2.5 mb-4 border-b border-base-100 pb-3">
    <BaseIcon name="validation" class="text-accent text-base" />
    <h2 class="text-lg font-black text-base-content tracking-tight">Responsabilités</h2>
  </div>
  <ul v-if="job.responsibilities.length > 0" class="space-y-4 font-medium">
    <li v-for="(item, index) in job.responsibilities" :key="index"
      class="flex items-start gap-3 text-sm md:text-base text-base-content/80">
      <BaseIcon name="validation" class="text-accent mt-1 text-xs shrink-0" />
      <span>{{ item }}</span>
    </li>
  </ul>
  <p v-else class="text-xs text-base-content/40 font-semibold italic">Non précisé par l'entreprise.</p>
</BaseCard>

<!-- Compétences requises -->
<BaseCard density="spacious">
  <div class="flex items-center gap-2.5 mb-4 border-b border-base-100 pb-3">
    <BaseIcon name="dashboard" class="text-accent text-base" />
    <h2 class="text-lg font-black text-base-content tracking-tight">Compétences requises</h2>
  </div>
  <div v-if="job.skills.length > 0" class="flex flex-wrap gap-2 mb-4">
    <BaseBadge v-for="(skill, index) in job.skills" :key="index"
      class="font-bold text-xs tracking-wide rounded-xl px-4 py-3.5 border"
      :class="skill.highlight ? 'bg-accent text-white border-accent shadow-sm' : 'bg-transparent border-base-300 text-base-content/70'">
      {{ skill.name }}
    </BaseBadge>
  </div>
  <p v-else class="text-xs text-base-content/40 font-semibold italic mb-4">Aucune compétence spécifique renseignée.</p>
  <p v-if="job.skillsDescription" class="text-sm md:text-base text-base-content/80 leading-relaxed">
    {{ job.skillsDescription }}
  </p>
</BaseCard>

<!-- Profil recherché -->
<BaseCard density="spacious">
  <div class="flex items-center gap-2.5 mb-4 border-b border-base-100 pb-3">
    <BaseIcon name="candidat" class="text-accent text-base" />
    <h2 class="text-lg font-black text-base-content tracking-tight">Profil recherché</h2>
  </div>
  <ul v-if="job.profile.length > 0" class="list-disc pl-5 space-y-3 text-sm md:text-base text-base-content/80 leading-relaxed font-medium">
    <li v-for="(item, index) in job.profile" :key="index">{{ item }}</li>
  </ul>
  <p v-else class="text-xs text-base-content/40 font-semibold italic">Non précisé par l'entreprise.</p>
</BaseCard>
      </div>

      <aside class="lg:col-span-4 space-y-6">
        <BaseCard density="normal">
          <h3
            class="text-xs font-black uppercase tracking-wider mb-5 text-base-content/40"
          >
            Aperçu du poste
          </h3>
          <div class="space-y-4">
            <div
              v-for="(info, idx) in jobOverview"
              :key="idx"
              class="flex items-center gap-3"
            >
              <div
                class="w-10 h-10 rounded-xl bg-base-200/60 flex items-center justify-center text-base-content/60 text-sm"
              >
                <BaseIcon :name="info.icon" />
              </div>
              <div>
                <p
                  class="text-[10px] font-bold text-base-content/40 uppercase tracking-wide"
                >
                  {{ info.label }}
                </p>
                <p class="text-sm font-black text-base-content/80 mt-0.5">
                  {{ info.value }}
                </p>
              </div>
            </div>
          </div>
        </BaseCard>

        <BaseCard density="normal">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg"
            >
              <BaseIcon name="entreprise" />
            </div>
            <h3
              class="text-lg font-black text-base-content tracking-tight truncate"
            >
              {{ job.company }}
            </h3>
          </div>
          <p
            class="text-xs md:text-sm text-base-content/70 leading-relaxed mb-4 font-medium"
          >
            {{ job.companyDescription }}
          </p>
          <RouterLink
            to="#"
            class="text-xs font-bold text-accent hover:underline flex items-center gap-1"
          >
            Voir le profil de l’entreprise
            <BaseIcon name="chevron-droite" class="text-[10px]" />
          </RouterLink>
        </BaseCard>
      </aside>
    </div>

    <BaseHero centered variant="soft" class="mt-12">
      <template #title>Prêt à postuler ?</template>
      <template #subtitle>
        Rejoignez cette opportunité et contribuez à développer des solutions
        numériques d’avenir au sein d’une équipe passionnée chez
        {{ job.company }}.
      </template>
      <template #actions>
        <BaseButton
          :variant="hasApplied ? 'neutral' : 'accent'"
          :icon="hasApplied ? 'validation' : 'chevron-droite'"
          :disabled="hasApplied || loading"
          class="px-12"
          @click="postule()"
        >
          {{
            hasApplied
              ? "Déjà postulé"
              : loading
                ? "Envoi..."
                : "Postuler maintenant"
          }}
        </BaseButton>
      </template>
    </BaseHero>
  </div>
</template>
<script setup>
import { computed, onMounted,ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { useDb } from "../composables/useDb";

const route = useRoute();
const router = useRouter();
const { currentUser } = useAuth();
const {
  applyToAnnonce,
  loading,
  error,
  fetchAnnonces,
  annonces,
  fetchUsers,
  users,
  fetchCandidaturesForCandidat
} = useDb();

const jobs = [
  {
    id: 1,
    title: "Développeur Frontend",
    company: "ABC Tech",
    location: "Pointe-Noire ",
    contractType: "CDI",
    postedAt: "Publié il y a 2 jours",
    salary: "À discuter",
    description: [
      "ABC Tech recherche un développeur frontend pour construire des interfaces modernes.",
      "Vous collaborerez avec les équipes design et backend.",
    ],
    responsibilities: [
      "Développer des interfaces utilisateur modernes.",
      "Intégrer des API REST.",
      "Optimiser les performances.",
      "Collaborer avec les équipes produit.",
    ],
    skills: [
      { name: "HTML5 / CSS3", highlight: false },
      { name: "JavaScript (ES6+)", highlight: false },
      { name: "Vue.js", highlight: true },
    ],
    skillsDescription: "Bonne maîtrise du frontend moderne.",
    profile: ["1 à 3 ans d’expérience", "Autonomie", "Esprit d’équipe"],
    companyDescription:
      "ABC Tech est une entreprise spécialisée dans les solutions numériques.",
  },
  // id:2
  {
    id: 2,
    title: "Sécretaire Administratif",
    company: "IMMOcool Agency",
    location: "Brazzaville",
    contractType: "CID",
    postedAt: "Publié il y a 5 jours",
    salary: "500 000 FCFA",
    description: [
      "IMMOcool Agency, cherche un sécretaire administratif pour assure l’ensemble des tâches administratives des collaborateurs qu’elle seconde au quotidien..",
      "Vous travaillerez sur la prise de rendez-vous, organisation de l’agenda, courrier, gestion des appels téléphoniques et autres tâches administratives.",
    ],
    responsibilities: [
      "Gérer les appels téléphoniques et les courriels entrants",
      "Organiser l’agenda",
      "Gérer la correspondence et les documents administratifs",
    ],
    skills: [
      { name: "Excel", highlight: true },
      { name: "Access", highlight: true },
      { name: "Word", highlight: false },
    ],
    skillsDescription:
      "Solide niveau avec les outils bureautiques et logiciels de gestion requis.",
    profile: [
      "1 à 3 ans d’expérience minimum",
      "Bonne maîtrise des outils bureautiques",
      "Eloquence et sens de l’organisation",
    ],
    companyDescription:
      "IMMOcool Agency est une agence de services immobiliers connectant propriétaires et locataires partout en République du Congo.",
  },
];
const jobId = computed(() => route.params.id);

// Charger les annonces depuis la database
onMounted(async () => {
  await fetchUsers();
  await fetchAnnonces();
});

// Convertit un texte multi-lignes en tableau de puces, en ignorant les lignes vides
const splitLines = (text) => {
  if (!text) return [];
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
};

const dbJob = computed(() => {
  const annonce = annonces.value.find((a) => a.id === jobId.value);
  if (!annonce) return null;

  const entreprise = users.value.find((u) => u.id === annonce.entrepriseId);

  return {
    id: annonce.id,
    title: annonce.title,
    company: annonce.company || entreprise?.name || "Entreprise inconnue",
    location: annonce.location || "Non spécifié",
    contractType: annonce.contractType || "Non spécifié",
    postedAt: annonce.createdAt || "Date inconnue",
    salary: annonce.salary || "À débattre",
    description: annonce.description
      ? [annonce.description]
      : ["Aucune description disponible"],

    // Texte multi-lignes → liste de puces
    responsibilities: splitLines(annonce.responsibilities),
    profile: splitLines(annonce.profileSought),

    // string[] → objets {name, highlight} attendus par le template
    skills: (annonce.requiredSkills || []).map((name) => ({ name, highlight: false })),
    skillsDescription: annonce.highlight || "", // "Mise en avant" du formulaire, réutilisé ici

    // Aucun champ dédié dans useAuth pour une description longue d'entreprise :
    // on retombe sur bio, avec un message honnête si vide
    companyDescription: entreprise?.bio || "Aucune description disponible pour cette entreprise.",
  };
});

const breadcrumbs = computed(() => [
  { title: "Offres", path: "/offres" },
  {
    title: job.value.title || "Détails de l'offre",
    path: `/offres/${jobId.value}`,
  },
]);

const job = computed(() => {
  // Priorité aux données de la database
  if (dbJob.value) return dbJob.value;
  // Fallback sur les données mockées
  return jobs.find((item) => item.id === Number(jobId.value)) || jobs[0];
});

const myCandidatures = ref([]);
onMounted(async () => {
  await fetchUsers();
  await fetchAnnonces();
  if (currentUser.value) {
    myCandidatures.value = await fetchCandidaturesForCandidat(currentUser.value.id);
  }
});

const hasApplied = computed(() => {
  return myCandidatures.value.some((c) => c.annonceId === jobId.value);
});

async function postule() {
  if (!currentUser.value) {
    router.push("/login");
    return;
  }

  if (hasApplied.value) {
    alert("Vous avez déjà postulé à cette offre.");
    router.push("/candidat/applications");
    return;
  }

  const annonce = annonces.value.find((a) => a.id === jobId.value);
  if (!annonce) {
    alert("Annonce non trouvée.");
    return;
  }

  const candidatureData = {
    annonceId: annonce.id,
    candidatId: currentUser.value.id,
    job: annonce.title,
    company: annonce.company,
    location: annonce.location,
    contractType: annonce.contractType,
    salary: annonce.salary,
    status: "sent",
  };

  const result = await applyToAnnonce(candidatureData);

  if (result) {
    alert("Candidature envoyée avec succès !");
    router.push("/candidat/applications");
  } else {
    alert(error.value || "Erreur lors de l'envoi de la candidature.");
  }
}

const jobOverview = computed(() => {
  if (!job.value) return [];

  return [
    { label: "Date de publication", value: job.value.postedAt, icon: "cloche" },
    { label: "Type de contrat", value: job.value.contractType, icon: "offre" },
    { label: "Lieu", value: job.value.location, icon: "location" },
    { label: "Salaire", value: job.value.salary, icon: "dashboard" },
  ];
});

</script>
