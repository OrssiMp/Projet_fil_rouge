<template>
  <div class="drawer lg:drawer-open min-h-screen bg-base-200 text-base-content font-body-md select-none">
    <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col min-w-0">
      
      <!-- HEADER / BARRE SUPÉRIEURE -->
      <header class="navbar bg-base-100 border-b border-base-300 h-16 sticky top-0 z-40 px-4 md:px-8 justify-between">
        <div class="flex-none lg:hidden">
          <label for="dashboard-drawer" class="btn btn-square btn-ghost drawer-button">
            <BaseIcon name="hamburger" class="text-xl" />
          </label>
        </div>

        <div class="flex-1 lg:hidden pl-2">
          <span class="text-xl font-black text-[#006643]">Mosalah</span>
          <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
        </div>

        <div class="hidden lg:block font-bold text-lg text-base-content/80">
          Espace Recruteur
        </div>

        <div class="flex-none gap-4">
          <button class="btn btn-ghost btn-circle btn-sm relative">
            <BaseIcon name="cloche" class="text-lg text-base-content/70" />
            <span class="badge badge-xs badge-accent absolute top-1 right-1"></span>
          </button>

          <!-- DROPDOWN MON COMPTE -->
          <div class="dropdown dropdown-end" v-if="currentUser">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar btn-sm border border-base-300">
              <div class="w-8 h-8 rounded-full overflow-hidden bg-base-300 flex items-center justify-center">
                <img v-if="currentUser.avatar" :src="currentUser.avatar" alt="Logo" class="object-cover w-full h-full" />
                <BaseIcon v-else name="user" class="text-base-content/60 text-xs" />
              </div>
            </div>
            <ul tabindex="0"
              class="mt-3 z-[50] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 border border-base-200 rounded-xl w-52">
              <li><router-link to="/entreprise/settings">Mon Compte</router-link></li>
              <div class="divider my-1"></div>
              <li>
                <button @click="logout" class="text-error font-semibold">Déconnexion</button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <!-- EMPLACEMENT DE LA PAGE INTERNE -->
      <main class="flex-1 p-4 md:p-8 overflow-y-auto max-w-[1600px] w-full mx-auto">
        <slot />
      </main>
    </div>

    <!-- SIDEBAR DE NAVIGATION -->
    <div class="drawer-side z-[50]">
      <label for="dashboard-drawer" aria-label="close sidebar" class="drawer-overlay"></label>

      <aside class="bg-base-100 border-r border-base-300 w-64 min-h-screen flex flex-col justify-between">
        <div>
          <div class="h-16 flex items-center px-6 border-b border-base-200">
            <router-link to="/" class="text-2xl font-black tracking-tight text-[#006643]">
              Mosalah
            </router-link>
            
            <span class="badge badge-sm badge-accent ml-2 font-bold text-[10px]">PRO</span>
          </div>

          <ul class="menu p-4 gap-1.5 text-sm font-medium">
            <li v-for="(item, index) in menuItems" :key="index">
              <router-link :to="item.to"
                class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                active-class="bg-accent text-white font-bold shadow-md shadow-accent/20">
                <BaseIcon :name="item.icon" class="text-lg shrink-0" />
                <span>{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- BAS DE LA SIDEBAR : INFOS ENTREPRISE CONNECTÉE -->
        <div class="p-4 border-t border-base-200 bg-base-200/30" v-if="currentUser">
          <div class="flex items-center gap-3 px-2 mb-3">
            <div class="avatar placeholder">
              <div class="bg-accent text-white rounded-xl w-9 h-9 font-bold text-sm overflow-hidden flex items-center justify-center">
                <BaseImage v-if="currentUser.avatar" :src="currentUser.avatar" alt="Logo" class="object-cover w-full h-full" />
                <span v-else>{{ companyInitials }}</span>
              </div>
            </div>
            <div class="min-w-0">
              <p class="text-xs font-bold truncate">{{ currentUser.name }}</p>
              <p class="text-[11px] text-base-content/50 truncate">
                Entreprise Recruteur
              </p>
            </div>
          </div>

          <BaseButton 
            class="bg-red-300/70 hover:bg-red-400 w-full text-white border-none rounded-xs font-semibold" 
            size="sm"
            variant="outline"
            icon="logout"
            @click="logout"
          >
            Déconnexion
          </BaseButton>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth.js';


const router = useRouter();

// 🔌 Utilisation globale de useAuth pour l'espace entreprise
const { currentUser, logout, isAuthenticated } = useAuth();

// Sécurité : redirection si non connecté ou rôle incorrect au montage
onMounted(() => {
  if (!isAuthenticated.value) {
    console.warn('Utilisateur non connecté. Redirection vers /login');
    router.push('/login');
  }
});

// Liens de navigation spécifiques à l'espace entreprise
const menuItems = [
  { label: "Tableau de bord", to: "/entreprise/dashboard", icon: "dashboard" },
  { label: "Mes Offres d'emploi", to: "/entreprise/dashboard/offres", icon: "offre" },
  { label: "Candidats Reçus", to: "/entreprise/candidats", icon: "candidat" },
  { label: "Messages", to: "/message", icon: "message" },
  { label: "Tout les candidats", to: "/candidats", icon: "candidat" },
  { label: "Analyses & Stats", to: "/entreprise/stats", icon: "statistiques" },
  { label: "Paramètres", to: "/entreprise/settings", icon: "reglage" },
];

// Extraction réactive des initiales du nom de l'entreprise
const companyInitials = computed(() => {
  const name = currentUser.value?.name;
  if (!name) return '??';
  const parts = name.trim().split(' ');
  return parts.map(p => p[0]).join('').toUpperCase().slice(0, 2);
});
</script>