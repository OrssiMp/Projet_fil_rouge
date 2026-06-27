<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-100 px-4 py-12 select-none font-body-md">
    
    <BaseHero 
      centered 
      variant="ghost" 
      size="sm"
    >
      <template #title>
        <span class="text-7xl md:text-9xl font-black text-accent opacity-90 animate-pulse">404</span>
      </template>

      <template #subtitle>
        <span class="text-xl md:text-2xl font-black text-base-content tracking-tight mt-4 block">
          Oups! Vous semblez perdu...
        </span>
        <span class="text-sm md:text-base text-base-content/70 mt-2 block leading-relaxed font-medium">
          La page que vous cherchez n’existe pas ou a été déplacée par nos équipes techniques.
        </span>
      </template>

      <template #actions>
        <RouterLink to="/">
          <BaseButton 
            variant="accent" 
            size="md" 
            icon="dashboard"
            class="px-8 shadow-lg hover:shadow-xl mt-6 rounded-xl"
          >
            Retour à l'accueil
          </BaseButton>
        </RouterLink>
      </template>

      <template #visual>
        <div class="mt-12 flex justify-center w-full max-w-lg mx-auto">
          <BaseImage 
            :src="notFoundImage" 
            alt="Équipe technique de Mosalah en style animé réparant un serveur 404" 
            ratio="1/1"
            priority
            rounded="full"
            class="shadow-inner border border-base-200 p-6 bg-base-200/50"
          />
        </div>
      </template>

    </BaseHero>

  </div>
</template>

<script setup>

import notFoundImage from '../../assets/404-repair.png';
</script>