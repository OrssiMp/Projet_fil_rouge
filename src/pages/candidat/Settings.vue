<template>
  <div class="max-w-5xl mx-auto space-y-8 animate-fade-in-up px-4 sm:px-6 lg:px-0 pb-20">

    <header>
      <h1 class="text-3xl font-black text-base-content">Paramètres de votre compte</h1>
      <p class="text-sm font-semibold text-base-content/60 mt-1">Gérez vos informations, vos préférences et votre confidentialité.</p>
      <div class="flex gap-2 mt-8">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
          :class="activeTab === tab.id ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-base-200'">
          <i :class="tab.icon"></i> {{ tab.label }}
        </button>
      </div>
    </header>

    <!-- Bannière de statut -->
    <div v-if="saveSuccess" class="alert alert-success text-sm font-bold">{{ saveSuccess }}</div>
    <div v-if="saveError" class="alert alert-error text-sm font-bold">{{ saveError }}</div>

    <main class="bg-base-100 p-6 sm:p-8 rounded-2xl border border-base-200 shadow-sm">

      <!-- ================= ONGLET PROFIL ================= -->
      <section v-if="activeTab === 'profile'" class="space-y-6">
        <div v-if="isLoading" class="skeleton h-64 rounded-2xl"></div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-6">

            <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
              <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
                <div>
                  <h2 class="text-xl font-black">Mon profil professionnel</h2>
                  <p class="text-sm text-base-content/60">Complète ton profil Mosalah pour augmenter ta visibilité auprès des recruteurs.</p>
                </div>
                <div class="text-right">
                  <p class="text-xs uppercase tracking-[0.24em] text-base-content/50 mb-2">Complété</p>
                  <div class="h-3 w-40 bg-base-200 rounded-full overflow-hidden">
                    <div class="h-full bg-accent transition-all" :style="{ width: profileCompletion + '%' }"></div>
                  </div>
                  <p class="text-xs text-base-content/60 mt-2 font-semibold">{{ profileCompletion }}%</p>
                </div>
              </div>

              <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div class="col-span-2 space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Prénom & Nom</label>
                      <input type="text" class="input input-bordered w-full" v-model="user.name" />
                    </div>
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Date de naissance</label>
                      <input type="date" class="input input-bordered w-full" v-model="user.dob" />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Sexe</label>
                      <select class="select select-bordered w-full" v-model="user.gender">
                        <option value="">Sélectionner</option>
                        <option>Homme</option>
                        <option>Femme</option>
                        <option>Non binaire</option>
                        <option>Je préfère ne pas dire</option>
                      </select>
                    </div>
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Nationalité</label>
                      <input type="text" class="input input-bordered w-full" v-model="user.nationality" placeholder="Congolaise" />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Situation matrimoniale</label>
                      <select class="select select-bordered w-full" v-model="user.maritalStatus">
                        <option value="">Sélectionner</option>
                        <option>Célibataire</option>
                        <option>En couple</option>
                        <option>Marié(e)</option>
                        <option>Divorcé(e)</option>
                        <option>Veuf/ve</option>
                      </select>
                    </div>
                    <div class="form-control">
                      <!-- "location" reste le champ canonique affiché partout ailleurs (cartes, catalogue) -->
                      <label class="label font-bold text-xs uppercase">Ville / Localisation publique</label>
                      <input type="text" class="input input-bordered w-full" v-model="user.location" placeholder="Brazzaville, Congo" />
                    </div>
                  </div>

                  <div class="form-control">
                    <label class="label font-bold text-xs uppercase">Adresse complète (privée)</label>
                    <input type="text" class="input input-bordered w-full" v-model="user.address" placeholder="Quartier, ville, pays" />
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Email</label>
                      <input type="email" class="input input-bordered w-full" v-model="user.email" />
                    </div>
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Téléphone</label>
                      <input type="tel" class="input input-bordered w-full" v-model="user.phone" placeholder="+242 00 000 000" />
                    </div>
                  </div>
                </div>

                <div class="rounded-3xl border border-base-200 bg-base-50 p-5 text-center">
                  <div class="avatar mx-auto mb-4">
                    <div class="w-28 h-28 rounded-full bg-base-200 overflow-hidden flex items-center justify-center text-3xl font-black text-emerald-700">
                      <img v-if="user.avatar" :src="user.avatar" alt="Photo de profil" class="object-cover w-full h-full" />
                      <span v-else>{{ avatarInitials }}</span>
                    </div>
                  </div>
                  <p class="font-bold">Photo de profil</p>
                  <p class="text-xs text-base-content/60 mb-4">Choisissez une photo professionnelle.</p>
                  <label class="btn btn-sm btn-outline cursor-pointer inline-flex items-center gap-2">
                    Charger une photo
                    <input type="file" class="hidden" accept="image/*" @change="onAvatarUpload" />
                  </label>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
                <h3 class="text-base font-black mb-4">Situation professionnelle</h3>
                <div class="grid grid-cols-1 gap-4">
                  <div class="form-control">
                    <label class="label font-bold text-xs uppercase">Statut actuel</label>
                    <select class="select select-bordered w-full" v-model="user.currentStatus">
                      <option value="">Sélectionner</option>
                      <option>Étudiant</option>
                      <option>Employé</option>
                      <option>Indépendant</option>
                      <option>Sans emploi</option>
                      <option>Stage</option>
                      <option>Freelance</option>
                    </select>
                  </div>
                  <div class="form-control">
                    <!-- Champ numérique canonique, utilisé partout ailleurs (cartes, dashboard) -->
                    <label class="label font-bold text-xs uppercase">Années d'expérience</label>
                    <input type="number" min="0" class="input input-bordered w-full" v-model.number="user.yearsOfExperience" />
                  </div>
                  <div class="form-control">
                    <label class="label font-bold text-xs uppercase">Titre professionnel / Poste recherché</label>
                    <input type="text" class="input input-bordered w-full" v-model="user.title" placeholder="Ex: Développeur Backend" />
                  </div>
                  <div class="form-control">
                    <label class="label font-bold text-xs uppercase">Profil recherché</label>
                    <textarea class="textarea textarea-bordered w-full h-28" v-model="user.profileSearch" placeholder="Je recherche un poste de ..."></textarea>
                  </div>
                  <div class="form-control">
                    <label class="label font-bold text-xs uppercase">Disponibilité</label>
                    <select class="select select-bordered w-full" v-model="user.availability">
                      <option :value="true">Disponible immédiatement</option>
                      <option :value="false">Non disponible</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
                <h3 class="text-base font-black mb-4">Préférences d'emploi</h3>
                <div class="space-y-4">
                  <div class="form-control">
                    <label class="label font-bold text-xs uppercase">Type de contrat</label>
                    <div class="grid grid-cols-2 gap-2">
                      <label v-for="type in contractOptions" :key="type" class="cursor-pointer flex items-center gap-2">
                        <input type="checkbox" class="checkbox checkbox-accent" :value="type" v-model="user.contractTypes" />
                        {{ type }}
                      </label>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-3">
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Salaire min</label>
                      <input type="number" class="input input-bordered w-full" v-model.number="user.salaryMin" placeholder="0" />
                    </div>
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Salaire max</label>
                      <input type="number" class="input input-bordered w-full" v-model.number="user.salaryMax" placeholder="0" />
                    </div>
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Devise</label>
                      <select class="select select-bordered w-full" v-model="user.salaryCurrency">
                        <option>XAF</option>
                        <option>USD</option>
                        <option>EUR</option>
                      </select>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Mobilité</label>
                      <select class="select select-bordered w-full" v-model="user.mobility">
                        <option>Oui</option>
                        <option>Non</option>
                      </select>
                    </div>
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Télétravail</label>
                      <select class="select select-bordered w-full" v-model="user.telework">
                        <option>Oui</option>
                        <option>Non</option>
                        <option>Hybride</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
                <h3 class="text-base font-black mb-4">Réseaux professionnels</h3>
                <div class="space-y-4">
                  <BaseInput label="LinkedIn" type="url" v-model="user.networks.linkedin" placeholder="https://linkedin.com/in/..." />
                  <BaseInput label="GitHub" type="url" v-model="user.networks.github" placeholder="https://github.com/..." />
                  <BaseInput label="Portfolio / Site web" type="url" v-model="user.networks.portfolio" placeholder="https://..." />

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BaseInput label="Nom du réseau" v-model="newNetwork.name" placeholder="Ex: Behance, Slack..." />
                    <BaseInput label="Lien du réseau" type="url" v-model="newNetwork.url" placeholder="https://..." />
                  </div>
                  <BaseButton type="button" variant="accent" class="w-full sm:w-auto" :disabled="!newNetwork.name || !newNetwork.url" @click="addNetwork">
                    Ajouter le réseau
                  </BaseButton>

                  <div class="space-y-3">
                    <div v-for="(network, index) in user.networks.additional" :key="`${network.name}-${index}`"
                      class="rounded-2xl border border-base-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div class="min-w-0">
                        <p class="font-bold">{{ network.name }}</p>
                        <p class="text-xs text-base-content/60 break-all">
                          <a :href="network.url" target="_blank" class="link link-primary">{{ network.url }}</a>
                        </p>
                      </div>
                      <button type="button" class="btn btn-ghost btn-xs text-error" @click="removeNetwork(index)">Supprimer</button>
                    </div>
                    <p v-if="!user.networks.additional.length" class="text-xs text-base-content/50">
                      Ajoute un réseau professionnel personnalisé pour enrichir ton profil.
                    </p>
                  </div>
                </div>
              </div>

              <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
                <h3 class="text-base font-black mb-4">Documents</h3>
                <div class="space-y-4 text-sm">
                  <div v-for="doc in documentTypes" :key="doc.key" class="flex items-center justify-between gap-4">
                    <div class="min-w-0">
                      <p class="font-bold">{{ doc.label }}</p>
                      <p class="text-xs text-base-content/60 truncate">
                        {{ user.documents[doc.key]?.name || 'Aucun fichier chargé' }}
                      </p>
                    </div>
                    <div class="flex gap-2 shrink-0">
                      <a v-if="user.documents[doc.key]" :href="user.documents[doc.key].dataUrl" :download="user.documents[doc.key].name"
                        class="btn btn-xs btn-ghost">Voir</a>
                      <label class="btn btn-xs btn-outline cursor-pointer">
                        Charger
                        <input type="file" class="hidden" :accept="doc.accept" @change="(e) => onDocumentUpload(doc.key, e)" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
              <h3 class="text-base font-black mb-4">Expériences professionnelles</h3>
              <div class="grid grid-cols-1 gap-3 mb-4">
                <input type="text" class="input input-bordered w-full" v-model="newExperience.role" placeholder="Intitulé du poste" />
                <input type="text" class="input input-bordered w-full" v-model="newExperience.company" placeholder="Entreprise" />
                <input type="text" class="input input-bordered w-full" v-model="newExperience.period" placeholder="Période (ex: 2023 - 2025)" />
                <textarea class="textarea textarea-bordered w-full" v-model="newExperience.description" placeholder="Résumé de l'expérience" rows="3"></textarea>
                <button type="button" class="btn btn-sm btn-accent" :disabled="!newExperience.role || !newExperience.company" @click="addExperience">
                  Ajouter expérience
                </button>
              </div>
              <div class="space-y-3">
                <div v-for="(experience, index) in user.experiences" :key="experience.id || index" class="rounded-2xl border border-base-200 p-4">
                  <div class="flex justify-between items-start gap-4 mb-2">
                    <div>
                      <p class="font-bold">{{ experience.role || 'Poste' }} chez {{ experience.company || 'Entreprise' }}</p>
                      <p class="text-xs text-base-content/60">{{ experience.period || 'Période' }}</p>
                    </div>
                    <button type="button" class="btn btn-ghost btn-xs text-error" @click="removeExperience(index)">Supprimer</button>
                  </div>
                  <p class="text-sm text-base-content/70">{{ experience.description || 'Aucun détail ajouté.' }}</p>
                </div>
                <p v-if="!user.experiences.length" class="text-xs text-base-content/50">Ajoute ton parcours professionnel pour améliorer ta crédibilité.</p>
              </div>
            </div>

            <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
              <h3 class="text-base font-black mb-4">Résumé & objectifs</h3>
              <div class="form-control">
                <label class="label font-bold text-xs uppercase">Bio personnelle</label>
                <textarea class="textarea textarea-bordered w-full h-40" v-model="user.bio" placeholder="Parle de tes points forts et de ton expérience..."></textarea>
              </div>
            </div>

            <!--
              Compétences & Langues simplifiées en listes de chaînes simples :
              CandidateCard.vue, CandidatDetail.vue et le catalogue candidats
              affichent skills/languages comme des string[], pas des objets
              {level, years...}. Garder cette forme évite de casser ces pages.
            -->
            <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
              <h3 class="text-base font-black mb-4">Compétences techniques</h3>
              <div class="flex gap-2 mb-3">
                <input type="text" class="input input-bordered w-full" v-model="newSkill" placeholder="Ex: Vue.js" @keyup.enter="addSkill" />
                <button type="button" class="btn btn-sm btn-accent shrink-0" :disabled="!newSkill" @click="addSkill">Ajouter</button>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="(skill, index) in user.skills" :key="skill" class="badge badge-outline badge-sm gap-2">
                  {{ skill }} <button type="button" class="text-error" @click="removeSkill(index)">×</button>
                </span>
                <p v-if="!user.skills.length" class="text-xs text-base-content/50">Ajoute tes compétences techniques.</p>
              </div>
            </div>

            <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
              <h3 class="text-base font-black mb-4">Soft skills</h3>
              <div class="flex gap-2 mb-3">
                <input type="text" class="input input-bordered w-full" v-model="newSoftSkill" placeholder="Ajouter une soft skill" @keyup.enter="addSoftSkill" />
                <button type="button" class="btn btn-sm btn-outline shrink-0" :disabled="!newSoftSkill" @click="addSoftSkill">Ajouter</button>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="(skill, index) in user.softSkills" :key="skill" class="badge badge-outline badge-sm gap-2">
                  {{ skill }} <button type="button" class="text-error" @click="removeSoftSkill(index)">×</button>
                </span>
              </div>
            </div>

            <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
              <h3 class="text-base font-black mb-4">Informations complémentaires</h3>
              <div class="grid grid-cols-1 gap-3 mb-4">
                <input type="text" class="input input-bordered w-full" v-model="newFieldLabel" placeholder="Libellé (ex: Permis de conduire)" />
                <input type="text" class="input input-bordered w-full" v-model="newFieldValue" placeholder="Valeur (ex: Catégorie B)" />
                <button type="button" class="btn btn-sm btn-accent" :disabled="!newFieldLabel || !newFieldValue" @click="addCustomField">
                  Ajouter information
                </button>
              </div>
              <div class="space-y-3">
                <div v-for="(field, index) in user.customFields" :key="index" class="rounded-2xl border border-base-200 p-4">
                  <div class="flex justify-between items-start gap-4">
                    <div>
                      <p class="font-bold">{{ field.label }}</p>
                      <p class="text-xs text-base-content/60">{{ field.value }}</p>
                    </div>
                    <button type="button" class="btn btn-ghost btn-xs text-error" @click="removeCustomField(index)">Supprimer</button>
                  </div>
                </div>
                <p v-if="!user.customFields.length" class="text-xs text-base-content/50">Ajoute des informations clés comme ta mobilité ou ton permis.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
            <h3 class="text-base font-black mb-4">Formations</h3>
            <div class="grid grid-cols-1 gap-3 mb-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" class="input input-bordered w-full" v-model="newFormation.school" placeholder="Établissement" />
                <input type="text" class="input input-bordered w-full" v-model="newFormation.degree" placeholder="Diplôme" />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" class="input input-bordered w-full" v-model="newFormation.field" placeholder="Filière" />
                <input type="text" class="input input-bordered w-full" v-model="newFormation.mention" placeholder="Mention" />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="month" class="input input-bordered w-full" v-model="newFormation.start" />
                <input type="month" class="input input-bordered w-full" v-model="newFormation.end" />
              </div>
              <button type="button" class="btn btn-sm btn-accent" :disabled="!newFormation.school || !newFormation.degree" @click="addFormation">
                Ajouter formation
              </button>
            </div>
            <div class="space-y-3">
              <div v-for="(formation, index) in user.formations" :key="index" class="rounded-2xl border border-base-200 p-4">
                <div class="flex justify-between items-start gap-4 mb-2">
                  <div>
                    <p class="font-bold">{{ formation.degree }} - {{ formation.school }}</p>
                    <p class="text-xs text-base-content/60">{{ formation.start }} → {{ formation.end }} • {{ formation.field }}</p>
                  </div>
                  <button type="button" class="btn btn-ghost btn-xs text-error" @click="removeFormation(index)">Supprimer</button>
                </div>
                <p class="text-xs text-base-content/70">Mention : {{ formation.mention || 'Non renseignée' }}</p>
              </div>
              <p v-if="!user.formations.length" class="text-xs text-base-content/50">Ajoute tes formations pour valoriser ton profil.</p>
            </div>
          </div>

          <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
            <h3 class="text-base font-black mb-4">Langues</h3>
            <div class="flex gap-2 mb-4">
              <input type="text" class="input input-bordered w-full" v-model="newLanguage" placeholder="Ex: Lingala" @keyup.enter="addLanguage" />
              <button type="button" class="btn btn-sm btn-accent shrink-0" :disabled="!newLanguage" @click="addLanguage">Ajouter</button>
            </div>
            <div class="space-y-3">
              <div v-for="(lang, index) in user.languages" :key="lang" class="rounded-2xl border border-base-200 p-4 flex items-center justify-between gap-4">
                <p class="font-bold">{{ lang }}</p>
                <button type="button" class="btn btn-ghost btn-xs text-error" @click="removeLanguage(index)">Supprimer</button>
              </div>
              <p v-if="!user.languages.length" class="text-xs text-base-content/50">Ajoute tes langues parlées.</p>
            </div>
          </div>
        </div>

        <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
          <h3 class="text-base font-black mb-4">Certifications</h3>
          <div class="grid grid-cols-1 gap-3 mb-4">
            <input type="text" class="input input-bordered w-full" v-model="newCertification.name" placeholder="Nom de la certification" />
            <input type="text" class="input input-bordered w-full" v-model="newCertification.issuer" placeholder="Organisme" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="month" class="input input-bordered w-full" v-model="newCertification.date" />
              <input type="month" class="input input-bordered w-full" v-model="newCertification.expiry" />
            </div>
            <button type="button" class="btn btn-sm btn-accent" :disabled="!newCertification.name || !newCertification.issuer" @click="addCertification">
              Ajouter certification
            </button>
          </div>
          <div class="space-y-3">
            <div v-for="(cert, index) in user.certifications" :key="index" class="rounded-2xl border border-base-200 p-4">
              <div class="flex justify-between items-start gap-4">
                <div>
                  <p class="font-bold">{{ cert.name }}</p>
                  <p class="text-xs text-base-content/60">{{ cert.issuer }} • Obtenue {{ cert.date }}{{ cert.expiry ? ` • Expire ${cert.expiry}` : '' }}</p>
                </div>
                <button type="button" class="btn btn-ghost btn-xs text-error" @click="removeCertification(index)">Supprimer</button>
              </div>
            </div>
            <p v-if="!user.certifications.length" class="text-xs text-base-content/50">Ajoute tes certifications professionnelles.</p>
          </div>
        </div>

        <!-- SAUVEGARDE -->
        <div class="flex justify-end sticky bottom-4">
          <BaseButton variant="accent" size="lg" :loading="isSaving" @click="handleSave" class="shadow-xl">
            Enregistrer les modifications
          </BaseButton>
        </div>
      </section>

      <!-- ================= ONGLET SÉCURITÉ ================= -->
      <section v-else-if="activeTab === 'security'" class="max-w-md space-y-4">
        <h2 class="text-xl font-black mb-2">Changer de mot de passe</h2>
        <div v-if="pwdError" class="alert alert-error text-sm font-bold">{{ pwdError }}</div>
        <div v-if="pwdSuccess" class="alert alert-success text-sm font-bold">{{ pwdSuccess }}</div>

        <div class="form-control">
          <label class="label font-bold text-xs uppercase">Mot de passe actuel</label>
          <input type="password" class="input input-bordered w-full" v-model="pwdForm.current" />
        </div>
        <div class="form-control">
          <label class="label font-bold text-xs uppercase">Nouveau mot de passe</label>
          <input type="password" class="input input-bordered w-full" v-model="pwdForm.new" />
        </div>
        <div class="form-control">
          <label class="label font-bold text-xs uppercase">Confirmer le nouveau mot de passe</label>
          <input type="password" class="input input-bordered w-full" v-model="pwdForm.confirm" />
        </div>
        <BaseButton variant="accent" :loading="isChangingPwd" @click="handleChangePassword">
          Mettre à jour le mot de passe
        </BaseButton>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuth } from '../../composables/useAuth';

