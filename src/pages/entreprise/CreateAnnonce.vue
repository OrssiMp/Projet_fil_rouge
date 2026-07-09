<template>
  <div
    class="min-h-screen bg-base-200/40 py-10 px-4 sm:px-6 lg:px-8 select-none"
  >
    <div class="max-w-3xl mx-auto" data-aos="fade-up" data-aos-duration="400">
      <!-- En-tête de la page & Bouton retour -->
      <div class="mb-6 flex items-center justify-between">
        <div>
          <button
            @click="goBack"
            class="btn btn-sm btn-ghost text-base-content/60 hover:text-base-content hover:bg-base-200/50 -ml-2 mb-2"
          >
            ← Retour
          </button>
          <h1
            class="text-2xl md:text-3xl font-black text-base-content tracking-tight"
          >
            Nouvelle offre d'emploi
          </h1>
          <p class="text-sm text-base-content/60 font-medium mt-1">
            Publiez votre annonce sur Mosalah pour attirer les meilleurs
            talents.
          </p>
        </div>
      </div>

      <!-- Conteneur principal du formulaire -->
      <BaseCard
        density="spacious"
        class="bg-white border border-base-200 shadow-sm rounded-2xl overflow-hidden"
      >
        <!-- Formulaire avec champs enrichis -->
        <BaseForm
          cols="1"
          :error="formError"
          :success="formSuccess"
          @submit="handlePublishSubmit"
          class="p-2 sm:p-4"
        >
          <!-- 1. Informations principales -->
          <div class="mb-6 space-y-4">
            <h3
              class="text-sm font-bold text-base-content border-b border-base-100 pb-2 mb-4"
            >
              Informations générales
            </h3>

            <BaseInput
              v-model="form.title"
              label="Titre du poste *"
              placeholder="Ex: Développeur Fullstack Vue.js / Node.js"
              icon="dashboard"
              required
            />

            <!-- Entreprise & Tag de l'entreprise -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BaseInput
                v-model="form.company"
                label="Nom de l'entreprise *"
                placeholder="Ex: La Case Bantou"
                icon="entreprise"
                required
              />
              <BaseInput
                v-model="form.companyTag"
                label="Secteur d'activité *"
                placeholder="Ex: Tech & Innovation"
                icon="tag"
                required
              />
            </div>
          </div>

          <!-- 2. Contrat & Localisation -->
          <div class="mb-6 space-y-4">
            <h3
              class="text-sm font-bold text-base-content border-b border-base-100 pb-2 mb-4 mt-2"
            >
              Détails du poste
            </h3>

            <!-- Type de contrat & Catégorie -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col">
                <label
                  class="block text-xs font-black uppercase tracking-wider text-base-content/50 mb-1.5"
                >
                  Type de contrat *
                </label>
                <select
                  v-model="form.contractType"
                  required
                  class="select select-bordered w-full rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] focus:ring-1 focus:ring-[#006643] h-12"
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
                >
                  Catégorie *
                </label>
                <select
                  v-model="form.category"
                  required
                  class="select select-bordered w-full rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] focus:ring-1 focus:ring-[#006643] h-12"
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
                placeholder="Ex: Brazzaville, Congo"
                icon="localisation"
                required
              />
              <BaseInput
                v-model="form.salary"
                label="Rémunération / Salaire"
                placeholder="Ex: 500 000 FCFA / mois"
                icon="validation"
              />
            </div>
          </div>

          <!-- 3. Contenu de l'annonce -->
          <div class="space-y-4">
            <h3
              class="text-sm font-bold text-base-content border-b border-base-100 pb-2 mb-4 mt-2"
            >
              Contenu de l'annonce
            </h3>

            <!-- Champ d'accroche (Highlight) -->
            <BaseInput
              v-model="form.highlight"
              label="Mise en avant (Optionnel)"
              placeholder="Ex: Possibilité de télétravail à 50% ou Prime d'installation"
              icon="star"
            />

            <!-- Description -->
            <div class="flex flex-col">
              <label
                class="block text-xs font-black uppercase tracking-wider text-base-content/50 mb-1.5"
              >
                Description complète de l'offre *
              </label>
              <textarea
                v-model="form.description"
                rows="6"
                required
                placeholder="Décrivez les missions du poste, l'environnement de travail, les compétences requises et le profil recherché..."
                class="textarea textarea-bordered w-full rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] focus:ring-1 focus:ring-[#006643] leading-relaxed p-4 resize-y"
              ></textarea>
            </div>
          </div>
