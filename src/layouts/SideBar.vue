<template>
  <!-- 
    Layout principal basé sur le composant Drawer de DaisyUI.
    lg:drawer-open garde la sidebar ouverte sur desktop.
    bg-base-200/30 donne un fond très légèrement grisé pour faire ressortir les cartes blanches (bg-base-100).
  -->
  <div class="drawer lg:drawer-open bg-base-200/30 min-h-screen font-sans selection:bg-accent selection:text-white">
    
    <!-- Input invisible pour contrôler l'ouverture du menu sur mobile -->
    <input id="enterprise-drawer" type="checkbox" class="drawer-toggle" />
    
    <!-- ==========================================
         CONTENU PRINCIPAL (Navbar + Page)
    =========================================== -->
    <div class="drawer-content flex flex-col h-screen overflow-hidden">
      
      <!-- NAVBAR STICKY -->
      <header class="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 h-16 shrink-0 px-4 lg:px-8 z-40 sticky top-0 transition-all">
        
        <!-- Mobile : Bouton d'ouverture du menu -->
        <div class="flex-none lg:hidden mr-2">
          <label for="enterprise-drawer" class="btn btn-square btn-ghost btn-sm">
            <i class="fa-solid fa-bars text-lg text-base-content/70"></i>
          </label>
        </div>

        <!-- Titre de la page dynamique (Ici statique pour la démo) -->
        <div class="flex-1">
          <h1 class="text-lg lg:text-xl font-black text-base-content tracking-tight">Vue d'ensemble</h1>
        </div>

        <!-- Actions Navbar -->
        <div class="flex-none flex items-center gap-2 lg:gap-4">
          
          <!-- Barre de recherche (Cachée sur petit mobile, visible sur lg) -->
          <div class="hidden md:block relative group">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 transition-colors group-focus-within:text-accent"></i>
            <input 
              type="text" 
              placeholder="Rechercher un candidat, une offre..." 
              class="input input-sm h-9 pl-9 pr-4 bg-base-200/50 border-base-200 focus:bg-base-100 focus:border-accent focus:ring-2 focus:ring-accent/20 w-64 lg:w-80 rounded-lg text-sm font-medium transition-all"
            />
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <kbd class="kbd kbd-sm text-[10px] bg-base-100 border-base-200 shadow-none text-base-content/50">⌘</kbd>
              <kbd class="kbd kbd-sm text-[10px] bg-base-100 border-base-200 shadow-none text-base-content/50">K</kbd>
            </div>
          </div>

          <!-- Bouton Rapide : Créer une offre -->
          <router-link to="/entreprise/offres/creer" class="btn btn-sm h-9 bg-accent hover:bg-accent/90 text-white border-none shadow-sm shadow-accent/20 rounded-lg px-4 hidden sm:inline-flex">
            <i class="fa-solid fa-plus text-xs"></i>
            <span class="font-bold">Créer une offre</span>
          </router-link>

          <!-- Divider -->
          <div class="divider divider-horizontal mx-0 hidden lg:flex before:bg-base-200 after:bg-base-200"></div>

          <!-- Notifications -->
          <button class="btn btn-ghost btn-circle btn-sm relative hover:bg-base-200/50 transition-colors">
            <i class="fa-solid fa-bell text-base-content/70 text-lg"></i>
            <!-- Pastille de notification animée -->
            <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-error ring-2 ring-base-100 animate-pulse"></span>
          </button>

          <!-- Dropdown Utilisateur -->
          <div class="dropdown dropdown-end ml-1">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar btn-sm hover:ring-2 hover:ring-base-200 transition-all">
              <div class="w-8 h-8 rounded-full bg-base-200 border border-base-300 flex items-center justify-center overflow-hidden">
                <!-- Fallback Avatar si pas d'image -->
                <i class="fa-solid fa-user-tie text-base-content/50 text-sm"></i>
              </div>
            </label>
            <ul tabindex="0" class="mt-3 z-[100] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 border border-base-200 rounded-xl w-56">
              <li class="menu-title px-4 py-2">
                <span class="text-xs font-bold text-base-content/50 uppercase tracking-wider">Mon Compte</span>
              </li>
              <li><a class="py-2.5 font-medium hover:text-accent"><i class="fa-solid fa-id-badge w-4 text-center mr-2 text-base-content/40"></i> Mon Profil</a></li>
              <li><a class="py-2.5 font-medium hover:text-accent"><i class="fa-solid fa-gear w-4 text-center mr-2 text-base-content/40"></i> Préférences</a></li>
              <div class="divider my-1"></div>
              <li><a class="py-2.5 font-bold text-error hover:bg-error/10 hover:text-error"><i class="fa-solid fa-arrow-right-from-bracket w-4 text-center mr-2"></i> Déconnexion</a></li>
            </ul>
          </div>

        </div>
      </header>

      <!-- ZONE DE CONTENU DÉFILANT -->
      <!-- Utilisation d'un custom-scrollbar pour un rendu Mac/SaaS -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar relative">
        <div class="max-w-7xl mx-auto w-full">
          <slot />
        </div>
      </main>

    </div> 

    <!-- ==========================================
         SIDEBAR (Menu de navigation)
    =========================================== -->
    <div class="drawer-side z-50">
      <label for="enterprise-drawer" aria-label="Fermer le menu" class="drawer-overlay"></label> 
      
      <aside class="bg-base-100 border-r border-base-200 w-[280px] min-h-full flex flex-col justify-between shadow-2xl lg:shadow-none transition-transform">
        
        <!-- En-tête Sidebar (Logo Produit) -->
        <div class="h-16 flex items-center px-6 border-b border-base-200 shrink-0 sticky top-0 bg-base-100 z-10">
          <div class="flex items-center gap-2">
            <!-- Remplacement du logo par un texte stylisé -->
            <div class="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center shadow-inner shadow-black/10">
              <i class="fa-solid fa-building text-sm"></i>
            </div>
            <span class="text-xl font-black tracking-tight text-base-content">Mosalah</span>
            <span class="badge badge-sm bg-base-200 text-base-content/60 font-bold border-none text-[9px] uppercase ml-1">Recruiter</span>
          </div>
        </div>

        <!-- Corps de la Sidebar (Menus) -->
        <div class="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar space-y-6">
          
          <!-- SECTION 1 : Recrutement -->
          <div>
            <h3 class="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-base-content/40 mb-2">Recrutement</h3>
            <ul class="space-y-0.5">
              <li v-for="(item, index) in recruitmentMenu" :key="'rec-'+index">
                <router-link 
                  :to="item.to" 
                  class="group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                  active-class="bg-accent/10 text-accent shadow-sm"
                  exact-active-class="bg-accent text-white shadow-md shadow-accent/20"
                  :class="{'text-base-content/70 hover:bg-base-200 hover:text-base-content': true}"
                >
                  <div class="flex items-center gap-3">
                    <i :class="[item.icon, 'w-5 text-center text-lg transition-colors group-hover:scale-110']"></i>
                    <span>{{ item.label }}</span>
                  </div>
                  <span v-if="item.badge" class="badge badge-sm border-none font-bold text-[10px]" :class="item.badgeColor || 'bg-base-200 text-base-content/70'">
                    {{ item.badge }}
                  </span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- SECTION 2 : Communication -->
          <div>
            <h3 class="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-base-content/40 mb-2">Communication</h3>
            <ul class="space-y-0.5">
              <li v-for="(item, index) in communicationMenu" :key="'com-'+index">
                <router-link 
                  :to="item.to" 
                  class="group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-base-content/70 hover:bg-base-200 hover:text-base-content"
                  active-class="bg-accent/10 text-accent"
                >
                  <div class="flex items-center gap-3">
                    <i :class="[item.icon, 'w-5 text-center text-lg transition-colors group-hover:scale-110']"></i>
                    <span>{{ item.label }}</span>
                  </div>
                  <span v-if="item.badge" class="badge badge-sm border-none font-bold text-[10px]" :class="item.badgeColor || 'bg-base-200 text-base-content/70'">
                    {{ item.badge }}
                  </span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- SECTION 3 : Gestion -->
          <div>
            <h3 class="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-base-content/40 mb-2">Gestion</h3>
            <ul class="space-y-0.5">
              <li v-for="(item, index) in managementMenu" :key="'mgt-'+index">
                <router-link 
                  :to="item.to" 
                  class="group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-base-content/70 hover:bg-base-200 hover:text-base-content"
                  active-class="bg-accent/10 text-accent"
                >
                  <div class="flex items-center gap-3">
                    <i :class="[item.icon, 'w-5 text-center text-lg transition-colors group-hover:scale-110']"></i>
                    <span>{{ item.label }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>

        </div>

        <!-- Footer Sidebar (Infos Entreprise) -->
        <div class="p-4 border-t border-base-200 bg-base-50 shrink-0">
          <div class="flex items-center justify-between group cursor-pointer p-2 -m-2 rounded-xl hover:bg-base-200 transition-colors">
            
            <div class="flex items-center gap-3 overflow-hidden">
              <!-- Logo Entreprise -->
              <div class="w-10 h-10 rounded-lg bg-base-300 flex items-center justify-center shrink-0 border border-base-200">
                <span class="font-black text-base-content/60">{{ company.initials }}</span>
              </div>
              
              <!-- Textes -->
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <p class="text-sm font-black text-base-content truncate">{{ company.name }}</p>
                  <i class="fa-solid fa-circle-check text-success text-[10px]" title="Entreprise vérifiée"></i>
                </div>
                <p class="text-[11px] font-semibold text-base-content/50 truncate mb-0.5">{{ company.sector }}</p>
                <span class="badge badge-sm badge-outline border-accent/30 text-accent font-bold text-[9px] uppercase">{{ company.plan }}</span>
              </div>
            </div>

            <!-- Bouton Déconnexion (Apparaît au survol sur Desktop) -->
            <button class="btn btn-square btn-sm btn-ghost text-base-content/40 hover:text-error hover:bg-error/10 shrink-0 transition-colors" title="Déconnexion">
              <i class="fa-solid fa-right-from-bracket"></i>
            </button>
            
          </div>
        </div>

      </aside>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useAuth } from '../composables/useAuth';
