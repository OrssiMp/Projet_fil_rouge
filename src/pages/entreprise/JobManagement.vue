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

    <!-- SECTION STATISTIQUES (STATS DES OFFRES VIA BASECARD) -->
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
            +12 cette semaine
          </BaseBadge>
        </div>
      </BaseCard>

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
            Conv. 4.8%
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

      <div v-if="myJobs.length > 0" class="flex flex-col gap-3">
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
              <div class="flex items-center gap-3 mb-2 flex-wrap">
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
              </div>

              <div
                class="flex flex-wrap items-center gap-4 text-xs text-base-content/60 font-semibold"
              >
                <BaseBadge
                  class="bg-base-200/60 text-base-content/80 border-transparent font-bold"
                >
                  {{ job.type }}
                </BaseBadge>
                <span class="flex items-center gap-1"
                  >📍 {{ job.location }}</span
                >
                <span class="flex items-center gap-1">💰 {{ job.salary }}</span>
                <span class="flex items-center gap-1"
                  >⏳ Publié le {{ job.createdAt }}</span
                >
              </div>
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
              <BaseButton variant="accent" size="sm">
                Candidatures ({{ job.applications }})
              </BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- ÉTAT VIDE STANDARDISÉ -->
      <BaseCard
        v-else
        class="text-center py-16 bg-white border border-base-200"
      >
        <div class="max-w-xs mx-auto flex flex-col items-center">
          <BaseIcon name="lock" class="text-3xl text-base-content/30 mb-2" />
          <h3 class="font-black text-base-content tracking-tight text-md mb-1">
            Aucune annonce publiée
          </h3>
          <p class="text-xs text-base-content/40 font-medium">
            Vous n'avez pas encore créé d'offre d'emploi. Commencez dès
            maintenant à chercher votre futur collaborateur.
          </p>
        </div>
      </BaseCard>
    </div>

    <!-- MODAL / FORMULAIRE DE PUBLICATION (PROPULSÉ PAR BASEFORM) -->
    <div
      v-if="showPublishModal"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <BaseCard
        density="spacious"
        class="bg-white border border-base-300 w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto"
        data-aos="zoom-in"
        data-aos-duration="150"
      >
        <!-- En-tête personnalisée du modal via Slot Header -->
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

        <!-- Corps du formulaire avec BaseForm -->
        <BaseForm
          cols="1"
          :error="formError"
          :success="formSuccess"
          @submit="handlePublishSubmit"
        >
          <BaseInput
            v-model="form.title"
            label="Titre du poste *"
            placeholder="Ex: Développeur Full-Stack JavaScript (MERN)"
            icon="dashboard"
            required
          />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label
                class="block text-xs font-black uppercase tracking-wider text-base-content/50 mb-1.5"
                >Type de contrat *</label
              >
              <select
                v-model="form.type"
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

            <BaseInput
              v-model="form.location"
              label="Lieu de travail *"
              placeholder="Ex: Brazzaville, Centre-ville"
              icon="entreprise"
              required
            />
          </div>

          <BaseInput
            v-model="form.salary"
            label="Rémunération / Salaire"
            placeholder="Ex: 350.000 FCFA ou 'À débattre'"
            icon="validation"
          />

          <div class="flex flex-col">
            <label
              class="block text-xs font-black uppercase tracking-wider text-base-content/50 mb-1.5"
              >Description complète de l'offre *</label
            >
            <textarea
              v-model="form.description"
              rows="4"
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

          <!-- Actions inférieures via le Slot Actions de BaseForm -->
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
import { ref } from "vue";

const showPublishModal = ref(false);
const isSubmitting = ref(false);
const formError = ref("");
const formSuccess = ref("");

// Statistiques globales du tableau de bord recruteur
const stats = ref({
  activeJobs: 3,
  totalApplications: 48,
  totalViews: 1024,
  interviews: 6,
});

// Liste réactive des annonces publiées par l'entreprise
const myJobs = ref([
  {
    id: 1,
    title: "Développeur Full-Stack JavaScript (MERN)",
    type: "CDI",
    location: "Brazzaville, Centre-ville",
    salary: "À débattre",
    createdAt: "22/06/2026",
    status: "Actif",
    views: 412,
    applications: 0,
  }
]);

// Initialisation propre de la structure du formulaire
const initialForm = {
  title: "",
  type: "",
  location: "",
  salary: "",
  description: "",
};

const form = ref({ ...initialForm });

const closeModal = () => {
  showPublishModal.value = false;
  formError.value = "";
  formSuccess.value = "";
  form.value = { ...initialForm };
};

// Soumission et validation du formulaire via BaseForm
const handlePublishSubmit = () => {
  formError.value = "";
  formSuccess.value = "";

  if (
    !form.value.title ||
    !form.value.type ||
    !form.value.location ||
    !form.value.description
  ) {
    formError.value =
      "Veuillez remplir correctement tous les champs obligatoires (*).";
    return;
  }

  isSubmitting.value = true;

  // Simulation d'une latence d'API réseau pour déclencher l'état :loading du BaseButton
  setTimeout(() => {
    const currentDate = new Date().toLocaleDateString("fr-FR");

    myJobs.value.unshift({
      id: Date.now(),
      title: form.value.title,
      type: form.value.type,
      location: form.value.location,
      salary: form.value.salary || "À débattre",
      createdAt: currentDate,
      status: "Actif",
      views: 0,
      applications: 0,
    });

    stats.value.activeJobs += 1;
    isSubmitting.value = false;

    closeModal();
  }, 600);
};
</script>
