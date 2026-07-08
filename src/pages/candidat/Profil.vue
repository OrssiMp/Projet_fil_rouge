<template>
  <div v-if="candidate" class="min-h-screen bg-base-200/50 pb-16 select-none">

    <header class="bg-base-100 border-b border-base-200 py-12">
      <div class="max-w-6xl mx-auto px-4">

        <!-- Bandeau de complétude du profil -->
        <div v-if="completionPercentage < 100" class="mb-8 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="radial-progress text-amber-600 font-black text-xs shrink-0" :style="`--value:${completionPercentage}; --size:2.5rem; --thickness: 3px;`">
              {{ completionPercentage }}%
            </div>
            <div>
              <p class="text-sm font-black text-amber-800">Votre profil est incomplet</p>
              <p class="text-xs font-semibold text-amber-700/70">
                Un profil complet attire davantage l'attention des recruteurs.
              </p>
            </div>
          </div>
          <router-link to="/candidat/settings">
            <BaseButton size="sm" class="bg-amber-600 hover:bg-amber-700 text-white border-none shrink-0">
              Compléter maintenant
            </BaseButton>
          </router-link>
        </div>

        <div class="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">

          <div class="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-base-100 shadow-xl overflow-hidden shrink-0">
            <BaseImage
              v-if="candidate.avatar"
              :src="candidate.avatar"
              :alt="`Photo de profil de ${candidate.name}`"
              ratio="1/1" priority rounded="full"
            />
            <div v-else class="w-full h-full flex items-center justify-center font-black text-3xl" :class="[avatarColor.bg, avatarColor.text]">
              {{ initials }}
            </div>
          </div>

          <div class="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
            <div data-aos="fade-right">
              <h1 class="text-2xl md:text-3xl font-black text-base-content tracking-tight mb-1">
                {{ candidate.name || 'Nom non renseigné' }}
              </h1>
              <p class="text-emerald-700 font-extrabold text-base md:text-lg mb-3">
                {{ professionalTitle }}
              </p>
              <div class="flex flex-wrap justify-center md:justify-start gap-3 text-xs font-semibold text-base-content/60">
                <span>📍 {{ candidate.location || 'Localisation non renseignée' }}</span>
                <span>•</span>
                <span>💼 {{ experienceLabel }}</span>
                <span>•</span>
                <span class="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md text-[11px] font-black">
                  {{ availabilityLabel }}
                </span>
              </div>
            </div>

            <div class="flex items-center justify-center gap-2 shrink-0" data-aos="fade-left">
              <router-link to="/candidat/settings">
                <BaseButton variant="accent" icon="edit">Modifier mon profil</BaseButton>
              </router-link>
            </div>
          </div>

        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <div class="lg:col-span-8 flex flex-col gap-8">

          <BaseCard density="spacious" data-aos="fade-up">
            <h2 class="text-xl font-black text-base-content tracking-tight mb-4">Résumé professionnel</h2>
            <p v-if="candidate.bio" class="text-sm md:text-base text-base-content/70 leading-relaxed font-medium whitespace-pre-line">
              {{ candidate.bio }}
            </p>
            <EmptySectionPrompt v-else text="Vous n'avez pas encore rédigé de présentation. Les recruteurs voient en priorité les profils avec une bio." />
          </BaseCard>

          <BaseCard density="spacious" data-aos="fade-up" data-aos-delay="100">
            <h2 class="text-xl font-black text-base-content tracking-tight mb-6">Parcours & Expériences</h2>
            <div v-if="candidate.experiences && candidate.experiences.length > 0" class="relative border-l-2 border-base-200 pl-6 ml-2 flex flex-col gap-8">
              <div v-for="exp in candidate.experiences" :key="exp.id" class="relative">
                <span class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-base-100 shadow-sm"></span>
                <span class="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                  {{ exp.period || 'Période non renseignée' }}
                </span>
                <h3 class="text-lg font-extrabold text-base-content tracking-tight mt-2">{{ exp.role }}</h3>
                <p class="text-sm font-bold text-base-content/60 mb-2">{{ exp.company || 'Entreprise non précisée' }}</p>
                <p class="text-sm text-base-content/70 leading-relaxed font-medium">{{ exp.description || 'Aucune description fournie.' }}</p>
              </div>
            </div>
            <EmptySectionPrompt v-else text="Aucune expérience ajoutée. Ajoutez votre parcours pour rassurer les recruteurs." />
          </BaseCard>

          <div class="flex flex-col gap-4" data-aos="fade-up" data-aos-delay="150">
            <h2 class="text-xl font-black text-base-content tracking-tight px-1">Projets mis en avant</h2>
            <div v-if="candidate.projects && candidate.projects.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BaseCard v-for="project in candidate.projects" :key="project.id" density="normal" class="card-interactive border-base-200/60">
                <h3 class="text-base font-black text-base-content tracking-tight mb-1">{{ project.title }}</h3>
                <p class="text-xs text-base-content/60 font-semibold mb-3">
                  {{ (project.technologies || []).join(' · ') || 'Technologies non précisées' }}
                </p>
                <p class="text-xs md:text-sm text-base-content/70 leading-relaxed font-medium mb-4">
                  {{ project.description || 'Aucune description fournie.' }}
                </p>
                <a v-if="project.link" :href="project.link" target="_blank" class="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1">
                  Voir le projet ↗
                </a>
              </BaseCard>
            </div>
            <BaseCard v-else density="normal" class="border-base-200/60">
              <EmptySectionPrompt text="Aucun projet mis en avant. Montrez ce que vous savez faire concrètement." />
            </BaseCard>
          </div>

        </div>

        <div class="lg:col-span-4 flex flex-col gap-6" data-aos="fade-up" data-aos-delay="200">
          <BaseCard density="normal" class="border-base-200/60">
            <h3 class="text-xs font-black text-base-content/40 tracking-tight mb-4 uppercase">Compétences</h3>
            <div v-if="candidate.skills && candidate.skills.length > 0" class="flex flex-wrap gap-1.5">
              <span v-for="skill in candidate.skills" :key="skill" class="bg-base-200 text-base-content/80 text-xs font-bold px-3 py-1.5 rounded-xl border border-base-300/30">
                {{ skill }}
              </span>
            </div>
            <EmptySectionPrompt v-else text="Aucune compétence renseignée." compact />
          </BaseCard>

          <BaseCard density="normal" class="border-base-200/60">
            <h3 class="text-xs font-black text-base-content/40 tracking-tight mb-4 uppercase">Langues</h3>
            <div v-if="candidate.languages && candidate.languages.length > 0" class="flex flex-wrap gap-1.5">
              <span v-for="lang in candidate.languages" :key="lang" class="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl">
                {{ lang }}
              </span>
            </div>
            <EmptySectionPrompt v-else text="Langues non renseignées." compact />
          </BaseCard>

          <BaseCard density="normal" class="border-base-200/60">
            <h3 class="text-xs font-black text-base-content/40 tracking-tight mb-4 uppercase">Contact</h3>
            <p class="text-xs md:text-sm font-medium text-base-content/70">✉️ {{ candidate.email || 'Email non renseigné' }}</p>
          </BaseCard>
        </div>

      </div>
    </main>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <p class="text-sm font-semibold text-base-content/50">Chargement de votre profil...</p>
  </div>