const { currentUser, updateProfile, changePassword } = useAuth();

const activeTab = ref('profile');
const tabs = [
  { id: 'profile', label: 'Profil & CV', icon: 'fa-solid fa-user' },
  { id: 'security', label: 'Sécurité', icon: 'fa-solid fa-lock' },
  // D'autres onglets (Confidentialité, Notifications...) peuvent être ajoutés
  // ici une fois qu'une vraie source de données existera pour eux dans useAuth/useDb.
];

const isLoading = ref(true);
const isSaving = ref(false);
const saveError = ref('');
const saveSuccess = ref('');

const buildDefaultUser = () => ({
  name: '', email: '', avatar: '', location: '', address: '',
  dob: '', gender: '', nationality: '', maritalStatus: '', phone: '',
  currentStatus: '', yearsOfExperience: 0, title: '', profileSearch: '', bio: '',
  availability: true,
  contractTypes: [], salaryMin: null, salaryMax: null, salaryCurrency: 'XAF',
  mobility: 'Non', telework: 'Non',
  networks: { linkedin: '', github: '', portfolio: '', additional: [] },
  documents: {},
  customFields: [],
  experiences: [], projects: [], formations: [], certifications: [],
  skills: [], languages: [], softSkills: [],
});

const user = reactive(buildDefaultUser());

