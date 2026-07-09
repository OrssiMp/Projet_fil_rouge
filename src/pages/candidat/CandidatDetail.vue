<template>
  <div v-if="loading" class="min-h-screen flex items-center justify-center">
    <span class="loading loading-spinner loading-lg text-accent"></span>
  </div>

  <div v-else-if="notFound" class="min-h-screen flex flex-col items-center justify-center gap-3 text-center px-4">
    <p class="text-3xl">🔍</p>
    <h2 class="font-black text-base-content text-lg">Profil introuvable</h2>
    <p class="text-sm text-base-content/50 font-medium">Ce candidat n'existe pas ou plus sur Mosalah.</p>
    <BaseButton variant="ghost" class="border border-base-300 mt-2" @click="router.back()">Retour</BaseButton>
  </div>

  <div v-else class="min-h-screen bg-base-200/50 pb-16 select-none">

    <header class="bg-base-100 border-b border-base-200 py-12">
      <div class="max-w-6xl mx-auto px-4">
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
              <!-- Si c'est mon propre profil : lien vers l'édition, sinon contact -->
              <router-link v-if="isOwnProfile" to="/candidat/settings">
                <BaseButton variant="accent" icon="edit">Modifier mon profil</BaseButton>
              </router-link>
              <template v-else>
                <BaseButton
                  variant="ghost" icon="mail" class="border border-base-300"
                  :loading="contacting"
                  :disabled="currentUser?.role === 'candidat'"
                  :title="currentUser?.role === 'candidat' ? 'La messagerie est réservée aux entreprises.' : ''"
                  @click="handleContact"
                >
                  Contacter
                </BaseButton>
                <BaseButton variant="accent" icon="document" disabled title="CV non disponible pour l'instant">
                  Télécharger CV
                </BaseButton>
              </template>
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
            <p class="text-sm md:text-base text-base-content/70 leading-relaxed font-medium whitespace-pre-line">
              {{ candidate.bio || "Ce candidat n'a pas encore rédigé de présentation." }}
            </p>
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
            <p v-else class="text-xs text-base-content/40 font-semibold italic">
              {{ isOwnProfile ? "Vous n'avez pas encore ajouté d'expérience." : "Ce candidat n'a pas encore renseigné d'expérience." }}
            </p>
          </BaseCard>
          <!-- Dans lg:col-span-8, après "Parcours & Expériences" -->
<BaseCard density="spacious" data-aos="fade-up" data-aos-delay="125">
  <h2 class="text-xl font-black text-base-content tracking-tight mb-6">Formations</h2>
  <div v-if="candidate.formations && candidate.formations.length > 0" class="relative border-l-2 border-base-200 pl-6 ml-2 flex flex-col gap-8">
    <div v-for="(formation, index) in candidate.formations" :key="index" class="relative">
      <span class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-sky-500 border-4 border-base-100 shadow-sm"></span>
      <span class="text-xs font-black text-sky-700 bg-sky-50 px-2 py-1 rounded-md">
        {{ formation.start || '?' }} → {{ formation.end || 'Présent' }}
      </span>
      <h3 class="text-lg font-extrabold text-base-content tracking-tight mt-2">{{ formation.degree }}</h3>
      <p class="text-sm font-bold text-base-content/60 mb-1">
        {{ formation.school }}<span v-if="formation.field"> — {{ formation.field }}</span>
      </p>
    </div>
  </div>
  <p v-else class="text-xs text-base-content/40 font-semibold italic">
    {{ isOwnProfile ? "Vous n'avez pas encore ajouté de formation." : "Ce candidat n'a pas encore renseigné de formation." }}
  </p>
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
            <BaseCard v-else density="normal" class="border-base-200/60 text-center py-8">
              <p class="text-xs text-base-content/40 font-semibold italic">Aucun projet mis en avant pour le moment.</p>
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
            <p v-else class="text-xs text-base-content/40 font-semibold italic">Aucune compétence renseignée.</p>
          </BaseCard>

          <BaseCard density="normal" class="border-base-200/60">
            <h3 class="text-xs font-black text-base-content/40 tracking-tight mb-4 uppercase">Langues</h3>
            <div v-if="candidate.languages && candidate.languages.length > 0" class="flex flex-wrap gap-1.5">
              <span v-for="lang in candidate.languages" :key="lang" class="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl">
                {{ lang }}
              </span>
            </div>
            <p v-else class="text-xs text-base-content/40 font-semibold italic">Langues non renseignées.</p>
          </BaseCard>

         <!-- Dans lg:col-span-4, après la carte "Langues" -->
