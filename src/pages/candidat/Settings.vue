<template>
  <div class="max-w-5xl mx-auto space-y-8 animate-fade-in-up px-4 sm:px-6 lg:px-0">

    <header>
      <h1 class="text-3xl font-black text-base-content">Paramètres de votre compte</h1>
      <p class="text-sm font-semibold text-base-content/60 mt-1">Gérez vos informations, vos préférences et votre
        confidentialité.</p>
          <!-- Sidebar de navigation -->
      <aside class="lg:w-full  space-y-1 flex mt-8">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          class="w-full flex items-center gap-3 px-4 md:py-3 rounded-xl text-sm font-bold transition-all"
          :class="activeTab === tab.id ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-base-200'">
          <i :class="tab.icon"></i> {{ tab.label }}
        </button>
      </aside>
    </header>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar de navigation -->


      <!-- Contenu -->
      <main class="flex-1 bg-base-100 p-6 sm:p-8 rounded-2xl border border-base-200 shadow-sm">

        <!-- ONGLET : PROFIL & CV -->
        <section v-if="activeTab === 'profile'" class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 space-y-6">
              <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
                <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
                  <div>
                    <h2 class="text-xl font-black">Mon profil professionnel</h2>
                    <p class="text-sm text-base-content/60">Complète ton profil Mosalah pour augmenter ta visibilité
                      auprès des recruteurs.</p>
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
                        <input type="text" class="input input-bordered w-full" v-model="user.nationality"
                          placeholder="République du Congo" />
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
                        <label class="label font-bold text-xs uppercase">Adresse complète</label>
                        <input type="text" class="input input-bordered w-full" v-model="user.address"
                          placeholder="Quartier, Ville, Pays" />
                      </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="form-control">
                        <label class="label font-bold text-xs uppercase">Email</label>
                        <input type="email" class="input input-bordered w-full" v-model="user.email" />
                      </div>
                      <div class="form-control">
                        <label class="label font-bold text-xs uppercase">Téléphone</label>
                        <input type="tel" class="input input-bordered w-full" v-model="user.phone"
                          placeholder="+242 00 000 000" />
                      </div>
                    </div>
                  </div>

                  <div class="rounded-3xl border border-base-200 bg-base-50 p-5 text-center">
                    <div class="avatar mx-auto mb-4">
                      <div
                        class="w-28 h-28 rounded-full bg-base-200 overflow-hidden flex items-center justify-center text-3xl font-black text-emerald-700">
                        <img v-if="user.avatar" :src="user.avatar" alt="Photo de profil"
                          class="object-cover w-full h-full" />
                        <span v-else>{{ avatarInitials }}</span>
                      </div>
                    </div>
                    <p class="font-bold">Photo de profil</p>
                    <p class="text-xs text-base-content/60 mb-4">choisissez une photo professionnelle.</p>
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
                        <option>Étudiant</option>
                        <option>Employé</option>
                        <option>Indépendant</option>
                        <option>Sans emploi</option>
                        <option>Stage</option>
                        <option>Freelance</option>
                      </select>
                    </div>
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Années d'expérience</label>
                      <select class="select select-bordered w-full" v-model="user.yearsExperience">
                        <option>0-1 an</option>
                        <option>2-5 ans</option>
                        <option>5-10 ans</option>
                        <option>10+ ans</option>
                      </select>
                    </div>
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Poste recherché</label>
                      <input type="text" class="input input-bordered w-full" v-model="user.title"
                        placeholder="Ex: Développeur Backend" />
                    </div>
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Profil recherché</label>
                      <textarea class="textarea textarea-bordered w-full h-28" v-model="user.profileSearch"
                        placeholder="Je recherche un poste de ..."></textarea>
                    </div>
                  </div>
                </div>

                <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
                  <h3 class="text-base font-black mb-4">Préférences d'emploi</h3>
                  <div class="space-y-4">
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Type de contrat</label>
                      <div class="grid grid-cols-2 gap-2">
                        <label v-for="type in contractOptions" :key="type" class="cursor-pointer">
                          <input type="checkbox" class="checkbox checkbox-accent mr-2" :value="type"
                            v-model="user.contractTypes" />
                          {{ type }}
                        </label>
                      </div>
                    </div>
                    <div class="grid grid-cols-3 gap-3">
                      <div class="form-control">
                        <label class="label font-bold text-xs uppercase">Salaire min</label>
                        <input type="number" class="input input-bordered w-full" v-model="user.salaryMin"
                          placeholder="0" />
                      </div>
                      <div class="form-control">
                        <label class="label font-bold text-xs uppercase">Salaire max</label>
                        <input type="number" class="input input-bordered w-full" v-model="user.salaryMax"
                          placeholder="0" />
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
                    <BaseInput label="LinkedIn" type="url" v-model="user.networks.linkedin"
                      placeholder="https://linkedin.com/in/..." />
                    <BaseInput label="GitHub" type="url" v-model="user.networks.github"
                      placeholder="https://github.com/..." />
                    <BaseInput label="Portfolio / Site web" type="url" v-model="user.networks.portfolio"
                      placeholder="https://..." />
                    <BaseInput label="LinkedIn" type="url" v-model="user.networks.linkedin"
                      placeholder="https://linkedin.com/in/..." />
                    <BaseInput label="GitHub" type="url" v-model="user.networks.github"
                      placeholder="https://github.com/..." />
                    <BaseInput label="Portfolio / Site web" type="url" v-model="user.networks.portfolio"
                      placeholder="https://..." />
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
                      <BaseInput label="Nom du réseau" v-model="newNetwork.name" placeholder="Ex: LinkedIn, Slack..." />
                      <BaseInput label="Lien du réseau" type="url" v-model="newNetwork.url" placeholder="https://..." />
                    </div>
                    <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
                      <BaseButton type="button" variant="accent" class="w-full sm:w-auto"
                        :disabled="!newNetwork.name || !newNetwork.url" @click="addNetwork">
                        Ajouter le réseau
                      </BaseButton>
                    </div>
                    <div class="space-y-3">
                      <div v-for="(network, index) in user.networks.additional" :key="`${network.name}-${index}`"
                        class="rounded-2xl border border-base-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div class="min-w-0">
                          <p class="font-bold">{{ network.name }}</p>
                          <p class="text-xs text-base-content/60 break-all">
                            <a :href="network.url" target="_blank" class="link link-primary">{{ network.url }}</a>
                          </p>
                        </div>
                        <button type="button" class="btn btn-ghost btn-xs text-error"
                          @click="removeNetwork(index)">Supprimer</button>
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
                      <div>
                        <p class="font-bold">{{ doc.label }}</p>
                        <p class="text-xs text-base-content/60">{{ user.documents[doc.key] || 'Aucun fichier chargé' }}
                        </p>
                      </div>
                      <label class="btn btn-xs btn-outline cursor-pointer">
                        Charger
                        <input type="file" class="hidden" :accept="doc.accept"
                          @change="(event) => onDocumentUpload(doc.key, event)" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
                <h3 class="text-base font-black mb-4">Expériences professionnelles</h3>
                <div class="grid grid-cols-1 gap-3 mb-4">
                  <input type="text" class="input input-bordered w-full" v-model="newExperience.role"
                    placeholder="Intitulé du poste" />
                  <input type="text" class="input input-bordered w-full" v-model="newExperience.company"
                    placeholder="Entreprise" />
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input type="text" class="input input-bordered w-full" v-model="newExperience.period"
                      placeholder="Période (ex: 2023 - 2025)" />
                    <textarea class="textarea textarea-bordered w-full" v-model="newExperience.description"
                      placeholder="Résumé de l'expérience" rows="3"></textarea>
                  </div>
                  <button type="button" class="btn btn-sm btn-accent"
                    :disabled="!newExperience.role || !newExperience.company" @click="addExperience">Ajouter
                    expérience</button>
                </div>
                <div class="space-y-3">
                  <div v-for="(experience, index) in user.experiences" :key="index"
                    class="rounded-2xl border border-base-200 p-4">
                    <div class="flex justify-between items-start gap-4 mb-2">
                      <div>
                        <p class="font-bold">{{ experience.role || 'Poste' }} chez {{ experience.company || 'Entreprise'
                        }}</p>
                        <p class="text-xs text-base-content/60">{{ experience.period || 'Période' }}</p>
                      </div>
                      <button type="button" class="btn btn-ghost btn-xs text-error"
                        @click="removeExperience(index)">Supprimer</button>
                    </div>
                    <p class="text-sm text-base-content/70">{{ experience.description || 'Aucun détail ajouté.' }}</p>
                  </div>
                  <p v-if="!user.experiences.length" class="text-xs text-base-content/50">Ajoute ton parcours
                    professionnel pour améliorer ta crédibilité.</p>
                </div>
              </div>

              <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
                <h3 class="text-base font-black mb-4">Informations complémentaires</h3>
                <div class="grid grid-cols-1 gap-3 mb-4">
                  <input type="text" class="input input-bordered w-full" v-model="newFieldLabel"
                    placeholder="Libellé (ex: Mobilité)" />
                  <input type="text" class="input input-bordered w-full" v-model="newFieldValue"
                    placeholder="Valeur (ex: Disponible)" />
                  <button type="button" class="btn btn-sm btn-accent" :disabled="!newFieldLabel || !newFieldValue"
                    @click="addCustomField">Ajouter information</button>
                </div>
                <div class="space-y-3">
                  <div v-for="(field, index) in user.customFields" :key="index"
                    class="rounded-2xl border border-base-200 p-4">
                    <div class="flex justify-between items-start gap-4 mb-2">
                      <div>
                        <p class="font-bold">{{ field.label }}</p>
                        <p class="text-xs text-base-content/60">{{ field.value }}</p>
                      </div>
                      <button type="button" class="btn btn-ghost btn-xs text-error"
                        @click="removeCustomField(index)">Supprimer</button>
                    </div>
                  </div>
                  <p v-if="!user.customFields.length" class="text-xs text-base-content/50">Ajoute des informations clés
                    comme ta mobilité, ton permis ou ta disponibilité.</p>
                </div>
              </div>

              <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
                <h3 class="text-base font-black mb-4">Résumé & objectifs</h3>
                <div class="form-control mb-4">
                  <label class="label font-bold text-xs uppercase">Profil recherché</label>
                  <textarea class="textarea textarea-bordered w-full h-28" v-model="user.profileSearch"
                    placeholder="Ex: Je recherche un poste de développeur backend Laravel..."></textarea>
                </div>
                <div class="form-control">
                  <label class="label font-bold text-xs uppercase">Bio personnelle</label>
                  <textarea class="textarea textarea-bordered w-full h-40" v-model="user.bio"
                    placeholder="Parle rapidement de tes points forts et de ton expérience..."></textarea>
                </div>
              </div>

              <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
                <h3 class="text-base font-black mb-4">Compétences techniques</h3>
                <div class="grid grid-cols-1 gap-3 mb-4">
                  <div class="form-control">
                    <label class="label font-bold text-xs uppercase">Domaine</label>
                    <select class="select select-bordered w-full" v-model="selectedDomain">
                      <option value="" disabled>Choisir un domaine</option>
                      <option v-for="domain in domains" :key="domain.id" :value="domain.id">{{ domain.label }}</option>
                    </select>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Compétence</label>
                      <select class="select select-bordered w-full" v-model="selectedSkill" :disabled="!selectedDomain">
                        <option value="" disabled>Choisir une compétence</option>
                        <option v-for="skill in availableSkills" :key="skill" :value="skill">{{ skill }}</option>
                      </select>
                    </div>
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Niveau</label>
                      <select class="select select-bordered w-full" v-model="selectedSkillLevel">
                        <option value="1">★☆☆☆☆</option>
                        <option value="2">★★☆☆☆</option>
                        <option value="3">★★★☆☆</option>
                        <option value="4">★★★★☆</option>
                        <option value="5">★★★★★</option>
                      </select>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Années</label>
                      <select class="select select-bordered w-full" v-model="selectedSkillYears">
                        <option>0-1</option>
                        <option>2-5</option>
                        <option>5-10</option>
                        <option>10+</option>
                      </select>
                    </div>
                    <div class="form-control">
                      <label class="label font-bold text-xs uppercase">Dernière utilisation</label>
                      <input type="number" min="2000" max="2030" class="input input-bordered w-full"
                        v-model="selectedSkillLastUsed" placeholder="2026" />
                    </div>
                    <div class="flex items-end">
                      <button type="button" class="btn btn-sm btn-accent w-full" :disabled="!selectedSkill"
                        @click="addSelectedSkill">Ajouter</button>
                    </div>
                  </div>
                </div>
                <div class="space-y-3">
                  <div v-if="user.skills.length" class="grid gap-3">
                    <div v-for="(skill, index) in user.skills" :key="`${skill.name}-${index}`"
                      class="rounded-2xl border border-base-200 p-4">
                      <div class="flex justify-between items-start gap-4">
                        <div>
                          <p class="font-bold">{{ skill.name }}</p>
                          <p class="text-xs text-base-content/60">Niveau {{ skill.level }} • {{ skill.years }} ans •
                            Dernière utilisation {{ skill.lastUsed }}</p>
                        </div>
                        <button type="button" class="btn btn-ghost btn-xs text-error"
                          @click="removeSkill(index)">Supprimer</button>
                      </div>
                    </div>
                  </div>
                  <p v-else class="text-xs text-base-content/50">Ajoute tes compétences techniques pour rendre ton
                    profil plus attractif.</p>
                </div>
              </div>

              <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
                <h3 class="text-base font-black mb-4">Soft skills</h3>
                <div class="grid grid-cols-1 gap-3 mb-3">
                  <input type="text" class="input input-bordered w-full" v-model="newSoftSkill"
                    placeholder="Ajouter une soft skill" @keyup.enter="addSoftSkill" />
                  <button type="button" class="btn btn-sm btn-outline" :disabled="!newSoftSkill"
                    @click="addSoftSkill">Ajouter</button>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="(skill, index) in user.softSkills" :key="skill" class="badge badge-outline badge-sm">{{
                    skill }} <button type="button" class="ml-2 text-error"
                      @click="removeSoftSkill(index)">×</button></span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
              <h3 class="text-base font-black mb-4">Formations</h3>
              <div class="grid grid-cols-1 gap-3 mb-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" class="input input-bordered w-full" v-model="newFormation.school"
                    placeholder="Établissement" />
                  <input type="text" class="input input-bordered w-full" v-model="newFormation.degree"
                    placeholder="Diplôme" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" class="input input-bordered w-full" v-model="newFormation.field"
                    placeholder="Filière" />
                  <input type="text" class="input input-bordered w-full" v-model="newFormation.mention"
                    placeholder="Mention" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="month" class="input input-bordered w-full" v-model="newFormation.start" />
                  <input type="month" class="input input-bordered w-full" v-model="newFormation.end" />
                </div>
                <button type="button" class="btn btn-sm btn-accent"
                  :disabled="!newFormation.school || !newFormation.degree" @click="addFormation">Ajouter
                  formation</button>
              </div>
              <div class="space-y-3">
                <div v-for="(formation, index) in user.formations" :key="index"
                  class="rounded-2xl border border-base-200 p-4">
                  <div class="flex justify-between items-start gap-4 mb-2">
                    <div>
                      <p class="font-bold">{{ formation.degree }} - {{ formation.school }}</p>
                      <p class="text-xs text-base-content/60">{{ formation.start }} → {{ formation.end }} • {{
                        formation.field }}</p>
                    </div>
                    <button type="button" class="btn btn-ghost btn-xs text-error"
                      @click="removeFormation(index)">Supprimer</button>
                  </div>
                  <p class="text-xs text-base-content/70">Mention : {{ formation.mention || 'Non renseignée' }}</p>
                </div>
                <p v-if="!user.formations.length" class="text-xs text-base-content/50">Ajoute tes formations pour
                  valoriser ton profil.</p>
              </div>
            </div>

            <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
              <h3 class="text-base font-black mb-4">Langues</h3>
              <div class="grid grid-cols-1 gap-3 mb-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" class="input input-bordered w-full" v-model="newLanguage.name"
                    placeholder="Langue" />
                  <select class="select select-bordered w-full" v-model="newLanguage.level">
                    <option disabled value="">Niveau</option>
                    <option>A1</option>
                    <option>A2</option>
                    <option>B1</option>
                    <option>B2</option>
                    <option>C1</option>
                    <option>C2</option>
                  </select>
                </div>
                <button type="button" class="btn btn-sm btn-accent" :disabled="!newLanguage.name || !newLanguage.level"
                  @click="addLanguage">Ajouter langue</button>
              </div>
              <div class="space-y-3">
                <div v-for="(lang, index) in user.languages" :key="index"
                  class="rounded-2xl border border-base-200 p-4 flex items-center justify-between gap-4">
                  <div>
                    <p class="font-bold">{{ lang.name }}</p>
                    <p class="text-xs text-base-content/60">{{ lang.level }}</p>
                  </div>
                  <button type="button" class="btn btn-ghost btn-xs text-error"
                    @click="removeLanguage(index)">Supprimer</button>
                </div>
                <p v-if="!user.languages.length" class="text-xs text-base-content/50">Ajoute tes langues parlées.</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
              <h3 class="text-base font-black mb-4">Certifications</h3>
              <div class="grid grid-cols-1 gap-3 mb-4">
                <input type="text" class="input input-bordered w-full" v-model="newCertification.name"
                  placeholder="Nom de la certification" />
                <input type="text" class="input input-bordered w-full" v-model="newCertification.issuer"
                  placeholder="Organisme" />
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="month" class="input input-bordered w-full" v-model="newCertification.date"
                    placeholder="Date" />
                  <input type="month" class="input input-bordered w-full" v-model="newCertification.expiry"
                    placeholder="Expiration" />
                </div>
                <button type="button" class="btn btn-sm btn-accent"
                  :disabled="!newCertification.name || !newCertification.issuer" @click="addCertification">Ajouter
                  certification</button>
              </div>
              <div class="space-y-3">
                <div v-for="(cert, index) in user.certifications" :key="index"
                  class="rounded-2xl border border-base-200 p-4 flex items-center justify-between gap-4">
                  <div>
                    <p class="font-bold">{{ cert.name }}</p>
                    <p class="text-xs text-base-content/60">{{ cert.issuer }} • {{ cert.date }} • Expire {{ cert.expiry
                      || 'N/A' }}</p>
                  </div>
                  <button type="button" class="btn btn-ghost btn-xs text-error"
                    @click="removeCertification(index)">Supprimer</button>
                </div>
                <p v-if="!user.certifications.length" class="text-xs text-base-content/50">Ajoute tes certifications
                  professionnelles.</p>
              </div>
            </div>

            <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
              <h3 class="text-base font-black mb-4">Projets & réalisations</h3>
              <div class="grid grid-cols-1 gap-3 mb-4">
                <input type="text" class="input input-bordered w-full" v-model="newProject.title"
                  placeholder="Nom du projet" />
                <input type="text" class="input input-bordered w-full" v-model="newProject.tech"
                  placeholder="Technologies" />
                <input type="url" class="input input-bordered w-full" v-model="newProject.link" placeholder="Lien" />
                <input type="month" class="input input-bordered w-full" v-model="newProject.date" />
                <textarea class="textarea textarea-bordered w-full" v-model="newProject.description"
                  placeholder="Description du projet"></textarea>
                <button type="button" class="btn btn-sm btn-accent" :disabled="!newProject.title"
                  @click="addProject">Ajouter projet</button>
              </div>
              <div class="space-y-3">
                <div v-for="(project, index) in user.projects" :key="index"
                  class="rounded-2xl border border-base-200 p-4">
                  <div class="flex justify-between items-start gap-4 mb-2">
                    <div>
                      <p class="font-bold">{{ project.title }}</p>
                      <p class="text-xs text-base-content/60">{{ project.date }} • {{ project.tech }}</p>
                    </div>
                    <button type="button" class="btn btn-ghost btn-xs text-error"
                      @click="removeProject(index)">Supprimer</button>
                  </div>
                  <p class="text-sm text-base-content/70">{{ project.description }}</p>
                  <p v-if="project.link" class="text-xs text-accent mt-2"><a :href="project.link" target="_blank">Voir
                      le projet</a></p>
                </div>
                <p v-if="!user.projects.length" class="text-xs text-base-content/50">Ajoute une réalisation clé pour te
                  démarquer.</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
              <h3 class="text-base font-black mb-4">Références professionnelles</h3>
              <div class="grid grid-cols-1 gap-3 mb-4">
                <input type="text" class="input input-bordered w-full" v-model="newReference.name" placeholder="Nom" />
                <input type="text" class="input input-bordered w-full" v-model="newReference.company"
                  placeholder="Entreprise" />
                <input type="text" class="input input-bordered w-full" v-model="newReference.role"
                  placeholder="Fonction" />
                <input type="tel" class="input input-bordered w-full" v-model="newReference.phone"
                  placeholder="Téléphone" />
                <input type="email" class="input input-bordered w-full" v-model="newReference.email"
                  placeholder="Email" />
                <button type="button" class="btn btn-sm btn-accent"
                  :disabled="!newReference.name || !newReference.company" @click="addReference">Ajouter
                  référence</button>
              </div>
              <div class="space-y-3">
                <div v-for="(refItem, index) in user.references" :key="index"
                  class="rounded-2xl border border-base-200 p-4">
                  <div class="flex justify-between items-start gap-4 mb-2">
                    <div>
                      <p class="font-bold">{{ refItem.name }}</p>
                      <p class="text-xs text-base-content/60">{{ refItem.role }} • {{ refItem.company }}</p>
                    </div>
                    <button type="button" class="btn btn-ghost btn-xs text-error"
                      @click="removeReference(index)">Supprimer</button>
                  </div>
                  <p class="text-xs text-base-content/60">{{ refItem.phone }} • {{ refItem.email }}</p>
                </div>
                <p v-if="!user.references.length" class="text-xs text-base-content/50">Tu peux indiquer des références
                  ou préciser qu'elles sont disponibles sur demande.</p>
              </div>
            </div>

            <div class="border border-base-200 rounded-3xl bg-base-100 p-6">
              <h3 class="text-base font-black mb-4">Centres d'intérêt</h3>
              <div class="grid grid-cols-1 gap-3 mb-4">
                <input type="text" class="input input-bordered w-full" v-model="newInterest"
                  placeholder="Ajouter un centre d'intérêt" @keyup.enter="addInterest" />
                <button type="button" class="btn btn-sm btn-accent" :disabled="!newInterest"
                  @click="addInterest">Ajouter</button>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="(interest, index) in user.interests" :key="interest"
                  class="badge badge-outline badge-sm">{{ interest }} <button type="button" class="ml-1 text-error"
                    @click="removeInterest(index)">×</button></span>
              </div>
              <p v-if="!user.interests.length" class="text-xs text-base-content/50 mt-3">Ajoute quelques centres
                d'intérêt pour enrichir ton profil.</p>
            </div>
          </div>

          <div class="flex justify-end">
            <button type="button" class="btn btn-accent text-white" :class="saving ? 'loading' : ''"
              @click="saveProfile">
              Enregistrer les modifications
            </button>
          </div>
        </section>

        <!-- ONGLET : CONFIDENTIALITÉ (Très important pour un candidat) -->
        <section v-if="activeTab === 'privacy'" class="space-y-6">
          <h2 class="text-xl font-black mb-4">Confidentialité & Visibilité</h2>

          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-base-50 rounded-xl">
              <div>
                <p class="font-bold">Visibilité du profil</p>
                <p class="text-xs text-base-content/60">Permettre aux recruteurs de voir mon profil dans la CVthèque.
                </p>
              </div>
              <input type="checkbox" class="toggle toggle-accent" checked />
            </div>

            <div class="flex items-center justify-between p-4 bg-base-50 rounded-xl">
              <div>
                <p class="font-bold">Mode furtif</p>
                <p class="text-xs text-base-content/60">Masquer mon entreprise actuelle aux recruteurs.</p>
              </div>
              <input type="checkbox" class="toggle toggle-accent" />
            </div>
          </div>
        </section>

        <!-- ONGLET : ALERTE EMPLOI -->
        <section v-if="activeTab === 'alerts'" class="space-y-6">
          <h2 class="text-xl font-black mb-4">Mes Alertes Emploi</h2>
          <div class="space-y-4">
            <div v-for="alert in alerts" :key="alert.id"
              class="flex justify-between items-center p-4 border border-base-200 rounded-xl">
              <div>
                <p class="font-bold">{{ alert.title }}</p>
                <p class="text-xs text-base-content/60">Fréquence : {{ alert.frequency }}</p>
              </div>
              <button class="btn btn-ghost btn-sm text-error">Supprimer</button>
            </div>
            <button class="btn btn-accent btn-sm text-white">+ Créer une nouvelle alerte</button>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useAuth } from '../../composables/useAuth';