onMounted(() => {
  if (currentUser.value) {
    const stored = JSON.parse(JSON.stringify(currentUser.value));
    Object.assign(user, buildDefaultUser(), stored, {
      networks: { ...buildDefaultUser().networks, ...(stored.networks || {}) },
      documents: stored.documents || {},
    });
  }
  isLoading.value = false;
});

const avatarInitials = computed(() => {
  const name = user.name;
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
});

const contractOptions = ['CDI', 'CDD', 'Stage', 'Freelance'];
const documentTypes = [
  { key: 'cv', label: 'CV', accept: '.pdf,.doc,.docx' },
  { key: 'coverLetter', label: 'Lettre de motivation', accept: '.pdf,.doc,.docx' },
  { key: 'diploma', label: 'Diplôme', accept: '.pdf,image/*' },
];

// --- Upload fichiers (avatar / documents) : conversion en base64 (pas de backend de stockage) ---
const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const onAvatarUpload = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  user.avatar = await readFileAsDataUrl(file);
};

const onDocumentUpload = async (key, event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const dataUrl = await readFileAsDataUrl(file);
  user.documents[key] = { name: file.name, dataUrl };
};

// --- Réseaux ---
const newNetwork = reactive({ name: '', url: '' });
const addNetwork = () => {
  user.networks.additional.push({ ...newNetwork });
  newNetwork.name = '';
  newNetwork.url = '';
};
const removeNetwork = (index) => user.networks.additional.splice(index, 1);

