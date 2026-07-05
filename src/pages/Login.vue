<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-200/50 px-4 py-12 select-none w-full">

    <BaseCard class="w-full max-w-md" density="normal">

      <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl mb-8 grid grid-cols-2">
        <button type="button" class="tab rounded-xl text-xs font-bold transition-all duration-200 h-9"
          :class="userType === 'candidat' ? 'bg-white text-emerald-600 shadow-sm' : 'text-base-content/60'"
          @click="changeUserType('candidat')">
          <BaseIcon name="candidat" class="text-xs mr-2" />
          Candidat
        </button>

        <button type="button" class="tab rounded-xl text-xs font-bold transition-all duration-200 h-9"
          :class="userType === 'entreprise' ? 'bg-white text-emerald-700 shadow-sm' : 'text-base-content/60'"
          @click="changeUserType('entreprise')">
          <BaseIcon name="entreprise" class="text-xs mr-2" />
          Entreprise
        </button>
      </div>

      <div class="text-center mb-6">
        <h2 class="text-xl font-black text-base-content tracking-tight">Ravi de vous revoir !</h2>
        <p class="text-xs text-base-content/60 mt-1 font-medium">
          Accédez à votre espace {{ userType === 'entreprise' ? 'recruteur' : 'candidat' }} Mosalah
        </p>
      </div>

      <BaseForm :error="error" :success="success" @submit="handleSubmit">
        <BaseInput v-model="form.email" type="email" label="Adresse Email" placeholder="exemple@mosalah.cg" icon="mail"
          required />

        <div class="relative">
          <BaseInput v-model="form.password" type="password" label="Mot de passe" placeholder="••••••••" icon="lock"
            required />
          <a class="text-xs font-bold text-accent hover:underline absolute right-1 top-1">
            Mot de passe oublié ?
          </a>
        </div>

        <template #actions>
          <BaseButton type="submit" :variant="userType === 'entreprise' ? 'primary' : 'accent'" icon="chevron-droite"
            :loading="loading" class="w-full shadow-md">
      Se connecter en tant {{userType === 'entreprise' ? 'qu\'entreprise' : 'que candidat'}}
          </BaseButton>
        </template>
      </BaseForm>

      <div class="divider my-6 text-[10px] font-black text-base-content/30 uppercase tracking-widest">ou</div>

      <div class="text-center text-xs text-base-content/70 font-semibold">
        Pas encore de compte ?
        <RouterLink to="/register" class="font-black text-accent hover:underline ml-1">
          Inscrivez-vous gratuitement
        </RouterLink>
      </div>

    </BaseCard>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuth } from '../composables/useAuth';

const userType = ref('candidat');

// 🔌 Importation des méthodes et états réactifs du hook useAuth
const { login, loading, error, success, currentUser, logout } = useAuth();

const form = reactive({
  email: '',
  password: ''
});

/**
 * Nettoie les messages d'erreurs ou de succès lors du changement d'onglet
 * @param {'candidat'|'entreprise'} type
 */
const changeUserType = (type) => {
  userType.value = type;
  error.value = null;
  success.value = null;
};

/**
 * Soumission du formulaire et traitement d'authentification
 */
const handleSubmit = async () => {
  console.log(`[Mosalah] Tentative de connexion ${userType.value.toUpperCase()}`);

  // Appel de la méthode de connexion locale du hook
  await login(form.email, form.password);

  // Vérification de sécurité sur le rôle
  if (currentUser.value) {
    if (currentUser.value.role !== userType.value) {
      // Si le rôle ne correspond pas à l'onglet sélectionné, on force le logout et on lève une erreur
      const rolesExplications = currentUser.value.role === 'entreprise'
        ? "Aucun compte Candidat trouver avec ces identifiants."
        : "Aucun compte Recruteur trouver avec ces identifiants.";

      success.value = null;
      error.value = `Accès refusé. ${rolesExplications}`;
      logout(
        /**
         * 
         * @description valeur de rédirection true - home , false - login
        */
        false
      );
    }
  }
};
</script>