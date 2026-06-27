<template>
  <div v-if="!currentUser" class="flex items-center justify-center py-20">
    <span class="loading loading-spinner loading-md text-[#006643]"></span>
  </div>

  <div v-else class="space-y-8 select-none font-body-md animate-fade-in">
    
    <div>
      <h1 class="text-2xl font-black text-base-content tracking-tight">
        Bonjour, {{ currentUser.name.split(' ')[0] }} 👋
      </h1>
      <p class="text-xs text-base-content/60 mt-1">
        Voici un aperçu des recrutements en cours pour votre entreprise.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      
      <BaseCard density="normal" class="bg-white border border-base-200">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-[#006643]/10 text-[#006643] flex items-center justify-center text-xl shrink-0">
            <BaseIcon name="offre" />
          </div>
          <div>
            <p class="text-[10px] font-black text-base-content/40 uppercase tracking-wider">Offres Actives</p>
            <p class="text-2xl font-black text-base-content mt-0.5">4</p>
          </div>
        </div>
      </BaseCard>

      <BaseCard density="normal" class="bg-white border border-base-200">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-xl shrink-0">
            <BaseIcon name="candidat" />
          </div>
          <div>
            <p class="text-[10px] font-black text-base-content/40 uppercase tracking-wider">Candidatures</p>
            <p class="text-2xl font-black text-base-content mt-0.5">28</p>
          </div>
        </div>
      </BaseCard>

      <BaseCard density="normal" class="bg-white border border-base-200">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl shrink-0">
            <BaseIcon name="cloche" />
          </div>
          <div>
            <p class="text-[10px] font-black text-base-content/40 uppercase tracking-wider">Entretiens</p>
            <p class="text-2xl font-black text-base-content mt-0.5">3</p>
          </div>
        </div>
      </BaseCard>
      
    </div>

    <BaseCard density="compact" class="bg-white border border-base-200">
      
      <template #header>
        <div class="p-4 border-b border-base-100 flex justify-between items-center w-full">
          <h2 class="font-black text-base-content tracking-tight text-sm sm:text-base">
            Dernières candidatures reçues
          </h2>
          <BaseButton 
            variant="ghost" 
            size="sm" 
            class="text-[#006643] hover:bg-emerald-50 font-bold"
            @click="$router.push('/entreprise/candidats')"
          >
            Voir tout
          </BaseButton>
        </div>
      </template>

      <div class="p-6 text-center text-xs sm:text-sm text-base-content/50 font-medium">
        Aucune nouvelle candidature aujourd'hui. Vos offres d'emploi génèrent du trafic !
      </div>
      
    </BaseCard>

  </div>
</template>

<script setup>
import { useAuth } from '../../composables/useAuth';

// Extraction du profil réactif global
const { currentUser } = useAuth();
</script>