<template>
  <div class="min-h-screen bg-base-200/50 pb-16 select-none">
    <header class="bg-base-100 border-b border-base-200 py-6 mb-8">
      <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-black text-base-content tracking-tight">
            Demandes de l'écosystème
          </h1>
          <p class="text-xs md:text-sm text-base-content/60 font-semibold mt-1">
            Consultez les profils créés par les candidats en recherche active.
          </p>
        </div>
        <span class="badge bg-[#006643] border-none text-white font-bold px-3 py-4 text-xs h-7 self-start md:self-auto">
          {{ filteredDemandes.length }} demande(s) disponible(s)
        </span>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4">
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="n in 4" :key="n" class="skeleton h-48 rounded-2xl"></div>
      </div>

      <div v-else-if="!isEntreprise" class="text-center py-12">
        <p class="text-5xl mb-4">🔒</p>
        <h2 class="text-xl font-black text-base-content">Accès restreint</h2>
        <p class="text-xs text-base-content/50 max-w-sm mx-auto mt-2">
          Cette page est réservée exclusivement aux comptes entreprises pour recruter des talents.
        </p>
      </div>

      <div v-else>
        <div v-if="filteredDemandes.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="demande in filteredDemandes" :key="demande.id"
            class="bg-base-100 border border-base-200/60 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-sm">

            <!-- AUTEUR mis en avant en premier, avant même le titre de la demande -->
            <div class="flex items-center gap-3 mb-4 pb-4 border-b border-base-100">
              <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-base-200">
                <img v-if="demande.author.avatar" :src="demande.author.avatar" :alt="demande.author.name" class="object-cover w-full h-full" />
                <div v-else class="w-full h-full flex items-center justify-center font-black text-sm" :class="[demande.author.avatarColor.bg, demande.author.avatarColor.text]">
                  {{ demande.author.initials }}
                </div>
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-black text-sm text-base-content truncate">{{ demande.author.name }}</p>
                <p class="text-[11px] text-base-content/50 font-semibold truncate">{{ demande.author.professionalTitle }}</p>
              </div>
              <span class="text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-md shrink-0"
                :class="demande.author.isAvailable ? 'bg-emerald-50 text-[#006643]' : 'bg-base-200 text-base-content/40'">
                {{ demande.author.isAvailable ? 'Disponible' : 'Indisponible' }}
              </span>
            </div>

            <div>
              <div class="flex items-start justify-between gap-2 mb-2">
                <span class="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md text-[10px] font-black tracking-wide uppercase">
                  Recherche un poste
                </span>
                <span class="text-[11px] text-base-content/50 font-bold">⏱️ {{ demande.createdAt || 'Récemment' }}</span>
              </div>

              <h3 class="text-lg font-extrabold text-base-content tracking-tight line-clamp-1">
                {{ demande.title }}
              </h3>

              <p class="text-xs text-base-content/70 font-medium line-clamp-3 leading-relaxed mt-2 mb-4">
                {{ demande.description || 'Aucun détail supplémentaire fourni.' }}
              </p>

              <div v-if="demande.author.skills.length > 0" class="flex flex-wrap gap-1.5 mb-4">
                <span v-for="skill in demande.author.skills.slice(0, 4)" :key="skill"
                  class="bg-base-200/60 text-base-content/80 font-bold text-[11px] px-2.5 py-0.5 rounded-lg">
                  {{ skill }}
                </span>
                <span v-if="demande.author.skills.length > 4" class="text-[11px] text-base-content/40 font-semibold">
                  +{{ demande.author.skills.length - 4 }}
                </span>
              </div>
            </div>

            <div class="pt-4 border-t border-base-100 flex items-center justify-between gap-2 mt-auto">
              <p class="text-[11px] text-base-content/60 font-semibold">
                📍 {{ demande.author.location || 'Non spécifié' }}
              </p>
              <button @click="handleContact(demande.author.id)" :disabled="contactingId === demande.author.id"
                class="btn bg-[#006643] hover:bg-[#004d32] border-none text-white font-bold text-xs min-h-0 h-9 px-4 rounded-xl">
                Contacter
              </button>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-16 bg-base-100 border border-base-200 rounded-2xl">
          <p class="text-4xl mb-3">📂</p>
          <p class="text-sm font-bold text-base-content/60">Aucune demande de candidat n'est disponible pour le moment.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDb } from '../../composables/useDb';
import { useAuth } from '../../composables/useAuth';
import { useMessages } from '../../composables/useMessages';

const router = useRouter();
const { fetchDemandesEmploi } = useDb();
const { currentUser } = useAuth();
const { getOrCreateConversation } = useMessages();

const loading = ref(true);
const rawDemandes = ref([]);
const contactingId = ref(null);

const isEntreprise = computed(() => currentUser.value?.role === 'entreprise');

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
};
const avatarPalette = [
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-sky-100', text: 'text-sky-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-violet-100', text: 'text-violet-700' },
  { bg: 'bg-rose-100', text: 'text-rose-700' },
];

const filteredDemandes = computed(() => {
  return rawDemandes.value.map((d) => {
    const author = d.authorProfile || {};
    const key = String(author.id ?? author.name ?? 'default');
    return {
      ...d,
      author: {
        id: author.id,
        name: author.name || 'Candidat',
        avatar: author.avatar || '',
        location: author.location,
        skills: author.skills || [],
        isAvailable: author.availability === true || (typeof author.availability === 'string' && author.availability.length > 0),
        professionalTitle: author.title || author.experiences?.[0]?.role || 'Titre non renseigné',
        initials: (author.name || '?').trim().split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase(),
        avatarColor: avatarPalette[hashString(key) % avatarPalette.length],
      },
    };
  });
});

onMounted(async () => {
  if (isEntreprise.value) {
    rawDemandes.value = (await fetchDemandesEmploi()) || [];
  }
  loading.value = false;
});

const handleContact = async (candidatId) => {
  if (!currentUser.value || !candidatId) return;
  contactingId.value = candidatId;
  const conv = await getOrCreateConversation(candidatId, currentUser.value.id);
  contactingId.value = null;
  if (conv) router.push(`/message?conversation=${conv.id}`);
};
</script>