<template>
  <div
    class="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 animate-fade-in-up pb-32"
  >
    <!-- HEADER & STEPPER -->
    <header class="space-y-6">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 class="text-3xl font-black text-base-content tracking-tight">
            Publier une demande d'emploi
          </h1>
          <p class="text-sm font-semibold text-base-content/60 mt-1 max-w-2xl">
            Décrivez votre profil et les opportunités que vous recherchez afin
            que les entreprises puissent vous contacter directement.
          </p>
        </div>
        <div
          class="flex items-center gap-2 bg-base-100 px-4 py-2 rounded-xl border border-base-200 shadow-sm"
        >
          <span
            class="text-xs font-bold text-base-content/50 uppercase tracking-wider"
            >Auto-sauvegarde</span
          >
          <i class="fa-solid fa-cloud-arrow-up text-success"></i>
        </div>
      </div>

      <!-- Stepper visuel -->
      <ul
        class="steps steps-horizontal w-full text-xs font-bold font-body-md overflow-x-auto hide-scrollbar"
      >
        <li
          v-for="(step, index) in steps"
          :key="index"
          class="step"
          :class="
            index + 1 <= currentStep
              ? 'step-accent text-accent'
              : 'text-base-content/30'
          "
          @click="currentStep = index + 1"
        >
          {{ step.title }}
        </li>
      </ul>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <!-- ZONE CENTRALE : FORMULAIRE (Col-span 2) -->
      <main
        class="lg:col-span-2 bg-base-100 rounded-3xl border border-base-200 shadow-sm p-6 md:p-10 relative overflow-hidden"
      >
        <!-- ÉTAPE 1 : Informations Générales & Présentation -->
        <transition name="fade" mode="out-in">
          <section v-if="currentStep === 1" class="space-y-8">
            <h2 class="text-xl font-black border-b border-base-200 pb-4">
              Informations générales
            </h2>

            <div class="space-y-5">
              <div class="form-control">
                <label
                  class="label font-bold text-xs uppercase text-base-content/70"
                >
                  Titre de la demande <span class="text-error">*</span>
                  <div
                    class="tooltip tooltip-left"
                    data-tip="Soyez clair et direct. Ex: Développeur Web Junior disponible ou Chauffeur Poids Lourd expérimenté."
                  >
                    <i
                      class="fa-regular fa-circle-question text-base-content/40 cursor-pointer hover:text-accent"
                    ></i>
                  </div>
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  class="input input-bordered w-full focus:border-accent"
                  placeholder="Ex: Je recherche un poste de Comptable"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="form-control">
                  <label
                    class="label font-bold text-xs uppercase text-base-content/70"
                    >Métier recherché</label
                  >
                  <input
                    v-model="form.job"
                    type="text"
                    class="input input-bordered w-full"
                    placeholder="Ex: Développeur Full-Stack"
                  />
                </div>
                <div class="form-control">
                  <label
                    class="label font-bold text-xs uppercase text-base-content/70"
                    >Secteur d'activité</label
                  >
                  <select
                    v-model="form.sector"
                    class="select select-bordered w-full font-semibold"
                  >
                    <option disabled selected>Sélectionnez un secteur</option>
                    <option>Informatique & Numérique</option>
                    <option>BTP / Construction</option>
                    <option>Santé / Médical</option>
                    <option>Commerce / Vente</option>
                  </select>
                </div>
                <div class="form-control">
                  <label
                    class="label font-bold text-xs uppercase text-base-content/70"
                    >Localisation</label
                  >
                  <input
                    v-model="form.location"
                    type="text"
                    class="input input-bordered w-full"
                    placeholder="Ex: Brazzaville, Congo"
                  />
                </div>
                <div class="form-control">
                  <label
                    class="label font-bold text-xs uppercase text-base-content/70"
                    >Disponibilité</label
                  >
                  <select
                    v-model="form.availability"
                    class="select select-bordered w-full font-semibold"
                  >
                    <option>Immédiate</option>
                    <option>Sous 15 jours</option>
                    <option>Sous 1 mois</option>
                    <option>Après préavis</option>
                  </select>
                </div>
              </div>

              <div
                class="flex items-center gap-3 p-4 bg-base-50 rounded-xl border border-base-200"
              >
                <input
                  type="checkbox"
                  v-model="form.mobility"
                  class="toggle toggle-accent"
                />
                <div>
                  <p class="font-bold text-sm">
                    Je suis mobile (Prêt à déménager)
                  </p>
                  <p class="text-xs text-base-content/60">
                    Cochez si vous acceptez des opportunités dans d'autres
                    villes.
                  </p>
                </div>
              </div>
            </div>

            <h2 class="text-xl font-black border-b border-base-200 pb-4 pt-6">
              Présentation
              <span class="text-sm font-semibold text-base-content/40 ml-2"
                >(Optionnel mais recommandé)</span
              >
            </h2>
            <div class="form-control relative">
              <textarea
                v-model="form.presentation"
                class="textarea textarea-bordered w-full h-40 focus:border-accent text-sm"
                placeholder="Présentez votre expérience, vos compétences et ce que vous recherchez..."
              ></textarea>
              <span
                class="absolute bottom-3 right-3 text-xs font-bold"
                :class="
                  form.presentation.length > 500
                    ? 'text-error'
                    : 'text-base-content/40'
                "
              >
                {{ form.presentation.length }} / 500
              </span>
            </div>
          </section>

          <!-- ÉTAPE 2 : Compétences & Parcours (Expériences / Formations) -->
          <section v-else-if="currentStep === 2" class="space-y-8">
            <h2 class="text-xl font-black border-b border-base-200 pb-4">
              Vos Compétences
            </h2>

            <div class="space-y-4">
              <div class="form-control">
                <label
                  class="label font-bold text-xs uppercase text-base-content/70"
                  >Ajouter une compétence</label
                >
                <div class="flex gap-2">
                  <input
                    v-model="newSkill"
                    @keyup.enter="addSkill"
                    type="text"
                    class="input input-bordered flex-1 focus:border-accent"
                    placeholder="Ex: PHP, Comptabilité, Conduite Poids Lourd..."
                  />
                  <select
                    v-model="newSkillLevel"
                    class="select select-bordered w-36 font-semibold"
                  >
                    <option>Débutant</option>
                    <option>Intermédiaire</option>
                    <option selected>Confirmé</option>
                    <option>Expert</option>
                  </select>
                  <button @click="addSkill" class="btn btn-neutral">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>

              <!-- Suggestions intelligentes simulées -->
              <div
                v-if="form.job"
                class="p-4 bg-accent/5 rounded-xl border border-accent/10"
              >
                <p class="text-xs font-bold text-accent mb-2">
                  <i class="fa-solid fa-wand-magic-sparkles mr-1"></i>
                  Suggestions basées sur "{{ form.job }}" :
                </p>
                <div class="flex flex-wrap gap-2">
                  <button
                    class="badge badge-outline badge-accent font-semibold hover:bg-accent hover:text-white transition-colors"
                  >
                    + HTML/CSS
                  </button>
                  <button
                    class="badge badge-outline badge-accent font-semibold hover:bg-accent hover:text-white transition-colors"
                  >
                    + Git
                  </button>
                  <button
                    class="badge badge-outline badge-accent font-semibold hover:bg-accent hover:text-white transition-colors"
                  >
                    + Agile
                  </button>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mt-4">
                <span
                  v-for="(skill, idx) in form.skills"
                  :key="idx"
                  class="badge badge-lg bg-base-200 text-base-content font-bold px-4 py-4 gap-2 border border-base-300"
                >
                  <div class="flex flex-col text-left leading-none">
                    <span>{{ skill.name }}</span>
                    <span class="text-[9px] text-accent font-black uppercase">{{
                      skill.level
                    }}</span>
                  </div>
                  <button
                    @click="removeSkill(idx)"
                    class="ml-2 text-base-content/40 hover:text-error"
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </span>
              </div>
            </div>

            <!-- Répéteurs d'expériences (Aperçu de la mécanique dynamique) -->
            <!-- <div
              class="flex justify-between items-center border-b border-base-200 pb-4 pt-6"
            >
              <h2 class="text-xl font-black">Expériences Professionnelles</h2>
              <button class="btn btn-sm btn-outline btn-accent">
                <i class="fa-solid fa-plus"></i> Ajouter
              </button>
            </div> -->

            <div
              class="bg-base-50 p-5 rounded-2xl border border-base-200 relative group"
            >
              <button
                class="btn btn-circle btn-xs btn-error absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  class="input input-sm input-bordered w-full"
                  placeholder="Poste occupé (Ex: Assistant de Direction)"
                />
                <input
                  type="text"
                  class="input input-sm input-bordered w-full"
                  placeholder="Entreprise"
                />
                <div class="grid grid-cols-2 gap-2 col-span-2 md:col-span-2">
                  <input
                    type="month"
                    class="input input-sm input-bordered w-full"
                  />
                  <input
                    type="month"
                    class="input input-sm input-bordered w-full"
                    placeholder="Date de fin"
                  />
                </div>
                <textarea
                  class="textarea textarea-bordered w-full col-span-2 text-sm h-20"
                  placeholder="Missions et réalisations principales..."
                ></textarea>
              </div>
            </div>
          </section>

          <!-- ÉTAPE 3 : Préférences & Visibilité -->
          <section v-else-if="currentStep === 3" class="space-y-8">
            <h2 class="text-xl font-black border-b border-base-200 pb-4">
              Préférences Professionnelles
            </h2>

            <div class="space-y-6">
              <div>
                <label
                  class="label font-bold text-xs uppercase text-base-content/70"
                  >Type de contrat recherché (Plusieurs possibles)</label
                >
                <div class="flex flex-wrap gap-3">
                  <label
                    class="cursor-pointer flex items-center gap-2 bg-base-50 px-4 py-2 rounded-lg border border-base-200 hover:border-accent transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="checkbox checkbox-sm checkbox-accent"
                      checked
                    />
                    <span class="font-bold text-sm">CDI</span>
                  </label>
                  <label
                    class="cursor-pointer flex items-center gap-2 bg-base-50 px-4 py-2 rounded-lg border border-base-200 hover:border-accent transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="checkbox checkbox-sm checkbox-accent"
                      checked
                    />
                    <span class="font-bold text-sm">CDD</span>
                  </label>
                  <label
                    class="cursor-pointer flex items-center gap-2 bg-base-50 px-4 py-2 rounded-lg border border-base-200 hover:border-accent transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="checkbox checkbox-sm checkbox-accent"
                    />
                    <span class="font-bold text-sm">Freelance</span>
                  </label>
                  <label
                    class="cursor-pointer flex items-center gap-2 bg-base-50 px-4 py-2 rounded-lg border border-base-200 hover:border-accent transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="checkbox checkbox-sm checkbox-accent"
                    />
                    <span class="font-bold text-sm">Stage</span>
                  </label>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="form-control">
                  <label
                    class="label font-bold text-xs uppercase text-base-content/70"
                    >Télétravail</label
                  >
                  <select class="select select-bordered w-full font-semibold">
                    <option>Peu importe</option>
                    <option>Hybride (Quelques jours/semaine)</option>
                    <option>100% Présentiel</option>
                    <option>100% Télétravail</option>
                  </select>
                </div>
                <div class="form-control">
                  <label
                    class="label font-bold text-xs uppercase text-base-content/70"
                    >Prétentions salariales mensuelles</label
                  >
                  <div class="join w-full">
                    <input
                      type="number"
                      class="input input-bordered join-item w-1/2"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      class="input input-bordered join-item w-1/2 border-l-0"
                      placeholder="Max"
                    />
                    <select class="select select-bordered join-item font-bold">
                      <option>FCFA</option>
                      <option>€</option>
                      <option>$</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <h2 class="text-xl font-black border-b border-base-200 pb-4 pt-6">
              Confidentialité & Visibilité
            </h2>
            <div class="space-y-4">
              <div class="p-4 bg-base-50 rounded-xl border border-base-200">
                <p class="font-bold mb-3 text-sm">
                  Qui peut voir cette demande ?
                </p>
                <div class="flex flex-col gap-2">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      class="radio radio-accent radio-sm"
                      checked
                    />
                    <span class="text-sm font-semibold"
                      >Toutes les entreprises inscrites</span
                    >
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      class="radio radio-accent radio-sm"
                    />
                    <span class="text-sm font-semibold"
                      >Uniquement les recruteurs certifiés
                      <i class="fa-solid fa-shield-halved text-success ml-1"></i
                    ></span>
                  </label>
                </div>
              </div>

              <div
                class="flex items-center justify-between p-4 bg-base-50 rounded-xl border border-base-200"
              >
                <div>
                  <p class="font-bold text-sm">
                    Masquer mon numéro de téléphone
                  </p>
                  <p class="text-xs text-base-content/60">
                    Les entreprises devront utiliser la messagerie interne
                    Mosalah.
                  </p>
                </div>
                <input type="checkbox" class="toggle toggle-accent" checked />
              </div>
            </div>
          </section>

          <!-- ÉTAPE 4 : Aperçu Final -->
          <section v-else-if="currentStep === 4" class="space-y-6">
            <div class="text-center mb-8">
              <div
                class="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <i class="fa-solid fa-eye text-2xl"></i>
              </div>
              <h2 class="text-2xl font-black">Aperçu de votre publication</h2>
              <p class="text-sm text-base-content/60 mt-2">
                Voici exactement ce que verront les recruteurs dans leurs
                résultats de recherche.
              </p>
            </div>

            <!-- CARTE D'APERÇU -->
            <div
              class="bg-white rounded-2xl border border-base-300 shadow-xl overflow-hidden max-w-2xl mx-auto ring-4 ring-base-100"
            >
              <div class="p-6">
                <div class="flex justify-between items-start">
                  <div class="flex gap-4">
                    <div
                      class="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center border-2 border-base-100 shadow-sm shrink-0"
                    >
                      <span class="font-black text-xl text-base-content/60">
                        {{ currentUser?.name?.charAt(0).toUpperCase() || "O" }}
                      </span>
                    </div>
                    <div>
                      <h3 class="font-black text-xl text-base-content">
                        {{ form.title || "Titre de votre demande" }}
                      </h3>
                      <p class="text-sm font-bold text-accent mt-0.5">
                        {{ currentUser?.name ? currentUser.name + " • " : ""
                        }}{{ form.job || "Métier" }}
                      </p>
                    </div>
                  </div>
                  <span
                    class="badge badge-success badge-lg font-bold text-white border-none gap-1"
                    ><i class="fa-solid fa-bolt text-[10px]"></i> Dispo :
                    {{ form.availability }}</span
                  >
                </div>

                <p
                  class="text-sm font-medium text-base-content/80 mt-6 bg-base-50 p-4 rounded-xl border border-base-100 italic"
                >
                  "{{
                    form.presentation || "Votre description apparaîtra ici..."
                  }}"
                </p>

                <div class="flex flex-wrap gap-2 mt-4">
                  <span
                    v-for="(skill, i) in form.skills"
                    :key="i"
                    class="badge badge-sm bg-base-200 font-bold border-none"
                    >{{ skill.name }}</span
                  >
                </div>

                <div class="divider my-4"></div>

                <div
                  class="flex flex-wrap gap-4 text-xs font-bold text-base-content/60"
                >
                  <span class="flex items-center gap-1.5"
                    ><i class="fa-solid fa-location-dot"></i>
                    {{ form.location || "Localisation" }}</span
                  >
                  <span class="flex items-center gap-1.5"
                    ><i class="fa-solid fa-file-signature"></i> CDI / CDD</span
                  >
                  <span class="flex items-center gap-1.5"
                    ><i class="fa-solid fa-paperclip"></i> CV & Portfolio
                    joints</span
                  >
                </div>
              </div>
              <div
                class="bg-base-100 p-4 border-t border-base-200 flex justify-end gap-2"
              >
                <button class="btn btn-sm btn-ghost" disabled>
                  <i class="fa-regular fa-bookmark"></i>
                </button>
                <button
                  class="btn btn-sm bg-accent text-white border-none"
                  disabled
                >
                  Contacter le candidat
                </button>
              </div>
            </div>
          </section>
        </transition>
      </main>

      <!-- BARRE LATÉRALE INFORMATIVE (Col-span 1) -->
      <aside class="hidden lg:block lg:col-span-1 space-y-6 sticky top-24">
        <!-- Jauge de complétion -->
        <div
          class="bg-base-100 p-6 rounded-3xl border border-base-200 shadow-sm"
        >
          <div class="flex justify-between items-end mb-2">
            <h3
              class="font-black text-sm uppercase tracking-wider text-base-content/50"
            >
              Qualité du profil
            </h3>
            <span class="font-black text-xl text-accent"
              >{{ completionProgress }}%</span
            >
          </div>
          <progress
            class="progress progress-accent w-full h-2.5"
            :value="completionProgress"
            max="100"
          ></progress>

          <ul class="mt-5 space-y-3 text-sm font-semibold text-base-content/70">
            <li
              class="flex items-center gap-3"
              :class="form.title ? 'text-success' : ''"
            >
              <i class="fa-solid fa-circle-check" v-if="form.title"></i>
              <i class="fa-regular fa-circle text-base-content/30" v-else></i>
              Titre accrocheur
            </li>
            <li
              class="flex items-center gap-3"
              :class="form.presentation.length > 50 ? 'text-success' : ''"
            >
              <i
                class="fa-solid fa-circle-check"
                v-if="form.presentation.length > 50"
              ></i>
              <i class="fa-regular fa-circle text-base-content/30" v-else></i>
              Présentation détaillée
            </li>
            <li
              class="flex items-center gap-3"
              :class="form.skills.length >= 3 ? 'text-success' : ''"
            >
              <i
                class="fa-solid fa-circle-check"
                v-if="form.skills.length >= 3"
              ></i>
              <i class="fa-regular fa-circle text-base-content/30" v-else></i>
              Au moins 3 compétences
            </li>
          </ul>
        </div>

        <!-- Conseils dynamiques selon l'étape -->
        <div class="bg-accent/5 p-6 rounded-3xl border border-accent/10">
          <div class="flex items-center gap-3 mb-3">
            <div
              class="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center"
            >
              <i class="fa-regular fa-lightbulb"></i>
            </div>
            <h3 class="font-black text-base-content">Conseil Pro</h3>
          </div>
          <p
            v-if="currentStep === 1"
            class="text-sm font-medium text-base-content/70 leading-relaxed"
          >
            Les entreprises recherchent souvent des profils opérationnels.
            N'hésitez pas à préciser les outils concrets que vous maîtrisez dès
            votre présentation courte.
          </p>
          <p
            v-else-if="currentStep === 2"
            class="text-sm font-medium text-base-content/70 leading-relaxed"
          >
            Ne listez pas uniquement des compétences techniques. Les "Soft
            Skills" (ponctualité, gestion d'équipe, rigueur) font souvent la
            différence !
          </p>
          <p
            v-else
            class="text-sm font-medium text-base-content/70 leading-relaxed"
          >
            Masquer votre numéro de téléphone permet d'éviter le spam. Les
            recruteurs sérieux utiliseront toujours la messagerie Mosalah en
            premier.
          </p>
        </div>
      </aside>
    </div>

    <!-- FOOTER FLOTTANT (Sticky Action Bar) -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-200 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50"
    >
      <div
        class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div class="flex gap-2 w-full sm:w-auto">
          <button
            class="btn btn-ghost font-bold text-base-content/50 hover:text-base-content hidden sm:inline-flex"
          >
            Annuler
          </button>
          <button
            class="btn btn-outline border-base-300 font-bold w-full sm:w-auto"
          >
            <i class="fa-solid fa-floppy-disk mr-2"></i> Brouillon
          </button>
        </div>

        <div class="flex gap-2 w-full sm:w-auto">
          <button
            v-if="currentStep > 1"
            @click="currentStep--"
            class="btn btn-neutral btn-outline w-1/2 sm:w-auto"
          >
            Retour
          </button>
          <button
            v-if="currentStep < 4"
            @click="currentStep++"
            class="btn bg-base-content text-base-100 hover:bg-neutral w-1/2 sm:w-auto"
          >
            Continuer <i class="fa-solid fa-arrow-right ml-2"></i>
          </button>

          <button
            v-if="currentStep === 4"
            @click="publishJobRequest"
            :class="loading ? 'loading' : ''"
            :disabled="loading"
            class="btn bg-accent text-white border-none shadow-lg shadow-accent/30 hover:bg-accent-focus font-black w-full sm:w-auto px-8 animate-bounce-short"
          >
            <i class="fa-solid fa-rocket mr-2"></i> Publier ma demande
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuth } from "../../composables/useAuth";
import { useDb } from "../../composables/useDb";

