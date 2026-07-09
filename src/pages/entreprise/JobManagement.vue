<template>
  <div class="w-full text-left select-none pb-12" data-aos="fade-up">
    <!-- FIL D'ARIANE AUTOMATIQUE -->
    <div class="mb-4">
      <BaseBreadcrumbs />
    </div>

    <!-- EN-TÊTE DE LA PAGE -->
    <div
      class="mb-8 flex flex-col px-2 md:flex-row md:items-center md:justify-between gap-4"
    >
      <div>
        <h1
          class="text-2xl md:text-3xl font-black text-base-content tracking-tight mb-1"
        >
          Gestion des Offres
        </h1>
        <p class="text-sm text-base-content/60 font-medium">
          Suivez les performances de vos annonces et recrutez vos futurs talents
          sur Mosalah.
        </p>
      </div>

      <BaseButton
        variant="accent"
        icon="cloche"
        class=""
        @click="showPublishModal = true"
      >
        Publier une offre
      </BaseButton>
    </div>

    <!-- SECTION STATISTIQUES -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <BaseCard density="normal" class="bg-white border border-base-200">
        <p
          class="text-[10px] font-black text-base-content/40 uppercase tracking-wider"
        >
          Offres Actives
        </p>
        <div class="flex items-baseline justify-between mt-2">
          <p class="text-3xl font-black text-[#006643]">
            {{ stats.activeJobs }}
          </p>
          <BaseBadge
            class="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-[10px]"
          >
            En ligne
          </BaseBadge>
        </div>
      </BaseCard>

      <!-- Candidatures Reçues -->
      <BaseCard density="normal" class="bg-white border border-base-200">
        <p
          class="text-[10px] font-black text-base-content/40 uppercase tracking-wider"
        >
          Candidatures Reçues
        </p>
        <div class="flex items-baseline justify-between mt-2">
          <p class="text-3xl font-black text-base-content">
            {{ stats.totalApplications }}
          </p>
          <BaseBadge
            class="bg-blue-50 text-blue-700 border-blue-200 font-bold text-[10px]"
          >
            {{
              applicationsThisWeek > 0
                ? `+${applicationsThisWeek} cette semaine`
                : "Aucune cette semaine"
            }}
          </BaseBadge>
        </div>
      </BaseCard>
      <!-- Consultations Totales -->
      <BaseCard density="normal" class="bg-white border border-base-200">
        <p
          class="text-[10px] font-black text-base-content/40 uppercase tracking-wider"
        >
          Consultations Totales
        </p>
        <div class="flex items-baseline justify-between mt-2">
          <p class="text-3xl font-black text-base-content">
            {{ stats.totalViews }}
          </p>
          <BaseBadge
            class="bg-amber-50 text-amber-700 border-amber-200 font-bold text-[10px]"
          >
            {{
              conversionRate !== null
                ? `Conv. ${conversionRate}%`
                : "Pas encore de vues"
            }}
          </BaseBadge>
        </div>
      </BaseCard>
      <BaseCard density="normal" class="bg-white border border-base-200">
        <p
          class="text-[10px] font-black text-base-content/40 uppercase tracking-wider"
        >
          Entretiens Planifiés
        </p>
        <div class="flex items-baseline justify-between mt-2">
          <p class="text-3xl font-black text-purple-700">
            {{ stats.interviews }}
          </p>
          <BaseBadge
            class="bg-purple-50 text-purple-700 border-purple-200 font-bold text-[10px]"
          >
            À venir
          </BaseBadge>
        </div>
      </BaseCard>
    </div>
    <!-- Candidatures en Étude (remplace "Entretiens Planifiés") -->
    <BaseCard density="normal" class="bg-white border border-base-200">
      <p
        class="text-[10px] font-black text-base-content/40 uppercase tracking-wider"
      >
        Candidatures en Étude
      </p>
      <div class="flex items-baseline justify-between mt-2">
        <p class="text-3xl font-black text-purple-700">{{ stats.enEtude }}</p>
        <BaseBadge
          class="bg-purple-50 text-purple-700 border-purple-200 font-bold text-[10px]"
        >
          À traiter
        </BaseBadge>
      </div>
    </BaseCard>

    <!-- LISTE DES OFFRES PUBLIÉES -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between px-1">
        <h2 class="text-lg font-black text-base-content tracking-tight">
          Vos annonces récentes
        </h2>
        <span class="text-xs font-bold text-base-content/50"
          >{{ myJobs.length }} annonce(s) au total</span
        >
      </div>

      <div v-if="isLoadingJobs" class="flex flex-col gap-3">
        <div
          v-for="n in 2"
          :key="n"
          class="skeleton w-full h-28 rounded-2xl"
        ></div>
      </div>
      <div v-else-if="myJobs.length > 0" class="flex flex-col gap-3">
        <!-- ... boucle BaseCard existante inchangée ... -->
        <BaseCard
          v-for="job in myJobs"
          :key="job.id"
          density="normal"
          hoverable
          class="bg-white border border-base-200"
        >
          <div
            class="flex flex-col lg:flex-row justify-between lg:items-center gap-6 w-full"
          >
            <!-- Détails de l'offre -->
            <div class="flex-grow text-left">
              <div class="flex items-center gap-3 mb-1 flex-wrap">
                <h3 class="text-lg font-black text-base-content tracking-tight">
                  {{ job.title }}
                </h3>
                <BaseBadge
                  :class="
                    job.status === 'Actif'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-base-100 text-base-content/40 border-base-200'
                  "
                >
                  {{ job.status }}
                </BaseBadge>

                <!-- Badge Highlight si renseigné -->
                <span
                  v-if="job.highlight"
                  class="badge badge-sm bg-purple-100 text-purple-700 border-none font-bold text-[10px] ml-2"
                >
                  ✨ {{ job.highlight }}
                </span>
              </div>

              <!-- Informations sur l'entreprise -->
              <div class="text-sm font-bold text-base-content/80 mb-2">
                {{ job.company }}
                <span
                  v-if="job.companyTag"
                  class="text-xs text-base-content/50 font-medium ml-1"
                >
                  &bull; {{ job.companyTag }}
                </span>
              </div>

              <!-- Tags techniques de l'annonce -->
              <div
                class="flex flex-wrap items-center gap-4 text-xs text-base-content/60 font-semibold mb-2"
              >
                <BaseBadge
                  class="bg-base-200/60 text-base-content/80 border-transparent font-bold"
                >
                  {{ job.contractType }}
                </BaseBadge>
                <span class="flex items-center gap-1"
                  >📁 {{ job.category }}</span
                >
                <span class="flex items-center gap-1"
                  >📍 {{ job.location }}</span
                >
                <span class="flex items-center gap-1">💰 {{ job.salary }}</span>
                <span class="flex items-center gap-1"
                  >⏳ {{ job.postedAt || `Publié le ${job.createdAt}` }}</span
                >
              </div>

              <p
                class="text-xs text-base-content/60 max-w-3xl line-clamp-2 leading-relaxed"
              >
                {{ job.description }}
              </p>
            </div>

            <!-- Indicateurs statistiques propres à la carte -->
            <div
              class="flex items-center gap-6 border-l border-r border-base-100 px-6 shrink-0 text-center lg:text-left"
            >
              <div>
                <p
                  class="text-[10px] font-bold text-base-content/40 uppercase tracking-wider"
                >
                  Vues
                </p>
                <p class="text-base font-black text-base-content">
                  {{ job.views }}
                </p>
              </div>
              <div>
                <p
                  class="text-[10px] font-bold text-base-content/40 uppercase tracking-wider"
                >
                  Candidats
                </p>
                <p class="text-base font-black text-[#006643]">
                  {{ job.applications }}
                </p>
              </div>
            </div>

            <!-- Actions de l'offre -->
            <div
              class="flex items-center gap-2 shrink-0 lg:w-auto w-full justify-end"
            >
              <BaseButton
                variant="ghost"
                size="sm"
                class="border border-base-300"
              >
                Modifier
              </BaseButton>
              <RouterLink :to="`/entreprise/dashboard/offres/${job.id}`">
                <BaseButton variant="accent" size="sm">
                  Candidatures ({{ job.applications }})
                </BaseButton>
              </RouterLink>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- MODAL / FORMULAIRE DE PUBLICATION -->
    <div
      v-if="showPublishModal"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <BaseCard
        density="spacious"
        class="bg-white border border-base-300 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        data-aos="zoom-in"
        data-aos-duration="150"
      >
        <template #header>
          <div class="flex items-center justify-between w-full mb-2">
            <h2 class="text-xl font-black text-base-content tracking-tight">
              Nouvelle offre d'emploi
            </h2>
            <BaseButton
              variant="ghost"
              size="sm"
              round
              class="h-8 w-8 p-0"
              @click="closeModal"
              >✕</BaseButton
            >
          </div>
        </template>

        <!-- Corps du formulaire avec champs enrichis -->
        <BaseForm
          cols="1"
          :error="formError"
          :success="formSuccess"
          @submit="handlePublishSubmit"
        >
          <BaseInput
            v-model="form.title"
            label="Titre du poste *"
            placeholder="Ex: Analyste Financier"
            icon="dashboard"
            required
          />

          <!-- Entreprise & Tag de l'entreprise -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput
              v-model="form.company"
              label="Nom de l'entreprise *"
              placeholder="Ex: Banque du Congo"
              icon="entreprise"
              :value="form.company"
              required
            />
            <BaseInput
              v-model="form.companyTag"
              label="Secteur d'activité *"
              placeholder="Ex: Finance"
              icon="tag"
              required
            />
          </div>

          <!-- Type de contrat & Catégorie -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label
                class="block text-xs font-black uppercase tracking-wider text-base-content/50 mb-1.5"
                >Type de contrat *</label
              >
              <select
                v-model="form.contractType"
                required
                class="select select-bordered w-full rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] h-11 min-h-0"
              >
                <option value="" disabled>Sélectionner...</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div class="flex flex-col">
              <label
                class="block text-xs font-black uppercase tracking-wider text-base-content/50 mb-1.5"
                >Catégorie *</label
              >
              <select
                v-model="form.category"
                required
                class="select select-bordered w-full rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] h-11 min-h-0"
              >
                <option value="" disabled>Sélectionner...</option>
                <option value="Finance">Finance</option>
                <option value="IT & Tech">IT & Tech</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>

          <!-- Lieu & Salaire -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput
              v-model="form.location"
              label="Lieu de travail *"
              placeholder="Ex: Brazzaville"
              icon="localisation"
              required
            />
            <BaseInput
              v-model="form.salary"
              label="Rémunération / Salaire"
              placeholder="Ex: 2 100 000 FCFA"
              icon="validation"
            />
          </div>

          <!-- Champ d'accroche (Highlight) -->
          <BaseInput
            v-model="form.highlight"
            label="Mise en avant (Optionnel)"
            placeholder="Ex: Accès prioritaire aux candidats qualifiés"
            icon="star"
          />

          <div class="flex flex-col">
            <label
              class="block text-xs font-black uppercase tracking-wider text-base-content/50 mb-1.5"
              >Description complète de l'offre *</label
            >
            <textarea
              v-model="form.description"
              rows="3"
              required
              placeholder="Décrivez les missions du poste, l'environnement de travail et le profil recherché..."
              class="textarea textarea-bordered w-full rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] leading-relaxed p-3"
            ></textarea>
          </div>

          <div
            class="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3 text-[11px] font-semibold text-amber-800 leading-relaxed flex gap-2"
          >
            <span>💡</span>
            <p>
              Mosalah certifie la légalité et valide la conformité des offres
              d'emploi sur le territoire national.
            </p>
          </div>

          <template #actions>
            <div class="flex items-center justify-end gap-2 w-full mt-2">
              <BaseButton
                type="button"
                variant="ghost"
                size="sm"
                class="border border-base-300"
                @click="closeModal"
              >
                Annuler
              </BaseButton>
              <BaseButton
                type="submit"
                variant="primary"
                size="sm"
                :loading="isSubmitting"
                class="bg-[#006643] hover:bg-[#004d32] text-white"
              >
                Mettre en ligne l'annonce
              </BaseButton>
            </div>
          </template>
        </BaseForm>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useDb } from "../../composables/useDb";
