<template>
  <BaseHero centered>
    <template #title>
      Une <span class="text-accent">plateforme</span> simple pour connecter talents et entreprises localement
    </template>
    <template #subtitle>
      Mosalah est une solution de recrutement conçue pour simplifier la mise en relation entre candidats et recruteurs.
    </template>
    <template #actions>
      <BaseButton variant="accent">
        <router-link to="/register/entreprise" class="">
          Créer un compte
        </router-link>
      </BaseButton>
      <BaseButton variant="outline" class="shadow">
        <router-link to="/register/entreprise">
          Publier une offre
        </router-link>
      </BaseButton>
    </template>
  </BaseHero>
</template>