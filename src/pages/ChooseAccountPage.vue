<template>
  <div class="min-h-screen flex flex-col justify-between items-center px-4 py-12 select-none">
    
    <div class="text-center mt-4">
      <span class="text-2xl font-black text-accent tracking-wide">Mosalah</span>
    </div>

    <div class="w-full max-w-4xl mx-auto text-center my-8">
      
      <div class="mb-12">
        <h1 class="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight mb-3">
          Comment voulez-vous utiliser Mosalah ?
        </h1>
        <p class="text-sm md:text-base text-base-content/60">
          Choisissez votre profil pour continuer
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto px-2">
        
        <AccountTypeCard 
          title="Candidat"
          icon="user"
          class="shadow"
          :features="[
            'Rechercher des offres',
            'Postuler à des emplois',
            'Suivre ses candidatures'
          ]"
          @select="handleSelect"
        />

        <AccountTypeCard 
          title="Entreprise"
          icon="office"
          :features="[
            'Publier des offres',
            'Recevoir des candidatures',
            'Recruter des talents'
          ]"
          @select="handleSelect"
        />
        
      </div>

      <p class="text-sm text-base-content/60 mt-12">
        Déjà un compte ? 
        <RouterLink to="/login" class="font-semibold text-emerald-700 hover:underline ml-1">Se connecter</RouterLink>
      </p>
    </div>

    <div class="flex gap-4 text-xs text-base-content/40">
      <a href="#" class="hover:underline">Conditions d'utilisation</a>
      <span>•</span>
      <a href="#" class="hover:underline">Politique de confidentialité</a>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AccountTypeCard from '../components/AccountTypeCard.vue'

const router = useRouter()

const handleSelect = (type) => {
  console.log('Type sélectionné :', type)

  // if (type === 'Entreprise') {
  //   router.push('/register/company')
  // } else if (type === 'Candidat') {
  //   router.push('/register/candidate')
  // }
}
</script>