const {currentUser} = useAuth()


// ===============================
// DONNÉES ENTREPRISE
// ===============================
const company = reactive({
  name: currentUser.value?.name || "TechSoft Africa",
  initials: currentUser.value?.name?.substring(0, 2) || "TS",
  sector: "Informatique & Numérique",
  plan: "Business Plan",
});


// ===============================
// SECTION : RECRUTEMENT
// ===============================
const recruitmentMenu = [
  {
    label: "Tableau de bord",
    icon: "fa-solid fa-chart-pie",
    to: "/entreprise/dashboard",
  },

  {
    label: "Mes offres",
    icon: "fa-solid fa-briefcase",
    to: "/entreprise/dashboard/offres",
    badge: "12",
    badgeColor: "bg-base-200 text-base-content",
  },

  {
    label: "Créer une offre",
    icon: "fa-solid fa-file-circle-plus",
    to: "/entreprise/dashboard/offres", // à remplacer plus tard par /entreprise/offres/create
  },

  {
    label: "Tous les candidats",
    icon: "fa-solid fa-users",
    to: "/entreprise/candidats",
  },

  {
    label: "Candidats reçus",
    icon: "fa-solid fa-inbox",
    to: "/entreprise/candidats", // filtrer côté composant
    badge: "5",
    badgeColor: "bg-warning/20 text-warning-content",
  },

  {
    label: "Entretiens",
    icon: "fa-solid fa-calendar-check",
    to: "/entreprise/dashboard", // temporaire
  },
];