import { useAuth } from "../../composables/useAuth";

const { currentUser } = useAuth();
const { createAnnonce, fetchAnnonces, fetchCandidaturesForEntreprise } =
  useDb();

const showPublishModal = ref(false);
const isSubmitting = ref(false);
const isLoadingJobs = ref(true);
const formError = ref("");
const formSuccess = ref("");

const myJobs = ref([]);
const myCandidatures = ref([]);

// --- Statistiques calculées depuis les vraies données de useDb ---
const stats = computed(() => {
  const activeJobs = myJobs.value.length; // pas de fonctionnalité "clôturer une offre" pour l'instant
  const totalApplications = myJobs.value.reduce(
    (acc, j) => acc + (j.applications || 0),
    0,
  );
  const totalViews = myJobs.value.reduce((acc, j) => acc + (j.views || 0), 0);
  const enEtude = myCandidatures.value.filter(
    (c) => (c.status || "en_etude") === "en_etude",
  ).length;

  return { activeJobs, totalApplications, totalViews, enEtude };
});

const conversionRate = computed(() => {
  if (!stats.value.totalViews) return null;
  return (
    (stats.value.totalApplications / stats.value.totalViews) *
    100
  ).toFixed(1);
});

const applicationsThisWeek = computed(() => {
  const now = Date.now();
  return myCandidatures.value.filter((c) => {
    const [day, month, year] = (c.createdAt || "").split("/").map(Number);
    if (!day) return false;
    const date = new Date(year, month - 1, day).getTime();
    return now - date <= 7 * 24 * 60 * 60 * 1000;
  }).length;
});

