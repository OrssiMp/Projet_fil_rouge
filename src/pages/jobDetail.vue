<template>
  <div class="max-w-7xl mx-auto px-4 lg:px-8 py-8 select-none">

    <!-- <BaseBreadcrumbs class="mb-6" /> -->

    <BaseCard density="spacious" class="mb-8">
      <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div class="flex items-start gap-4">
          <div
            class="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-2xl shrink-0">
            <BaseIcon name="offre" />
          </div>

          <div>
            <h1 class="text-xl md:text-3xl font-black text-base-content tracking-tight">
              {{ job.title }}
            </h1>

            <div class="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-xs md:text-sm text-base-content/70 font-semibold">
              <div class="flex items-center gap-1.5 text-base-content">
                <BaseIcon name="entreprise" class="text-base-content/40 text-xs" />
                {{ job.company }}
              </div>
              <div class="flex items-center gap-1.5">
                <BaseIcon name="location" class="text-base-content/40 text-xs" />
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
          <router-link to="/postuler">
            <BaseButton variant="accent" icon="chevron-droite" class="w-full sm:w-auto">
              Postuler maintenant
            </BaseButton>
          </router-link>
        </div>
      </div>
    </BaseCard>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

      <div class="lg:col-span-8 space-y-6">

        <BaseCard density="spacious">
          <div class="flex items-center gap-2.5 mb-4 border-b border-base-100 pb-3">
            <BaseIcon name="candidat" class="text-accent text-base" />
            <h2 class="text-lg font-black text-base-content tracking-tight">Description du poste</h2>
          </div>
          <div class="space-y-4 text-sm md:text-base text-base-content/80 leading-relaxed">
            <p v-for="(p, idx) in job.description" :key="idx">{{ p }}</p>
          </div>
        </BaseCard>

        <BaseCard density="spacious">
          <div class="flex items-center gap-2.5 mb-4 border-b border-base-100 pb-3">
            <BaseIcon name="validation" class="text-accent text-base" />
            <h2 class="text-lg font-black text-base-content tracking-tight">Responsabilités</h2>
          </div>
          <ul class="space-y-4 font-medium">
            <li v-for="(item, index) in job.responsibilities" :key="index"
              class="flex items-start gap-3 text-sm md:text-base text-base-content/80">
              <BaseIcon name="validation" class="text-accent mt-1 text-xs shrink-0" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </BaseCard>

        <BaseCard density="spacious">
          <div class="flex items-center gap-2.5 mb-4 border-b border-base-100 pb-3">
            <BaseIcon name="dashboard" class="text-accent text-base" />
            <h2 class="text-lg font-black text-base-content tracking-tight">Compétences requises</h2>
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <BaseBadge v-for="(skill, index) in job.skills" :key="index"
              class="font-bold text-xs tracking-wide rounded-xl px-4 py-3.5 border"
              :class="skill.highlight ? 'bg-accent text-white border-accent shadow-sm' : 'bg-transparent border-base-300 text-base-content/70'">
              {{ skill.name }}
            </BaseBadge>
          </div>
          <p class="text-sm md:text-base text-base-content/80 leading-relaxed">
            {{ job.skillsDescription }}
          </p>
        </BaseCard>

        <BaseCard density="spacious">
          <div class="flex items-center gap-2.5 mb-4 border-b border-base-100 pb-3">
            <BaseIcon name="candidat" class="text-accent text-base" />
            <h2 class="text-lg font-black text-base-content tracking-tight">Profil recherché</h2>
          </div>
          <ul class="list-disc pl-5 space-y-3 text-sm md:text-base text-base-content/80 leading-relaxed font-medium">
            <li v-for="(item, index) in job.profile" :key="index">
              {{ item }}
            </li>
          </ul>
        </BaseCard>
      </div>

      <aside class="lg:col-span-4 space-y-6">

        <BaseCard density="normal">
          <h3 class="text-xs font-black uppercase tracking-wider mb-5 text-base-content/40">Aperçu du poste</h3>
          <div class="space-y-4">
            <div v-for="(info, idx) in jobOverview" :key="idx" class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-xl bg-base-200/60 flex items-center justify-center text-base-content/60 text-sm">
                <BaseIcon :name="info.icon" />
              </div>
              <div>
                <p class="text-[10px] font-bold text-base-content/40 uppercase tracking-wide">{{ info.label }}</p>
                <p class="text-sm font-black text-base-content/80 mt-0.5">{{ info.value }}</p>
              </div>
            </div>
          </div>
        </BaseCard>

        <BaseCard density="normal">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg">
              <BaseIcon name="entreprise" />
            </div>
            <h3 class="text-lg font-black text-base-content tracking-tight truncate">{{ job.company }}</h3>
          </div>
          <p class="text-xs md:text-sm text-base-content/70 leading-relaxed mb-4 font-medium">
            {{ job.companyDescription }}
          </p>
          <RouterLink to="#" class="text-xs font-bold text-accent hover:underline flex items-center gap-1">
            Voir le profil de l’entreprise
            <BaseIcon name="chevron-droite" class="text-[10px]" />
          </RouterLink>
        </BaseCard>
      </aside>
    </div>

    <BaseHero centered variant="soft" class="mt-12">
      <template #title>Prêt à postuler ?</template>
      <template #subtitle>
        Rejoignez cette opportunité et contribuez à développer des solutions numériques d’avenir au sein d’une équipe
        passionnée chez {{ job.company }}.
      </template>
      <template #actions>
        <router-link to="/postuler">
          <BaseButton variant="accent" icon="chevron-droite" class="px-12">
            Postuler maintenant
          </BaseButton>
        </router-link>
      </template>
    </BaseHero>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const jobs = [
  // id:1
  {
    id: 1,
    title: "Développeur Frontend",
    company: "ABC Tech",
    location: "Pointe-Noire (Hybride)",
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
    title: "Développeur Backend",
    company: "XYZ Digital",
    location: "Brazzaville",
    contractType: "CDD",
    postedAt: "Publié il y a 5 jours",
    salary: "500 000 FCFA",
    description: [
      "XYZ Digital cherche un backend developer orienté API et architecture.",
      "Vous travaillerez sur les services métiers et la base de données.",
    ],
    responsibilities: [
      "Créer des API robustes",
      "Concevoir la base de données",
      "Maintenir la logique serveur",
    ],
    skills: [
      { name: "Node.js", highlight: true },
      { name: "Express", highlight: false },
      { name: "MySQL", highlight: false },
    ],
    skillsDescription: "Solide niveau backend requis.",
    profile: [
      "2 ans d’expérience minimum",
      "Bonne maîtrise SQL",
      "Rigueur technique",
    ],
    companyDescription:
      "XYZ Digital développe des plateformes métiers et outils SaaS.",
  },
];