const { currentUser, updateProfile } = useAuth();
const activeTab = ref('profile');

const tabs = [
  { id: 'profile', label: 'Mon Profil & CV', icon: 'fa-solid fa-user' },
  { id: 'privacy', label: 'Confidentialité', icon: 'fa-solid fa-lock' },
  { id: 'alerts', label: 'Alertes Emploi', icon: 'fa-solid fa-bell' },
  { id: 'security', label: 'Sécurité', icon: 'fa-solid fa-shield' },
];

const contractOptions = ['CDI', 'CDD', 'Intérim', 'Stage', 'Freelance', 'Apprentissage'];

const documentTypes = [
  { key: 'cv', label: 'CV' },
  { key: 'coverLetter', label: 'Lettre de motivation' },
  { key: 'portfolio', label: 'Portfolio' },
];

const alerts = [
  { id: 1, title: 'Développeur Fullstack', frequency: 'Hebdomadaire' },
  { id: 2, title: 'Ingénieur réseau', frequency: 'Mensuelle' },
];

const domains = [
  { id: 'reseau', label: 'Réseau', skills: ['Administration réseau', 'Support réseau', 'Sécurité réseau', 'Câblage structuré', 'Virtualisation'] },
  { id: 'informatique-industrielle', label: 'Informatique industrielle', skills: ['Automatisation', 'SCADA', 'PLC', 'Maintenance industrielle', 'IoT industriel'] },
  { id: 'mecatronique', label: 'Mécatronique', skills: ['Robotique', 'Électronique embarquée', 'Conception mécanique', 'Commande moteur', 'Maintenance mécatronique'] },
  { id: 'finance', label: 'Finance', skills: ['Comptabilité', 'Analyse financière', 'Contrôle de gestion', 'Trésorerie', 'Audit'] },
  { id: 'developpement-web', label: 'Développement web', skills: ['Vue.js', 'React', 'Laravel', 'Node.js', 'WordPress'] },
  { id: 'data-ia', label: 'Data & IA', skills: ['Data science', 'Machine learning', 'Business intelligence', 'Analyse de données', 'Modélisation'] },
  { id: 'rh', label: 'Ressources Humaines', skills: ['Recrutement', 'Paie', 'Gestion RH', 'Formation', 'Relations sociales'] },
  { id: 'marketing', label: 'Marketing', skills: ['Marketing digital', 'Community management', 'SEO', 'Publicité', 'Branding'] },
  { id: 'logistique', label: 'Logistique', skills: ['Supply chain', 'Gestion des stocks', 'Transport', 'Douane', 'Planification'] },
  { id: 'energie', label: 'Énergie', skills: ['Électrotechnique', 'Maintenance électrique', 'Énergies renouvelables', 'Instrumentation', 'Hydraulique'] },
];

