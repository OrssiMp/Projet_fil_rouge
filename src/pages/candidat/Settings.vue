<template>
  <div class="max-w-5xl mx-auto space-y-8 animate-fade-in-up">

    <header>
      <h1 class="text-3xl font-black text-base-content">Paramètres de votre compte</h1>
      <p class="text-sm font-semibold text-base-content/60 mt-1">Gérez vos informations, vos préférences et votre
        confidentialité.</p>
    </header>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar de navigation -->
      <aside class="lg:w-64 space-y-1">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all"
          :class="activeTab === tab.id ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-base-200'">
          <i :class="tab.icon"></i> {{ tab.label }}
        </button>
      </aside>

      <!-- Contenu -->
      <main class="flex-1 bg-base-100 p-8 rounded-2xl border border-base-200 shadow-sm">

        <!-- ONGLET : PROFIL & CV -->
        <section v-if="activeTab === 'profile'" class="space-y-6">
          <div class="flex flex-col gap-3">
            <div>
              <h2 class="text-xl font-black mb-1">Mon Profil & CV</h2>
              <p class="text-sm text-base-content/60">Mets à jour ton profil candidat, améliore ta visibilité et gère
                ton CV en un seul endroit.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="form-control">
                <label class="label font-bold text-xs uppercase">Prénom & Nom</label>
                <input type="text" class="input input-bordered w-full" v-model="user.name" />
              </div>
              <div class="form-control">
                <label class="label font-bold text-xs uppercase">Intitulé de poste visé</label>
                <input type="text" class="input input-bordered w-full" v-model="user.title"
                  placeholder="Ex: Développeur Vue.js" />
              </div>
              <div class="form-control">
                <label class="label font-bold text-xs uppercase">Localisation</label>
                <input type="text" class="input input-bordered w-full" v-model="user.location"
                  placeholder="Brazzaville, Congo" />
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

              <div class="form-control">
                <label class="label font-bold text-xs uppercase">Statut de disponibilité</label>
                <div class="flex flex-wrap gap-3">
                  <button type="button" @click="user.availability = 'Disponible'"
                    :class="user.availability === 'Disponible' ? 'btn btn-sm btn-accent text-white' : 'btn btn-sm btn-outline'">Disponible</button>
                  <button type="button" @click="user.availability = 'Bientôt disponible'"
                    :class="user.availability === 'Bientôt disponible' ? 'btn btn-sm btn-accent text-white' : 'btn btn-sm btn-outline'">Bientôt
                    disponible</button>
                  <button type="button" @click="user.availability = 'Occupé'"
                    :class="user.availability === 'Occupé' ? 'btn btn-sm btn-accent text-white' : 'btn btn-sm btn-outline'">Occupé</button>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="form-control">
                <label class="label font-bold text-xs uppercase">Compétences clés</label>
                <div class="flex flex-wrap gap-2">
                  <span v-for="skill in user.skills" :key="skill" class="badge badge-outline badge-sm">{{ skill
                    }}</span>
                </div>
                <input type="text" class="input input-bordered w-full mt-3" v-model="newSkill"
                  placeholder="Ajouter une compétence" @keyup.enter="addSkill" />
                <button type="button" class="btn btn-sm btn-accent mt-2" @click="addSkill">Ajouter compétence</button>
              </div>

              <div class="form-control">
                <label class="label font-bold text-xs uppercase">Résumé de profil</label>
                <textarea class="textarea textarea-bordered w-full h-40" v-model="user.bio"
                  placeholder="Parle rapidement de tes points forts, ton savoir-faire et tes objectifs professionnels..."></textarea>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div class="border border-base-200 rounded-3xl bg-base-100 p-6 shadow-sm">
              <div class="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p class="text-base font-black">Mon CV actuel</p>
                  <p class="text-sm text-base-content/60">{{ user.cvName }}</p>
                </div>
                <span class="badge badge-accent badge-md">Mis à jour le {{ user.cvUpdated }}</span>
              </div>
              <p class="text-sm text-base-content/70 leading-relaxed mb-5">Garde ton CV à jour pour maximiser tes
                chances auprès des recruteurs. Télécharge un fichier PDF récent ou remplace celui en ligne.</p>
              <label class="btn btn-outline btn-sm cursor-pointer inline-flex items-center gap-2">
                <span>Changer de CV</span>
                <input type="file" class="hidden" accept="application/pdf" @change="onCvUpload" />
              </label>
            </div>

            <div class="border border-base-200 rounded-3xl bg-base-100 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 class="text-base font-black mb-3">Conseil CV</h3>
                <ul class="space-y-3 text-sm text-base-content/70 list-disc list-inside">
                  <li>Privilégie un titre clair et une présentation lisible.</li>
                  <li>Mets en avant tes technologies principales.</li>
                  <li>Ajoute un lien vers un portfolio ou un projet significatif.</li>
                </ul>
              </div>
              <button type="button" class="btn btn-accent btn-sm mt-6 w-full text-white">Exporter mon profil en
                PDF</button>
            </div>
          </div>

          <div class="flex justify-end">
            <button type="button" class="btn btn-accent text-white">Enregistrer les modifications</button>
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
import { ref } from 'vue';

const activeTab = ref('profile');

const tabs = [
  { id: 'profile', label: 'Mon Profil & CV', icon: 'fa-solid fa-user' },
  { id: 'privacy', label: 'Confidentialité', icon: 'fa-solid fa-lock' },
  { id: 'alerts', label: 'Alertes Emploi', icon: 'fa-solid fa-bell' },
  { id: 'security', label: 'Sécurité', icon: 'fa-solid fa-shield' },
];

const user = ref({
  name: 'Orsi Mpiere',
  title: 'Développeur Web Junior',
  location: 'Brazzaville, République du Congo',
  email: 'orsi@example.com',
  phone: '+242 00 000 000',
  availability: 'Disponible',
  bio: 'Passionné par les technologies front-end, je construis des interfaces web accessibles, performantes et responsive en utilisant Vue 3, Tailwind et une architecture modulaire.',
  skills: ['Vue.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Git'],
  cvName: 'CV-Orsi-Mpiere.pdf',
  cvUpdated: '04/07/2026',
});
const newSkill = ref('');
const alerts = ref([
  { id: 1, title: 'Développeur Web - Brazzaville', frequency: 'Quotidienne' },
  { id: 2, title: 'Intégrateur Web - Congo', frequency: 'Hebdomadaire' }
]);

const addSkill = () => {
  const skill = newSkill.value.trim();
  if (skill && !user.value.skills.includes(skill)) {
    user.value.skills.push(skill);
    newSkill.value = '';
  }
};

const onCvUpload = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  user.value.cvName = file.name;
  user.value.cvUpdated = new Date().toLocaleDateString('fr-FR');
};
</script>