</template>

<script setup>
import { computed, h } from 'vue';
import { useAuth } from '../../composables/useAuth';

const { currentUser } = useAuth();

// Ce profil est TOUJOURS le mien : pas de fetch, pas de route param.
const candidate = computed(() => currentUser.value);

const professionalTitle = computed(() => candidate.value?.experiences?.[0]?.role || 'Ajoutez un titre en complétant votre première expérience');

const experienceLabel = computed(() => {
  const years = candidate.value?.yearsOfExperience;
  if (years === undefined || years === null || years === '') return "Expérience non précisée";
  return `${years} an${Number(years) > 1 ? 's' : ''} d'expérience`;
});

const availabilityLabel = computed(() => {
  const a = candidate.value?.availability;
  if (a === true) return 'Disponible immédiatement';
  if (a === false) return 'Non disponible actuellement';
  return a || 'Disponibilité non précisée';
});

const initials = computed(() => {
  const name = candidate.value?.name;
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
});

const avatarPalette = [
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-sky-100', text: 'text-sky-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-violet-100', text: 'text-violet-700' },
  { bg: 'bg-rose-100', text: 'text-rose-700' },
];
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
};
const avatarColor = computed(() => {
  const key = String(candidate.value?.id ?? candidate.value?.name ?? 'default');
  return avatarPalette[hashString(key) % avatarPalette.length];
});

// Complétude du profil : calculée sur les champs réels de UserProfileData
const completionPercentage = computed(() => {
  const c = candidate.value;
  if (!c) return 0;
  const checks = [
    !!c.avatar,
    !!c.bio,
    !!c.location,
    c.yearsOfExperience !== undefined && c.yearsOfExperience !== null && c.yearsOfExperience !== '' && c.yearsOfExperience !== 0,
    c.availability !== undefined && c.availability !== null && c.availability !== '',
    (c.skills || []).length > 0,
    (c.languages || []).length > 0,
    (c.experiences || []).length > 0,
    (c.projects || []).length > 0,
  ];
  const filled = checks.filter(Boolean).length;
  return Math.round((filled / checks.length) * 100);
});

// Petit composant inline pour les sections vides, avec lien direct vers l'édition
const EmptySectionPrompt = (props) => h(
  'div',
  { class: props.compact ? 'text-center py-2' : 'text-center py-6' },
  [
    h('p', { class: 'text-xs text-base-content/40 font-semibold italic mb-2' }, props.text),
    h(
      'router-link',
      { to: '/candidat/settings', class: 'text-xs font-bold text-emerald-700 hover:underline' },
      () => '+ Compléter cette section',
    ),
  ],
);
</script>