// --- Expériences ---
const newExperience = reactive({ role: '', company: '', period: '', description: '' });
const addExperience = () => {
  user.experiences.unshift({ id: `exp_${Date.now()}`, ...newExperience });
  Object.assign(newExperience, { role: '', company: '', period: '', description: '' });
};
const removeExperience = (index) => user.experiences.splice(index, 1);

// --- Compétences / Soft skills / Langues (chaînes simples, cohérent avec le reste de l'app) ---
const newSkill = ref('');
const addSkill = () => {
  if (newSkill.value && !user.skills.includes(newSkill.value)) user.skills.push(newSkill.value);
  newSkill.value = '';
};
const removeSkill = (index) => user.skills.splice(index, 1);

const newSoftSkill = ref('');
const addSoftSkill = () => {
  if (newSoftSkill.value && !user.softSkills.includes(newSoftSkill.value)) user.softSkills.push(newSoftSkill.value);
  newSoftSkill.value = '';
};
const removeSoftSkill = (index) => user.softSkills.splice(index, 1);

const newLanguage = ref('');
const addLanguage = () => {
  if (newLanguage.value && !user.languages.includes(newLanguage.value)) user.languages.push(newLanguage.value);
  newLanguage.value = '';
};
const removeLanguage = (index) => user.languages.splice(index, 1);

