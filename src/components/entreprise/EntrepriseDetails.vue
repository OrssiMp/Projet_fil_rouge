<script setup lang="ts">
import SectionHeader from '../../ui/SectionHeader.vue';

</script>

<template>
  <section class="py-20 px-4 bg-white overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <SectionHeader>
        <template #title>Une plateforme pensée pour les recruteurs</template>
      </SectionHeader>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h3 class="text-2xl font-bold mb-4 italic">Interface simple et rapide</h3>
          <p class="text-base-content/60">Une ergonomie pensée pour vous faire gagner du temps. Concentrez-vous sur l'essentiel : trouver les bons profils.</p>
        </div>
        <div class="relative">
          <div class="bg-emerald-100 rounded-2xl p-4 rotate-3">
             <!-- <img src="/src/assets/screen-1.png" class="rounded-xl shadow-lg -rotate-3 transition-transform hover:rotate-0 duration-500" /> -->
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="order-2 lg:order-1 relative">
          <div class="bg-emerald-100 rounded-2xl p-4 -rotate-3">
             <!-- <img src="/src/assets/screen-2.png" class="rounded-xl shadow-lg rotate-3 transition-transform hover:rotate-0 duration-500" /> -->
          </div>
        </div>
        <div class="order-1 lg:order-2">
          <h3 class="text-2xl font-bold mb-4 italic">Publication en quelques minutes</h3>
          <p class="text-base-content/60">Nos formulaires sont optimisés pour publier une annonce le plus rapidement possible sans perdre en qualité.</p>
        </div>
      </div>
    </div>
  </section>
</template>