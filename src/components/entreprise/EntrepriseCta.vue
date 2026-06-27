<script setup>
import BaseButton from '../../ui/BaseButton_old.vue';

</script>

<template>
  <section class="py-20 px-4">
    <div class="max-w-5xl mx-auto bg-accent rounded-3xl p-12 text-center text-white relative overflow-hidden space-y-4">
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
      <h2 class="text-3xl md:text-5xl font-black mb-6">Prêt à recruter plus efficacement ?</h2>
      <p class="text-emerald-100 mb-10lo max-w-xl mx-auto">
        Créez votre compte entreprise et publiez vos premières offres dès aujourd'hui.
      </p>
      <BaseButton class="bg-white text-accent border-none px-12 font-bold hover:bg-emerald-50">
        <router-link to="register/entreprise">
          Créer un compte entreprise
        </router-link>
      </BaseButton>
    </div>
  </section>
</template>