// --- Informations complémentaires ---
const newFieldLabel = ref('');
const newFieldValue = ref('');
const addCustomField = () => {
  user.customFields.push({ label: newFieldLabel.value, value: newFieldValue.value });
  newFieldLabel.value = '';
  newFieldValue.value = '';
};
const removeCustomField = (index) => user.customFields.splice(index, 1);

// --- Formations ---
const newFormation = reactive({ school: '', degree: '', field: '', mention: '', start: '', end: '' });
const addFormation = () => {
  user.formations.unshift({ ...newFormation });
  Object.assign(newFormation, { school: '', degree: '', field: '', mention: '', start: '', end: '' });
};
const removeFormation = (index) => user.formations.splice(index, 1);

// --- Certifications ---
const newCertification = reactive({ name: '', issuer: '', date: '', expiry: '' });
const addCertification = () => {
  user.certifications.unshift({ ...newCertification });
  Object.assign(newCertification, { name: '', issuer: '', date: '', expiry: '' });
};
const removeCertification = (index) => user.certifications.splice(index, 1);

// --- Complétude du profil ---
const profileCompletion = computed(() => {
  const checks = [
    !!user.avatar, !!user.bio, !!user.location, !!user.phone,
    user.yearsOfExperience > 0, !!user.title,
    user.skills.length > 0, user.languages.length > 0,
    user.experiences.length > 0, user.formations.length > 0,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
});

// --- Sauvegarde réelle vers useAuth (met à jour currentUser + localStorage) ---
const handleSave = async () => {
  saveError.value = '';
  saveSuccess.value = '';
  isSaving.value = true;

  const success = await updateProfile({ ...user });

  isSaving.value = false;
  if (success) {
    saveSuccess.value = 'Votre profil a été mis à jour avec succès.';
    setTimeout(() => (saveSuccess.value = ''), 4000);
  } else {
    saveError.value = "Une erreur est survenue lors de l'enregistrement.";
  }
};

// --- Changement de mot de passe ---
const pwdForm = reactive({ current: '', new: '', confirm: '' });
const isChangingPwd = ref(false);
const pwdError = ref('');
const pwdSuccess = ref('');

const handleChangePassword = async () => {
  pwdError.value = '';
  pwdSuccess.value = '';

  if (!pwdForm.current || !pwdForm.new) {
    pwdError.value = 'Merci de remplir tous les champs.';
    return;
  }
  if (pwdForm.new !== pwdForm.confirm) {
    pwdError.value = 'Les nouveaux mots de passe ne correspondent pas.';
    return;
  }

  isChangingPwd.value = true;
  const success = await changePassword(pwdForm.current, pwdForm.new);
  isChangingPwd.value = false;

  if (success) {
    pwdSuccess.value = 'Mot de passe mis à jour avec succès.';
    Object.assign(pwdForm, { current: '', new: '', confirm: '' });
  } else {
    pwdError.value = 'Mot de passe actuel incorrect.';
  }
};
</script>