const normalizeSkills = (skills) => {
  if (!Array.isArray(skills)) return [];
  return skills.map((skill) =>
    typeof skill === 'string'
      ? { name: skill, level: '3', years: '2-5', lastUsed: 'Récemment' }
      : skill,
  );
};

const normalizeLanguages = (languages) => {
  if (!Array.isArray(languages)) return [];
  return languages.map((language) =>
    typeof language === 'string'
      ? { name: language, level: 'B2' }
      : language,
  );
};

const normalizeArray = (value) => (Array.isArray(value) ? value : []);

const defaultUser = {
  name: '',
  dob: '',
  gender: '',
  nationality: '',
  maritalStatus: '',
  address: '',
  title: '',
  location: '',
  email: '',
  phone: '',
  availability: 'Disponible',
  currentStatus: 'Sans emploi',
  yearsExperience: '0-1 an',
  profileSearch: '',
  bio: '',
  contractTypes: [],
  salaryMin: '',
  salaryMax: '',
  salaryCurrency: 'XAF',
  mobility: 'Oui',
  telework: 'Hybride',
  networks: {
    linkedin: '',
    github: '',
    portfolio: '',
    additional: [],
  },
  documents: {
    cv: '',
    coverLetter: '',
    portfolio: '',
  },
  avatar: '',
  skills: [],
  softSkills: [],
  languages: [],
  experiences: [],
  formations: [],
  certifications: [],
  projects: [],
  references: [],
  interests: [],
  customFields: [],
  cvName: 'Mon-CV.pdf',
  cvUpdated: new Date().toLocaleDateString('fr-FR'),
};