// Formate une date fr-FR ("DD/MM/YYYY") en texte relatif ("Publié il y a 3 jours")
const formatRelativeDate = (frDateStr) => {
  if (!frDateStr) return "Date inconnue";
  const [day, month, year] = frDateStr.split("/").map(Number);
  if (!day) return frDateStr;
  const date = new Date(year, month - 1, day);
  const diffDays = Math.floor(
    (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays <= 0) return "Publié aujourd'hui";
  if (diffDays === 1) return "Publié hier";
  if (diffDays < 7) return `Publié il y a ${diffDays} jours`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4)
    return `Publié il y a ${diffWeeks} semaine${diffWeeks > 1 ? "s" : ""}`;
  return `Publié le ${frDateStr}`;
};

const initialForm = {
  title: "",
  company: currentUser.value?.name || "",
  companyTag: "",
  contractType: "",
  category: "",
  location: "",
  salary: "",
  highlight: "",
  description: "",
};

const form = ref({ ...initialForm });

const closeModal = () => {
  showPublishModal.value = false;
  formError.value = "";
  formSuccess.value = "";
  form.value = { ...initialForm };
};

const loadDashboardData = async () => {
  isLoadingJobs.value = true;

  const allAnnonces = await fetchAnnonces();
  myJobs.value = (allAnnonces || [])
    .filter((a) => a.entrepriseId === currentUser.value?.id)
    .map((a) => ({
      ...a,
      status: a.status || "Actif", // pas de fonctionnalité "clôturer l'offre" pour l'instant
      views: a.views || 0,
      postedAt: formatRelativeDate(a.createdAt),
    }));

  myCandidatures.value =
    (await fetchCandidaturesForEntreprise(currentUser.value?.id)) || [];

  isLoadingJobs.value = false;
};

onMounted(loadDashboardData);

const handlePublishSubmit = async () => {
  isSubmitting.value = true;
  formError.value = "";

  try {
    const newAnnonce = await createAnnonce({
      entrepriseId: currentUser.value?.id,
      title: form.value.title,
      company: form.value.company,
      companyTag: form.value.companyTag,
      contractType: form.value.contractType,
      category: form.value.category,
      location: form.value.location,
      salary: form.value.salary || "À débattre",
      description: form.value.description,
      highlight: form.value.highlight,
    });

    if (newAnnonce) {
      myJobs.value.unshift({
        ...newAnnonce,
        status: "Actif",
        views: 0,
        postedAt: "Publié aujourd'hui",
      });
      closeModal();
    } else {
      formError.value = "Erreur lors de la publication de l'annonce.";
    }
  } catch (err) {
    formError.value = "Erreur lors de la publication de l'annonce.";
  } finally {
    isSubmitting.value = false;
  }
};

</script>
