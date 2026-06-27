<template>
  <section class="py-20 px-4 bg-white">
    <div class="max-w-6xl mx-auto">
      <SectionHeader>
        <template #title>Pourquoi recruter avec <span class="text-accent">Mosalah</span> ?</template>
      </SectionHeader>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <BaseCard v-for="(item, index) in features" :key="index" class="" density="spacious" data-aos="zoom-in"
          hoverable>
          <template #header>
            <div class="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-xl ">
              <BaseIcon :name="item.icon" />
            </div>
          </template>
          <template #default>
            <h3 class="font-bold text-lg text-base-content">{{ item.title }}</h3>
            <p class="text-sm text-base-content/60 leading-relaxed">{{ item.desc }}</p>
          </template>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from '../../ui/SectionHeader.vue';
const features = [
  { icon: 'zap', title: 'Accès rapide', desc: 'Accédez immédiatement à une base de données de candidats qualifiés.' },
  { icon: 'clock', title: 'Gain de temps', desc: 'Réduisez votre temps de recrutement grâce à nos outils de filtrage.' },
  { icon: 'file-text', title: 'Publication simplifiée', desc: 'Créez et gérez vos offres d\'emploi en quelques clics seulement.' },
  { icon: 'users', title: 'Gestion centralisée', desc: 'Suivez toutes vos candidatures sur une plateforme unique et intuitive.' }
];
</script>