const user = ref({
  ...defaultUser,
  ...(currentUser.value || {}),
  skills: normalizeSkills(currentUser.value?.skills),
  experiences: normalizeArray(currentUser.value?.experiences),
  formations: normalizeArray(currentUser.value?.formations),
  languages: normalizeLanguages(currentUser.value?.languages),
  certifications: normalizeArray(currentUser.value?.certifications),
  projects: normalizeArray(currentUser.value?.projects),
  references: normalizeArray(currentUser.value?.references),
  interests: normalizeArray(currentUser.value?.interests),
  customFields: normalizeArray(currentUser.value?.customFields),
  networks: { ...defaultUser.networks, ...(currentUser.value?.networks || {}) },
  documents: { ...defaultUser.documents, ...(currentUser.value?.documents || {}) },
});

watch(currentUser, (value) => {
  user.value = {
    ...defaultUser,
    ...(value || {}),
    skills: normalizeSkills(value?.skills),
    experiences: normalizeArray(value?.experiences),
    formations: normalizeArray(value?.formations),
    languages: normalizeLanguages(value?.languages),
    certifications: normalizeArray(value?.certifications),
    projects: normalizeArray(value?.projects),
    references: normalizeArray(value?.references),
    interests: normalizeArray(value?.interests),
    customFields: normalizeArray(value?.customFields),
    networks: { ...defaultUser.networks, ...(value?.networks || {}) },
    documents: { ...defaultUser.documents, ...(value?.documents || {}) },
  };
});