const currentStep = ref(1);
const { currentUser } = useAuth();
const { createDemandeEmploi, loading, error } = useDb();
const steps = [
  { title: "Général" },
  { title: "Parcours" },
  { title: "Préférences" },
  { title: "Aperçu" },
];

const form = ref({
  title: "",
  job: "",
  sector: "",
  location: "",
  mobility: false,
  availability: "Immédiate",
  presentation: "",
  skills: [{ name: "JavaScript", level: "Confirmé" }],
});

const newSkill = ref("");
const newSkillLevel = ref("Confirmé");

const addSkill = () => {
  if (newSkill.value.trim()) {
    form.value.skills.push({
      name: newSkill.value.trim(),
      level: newSkillLevel.value,
    });
    newSkill.value = "";
  }
};

const removeSkill = (index) => {
  form.value.skills.splice(index, 1);
};

// Simulation du calcul de complétion
const completionProgress = computed(() => {
  let score = 0;
  if (form.value.title.length > 5) score += 20;
  if (form.value.job.length > 2) score += 20;
  if (form.value.presentation.length > 50) score += 30;
  if (form.value.skills.length >= 3) score += 30;
  else if (form.value.skills.length > 0) score += 10;
  return score > 100 ? 100 : score;
});

const publishJobRequest = async () => {
  if (!currentUser.value?.id) {
    alert("Vous devez être connecté pour publier une demande.");
    return;
  }

  if (!form.value.title || !form.value.job) {
    alert("Veuillez remplir au moins le titre et le métier recherché.");
    return;
  }

  try {
    const newDemande = await createDemandeEmploi({
      candidatId: currentUser.value.id,
      title: form.value.title,
      job: form.value.job,
      sector: form.value.sector,
      location: form.value.location,
      mobility: form.value.mobility,
      availability: form.value.availability,
      presentation: form.value.presentation,
      skills: form.value.skills,
    });

    if (newDemande) {
      alert("Votre demande d'emploi a été publiée avec succès !");
      // Réinitialiser le formulaire
      form.value = {
        title: "",
        job: "",
        sector: "",
        location: "",
        mobility: false,
        availability: "Immédiate",
        presentation: "",
        skills: [{ name: "JavaScript", level: "Confirmé" }],
      };
      currentStep.value = 1;
    } else {
      alert("Une erreur est survenue lors de la publication.");
    }
  } catch (err) {
    console.error("Erreur lors de la publication:", err);
    alert("Une erreur est survenue. Veuillez réessayer.");
  }
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.animate-bounce-short {
  animation: bounce-short 1s ease-in-out 1;
}
@keyframes bounce-short {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
