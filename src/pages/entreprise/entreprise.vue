<template>
  <div class="min-h-screen bg-white">
    
    <EntrepriseHero />

    <EntrepriseFeatures />

    <EntrepriseProcess />

    <EntrepriseDetails />

    <EntrepriseCta />

  </div>
</template>

<script setup>
// Importation propre depuis ton nouveau sous-dossier dédié aux entreprises
import EntrepriseHero from '../../components/entreprise/EntrepriseHero.vue';
import EntrepriseFeatures from '../../components/entreprise/EntrepriseFeatures.vue';
import EntrepriseProcess from '../../components/entreprise/EntrepriseProcess.vue';
import EntrepriseDetails from '../../components/entreprise/EntrepriseDetails.vue';
import EntrepriseCta from '../../components/entreprise/EntrepriseCta.vue';
</script>