const selectedDomain = ref('');
const selectedSkill = ref('');
const selectedSkillLevel = ref('3');
const selectedSkillYears = ref('2-5');
const selectedSkillLastUsed = ref('');
const newSoftSkill = ref('');
const newLanguage = ref({ name: '', level: '' });
const newFormation = ref({ school: '', degree: '', field: '', mention: '', start: '', end: '' });
const newCertification = ref({ name: '', issuer: '', date: '', expiry: '' });
const newProject = ref({ title: '', tech: '', link: '', date: '', description: '' });
const newReference = ref({ name: '', company: '', role: '', phone: '', email: '' });
const newInterest = ref('');
const newFieldLabel = ref('');
const newFieldValue = ref('');
const newNetwork = ref({ name: '', url: '' });
const newExperience = ref({ role: '', company: '', period: '', description: '' });
const saving = ref(false);

const availableSkills = computed(() => {
  const domain = domains.find((item) => item.id === selectedDomain.value);
  return domain ? domain.skills : [];
});

const profileCompletion = computed(() => {
  const scoreItems = [
    !!user.value.name,
    !!user.value.email,
    !!user.value.phone,
    !!user.value.title,
    !!user.value.bio,
    user.value.skills.length > 0,
    user.value.experiences.length > 0,
    user.value.formations.length > 0,
    user.value.languages.length > 0,
    !!user.value.networks.linkedin,
    !!user.value.networks.github,
    user.value.networks.additional?.length > 0,
  ];
  return Math.round((scoreItems.filter(Boolean).length / scoreItems.length) * 100);
});

