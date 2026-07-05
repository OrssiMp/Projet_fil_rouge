<template>
  <header
    class="navbar bg-base-100/90 backdrop-blur sticky top-0 z-100 border-b border-base-200 px-4 md:px-12 select-none h-16 shadow">

    <div class="navbar-start">
      <RouterLink to="/" class="text-2xl font-black tracking-tight text-accent">
        Mosalah
      </RouterLink>
    </div>
    <div class="navbar-end gap-3">
      <div class="hidden md:flex items-center gap-6 mr-3">
        <details class="dropdown dropdown-end">
          <summary
            class="btn btn-ghost btn-sm normal-case gap-1 text-base-content/80 font-medium list-none cursor-pointer">
            {{ toggleLabel }}
            <BaseIcon name="chevron-bas" class="text-[10px]" />
          </summary>
          <ul class="p-2 shadow-xl menu dropdown-content z-[1] bg-base-100 border border-base-200 rounded-xl w-52 mt-2">
            <li>
              <router-link :to="toggleLink">
                Accès espace {{ toggleLabel.toLowerCase() }}
              </router-link>
              <router-link to="/entreprises">
                Voir les entreprises
              </router-link>
              <router-link to="/candidats">
                Voir les candidats
              </router-link>
            </li>
          </ul>
        </details>

        <RouterLink to="/offres" class="text-sm font-semibold text-base-content/70 hover:text-accent transition-colors">
          Offres
        </RouterLink>

        <RouterLink to="/about" class="text-sm font-semibold text-base-content/70 hover:text-accent transition-colors">
          À propos
        </RouterLink>
        <RouterLink to="/login" class="text-sm font-semibold text-base-content/70 hover:text-accent transition-colors">
          Connexion
        </RouterLink>
      </div>
      <RouterLink to="/register"
        class="btn btn-accent btn-sm rounded-full px-5 h-9 min-h-0 normal-case font-bold text-xs tracking-wide shadow-md hover:shadow-accent/20 text-white">
        Inscription
      </RouterLink>

      <div class="dropdown dropdown-end md:hidden">
        <div tabindex="0" role="button" class="btn btn-ghost btn-sm btn-square">
          <BaseIcon name="menu" class="text-lg" />
        </div>
        <ul tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 border border-base-200 rounded-2xl w-56 gap-1">
          <li class="menu-title text-[10px] font-bold uppercase tracking-wider text-base-content/40">Navigation</li>
          <li>
            <router-link :to="toggleLink" class="font-medium py-2.5">
              <BaseIcon name="entreprise" class="text-xs opacity-70" />
              Espace {{ toggleLabel }}
            </router-link>
          </li>
          
          <li>
            <router-link to="/about" class="font-medium py-2.5">
              <BaseIcon name="about" class="text-xs opacity-70" />
              À propos
            </router-link>
          </li>
          <li>
            <router-link to="/offres"
              class="text-sm font-semibold text-base-content/70 hover:text-accent transition-colors">
              Offres
            </router-link>
          </li>
          <div class="divider my-1"></div>
          <li>
            <router-link to="/login" class="font-bold text-accent py-2.5">
              <BaseIcon name="chevron-droite" class="text-xs" />
              Connexion
            </router-link>
          </li>
        </ul>
      </div>

    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentRouteName = computed(() => route.name);

const toggleLabel = computed(() => {
  return currentRouteName.value === 'EntrepriseLandingPage' ? 'Candidats' : 'Entreprises';
});

const toggleLink = computed(() => {
  return currentRouteName.value === 'EntrepriseLandingPage' ? '/candidats' : '/entreprise';
});
</script>

<style scoped>
/* Supprime proprement la flèche native de summary pour tous les navigateurs */
summary {
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}
</style>