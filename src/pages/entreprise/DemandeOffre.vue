<template>
  <div class="min-h-screen bg-base-200/50 pb-16 select-none">
    <!-- HEADER -->
    <header class="bg-base-100 border-b border-base-200 py-6 mb-8">
      <div class="max-w-6xl mx-auto px-4dflex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-black text-base-content tracking-tight">
            Demandes de l'écosystème
          </h1>
          <p class="text-xs md:text-sm text-base-content/60 font-semibold mt-1">
            Consultez les offres spontanées et profils créés par les candidats en recherche active.
          </p>
        </div>
        <div class="flex gap-2">
          <span class="badge bg-[#006643] border-none text-white font-bold px-3 py-4 text-xs h-7">
            {{ filteredDemandes.length }} demande(s) disponible(s)
          </span>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4">
      <!-- ÉTAT DE CHARGEMENT -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-12">
        <span class="loading loading-spinner loading-lg text-[#006643]"></span>
        <p class="text-xs font-bold text-base-content/40 uppercase tracking-wider mt-4">Chargement des demandes...</p>
      </div>

      <!-- SÉCURITÉ : SI L'UTILISATEUR N'EST PAS UNE ENTREPRISE -->
      <div v-else-if="!isEntreprise" class="text-center py-12">
        <p class="text-5xl mb-4">🔒</p>
        <h2 class="text-xl font-black text-base-content">Accès restreint</h2>
        <p class="text-xs text-base-content/50 max-w-sm mx-auto mt-2">
          Cette page est réservée exclusivement aux comptes entreprises pour recruter des talents.
        </p>
      </div>

      <!-- LISTE DES DEMANDES -->
      <div v-else>
        <div v-if="filteredDemandes.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="demande in filteredDemandes" 
            :key="demande.id"
            class="bg-base-100 border border-base-200/60 rounded-2xl p-5 hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between shadow-sm"
          >
            <div>
              <!-- Entête de la demande -->
              <div class="flex items-start justify-between gap-2 mb-3">
                <span class="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md text-[10px] font-black tracking-wide uppercase">
                  Demande Candidat
                </span>
                <span class="text-[11px] text-base-content/50 font-bold">
                  ⏱️ {{ demande.createdAt || 'Récemment' }}
                </span>
              </div>

              <!-- Titre du poste recherché -->
              <h3 class="text-lg font-extrabold text-base-content tracking-tight line-clamp-1">
                {{ demande.title }}
              </h3>

              <!-- Nom du candidat -->
              <p class="text-xs text-[#006643] font-bold mt-0.5 mb-3">
                👤 {{ demande.candidateName || 'Candidat Anonyme' }}
              </p>

              <!-- Description / Profil -->
              <p class="text-xs text-base-content/70 font-medium line-clamp-3 leading-relaxed mb-4">
                {{ demande.description || 'Aucun détail supplémentaire fourni.' }}
              </p>
            </div>

            <!-- Métadonnées & Bouton d'action -->
            <div class="pt-4 border-t border-base-100 flex items-center justify-between gap-2 mt-auto">
              <div class="flex flex-col text-[11px] text-base-content/60 font-semibold">
                <span>📍 {{ demande.location || 'Non spécifié' }}</span>
                <span class="text-emerald-700 font-bold mt-0.5">💰 Attentes : {{ demande.salary || 'À débattre' }}</span>
              </div>

              <router-link 
                :to="`/messages?with=${demande.userId}`"
                class="btn bg-[#006643] hover:bg-[#004d32] border-none text-white font-bold text-xs min-h-0 h-9 px-4 rounded-xl"
              >
                Contacter
              </router-link>
            </div>
          </div>
        </div>

        <!-- AUCUNE DEMANDE TROUVÉE -->
        <div v-else class="text-center py-16 bg-base-100 border border-base-200 rounded-2xl">
          <p class="text-4xl mb-3">📂</p>
          <p class="text-sm font-bold text-base-content/60">Aucune demande de candidat n'est disponible pour le moment.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useDb } from '../../composables/useDb';
import { useAuth } from '../../composables/useAuth';

const { fetchAnnonces, getUserById } = useDb();
const { currentUser } = useAuth();

const loading = ref(true);
const demandes = ref([]);

// Vérification stricte du rôle pour protéger l'interface visuellement
const isEntreprise = computed(() => currentUser.value?.role === 'entreprise');

// Filtrer uniquement les annonces qui possèdent le type "demande" ou créées par des candidats
const filteredDemandes = computed(() => {
  return demandes.value.filter(annonce => annonce.type === 'demande');
});

onMounted(async () => {
  try {
    if (isEntreprise.value) {
      // 1. Récupération de l'intégralité des annonces de la plateforme
      const allAnnonces = await fetchAnnonces() || [];

      // 2. Hydrater chaque demande avec le nom ou les infos réelles du candidat
      const updatedDemandes = await Promise.all(
        allAnnonces.map(async (annonce) => {
          if (annonce.type === 'demande' && annonce.userId) {
            const user = await getUserById(annonce.userId);
            return {
              ...annonce,
              candidateName: user?.name || user?.username || 'Candidat'
            };
          }
          return annonce;
        })
      );

      demandes.value = updatedDemandes;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des demandes candidats :", error);
  } finally {
    loading.value = false;
  }
});
</script>