const avatarInitials = computed(() => {
  if (user.value.name) {
    return user.value.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('');
  }
  if (user.value.email) {
    return user.value.email.charAt(0).toUpperCase();
  }
  return 'CV';
});

watch(selectedDomain, () => {
  selectedSkill.value = '';
  selectedSkillLevel.value = '3';
  selectedSkillYears.value = '2-5';
  selectedSkillLastUsed.value = '';
});

const addSelectedSkill = () => {
  if (!selectedSkill.value) return;
  const exists = user.value.skills.some((skill) => skill.name === selectedSkill.value);
  if (exists) {
    selectedSkill.value = '';
    return;
  }

  user.value.skills.push({
    name: selectedSkill.value,
    level: selectedSkillLevel.value,
    years: selectedSkillYears.value,
    lastUsed: selectedSkillLastUsed.value || 'Récemment',
  });

  selectedSkill.value = '';
  selectedSkillLevel.value = '3';
  selectedSkillYears.value = '2-5';
  selectedSkillLastUsed.value = '';
};

const removeSkill = (index) => {
  user.value.skills.splice(index, 1);
};

const addSoftSkill = () => {
  const value = newSoftSkill.value.trim();
  if (!value) return;
  if (!user.value.softSkills.includes(value)) {
    user.value.softSkills.push(value);
  }
  newSoftSkill.value = '';
};

