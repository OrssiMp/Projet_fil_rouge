<template>
  <div class="p-6 max-w-6xl mx-auto text-left select-none" data-aos="fade-up">

    <div class="mb-8">
      <h1 class="text-3xl font-black text-base-content tracking-tight mb-1">Paramètres</h1>
      <p class="text-sm text-base-content/60 font-medium">Gérez les informations de votre profil, la sécurité et vos
        préférences.</p>
    </div>

    <div class="flex flex-col gap-8">

      <BaseCard class="bg-white border border-base-200 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <h2 class="text-xl font-black text-base-content tracking-tight mb-4">Profil</h2>
        <div class="h-[1px] bg-base-200 w-full mb-6"></div>

        <BaseForm @submit="handleUpdateProfile" class="flex flex-col gap-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput v-model="profileForm.fullName" label="Nom complet" placeholder="Jean Dupont" />
            <BaseInput v-model="profileForm.email" type="email" label="Email" placeholder="jean.dupont@example.com" />
          </div>

          <div class="w-full">
            <BaseInput v-model="profileForm.phone" label="Téléphone (Optionnel)" placeholder="+33 6 12 34 56 78" />
          </div>

          <div class="flex justify-end mt-2">
            <button type="submit"
              class="btn bg-emerald-800 hover:bg-emerald-900 border-none text-white font-bold rounded-xl px-5 text-xs md:text-sm shadow-sm">
              Enregistrer les modifications
            </button>
          </div>
        </BaseForm>
      </BaseCard>

      <BaseCard class="bg-white border border-base-200 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <h2 class="text-xl font-black text-base-content tracking-tight mb-4">Sécurité</h2>
        <div class="h-[1px] bg-base-200 w-full mb-6"></div>

        <BaseForm @submit="handleUpdatePassword" class="flex flex-col gap-4 mb-8">
          <h3 class="text-sm font-black text-base-content tracking-wide">Changer le mot de passe</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput v-model="securityForm.currentPassword" type="password" label="Mot de passe actuel"
              placeholder="••••••••" />
            <BaseInput v-model="securityForm.newPassword" type="password" label="Nouveau mot de passe"
              placeholder="••••••••" />
          </div>

          <div class="flex justify-start mt-1">
            <button type="submit"
              class="btn btn-sm bg-white hover:bg-base-200 border border-base-300 text-base-content font-bold rounded-lg px-4 text-xs">
              Mettre à jour le mot de passe
            </button>
          </div>
        </BaseForm>

        <div class="h-[1px] bg-base-200 w-full mb-6"></div>

        <div class="flex flex-col gap-4 text-left">
          <div>
            <h3 class="text-sm font-black text-base-content tracking-wide mb-1">Sessions actives</h3>
            <p class="text-xs text-base-content/60 font-medium">Si vous remarquez une activité suspecte, vous pouvez
              vous déconnecter de tous les autres appareils.</p>
          </div>

          <div class="flex justify-start">
            <button @click="handleDisconnectDevices"
              class="btn btn-sm bg-white hover:bg-base-200 border border-base-300 text-base-content font-bold rounded-lg px-4 text-xs flex items-center gap-2">
              💻 Déconnecter de tous les appareils
            </button>
          </div>
        </div>
      </BaseCard>

      <BaseCard class="bg-white border border-base-200 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <h2 class="text-xl font-black text-base-content tracking-tight mb-4">Préférences</h2>
        <div class="h-[1px] bg-base-200 w-full mb-5"></div>

        <div class="flex justify-between items-center w-full text-left">
          <div class="flex flex-col gap-0.5">
            <h3 class="text-sm font-black text-base-content tracking-wide">Notifications Push</h3>
            <p class="text-xs text-base-content/60 font-medium">Recevez des alertes pour les nouvelles offres et
              messages.</p>
          </div>

          <input v-model="preferencesForm.pushNotifications" type="checkbox"
            class="toggle toggle-primary [--tglbg:white] checked:bg-blue-600 checked:border-blue-600 bg-base-300 border-base-300 transition-all duration-200" />
        </div>
      </BaseCard>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useAuth } from '../../composables/useAuth';

const { currentUser: { value: { name, email } } } = useAuth()

// Formulaire 1 : Informations du Profil
const profileForm = reactive({
  fullName: name,
  email: email,
  phone: '+242 612 34 56'
});

// Formulaire 2 : Sécurité / Mots de passe
const securityForm = reactive({
  currentPassword: '',
  newPassword: ''
});

// Formulaire 3 : Préférences (Toggle Notifications)
const preferencesForm = reactive({
  pushNotifications: true
});

// Méthodes d'actions
const handleUpdateProfile = () => {
  console.log("Mise à jour des informations de profil :", profileForm);
};

const handleUpdatePassword = () => {
  console.log("Demande de changement de mot de passe envoyée");
  securityForm.currentPassword = '';
  securityForm.newPassword = '';
};

const handleDisconnectDevices = () => {
  console.log("Déconnexion globale des autres sessions exécutée");
};
</script>