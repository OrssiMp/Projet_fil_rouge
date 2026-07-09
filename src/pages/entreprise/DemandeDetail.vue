<template>
  <div v-if="loading" class="max-w-4xl mx-auto py-12 px-4">
    <div class="skeleton h-64 rounded-2xl"></div>
  </div>

  <div v-else-if="notFound" class="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-center px-4">
    <p class="text-3xl">🔍</p>
    <h2 class="font-black text-base-content text-lg">Demande introuvable</h2>
    <BaseButton variant="ghost" class="border border-base-300 mt-2" @click="router.back()">Retour</BaseButton>
  </div>

  <div v-else class="max-w-4xl mx-auto px-4 py-8 pb-16">
    <button @click="router.back()" class="btn btn-sm btn-ghost -ml-2 mb-4 text-base-content/60">← Retour</button>

    <!-- En-tête auteur -->
    <div class="bg-base-100 border border-base-200 rounded-2xl p-6 flex items-center gap-4 mb-6">
      <div class="w-16 h-16 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center border border-base-200">
        <img v-if="author.avatar" :src="author.avatar" :alt="author.name" class="object-cover w-full h-full" />
        <div v-else class="w-full h-full flex items-center justify-center font-black text-lg" :class="[avatarColor.bg, avatarColor.text]">
          {{ initials }}
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <h2 class="font-black text-lg text-base-content truncate">{{ author.name || 'Candidat' }}</h2>
        <p class="text-xs text-base-content/50 font-semibold">
          📍 {{ author.location || 'Localisation non renseignée' }}
          <span v-if="author.yearsOfExperience"> · {{ author.yearsOfExperience }} an{{ author.yearsOfExperience > 1 ? 's' : '' }} d'expérience</span>
        </p>
      </div>
      <span class="text-[11px] font-black uppercase tracking-wide px-2.5 py-1 rounded-md shrink-0"
        :class="isAvailable ? 'bg-emerald-50 text-[#006643]' : 'bg-base-200 text-base-content/40'">
        {{ isAvailable ? 'Disponible' : 'Indisponible' }}
      </span>
    </div>

    <!-- Contenu de la demande -->
    <BaseCard density="spacious" class="mb-6">
      <span class="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md text-[10px] font-black tracking-wide uppercase inline-block mb-3">
        Demande candidat · {{ demande.createdAt }}
      </span>
      <h1 class="text-2xl font-black text-base-content tracking-tight mb-4">{{ demande.title }}</h1>
      <p class="text-sm md:text-base text-base-content/80 leading-relaxed whitespace-pre-line">
        {{ demande.description || 'Aucun détail supplémentaire fourni.' }}
      </p>
    </BaseCard>

    <!-- Aperçu du profil du candidat -->
    <BaseCard density="spacious" class="mb-6">
      <h2 class="text-lg font-black text-base-content tracking-tight mb-4">À propos de {{ author.name }}</h2>
      <p v-if="author.bio" class="text-sm text-base-content/70 leading-relaxed mb-4 whitespace-pre-line">{{ author.bio }}</p>
      <p v-else class="text-xs text-base-content/40 italic mb-4">Aucune présentation renseignée.</p>

      <div v-if="(author.skills || []).length > 0" class="flex flex-wrap gap-1.5 mb-2">
        <span v-for="skill in author.skills" :key="skill" class="bg-base-200 text-base-content/80 text-xs font-bold px-3 py-1.5 rounded-xl">
          {{ skill }}
        </span>
      </div>

      <router-link :to="`/candidats/details/${author.id}`" class="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1 mt-3">
        Voir le profil complet ↗
      </router-link>
    </BaseCard>

    <BaseButton variant="accent" class="w-full" :loading="contacting" @click="handleContact">
      Contacter {{ author.name }}
    </BaseButton>
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
const { getDemandeById } = useDb();
const { currentUser } = useAuth();
const { getOrCreateConversation } = useMessages();

const loading = ref(true);
const notFound = ref(false);
const demande = ref(null);
const contacting = ref(false);

onMounted(async () => {
  const result = await getDemandeById(route.params.id);
  if (result) demande.value = result;
  else notFound.value = true;
  loading.value = false;
});

const author = computed(() => demande.value?.author || {});
const isAvailable = computed(() => author.value.availability === true || (typeof author.value.availability === 'string' && author.value.availability.length > 0));

const initials = computed(() => {
  const name = author.value.name;
  if (!name) return '?';
  return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
});

const avatarPalette = [
  { bg: 'bg-emerald-100', text: 'text-emerald-700' }, { bg: 'bg-sky-100', text: 'text-sky-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' }, { bg: 'bg-violet-100', text: 'text-violet-700' },
];
const avatarColor = computed(() => {
  const key = String(author.value.id ?? author.value.name ?? 'default');
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = key.charCodeAt(i) + ((hash << 5) - hash);
  return avatarPalette[Math.abs(hash) % avatarPalette.length];
});

const handleContact = async () => {
  if (!currentUser.value || !author.value.id) return;
  contacting.value = true;
  const conv = await getOrCreateConversation(author.value.id, currentUser.value.id);
  contacting.value = false;
  if (conv) router.push(`/message?conversation=${conv.id}`);
};
</script>