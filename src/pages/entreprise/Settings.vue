<template>
  <div class="max-w-6xl mx-auto space-y-6 animate-fade-in-up">

    <!-- 📋 En-tête -->
    <header class="mb-8">
      <h1 class="text-3xl font-black text-base-content tracking-tight">Paramètres de l'entreprise</h1>
      <p class="text-sm font-semibold text-base-content/60 mt-1">Gérez votre profil employeur, votre équipe et votre
        abonnement.</p>
    </header>

    <div class="flex flex-col md:flex-row gap-8">

      <!-- 🎛️ Navigation des paramètres (Sidebar gauche) -->
      <aside class="md:w-64 shrink-0">
        <nav class="flex flex-col gap-1 sticky top-6">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left" :class="activeTab === tab.id
              ? 'bg-base-200 text-accent border border-base-300/50 shadow-sm'
              : 'text-base-content/60 hover:bg-base-200/50 hover:text-base-content'">
            <BaseIcon :name="tab.icon" class="w-5 text-center" />
            {{ tab.label }}
          </button>
        </nav>
      </aside>

      <!-- 📝 Contenu dynamique des paramètres -->
      <main class="flex-1 space-y-6 min-w-0">

        <!-- ==========================================
             ONGLET 1 : PROFIL DE L'ENTREPRISE
        =========================================== -->
        <section v-if="activeTab === 'profile'" class="space-y-6">

          <!-- Logo -->
          <div class="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
            <h2 class="text-lg font-black text-base-content mb-4">Identité visuelle</h2>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div
                class="w-24 h-24 rounded-2xl bg-base-200 border-2 border-dashed border-base-300 flex items-center justify-center text-base-content/40 hover:text-accent hover:border-accent cursor-pointer transition-colors overflow-hidden group relative shrink-0">
                <img v-if="form.logo" :src="form.logo" class="w-full h-full object-cover" />
                <div v-else class="flex flex-col items-center">
                  <BaseIcon name="cloud-arrow-up" class="text-xl mb-1" />
                  <span class="text-[10px] font-black uppercase">Logo</span>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex gap-2">
                  <button class="btn btn-sm btn-outline btn-accent">Changer le logo</button>
                  <button class="btn btn-sm btn-ghost text-error">Supprimer</button>
                </div>
                <p class="text-xs text-base-content/50 mt-2 font-semibold">Format JPG, PNG ou SVG. Max 2MB. Un logo
                  carré est recommandé.</p>
              </div>
            </div>
          </div>

          <!-- Informations Générales -->
          <div class="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
            <h2 class="text-lg font-black text-base-content mb-6">Informations générales</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="form-control">
                <label class="label text-xs font-black text-base-content/70 uppercase">Nom de l'entreprise *</label>
                <input v-model="form.name" type="text"
                  class="input input-bordered focus:border-accent bg-base-50 font-semibold" />
              </div>
              <div class="form-control">
                <label class="label text-xs font-black text-base-content/70 uppercase">Secteur d'activité *</label>
                <select v-model="form.industry"
                  class="select select-bordered focus:border-accent bg-base-50 font-semibold">
                  <option>Technologie & IT</option>
                  <option>Finance & Banque</option>
                  <option>Construction & BTP</option>
                  <option>Télécommunications</option>
                  <option>Commerce & Distribution</option>
                </select>
              </div>
              <div class="form-control">
                <label class="label text-xs font-black text-base-content/70 uppercase">Année de création</label>
                <input v-model="form.yearFounded" type="number"
                  class="input input-bordered focus:border-accent bg-base-50 font-semibold" placeholder="Ex: 2015" />
              </div>
              <div class="form-control">
                <label class="label text-xs font-black text-base-content/70 uppercase">Taille de l'entreprise *</label>
                <select v-model="form.size" class="select select-bordered focus:border-accent bg-base-50 font-semibold">
                  <option>1-10 employés</option>
                  <option>11-50 employés</option>
                  <option>51-200 employés</option>
                  <option>201+ employés</option>
                </select>
              </div>
              <div class="form-control sm:col-span-2">
                <label class="label text-xs font-black text-base-content/70 uppercase">Description / Présentation
                  *</label>
                <textarea v-model="form.description"
                  class="textarea textarea-bordered focus:border-accent bg-base-50 font-semibold h-24"
                  placeholder="Présentez votre entreprise, votre culture, vos valeurs..."></textarea>
              </div>
            </div>
          </div>

          <!-- Légal, Contact & Réseaux -->
          <div class="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
            <h2 class="text-lg font-black text-base-content mb-6">Contact & Informations Légales</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="form-control sm:col-span-2">
                <label class="label text-xs font-black text-base-content/70 uppercase">Adresse / Siège social *</label>
                <input v-model="form.address" type="text"
                  class="input input-bordered focus:border-accent bg-base-50 font-semibold"
                  placeholder="Ex: Centre-ville, Avenue Foch, Brazzaville" />
              </div>
              <div class="form-control">
                <label class="label text-xs font-black text-base-content/70 uppercase">N° RCCM</label>
                <input v-model="form.rccm" type="text"
                  class="input input-bordered focus:border-accent bg-base-50 font-semibold"
                  placeholder="Numéro du registre du commerce" />
              </div>
              <div class="form-control">
                <label class="label text-xs font-black text-base-content/70 uppercase">N° NIU</label>
                <input v-model="form.niu" type="text"
                  class="input input-bordered focus:border-accent bg-base-50 font-semibold"
                  placeholder="Numéro d'Identification Unique" />
              </div>
              <div class="form-control">
                <label class="label text-xs font-black text-base-content/70 uppercase">Site Web</label>
                <input v-model="form.website" type="url"
                  class="input input-bordered focus:border-accent bg-base-50 font-semibold" placeholder="https://" />
              </div>
              <div class="form-control">
                <label class="label text-xs font-black text-base-content/70 uppercase">Page LinkedIn</label>
                <input v-model="form.linkedin" type="url"
                  class="input input-bordered focus:border-accent bg-base-50 font-semibold"
                  placeholder="https://linkedin.com/company/..." />
              </div>
            </div>
          </div>

          <div class="flex justify-end pt-2">
            <button
              class="btn bg-accent hover:bg-accent/90 text-white border-none px-8 rounded-xl font-bold shadow-lg shadow-accent/20">
              Enregistrer le profil
            </button>
          </div>
        </section>

        <!-- ==========================================
             ONGLET 2 : GESTION D'ÉQUIPE (RBAC)
        =========================================== -->
        <section v-if="activeTab === 'team'" class="space-y-6">
          <div class="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
            <div class="flex justify-between items-start sm:items-center mb-6">
              <div>
                <h2 class="text-lg font-black text-base-content">Membres de l'équipe</h2>
                <p class="text-xs font-semibold text-base-content/60 mt-1">Gérez qui peut publier des offres et voir les
                  candidats.</p>
              </div>
              <button
                class="btn btn-sm bg-base-content text-base-100 hover:bg-accent hover:text-white border-none shrink-0">
                <BaseIcon name="plus" class="mr-2" /> Inviter
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="table w-full">
                <thead>
                  <tr class="bg-base-50 text-base-content/60 uppercase text-[10px] tracking-wider font-black">
                    <th class="py-3">Utilisateur</th>
                    <th>Rôle</th>
                    <th>Dernière connexion</th>
                    <th class="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="member in team" :key="member.id"
                    class="border-b border-base-200/50 hover:bg-base-50 transition-colors">
                    <td class="py-3">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-black text-xs">
                          {{ member.initials }}
                        </div>
                        <div>
                          <p class="text-sm font-bold text-base-content">{{ member.name }}</p>
                          <p class="text-xs font-semibold text-base-content/50">{{ member.email }}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="badge badge-sm font-bold border-none"
                        :class="member.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-base-200 text-base-content/70'">
                        {{ member.role }}
                      </span>
                    </td>
                    <td class="text-xs font-semibold text-base-content/60">{{ member.lastLogin }}</td>
                    <td class="text-right">
                      <button class="btn btn-ghost btn-xs text-base-content/50 hover:text-base-content">
                        <BaseIcon name="ellipsis" class="text-base-content/70" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ==========================================
             ONGLET 3 : FACTURATION (BILLING)
        =========================================== -->
        <section v-if="activeTab === 'billing'" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <!-- Forfait Actuel -->
            <div
              class="bg-gradient-to-br from-base-content to-neutral p-6 rounded-2xl shadow-lg text-base-100 flex flex-col h-full">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-xs font-black uppercase tracking-widest opacity-70">Forfait actuel</h3>
                  <p class="text-2xl font-black mt-1">Standard</p>
                </div>
                <span class="bg-accent text-white text-xs font-black px-2 py-1 rounded-md">Actif</span>
              </div>

              <div class="mt-8 space-y-2 text-sm font-semibold opacity-90 flex-grow">
                <div class="flex justify-between"><span>Offres publiées</span> <span>7 / 15</span></div>
                <div class="w-full bg-base-100/20 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-accent h-full w-[46%]"></div>
                </div>
                <p class="text-[10px] opacity-70 mt-2">Visibilité des offres : 2 semaines</p>
              </div>

              <button @click="activeTab = 'plans'"
                class="btn btn-sm w-full mt-6 bg-base-100 text-base-content hover:bg-accent hover:border-accent hover:text-white border-none font-bold">
                Mettre à niveau l'abonnement
              </button>
            </div>

            <!-- Configuration de paiement Mobile / Carte -->
            <div
              class="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm flex flex-col justify-between h-full">
              <div>
                <h3 class="text-lg font-black text-base-content">Moyen de paiement</h3>
                <p class="text-xs font-semibold text-base-content/60 mt-1 mb-4">Sélectionnez votre mode de règlement par
                  défaut.</p>

                <div class="form-control w-full">
                  <select v-model="paymentMethod"
                    class="select select-bordered w-full font-bold focus:border-accent bg-base-50">
                    <option value="mtn">MTN Mobile Money</option>
                    <option value="airtel">Airtel Money</option>
                    <option value="card">Carte Bancaire (Visa/Mastercard)</option>
                  </select>
                </div>

                <!-- Champs conditionnels selon le moyen -->
                <div v-if="paymentMethod === 'mtn' || paymentMethod === 'airtel'" class="mt-3">
                  <input type="text" placeholder="Numéro de téléphone"
                    class="input input-bordered input-sm w-full bg-base-50 font-semibold" />
                </div>
              </div>
              <button class="btn btn-sm btn-outline text-xs mt-6 self-start">Enregistrer le paiement</button>
            </div>
          </div>

          <!-- Historique des factures -->
          <div class="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
            <h2 class="text-lg font-black text-base-content mb-4">Historique des factures</h2>
            <div class="space-y-2">
              <div v-for="invoice in invoices" :key="invoice.id"
                class="flex justify-between items-center p-3 hover:bg-base-50 rounded-xl transition-colors border border-transparent hover:border-base-200">
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center text-base-content/60">
                    <BaseIcon name="invoice" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-base-content">{{ invoice.date }}</p>
                    <p class="text-xs font-semibold text-base-content/50">{{ invoice.plan }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <span class="text-sm font-black text-base-content">{{ invoice.amount }}</span>
                  <button class="btn btn-ghost btn-xs text-accent hover:bg-accent/10">
                    <BaseIcon name="download" class="mr-2" /> PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ==========================================
             ONGLET 4 : NOS ABONNEMENTS (PLANS)
        =========================================== -->
        <section v-if="activeTab === 'plans'" class="space-y-6">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-black text-base-content">Choisissez l'offre qui vous correspond</h2>
            <p class="text-sm font-semibold text-base-content/60 mt-2">Augmentez votre visibilité et recrutez les
              meilleurs talents plus rapidement.</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <!-- Plan Free -->
            <div class="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm flex flex-col">
              <h3 class="text-lg font-black text-base-content">Découverte (Free)</h3>
              <p class="text-xs text-base-content/60 font-semibold mt-1">Pour les TPE et besoins ponctuels.</p>
              <div class="my-6">
                <span class="text-3xl font-black text-base-content">0 FCFA</span>
                <span class="text-xs font-bold text-base-content/50">/mois</span>
              </div>
              <ul class="space-y-3 mb-8 flex-1 text-sm font-semibold text-base-content/80">
                <li class="flex items-center gap-2">
                  <BaseIcon name="check" class="text-emerald-500" /> Jusqu'à 8 offres publiées
                </li>
                <li class="flex items-center gap-2">
                  <BaseIcon name="check" class="text-emerald-500" /> Visibilité (Recommandation) : 2 jours
                </li>
                <li class="flex items-center gap-2">
                  <BaseIcon name="check" class="text-emerald-500" /> Profil entreprise basique
                </li>
              </ul>
              <button class="btn btn-outline w-full font-bold">Passer en Free</button>
            </div>

            <!-- Plan Standard (Actuel) -->
            <div
              class="bg-base-100 p-6 rounded-2xl border-2 border-accent shadow-md flex flex-col relative transform lg:-translate-y-2">
              <div
                class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                Forfait Actuel
              </div>
              <h3 class="text-lg font-black text-base-content">Standard</h3>
              <p class="text-xs text-base-content/60 font-semibold mt-1">Idéal pour les PME en croissance.</p>
              <div class="my-6">
                <span class="text-3xl font-black text-base-content">15 000 FCFA</span>
                <span class="text-xs font-bold text-base-content/50">/mois</span>
              </div>
              <ul class="space-y-3 mb-8 flex-1 text-sm font-semibold text-base-content/80">
                <li class="flex items-center gap-2">
                  <BaseIcon name="check" class="text-accent" /> Jusqu'à 15 offres publiées
                </li>
                <li class="flex items-center gap-2">
                  <BaseIcon name="check" class="text-accent" /> Visibilité (Recommandation) : 2 semaines
                </li>
                <li class="flex items-center gap-2">
                  <BaseIcon name="check" class="text-accent" /> Recherche dans la CVthèque
                </li>
                <li class="flex items-center gap-2">
                  <BaseIcon name="check" class="text-accent" /> Profil entreprise complet
                </li>
              </ul>
              <button
                class="btn bg-accent/10 text-accent border-none hover:bg-accent/20 w-full font-bold pointer-events-none">Actif</button>
            </div>

            <!-- Plan Pro -->
            <div class="bg-base-content text-base-100 p-6 rounded-2xl shadow-lg flex flex-col">
              <h3 class="text-lg font-black">Pro / Premium</h3>
              <p class="text-xs text-base-100/60 font-semibold mt-1">Pour les grandes entreprises et cabinets RH.</p>
              <div class="my-6">
                <span class="text-3xl font-black">45 000 FCFA</span>
                <span class="text-xs font-bold text-base-100/50">/mois</span>
              </div>
              <ul class="space-y-3 mb-8 flex-1 text-sm font-semibold text-base-100/80">
                <li class="flex items-center gap-2">
                  <BaseIcon name="check" class="text-emerald-400" /> Offres en ligne illimitées
                </li>
                <li class="flex items-center gap-2">
                  <BaseIcon name="check" class="text-emerald-400" /> Visibilité (Recommandation) : 1 mois
                </li>
                <li class="flex items-center gap-2">
                  <BaseIcon name="check" class="text-emerald-400" /> Accès complet aux profils candidats
                </li>
                <li class="flex items-center gap-2">
                  <BaseIcon name="check" class="text-emerald-400" /> Support prioritaire
                </li>
              </ul>
              <button class="btn bg-accent hover:bg-accent/90 border-none text-white w-full font-bold">Mettre à niveau
                (Pro)</button>
            </div>

          </div>
        </section>

        <!-- ==========================================
             ONGLET 5 : SÉCURITÉ
        =========================================== -->
        <section v-if="activeTab === 'security'" class="space-y-6">
          <div class="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
            <h2 class="text-lg font-black text-base-content mb-6">Mot de passe</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="form-control">
                <label class="label text-xs font-black text-base-content/70 uppercase">Mot de passe actuel</label>
                <input type="password" class="input input-bordered focus:border-accent bg-base-50" />
              </div>
              <div class="form-control">
                <label class="label text-xs font-black text-base-content/70 uppercase">Nouveau mot de passe</label>
                <input type="password" class="input input-bordered focus:border-accent bg-base-50" />
              </div>
            </div>
            <button class="btn btn-sm btn-neutral mt-4 font-bold">Mettre à jour le mot de passe</button>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 🧭 Gestion de la navigation
const tabs = [
  { id: 'profile', label: 'Profil de l\'entreprise', icon: 'office' },
  { id: 'team', label: 'Équipe & Accès', icon: 'users-gear' },
  { id: 'billing', label: 'Facturation', icon: 'file-invoice-dollar' },
  { id: 'plans', label: 'Abonnements', icon: 'rocket' },
  { id: 'security', label: 'Sécurité', icon: 'shield-halved' },
];

const activeTab = ref('profile');

// 💳 Mode de paiement par défaut
const paymentMethod = ref('mtn'); // mtn, airtel, card

// 📦 Données réactives (Formulaire profil)
const form = reactive({
  name: 'TechSoft Congo',
  logo: null,
  industry: 'Technologie & IT',
  size: '11-50 employés',
  yearFounded: '2022',
  address: 'Centre-ville, Brazzaville',
  rccm: 'CG-BZV-01-2022-B12-0000',
  niu: 'M000000000000',
  website: 'https://techsoft.cg',
  linkedin: 'https://linkedin.com/company/techsoft-cg',
  description: 'Leader dans le développement de solutions web sur mesure.'
});

// 👥 Données simulées (Équipe)
const team = ref([
  { id: 1, name: 'Orsi Mpiere', email: 'orsi@techsoft.cg', initials: 'OM', role: 'Admin', lastLogin: 'Il y a 2 heures' },
  { id: 2, name: 'Aicha T.', email: 'aicha.rh@techsoft.cg', initials: 'AT', role: 'Recruteur', lastLogin: 'Hier' },
]);

// 🧾 Données simulées (Factures)
const invoices = ref([
  { id: 'INV-2026-06', date: '01 Juin 2026', plan: 'Abonnement Standard', amount: '15,000 FCFA' },
  { id: 'INV-2026-05', date: '01 Mai 2026', plan: 'Abonnement Standard', amount: '15,000 FCFA' },
]);
</script>