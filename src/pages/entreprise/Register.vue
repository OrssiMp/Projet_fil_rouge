<template>
  <div class="min-h-screen bg-[#f4f9f6] w-full flex flex-col justify-center items-center px-4 py-12 select-none">

    <div class="mb-8">
      <span class="text-2xl font-black text-accent tracking-wide">Mosalah</span>
    </div>

    <BaseCard class="w-full max-w-md overflow-hidden" density="none">
      
      <div class="p-8 pb-4 text-center">
        <h1 class="text-2xl font-black text-base-content tracking-tight mb-2">
          Créer un compte entreprise
        </h1>
        <p class="text-xs md:text-sm text-base-content/60 leading-relaxed max-w-[280px] mx-auto font-medium">
          Publiez des offres et recevez des candidatures rapidement
        </p>
      </div>

      <BaseForm 
        :error="error" 
        :success="success" 
        @submit="handleSubmit" 
        class="p-8 pt-2"
      >
        <BaseInput 
          v-model="form.companyName" 
          label="Nom de l'entreprise" 
          placeholder="Acme Corp" 
          icon="entreprise" 
          required
        />

        <BaseInput 
          v-model="form.email" 
          label="Email professionnel" 
          placeholder="vous@entreprise.com" 
          type="email"
          icon="mail" 
          required
        />

        <BaseInput 
          v-model="form.password" 
          label="Mot de passe" 
          placeholder="••••••••" 
          type="password" 
          icon="lock" 
          required
        />

        <template #actions>
          <BaseButton 
            type="submit" 
            variant="accent" 
            icon="plus"
            class="w-full shadow-md mt-2"
            :loading="loading"
          >
            Créer mon compte
          </BaseButton>
        </template>
      </BaseForm>

      <div class="bg-emerald-50/60 px-8 py-5 text-center text-xs md:text-sm border-t border-base-200/60 font-medium">
        <span class="text-base-content/70">Vous avez déjà un compte ? </span>
        <RouterLink to="/login" class="font-bold text-emerald-700 hover:underline ml-0.5">
          Se connecter
        </RouterLink>
      </div>
    </BaseCard>

    <div class="flex gap-4 mt-6 text-xs text-base-content/50 font-semibold">
      <a href="#" class="hover:underline hover:text-base-content transition-colors">Conditions d'utilisation</a>
      <span>•</span>
      <a href="#" class="hover:underline hover:text-base-content transition-colors">Politique de confidentialité</a>
    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useAuth } from '../../composables/useAuth.js';

// 🔌 Importation des états réactifs et de la logique d'inscription du hook
const { register, loading, error, success } = useAuth();

const form = reactive({
  companyName: '',
  email: '',
  password: ''
});

/**
 * Gère la soumission du formulaire et appelle l'action d'inscription
 */
const handleSubmit = async () => {
  console.log('[Mosalah] Inscription entreprise lancée pour :', form.companyName);
  
  // Utilisation de la méthode de notre hook avec le rôle fixé sur 'entreprise'
  await register({
    name: form.companyName,
    email: form.email,
    password: form.password,
    role: 'entreprise'
  });
};
</script>