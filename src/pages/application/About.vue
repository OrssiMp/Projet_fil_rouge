<template>
  <div class="max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col gap-20 md:gap-28">

    <AboutHero />

    <AboutProblem />

    <AboutSolution />

    <AboutVision />
    <BaseHero centered>
      <template #title>
        Prêt à rejoindre Mosalah ?
      </template>
      <template #subtitle>
        Que vous soyez candidat ou entreprise, commencez simplement en quelques minutes.
      </template>
      <template #actions>
        <BaseButton variant="accent">
          <router-link to="/register/entreprise" class="">Créer un compte</router-link>
        </BaseButton>
        <BaseButton variant="outline" class="shadow">
          <router-link to="/register/entreprise" class="">Publier une offre</router-link>
        </BaseButton>
      </template>
    </BaseHero>
  </div>
</template>

<script setup>
import PublicLayout from '../../layouts/PublicLayout.vue';
import AboutHero from '../../components/about/AboutHero.vue';
import AboutProblem from '../../components/about/AboutProblem.vue';
import AboutSolution from '../../components/about/AboutSolution.vue';
import AboutVision from '../../components/about/AboutVision.vue';
</script>