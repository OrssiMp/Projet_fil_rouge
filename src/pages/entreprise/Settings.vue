<template>
  <div class="p-4 md:p-6 w-full max-w-7xl mx-auto text-left select-none" data-aos="fade-up">
    
    <header class="mb-8">
      <h1 class="text-3xl font-black text-base-content tracking-tight mb-1">Paramètres du compte</h1>
      <p class="text-sm text-base-content/60 font-medium">Gérez vos informations personnelles, la sécurité de votre compte et vos préférences de notification.</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 items-start">
      
      <div class="lg:col-span-2 xl:col-span-3 flex flex-col gap-6 md:gap-8">
        
        <BaseCard class="bg-white border border-base-200 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
          <h2 class="text-xl font-black text-base-content tracking-tight mb-4 flex items-center gap-2">
            <span class="text-emerald-500 text-lg">👤</span> Profil
          </h2>
          <div class="h-[1px] bg-base-200 w-full mb-6"></div>

          <BaseForm @submit="handleUpdateProfile" class="flex flex-col gap-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput v-model="profileForm.fullName" label="Nom complet" placeholder="Jean Dupont" />
              <BaseInput v-model="profileForm.email" type="email" label="Email Professionnel" placeholder="jean.dupont@entreprise.com" />
            </div>
            
            <div class="w-full">
              <BaseInput v-model="profileForm.phone" label="Téléphone de bureau" placeholder="+33 1 23 45 67 89" />
            </div>

            <div class="flex justify-end mt-2">
              <button type="submit" class="btn bg-emerald-500 hover:bg-emerald-600 border-none text-white font-bold rounded-xl px-5 text-xs md:text-sm shadow-sm h-11">
                Mettre à jour le profil
              </button>
            </div>
          </BaseForm>
        </BaseCard>

        <BaseCard class="bg-white border border-base-200 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
          <h2 class="text-xl font-black text-base-content tracking-tight mb-4 flex items-center gap-2">
            <span class="text-emerald-500 text-lg">🔐</span> Sécurité
          </h2>
          <div class="h-[1px] bg-base-200 w-full mb-4"></div>

          <div class="flex flex-col gap-2">
            <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-3 py-4 border-b border-base-200 text-left">
              <div class="flex flex-col gap-0.5">
                <h3 class="text-sm font-bold text-base-content tracking-wide">Mot de passe</h3>
                <p class="text-xs text-base-content/50 font-medium">Dernière modification il y a 3 mois</p>
              </div>
              <button type="button" @click="triggerPasswordChange" class="btn btn-sm bg-white hover:bg-base-100 border border-base-300 text-base-content font-bold rounded-xl px-4 text-xs self-start sm:self-auto h-9">
                Changer le mot de passe
              </button>
            </div>

            <div class="flex justify-between items-center py-4 border-b border-base-200 text-left">
              <div class="flex flex-col gap-0.5 pr-4">
                <h3 class="text-sm font-bold text-base-content tracking-wide">Double authentification (2FA)</h3>
                <p class="text-xs text-base-content/50 font-medium">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
              </div>
              <input 
                v-model="securityForm.twoFactor" 
                type="checkbox" 
                class="toggle toggle-emerald [--tglbg:white] checked:bg-emerald-500 checked:border-emerald-500 bg-base-300 border-base-300 transition-all duration-200 shrink-0" 
              />
            </div>

            <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-3 py-4 text-left">
              <div class="flex flex-col gap-0.5">
                <h3 class="text-sm font-bold text-base-content tracking-wide">Sessions actives</h3>
                <p class="text-xs text-base-content/50 font-medium">Déconnectez-vous de tous les autres appareils connectés.</p>
              </div>
              <button type="button" @click="handleDisconnectDevices" class="btn btn-sm bg-white hover:bg-base-100 border border-base-300 text-base-content font-bold rounded-xl px-4 text-xs flex items-center gap-1.5 self-start sm:self-auto h-9">
                <span>💻</span> Déconnecter
              </button>
            </div>
          </div>
        </BaseCard>
      </div>

      <div class="lg:col-span-1 xl:col-span-1 flex flex-col gap-6 md:gap-8 w-full">
        
        <BaseCard class="bg-white border border-base-200 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] w-full">
          <h2 class="text-xl font-black text-base-content tracking-tight mb-4 flex items-center gap-2">
            <span class="text-emerald-500 text-lg">🔔</span> Préférences
          </h2>
          <div class="h-[1px] bg-base-200 w-full mb-4"></div>

          <div class="flex flex-col gap-5">
            <div class="flex justify-between items-start w-full text-left gap-4">
              <div class="flex flex-col gap-0.5">
                <h3 class="text-xs md:text-sm font-bold text-base-content tracking-wide">Candidatures</h3>
                <p class="text-[11px] text-base-content/50 font-medium leading-relaxed">Alertes emails lors d'une nouvelle postulation.</p>
              </div>
              <input 
                v-model="preferencesForm.notifyApplications" 
                type="checkbox" 
                class="toggle toggle-emerald [--tglbg:white] checked:bg-emerald-500 checked:border-emerald-500 bg-base-300 border-base-300 transition-all duration-200 shrink-0 mt-0.5" 
              />
            </div>

            <div class="flex justify-between items-start w-full text-left gap-4">
              <div class="flex flex-col gap-0.5">
                <h3 class="text-xs md:text-sm font-bold text-base-content tracking-wide">Rapports</h3>
                <p class="text-[11px] text-base-content/50 font-medium leading-relaxed">Résumé complet de vos annonces chaque lundi.</p>
              </div>
              <input 
                v-model="preferencesForm.weeklyReports" 
                type="checkbox" 
                class="toggle toggle-emerald [--tglbg:white] checked:bg-emerald-500 checked:border-emerald-500 bg-base-300 border-base-300 transition-all duration-200 shrink-0 mt-0.5" 
              />
            </div>
          </div>
        </BaseCard>

        <div class="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 flex flex-col gap-3 w-full text-left">
          <h2 class="text-sm font-black text-rose-800 tracking-wide uppercase flex items-center gap-1.5">
            ⚠️ Zone de Danger
          </h2>
          <p class="text-xs text-base-content/70 font-medium leading-relaxed">
            Une fois votre compte entreprise supprimé, toutes vos offres d'emploi, candidatures et données associées seront définitivement effacées.
          </p>
          <button @click="handleDeleteAccount" type="button" class="btn btn-sm bg-rose-600 hover:bg-rose-700 border-none text-white font-bold rounded-xl w-full h-10 mt-1 shadow-sm text-xs flex items-center justify-center gap-1">
            ❌ Supprimer le compte entreprise
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useAuth } from '../../composables/useAuth';

const { currentUser: { value: { name, email } } } = useAuth()
// État du formulaire Profil
const profileForm = reactive({
  fullName: name,
  email: email,
  phone: '+242 123 45 67'
});

// État de la sécurité (Toggles & Actions)
const securityForm = reactive({
  twoFactor: false
});

// État des préférences de notifications
const preferencesForm = reactive({
  notifyApplications: true,
  weeklyReports: false
});

// Fonctions d'exécution de ton dashboard
const handleUpdateProfile = () => {
  console.log("Données du profil envoyées au serveur :", profileForm);
};

const triggerPasswordChange = () => {
  console.log("Ouverture de la modal de changement de mot de passe");
};

const handleDisconnectDevices = () => {
  console.log("Révocation des tokens d'accès sur les autres machines");
};

const handleDeleteAccount = () => {
  console.warn("Lancement de la procédure de suppression irréversible");
};
</script>