<!-- 4. Profil recherché -->
<div class="space-y-4 mt-2">
  <h3 class="text-sm font-bold text-base-content border-b border-base-100 pb-2 mb-4">
    Profil recherché
  </h3>

  <div class="flex flex-col">
    <label class="block text-xs font-black uppercase tracking-wider text-base-content/50 mb-1.5">
      Responsabilités du poste
    </label>
    <textarea
      v-model="form.responsibilities"
      rows="4"
      placeholder="Ex: Développer et maintenir les fonctionnalités frontend, collaborer avec l'équipe design, participer aux revues de code..."
      class="textarea textarea-bordered w-full rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] focus:ring-1 focus:ring-[#006643] leading-relaxed p-4 resize-y"
    ></textarea>
  </div>

  <div class="flex flex-col">
    <label class="block text-xs font-black uppercase tracking-wider text-base-content/50 mb-1.5">
      Compétences requises
    </label>
    <div class="flex gap-2">
      <input
        v-model="newRequiredSkill"
        type="text"
        placeholder="Ex: Vue.js"
        @keyup.enter.prevent="addRequiredSkill"
        class="input input-bordered w-full rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] h-11"
      />
      <button type="button" @click="addRequiredSkill" :disabled="!newRequiredSkill"
        class="btn rounded-xl bg-[#006643] hover:bg-[#004d32] text-white border-none px-4 shrink-0">
        Ajouter
      </button>
    </div>
    <div v-if="form.requiredSkills.length > 0" class="flex flex-wrap gap-2 mt-3">
      <span v-for="(skill, index) in form.requiredSkills" :key="skill"
        class="badge badge-lg bg-base-200 text-base-content/80 border-none font-bold gap-2">
        {{ skill }}
        <button type="button" @click="removeRequiredSkill(index)" class="text-rose-600">×</button>
      </span>
    </div>
  </div>

  <div class="flex flex-col">
    <label class="block text-xs font-black uppercase tracking-wider text-base-content/50 mb-1.5">
      Profil recherché
    </label>
    <textarea
      v-model="form.profileSought"
      rows="4"
      placeholder="Ex: Vous justifiez d'au moins 2 ans d'expérience en développement web, vous êtes rigoureux et autonome..."
      class="textarea textarea-bordered w-full rounded-xl text-sm font-medium bg-white border-base-300 focus:outline-none focus:border-[#006643] focus:ring-1 focus:ring-[#006643] leading-relaxed p-4 resize-y"
    ></textarea>
  </div>
</div>
          <!-- Bannière d'information Mosalah -->
          <div
            class="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 text-xs font-semibold text-amber-800 leading-relaxed flex gap-3 mt-6"
          >
            <span class="text-lg">💡</span>
            <p class="mt-0.5">
              Mosalah certifie la légalité et valide la conformité des offres
              d'emploi sur le territoire national. Toute annonce jugée
              frauduleuse sera immédiatement retirée.
            </p>
          </div>

          <!-- Actions de soumission -->
          <template #actions>
            <div
              class="flex items-center justify-end gap-3 w-full mt-6 pt-6 border-t border-base-100"
            >
              <BaseButton
                type="button"
                variant="ghost"
                size="md"
                class="border border-base-300 hover:bg-base-100 font-bold"
                @click="goBack"
                :disabled="isSubmitting"
              >
                Annuler
              </BaseButton>
              <BaseButton
                type="submit"
                variant="primary"
                size="md"
                :loading="isSubmitting"
                class="bg-[#006643] hover:bg-[#004d32] border-none text-white font-bold px-6 shadow-sm"
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
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth";
import { useDb } from "../../composables/useDb";

const router = useRouter();
const { currentUser } = useAuth();
const { createAnnonce } = useDb();

const isSubmitting = ref(false);
const formError = ref("");
const formSuccess = ref("");

const form = reactive({
  title: "",
  company: "",
  companyTag: "",
  contractType: "",
  category: "",
  location: "Brazzaville",
  salary: "",
  highlight: "",
  description: "",
  responsibilities: "",     // ← nouveau
  requiredSkills: [],       // ← nouveau
  profileSought: "",        // ← nouveau
});

const newRequiredSkill = ref("");
const addRequiredSkill = () => {
  const value = newRequiredSkill.value.trim();
  if (value && !form.requiredSkills.includes(value)) {
    form.requiredSkills.push(value);
  }
  newRequiredSkill.value = "";
};
const removeRequiredSkill = (index) => {
  form.requiredSkills.splice(index, 1);
};

onMounted(() => {
  form.company = currentUser.value?.name || "";
});

const goBack = () => {
  router.back();
};

const handlePublishSubmit = async () => {
  formError.value = "";
  formSuccess.value = "";

  if (!currentUser.value) {
    formError.value =
      "Vous devez être connecté en tant qu'entreprise pour publier une offre.";
    return;
  }

  isSubmitting.value = true;

  try {
   const newAnnonce = await createAnnonce({
  entrepriseId: currentUser.value.id,
  title: form.title,
  company: form.company,
  companyTag: form.companyTag,
  contractType: form.contractType,
  category: form.category,
  location: form.location,
  salary: form.salary || "À débattre",
  highlight: form.highlight,
  description: form.description,
  responsibilities: form.responsibilities, // ← nouveau
  requiredSkills: form.requiredSkills,      // ← nouveau
  profileSought: form.profileSought,        // ← nouveau
});

    if (!newAnnonce) throw new Error("Impossible de publier l'annonce.");

    formSuccess.value = "Votre offre d'emploi a été publiée avec succès !";
    setTimeout(() => router.push({ name: "EntrepriseOffres" }), 1500);
  } catch (err) {
    formError.value =
      err.message ||
      "Une erreur est survenue lors de la publication. Veuillez réessayer.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>