const removeSoftSkill = (index) => {
  user.value.softSkills.splice(index, 1);
};

const addLanguage = () => {
  const language = {
    name: newLanguage.value.name.trim(),
    level: newLanguage.value.level,
  };
  if (!language.name || !language.level) return;
  const exists = user.value.languages.some((lang) => lang.name === language.name);
  if (!exists) {
    user.value.languages.push(language);
  }
  newLanguage.value = { name: '', level: '' };
};

const removeLanguage = (index) => {
  user.value.languages.splice(index, 1);
};

const addFormation = () => {
  const formation = {
    school: newFormation.value.school.trim(),
    degree: newFormation.value.degree.trim(),
    field: newFormation.value.field.trim(),
    mention: newFormation.value.mention.trim(),
    start: newFormation.value.start,
    end: newFormation.value.end,
  };
  if (!formation.school || !formation.degree) return;
  user.value.formations.push(formation);
  newFormation.value = { school: '', degree: '', field: '', mention: '', start: '', end: '' };
};

const removeFormation = (index) => {
  user.value.formations.splice(index, 1);
};

const addCertification = () => {
  const certification = {
    name: newCertification.value.name.trim(),
    issuer: newCertification.value.issuer.trim(),
    date: newCertification.value.date,
    expiry: newCertification.value.expiry,
  };
  if (!certification.name || !certification.issuer) return;
  user.value.certifications.push(certification);
  newCertification.value = { name: '', issuer: '', date: '', expiry: '' };
};