<BaseCard density="normal" class="border-base-200/60">
  <h3 class="text-xs font-black text-base-content/40 tracking-tight mb-4 uppercase">Informations</h3>
  <div class="flex flex-col gap-2.5 text-xs md:text-sm font-medium">
    <div v-if="candidate.gender" class="flex justify-between items-center">
      <span class="text-base-content/50 font-semibold">Sexe</span>
      <span class="text-base-content/80 font-bold">{{ candidate.gender }}</span>
    </div>
    <div v-if="candidate.nationality" class="flex justify-between items-center">
      <span class="text-base-content/50 font-semibold">Nationalité</span>
      <span class="text-base-content/80 font-bold">{{ candidate.nationality }}</span>
    </div>
    <p v-if="!candidate.gender && !candidate.nationality" class="text-xs text-base-content/30 italic">
      Aucune information complémentaire renseignée.
    </p>
  </div>
</BaseCard>

<!-- Carte Contact  -->
<BaseCard density="normal" class="border-base-200/60">
  <h3 class="text-xs font-black text-base-content/40 tracking-tight mb-4 uppercase">Contact</h3>
  <p class="text-xs md:text-sm font-medium text-base-content/70 mb-3">
    ✉️ {{ candidate.email || 'Email non renseigné' }}
  </p>
  <p class="text-[11px] text-base-content/40 font-medium italic">
    Le numéro de téléphone n'est communiqué qu'après une prise de contact via la messagerie Mosalah.
  </p>

  <div v-if="hasAnyNetwork" class="flex flex-col gap-2 text-xs md:text-sm font-medium mt-4 pt-4 border-t border-base-100">
    <a v-if="candidate.networks?.linkedin" :href="candidate.networks.linkedin" target="_blank" class="text-emerald-700 hover:underline flex items-center gap-1.5">
      🔗 LinkedIn
    </a>
    <a v-if="candidate.networks?.github" :href="candidate.networks.github" target="_blank" class="text-emerald-700 hover:underline flex items-center gap-1.5">
      🔗 GitHub
    </a>
    <a v-if="candidate.networks?.portfolio" :href="candidate.networks.portfolio" target="_blank" class="text-emerald-700 hover:underline flex items-center gap-1.5">
      🔗 Portfolio
    </a>
    <a v-for="net in candidate.networks?.additional || []" :key="net.name" :href="net.url" target="_blank" class="text-emerald-700 hover:underline flex items-center gap-1.5">
      🔗 {{ net.name }}
    </a>
  </div>
</BaseCard>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDb } from '../../composables/useDb';
import { useAuth } from '../../composables/useAuth';
import { useMessages } from '../../composables/useMessages';

const route = useRoute();
const router = useRouter();
const { getUserById } = useDb();
const { currentUser } = useAuth();
const { getOrCreateConversation } = useMessages();

const candidate = ref(null);
const loading = ref(true);
const notFound = ref(false);
const contacting = ref(false);

onMounted(async () => {
  const candidateId = Number(route.params.id);
  const found = await getUserById(candidateId);

  if (found && found.role === 'candidat') {
    candidate.value = found;
  } else {
    notFound.value = true;
  }
  loading.value = false;
});

const isOwnProfile = computed(() => currentUser.value?.id === candidate.value?.id);

const professionalTitle = computed(() => candidate.value?.experiences?.[0]?.role || 'Titre professionnel non renseigné');

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

const handleContact = async () => {
  if (!currentUser.value) {
    router.push({ name: 'Login' });
    return;
  }
  if (currentUser.value.role !== 'entreprise') return;

  contacting.value = true;
  const conv = await getOrCreateConversation(candidate.value.id, currentUser.value.id);
  contacting.value = false;

  if (conv) router.push(`/message?conversation=${conv.id}`);
};
const hasAnyNetwork = computed(() => {
  const n = candidate.value?.networks;
  if (!n) return false;
  return !!(n.linkedin || n.github || n.portfolio || (n.additional && n.additional.length > 0));
});
</script>