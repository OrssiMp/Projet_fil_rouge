<template>
  <div class="min-h-screen bg-base-200/50 pb-16 select-none">

    <header class="bg-base-100 border-b border-base-200 py-12">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">

          <div
            class="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-base-100 shadow-xl overflow-hidden shrink-0">
            <BaseImage :src="candidate.avatar" :alt="`Photo de profil de ${candidate.name}`" ratio="1/1" priority
              rounded="full" />
          </div>

          <div class="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
            <div data-aos="fade-right">
              <h1 class="text-2xl md:text-3xl font-black text-base-content tracking-tight mb-1">
                {{ candidate.name }}
              </h1>
              <p class="text-emerald-700 font-extrabold text-base md:text-lg mb-3">
                {{ candidate.title }}
              </p>
              <div
                class="flex flex-wrap justify-center md:justify-start gap-3 text-xs font-semibold text-base-content/60">
                <span class="flex items-center gap-1">📍 {{ candidate.location }}</span>
                <span>•</span>
                <span>💼 {{ candidate.experienceYears }} d'expérience</span>
                <span>•</span>
                <span class="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md text-[11px] font-black">
                  {{ candidate.availability }}
                </span>
              </div>
            </div>

            <div class="flex items-center justify-center gap-2 shrink-0" data-aos="fade-left">
              <BaseButton variant="ghost" icon="mail" class="border border-base-300">
                Contacter
              </BaseButton>
              <BaseButton variant="accent" icon="document">
                Télécharger CV
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
              Résumé professionnel
            </h2>
            <p class="text-sm md:text-base text-base-content/70 leading-relaxed font-medium whitespace-pre-line">
              {{ candidate.bio }}
            </p>
          </BaseCard>

          <BaseCard density="spacious" data-aos="fade-up" data-aos-delay="100">
            <h2 class="text-xl font-black text-base-content tracking-tight mb-6">
              Parcours & Expériences
            </h2>

            <div class="relative border-l-2 border-base-200 pl-6 ml-2 flex flex-col gap-8">
              <div v-for="(exp, index) in candidate.experiences" :key="index" class="relative">
                <span
                  class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-base-100 shadow-sm"></span>

                <span class="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                  {{ exp.period }}
                </span>
                <h3 class="text-lg font-extrabold text-base-content tracking-tight mt-2">
                  {{ exp.role }}
                </h3>
                <p class="text-sm font-bold text-base-content/60 mb-2">
                  {{ exp.company }} — <span class="font-medium text-xs">{{ exp.location }}</span>
                </p>
                <p class="text-sm text-base-content/70 leading-relaxed font-medium">
                  {{ exp.description }}
                </p>
              </div>
            </div>
          </BaseCard>

          <div class="flex flex-col gap-4" data-aos="fade-up" data-aos-delay="150">
            <h2 class="text-xl font-black text-base-content tracking-tight px-1">
              Projets mis en avant
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BaseCard v-for="(project, index) in candidate.projects" :key="index" density="normal"
                class="card-interactive border-base-200/60">
                <h3 class="text-base font-black text-base-content tracking-tight mb-1">
                  {{ project.name }}
                </h3>
                <p class="text-xs text-base-content/60 font-semibold mb-3">
                  {{ project.tech }}
                </p>
                <p class="text-xs md:text-sm text-base-content/70 leading-relaxed font-medium mb-4">
                  {{ project.description }}
                </p>
                <a :href="project.link" target="_blank"
                  class="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1">
                  Voir le projet ↗
                </a>
              </BaseCard>
            </div>
          </div>

        </div>

        <div class="lg:col-span-4 flex flex-col gap-6" data-aos="fade-up" data-aos-delay="200">

          <BaseCard density="normal" class="border-base-200/60">
            <h3 class="text-xs font-black text-base-content/40 tracking-tight mb-4 uppercase">
              Compétences
            </h3>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="skill in candidate.skills" :key="skill"
                class="bg-base-200 text-base-content/80 text-xs font-bold px-3 py-1.5 rounded-xl border border-base-300/30">
                {{ skill }}
              </span>
            </div>
          </BaseCard>

          <BaseCard density="normal" class="border-base-200/60">
            <h3 class="text-xs font-black text-base-content/40 tracking-tight mb-4 uppercase">
              Langues
            </h3>
            <div class="flex flex-col gap-3 text-xs md:text-sm font-medium">
              <div v-for="lang in candidate.languages" :key="lang.name" class="flex justify-between items-center">
                <span class="text-base-content/70 font-semibold">{{ lang.name }}</span>
                <span class="text-emerald-700 font-extrabold text-xs uppercase bg-emerald-50 px-2 py-0.5 rounded">
                  {{ lang.level }}
                </span>
              </div>
            </div>
          </BaseCard>

        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from '../../composables/useAuth';

const route = useRoute();

const candidate = ref({
  name: "Orsi Malik",
  title: "Développeur Web Junior (Full-Stack)",
  avatar: "https://placehold.co/150",
  location: "Brazzaville, République du Congo",
  experienceYears: "2 ans",
  availability: "Disponible immédiatement",
  bio: `Passionné par l'écosystème JavaScript et le développement d'interfaces fluides et robustes, je construis des applications web modernes en utilisant Vue 3, Node.js et des frameworks CSS minimalistes.\n\nRigoureux et orienté performance, j'aime concevoir des composants atomiques réutilisables et optimiser l'expérience utilisateur globale pour répondre aux exigences modernes du web.`,
  skills: ["JavaScript", "Vue.js 3", "Node.js", "Express", "Tailwind CSS", "Bootstrap", "Git", "npm"],
  languages: [
    { name: "Français", level: "Courant" },
    { name: "Anglais", level: "Débutant (A1)" },
    { name: "Espagnol", level: "Notions" }
  ],
  experiences: [
    {
      period: "2025 - Présent",
      role: "Développeur Full-Stack (Projets Open-Source)",
      company: "Indépendant / Écosystème npm",
      location: "Brazzaville",
      description: "Conception, packaging et publication de modules utilitaires JavaScript légers sur le registre npm. Optimisation des temps de rendu et écriture de documentations techniques standardisées."
    },
    {
      period: "2024 - 2025",
      role: "Développeur Web Frontend (Stage & Projets)",
      company: "Agence Digitale Locale",
      location: "Brazzaville",
      description: "Intégration de maquettes responsives et développement d'interfaces dynamiques. Travail en équipe sur la centralisation et le nettoyage de systèmes de design (Design Systems)."
    }
  ],
  projects: [
    {
      name: "SimilarCSS",
      tech: "Tailwind v3 & Bootstrap mix",
      description: "Développement d'un framework CSS ultra-minimaliste conçu pour standardiser et accélérer l'intégration des interfaces responsives.",
      link: "#"
    },
    {
      name: "Chromalogger",
      tech: "JavaScript / npm package",
      description: "Utilitaire de journalisation léger permettant de formater et coloriser proprement les logs dans les terminauxNode.js.",
      link: "#"
    }
  ]
});

const breadcrumbs = computed(() => [
  { title: 'Candidats', path: '/candidats' },
  { title: candidate.value.name || 'Détail candidat', path: `/candidats/details/${route.params.id}` },
]);

const $auth = useAuth();

</script>