const removeCertification = (index) => {
  user.value.certifications.splice(index, 1);
};

const addProject = () => {
  const project = {
    title: newProject.value.title.trim(),
    tech: newProject.value.tech.trim(),
    link: newProject.value.link.trim(),
    date: newProject.value.date,
    description: newProject.value.description.trim(),
  };
  if (!project.title) return;
  user.value.projects.push(project);
  newProject.value = { title: '', tech: '', link: '', date: '', description: '' };
};

const removeProject = (index) => {
  user.value.projects.splice(index, 1);
};

const addReference = () => {
  const reference = {
    name: newReference.value.name.trim(),
    company: newReference.value.company.trim(),
    role: newReference.value.role.trim(),
    phone: newReference.value.phone.trim(),
    email: newReference.value.email.trim(),
  };
  if (!reference.name || !reference.company) return;
  user.value.references.push(reference);
  newReference.value = { name: '', company: '', role: '', phone: '', email: '' };
};

const removeReference = (index) => {
  user.value.references.splice(index, 1);
};

const addInterest = () => {
  const interest = newInterest.value.trim();
  if (!interest) return;
  if (!user.value.interests.includes(interest)) {
    user.value.interests.push(interest);
  }
  newInterest.value = '';
};

const removeInterest = (index) => {
  user.value.interests.splice(index, 1);
};

const addNetwork = () => {
  const network = {
    name: newNetwork.value.name.trim(),
    url: newNetwork.value.url.trim(),
  };
  if (!network.name || !network.url) return;
  if (!user.value.networks.additional.some((item) => item.name === network.name && item.url === network.url)) {
    user.value.networks.additional.push(network);
  }
  newNetwork.value = { name: '', url: '' };
};

const removeNetwork = (index) => {
  user.value.networks.additional.splice(index, 1);
};

const addCustomField = () => {
  const label = newFieldLabel.value.trim();
  const value = newFieldValue.value.trim();
  if (!label || !value) return;
  user.value.customFields.push({ label, value });
  newFieldLabel.value = '';
  newFieldValue.value = '';
};

const removeCustomField = (index) => {
  user.value.customFields.splice(index, 1);
};

const saveProfile = async () => {
  if (!updateProfile) return;
  saving.value = true;
  await updateProfile({ ...user.value });
  saving.value = false;
};

const onAvatarUpload = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    user.value.avatar = e.target.result;
  };
  reader.readAsDataURL(file);
};

const onDocumentUpload = (key, event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  user.value.documents[key] = file.name;
  if (key === 'cv') {
    user.value.cvName = file.name;
    user.value.cvUpdated = new Date().toLocaleDateString('fr-FR');
  }
};
</script>