const jobId = computed(() => Number(route.params.id));

const job = computed(() => {
  return jobs.find((item) => item.id === jobId.value) || jobs[0];
});

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
<!-- <script setup>
import { computed } from 'vue';


const job = {
  title: "Développeur Frontend",
  company: "ABC Tech",
  location: "Pointe-Noire (Hybride)",
  contractType: "CDI",
  postedAt: "Publié il y a 2 jours",
  salary: "À discuter",
  description: [
    "ABC Tech est à la recherche d'un(e) Développeur(se) Frontend talentueux(se) et passionné(e) pour rejoindre notre équipe technique en pleine croissance à Pointe-Noire. Dans ce rôle, vous serez au cœur de la création d'interfaces utilisateur modernes, intuitives et performantes pour nos solutions logicielles SaaS.",
    "Vous travaillerez en étroite collaboration avec nos designers UX/UI et nos développeurs backend pour transformer des concepts innovants en réalités interactives, offrant ainsi une expérience utilisateur exceptionnelle à nos clients."
  ],
  responsibilities: [
    "Concevoir et développer des interfaces utilisateur modernes, réactives et accessibles en utilisant les dernières technologies web.",
    "Intégrer des API RESTful de manière efficace pour assurer une communication fluide entre le frontend et le backend.",
    "Optimiser les performances des applications pour garantir des temps de chargement rapides et une navigation sans faille.",
    "Collaborer activement avec les équipes produit, design et backend au sein d’un environnement agile."
  ],
  skills: [
    { name: "HTML5 / CSS3", highlight: false },
    { name: "JavaScript (ES6+)", highlight: false },
    { name: "React / Vue.js", highlight: true },
    { name: "API REST", highlight: false },
    { name: "UI/UX Focus", highlight: false },
    { name: "Git", highlight: false }
  ],
  skillsDescription: "Nous recherchons une solide maîtrise des fondamentaux du web, ainsi qu’une expérience avérée avec au moins un framework moderne (React ou Vue de préférence). Une forte sensibilité à l’expérience utilisateur et au design est essentielle.",
  profile: [
    "Niveau Junior à Intermédiaire (1 à 3 ans d'expérience).",
    "Grande autonomie et capacité à résoudre des problèmes complexes de manière proactive.",
    "Excellent esprit d’équipe et communication claire.",
    "Rigueur dans l’écriture du code (clean code, tests).",
    "Curiosité technique et volonté d’apprendre en continu."
  ],
  companyDescription: "ABC Tech est une entreprise dynamique spécialisée dans le développement de solutions numériques innovantes. Nous aidons les entreprises à moderniser leurs outils et à optimiser leurs processus grâce à des logiciels sur mesure et performants."
};

const jobOverview = computed(() => [
  { label: 'Date de publication', value: job.postedAt, icon: 'cloche' },
  { label: 'Type de contrat', value: job.contractType, icon: 'offre' },
  { label: 'Lieu', value: job.location, icon: 'location' },
  { label: 'Salaire', value: job.salary, icon: 'dashboard' } // Remplacement de l'icône manquante par 'dashboard' ou une valeur sûre
]);
</script> -->