// ===============================
// SECTION : COMMUNICATION
// ===============================
const communicationMenu = [
  {
    label: "Messages",
    icon: "fa-solid fa-comments",
    to: "/message",
    badge: "3",
    badgeColor: "bg-error/10 text-error",
  },

  {
    label: "Invitations",
    icon: "fa-solid fa-paper-plane",
    to: "/entreprise/dashboard", // futur : /entreprise/invitations
  },

  {
    label: "Notifications",
    icon: "fa-solid fa-bell",
    to: "/entreprise/dashboard", // futur : /entreprise/notifications
  },
];


// ===============================
// SECTION : GESTION
// ===============================
const managementMenu = [
  {
    label: "Collaborateurs",
    icon: "fa-solid fa-user-group",
    to: "/entreprise/dashboard", // futur : /entreprise/team
  },

  {
    label: "Mon entreprise",
    icon: "fa-solid fa-building",
    to: "/entreprise/settings", // en attendant une vraie page Profil
  },

  {
    label: "Analyses",
    icon: "fa-solid fa-chart-line",
    to: "/entreprise/stats",
  },

  {
    label: "Paramètres",
    icon: "fa-solid fa-gear",
    to: "/entreprise/settings",
  },
];
</script>

<style scoped>
/* 
  Custom Scrollbar pour renforcer l'aspect SaaS premium.
  Plus élégant que la barre de défilement native épaisse de Windows.
*/
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
  border-radius: 20px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: var(--fallback-bc, oklch(var(--bc) / 0.4));
}

/* Fix pour l'état actif du routeur sur l'icône */
.router-link-exact-active i {
  color: white !important;
}
</style>