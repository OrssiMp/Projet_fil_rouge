<template>
  <section class="py-20 px-4 bg-[#F4F9F6]/50">
    <div class="max-w-4xl mx-auto">
      <SectionHeader>
        <template #title>Comment ça marche</template>
      </SectionHeader>

      <div class="relative space-y-12">
        <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-emerald-200 hidden md:block"></div>

        <div v-for="(step, index) in steps" :key="index" class="flex gap-8 items-start relative">
          <div class="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xl shrink-0 z-10">
            {{ index + 1 }}
          </div>
          <div class="pt-2">
            <h3 class="text-xl font-bold mb-2">{{ step.title }}</h3>
            <p class="text-base-content/60">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from '../../ui/SectionHeader.vue';

const steps = [
  { title: 'Créer un compte', desc: 'Inscrivez votre entreprise et complétez votre profil recruteur.' },
  { title: 'Publier une offre', desc: 'Détaillez le poste, les compétences requises et le salaire proposé.' },
  { title: 'Recevoir des candidatures', desc: 'Consultez les profils qui correspondent à vos critères.' },
  { title: 'Sélectionner les candidats', desc: 'Échangez, planifiez les entretiens et recrutez vos futurs talents.' }
];
</script>