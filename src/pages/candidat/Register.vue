<template>
  <div class="min-h-screen w-full flex flex-col justify-center items-center px-4 py-12 select-none">

    <div class="mb-8">
      <span class="text-2xl font-black text-accent tracking-wide">Mosalah</span>
    </div>

    <BaseCard class="w-full max-w-[480px]" density="normal">

      <div class="text-center mb-6">
        <h1 class="text-2xl font-black text-base-content tracking-tight">
          Créer un compte candidat
        </h1>
        <p class="text-xs text-base-content/60 leading-relaxed max-w-[300px] mx-auto mt-1 font-medium">
          Accès gratuit et immédiat aux offres d'emploi
        </p>
      </div>

      <BaseForm @submit="handleSubmit">

        <BaseInput v-model="form.fullName" label="Nom complet" placeholder="Jean Dupont" icon="candidat" required />

        <BaseInput v-model="form.email" label="Email" placeholder="jean.dupont@exemple.com" type="email" icon="mail"
          required />

        <BaseInput v-model="form.password" label="Mot de passe" placeholder="••••••••" type="password" icon="lock"
          required />

        <template #actions>
          <BaseButton :loading ="isLoading" type="submit" variant="accent" class="w-full mt-2 shadow-sm">
            Créer mon compte
          </BaseButton>
        </template>
      </BaseForm>

      <div class="text-center text-xs text-base-content/70 font-semibold mt-6">
        Vous avez déjà un compte ?
        <RouterLink to="/login" class="font-black text-accent hover:underline ml-1">
          Se connecter
        </RouterLink>
      </div>
    </BaseCard>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth';

const route = useRouter()
const form = ref({
  fullName: '',
  email: '',
  password: ''
});
const isLoading = ref(false);
const $auth = useAuth();
const handleSubmit = () => {
  console.log('Inscription Candidat :', form.value);
  isLoading.value = $auth.loading
  $auth.register({
    name: form.value.fullName,
    email: form.value.email,
    password: form.value.password,
    role: 'candidat'
  });

  // route.push('/candidat/dashboard');
};
</script>