<script setup>
import BaseButton from '../../ui/BaseButton_old.vue';

</script>

<template>
  <BaseHero centered>
    <template #title>
      Recrutez les bons talents <span class="text-accent">plus rapidement</span>
    </template>
    <template #subtitle>
      Publiez vos offres et recevez des candidatures qualifiées en quelques minutes.
    </template>
    <template #actions>
      <BaseButton variant="accent" class="shadow">
        <router-link to="/register/entreprise" class="">
          Publier une offre
        </router-link>
      </BaseButton>
      <BaseButton variant="outline" class="shadow">
        <router-link to="/candidats" class="">
          Découvrir les candidats
        </router-link>
      </BaseButton>
    </template>
  </BaseHero>

</template>