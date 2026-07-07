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
      <header
        class="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 h-16 shrink-0 px-4 lg:px-8 z-40 sticky top-0 transition-all">
        <!-- Mobile : Bouton d'ouverture du menu -->
        <div class="flex-none lg:hidden mr-2">
          <label for="enterprise-drawer" class="btn btn-square btn-ghost btn-sm">
            <BaseIcon name="menu" class="text-lg text-base-content/70" />
          </label>
        </div>

        <!-- Titre de la page dynamique -->
        <div class="flex-1">
          <h1 class="text-lg lg:text-xl font-black text-base-content tracking-tight">
            Vue d'ensemble
          </h1>
        </div>

        <!-- Actions Navbar -->
        <div class="flex-none flex items-center gap-2 lg:gap-4">
          <!-- Barre de recherche Premium (Style Stripe/Linear) -->
          <div class="hidden md:block relative group">
            <BaseIcon name="search"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 transition-colors group-focus-within:text-accent" />
            <input type="text" placeholder="Rechercher un candidat, une offre..."
              class="input input-sm h-9 pl-9 pr-4 bg-base-200/50 border-base-200 focus:bg-base-100 focus:border-accent focus:ring-2 focus:ring-accent/20 w-64 lg:w-80 rounded-lg text-sm font-medium transition-all" />
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <kbd class="kbd kbd-sm text-[10px] bg-base-100 border-base-200 shadow-none text-base-content/50">⌘</kbd>
              <kbd class="kbd kbd-sm text-[10px] bg-base-100 border-base-200 shadow-none text-base-content/50">K</kbd>
            </div>
          </div>

          <!-- Bouton Rapide : Créer une offre -->
          <router-link to="/entreprise/dashboard/offres"
            class="btn btn-sm h-9 bg-accent hover:bg-accent/90 text-white border-none shadow-sm shadow-accent/20 rounded-lg px-4 hidden sm:inline-flex">
            <BaseIcon name="plus" class="text-xs" />
            <span class="font-bold">Créer une offre</span>
          </router-link>

          <!-- Divider Horizontal -->
          <div class="divider divider-horizontal mx-0 hidden lg:flex before:bg-base-200 after:bg-base-200"></div>

          <!-- Centre de Notifications -->
          <button class="btn btn-ghost btn-circle btn-sm relative hover:bg-base-200/50 transition-colors">
            <BaseIcon name="notifications" class="text-base-content/70 text-lg" />
            <!-- Pastille de notification animée -->
            <span
              class="absolute top-1 right-1 w-2 h-2 rounded-full bg-error ring-2 ring-base-100 animate-pulse"></span>
          </button>

          <!-- Dropdown Utilisateur Principal -->
          <div class="dropdown dropdown-end ml-1" v-if="user">
            <label tabindex="0"
              class="btn btn-ghost btn-circle avatar btn-sm border border-base-200 ring-2 ring-transparent hover:ring-accent/30 transition-all">
              <div class="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center overflow-hidden">
                <!-- Affiche l'avatar s'il existe, sinon fallback initials -->
                <img v-if="user.avatar" :src="user.avatar" alt="Avatar Recruteur" class="object-cover w-full h-full" />
                <span v-else class="text-xs font-bold">{{ userInitials }}</span>
              </div>
            </label>
            <ul tabindex="0"
              class="mt-3 z-[100] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 border border-base-200 rounded-xl w-56">
              <li class="menu-title px-4 py-2">
                <span class="text-xs opacity-60">Connecté en tant que</span>
                <span class="font-bold text-base-content truncate">{{
                  user.name
                }}</span>
              </li>
              <div class="divider my-0.5"></div>
              <li>
                <router-link to="/entreprise/settings" class="py-2.5 font-medium hover:text-accent">
                  <BaseIcon name="profil" class="w-4 text-center mr-2 text-base-content/40" />
                  Mon Profil
                </router-link>
              </li>
              <li>
                <router-link to="/entreprise/settings" class="py-2.5 font-medium hover:text-accent">
                  <BaseIcon name="parametres" class="w-4 text-center mr-2 text-base-content/40" />
                  Préférences
                </router-link>
              </li>
              <div class="divider my-0.5"></div>
              <li>
                <button @click="handleLogout" class="py-2.5 font-bold text-error hover:bg-error/10 hover:text-error">
                  <BaseIcon name="logout" class="w-4 text-center mr-2" />
                  Déconnexion
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <!-- ZONE DE CONTENU DÉFILANT -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar relative max-w-[1600px] w-full mx-auto">
        <slot />
      </main>
    </div>

    <!-- ==========================================
         SIDEBAR FIXED & ACCESSIBLE
    =========================================== -->
    <div class="drawer-side z-50">
      <label for="enterprise-drawer" aria-label="Fermer le menu" class="drawer-overlay"></label>

      <aside
        class="bg-base-100 border-r border-base-200 w-72 min-h-screen flex flex-col justify-between shadow-2xl lg:shadow-none transition-transform">
        <!-- En-tête Sidebar (Logo Produit & Marque) -->
        <div
          class="h-16 flex items-center justify-between px-6 border-b border-base-200 shrink-0 sticky top-0 bg-base-100 z-10">
          <div class="flex items-center gap-2">
            <!-- Remplacement du logo par un bloc moderne et stylisé -->
            <div
              class="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center shadow-inner shadow-black/10">
              <BaseIcon name="entreprise" class="text-sm" />
            </div>
            <span class="text-xl font-black tracking-tight text-base-content">Mosalah</span>
            <span
              class="badge badge-sm bg-accent/10 text-accent font-black border-none text-[9px] tracking-wider uppercase ml-1">Recruiter</span>
          </div>
          <!-- Bouton Fermer pour Mobile uniquement -->
          <label for="enterprise-drawer" class="btn btn-square btn-ghost btn-sm lg:hidden">
            <BaseIcon name="fermer" class="text-lg" />
          </label>
        </div>

        <!-- Corps de la Sidebar (Menus Défilants) -->
        <div class="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar space-y-6">
          <!-- SECTION 1 : Recrutement -->
          <div>
            <h3 class="px-3 text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-2">
              Recrutement
            </h3>
            <ul class="menu px-1 gap-0.5 text-sm font-semibold">
              <li v-for="(item, index) in recruitmentMenu" :key="'rec-' + index">
                <router-link :to="item.to"
                  class="group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 text-base-content/70 hover:bg-base-200 hover:text-base-content"
                  active-class="bg-accent/10 text-accent font-black shadow-sm">
                  <div class="flex items-center gap-3">
                    <BaseIcon :name="item.icon"
                      class="w-5 text-center text-lg transition-colors group-hover:scale-110 opacity-70" />
                    <span>{{ item.label }}</span>
                  </div>
                  <span v-if="item.badge" class="badge badge-sm border-none font-bold text-[10px] ml-auto" :class="item.badgeColor || 'bg-base-200 text-base-content/70'
                    ">
                    {{ item.badge }}
                  </span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- SECTION 2 : Communication -->
          <div>
            <h3 class="px-3 text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-2">
              Communication
            </h3>
            <ul class="menu px-1 gap-0.5 text-sm font-semibold">
              <li v-for="(item, index) in communicationMenu" :key="'com-' + index">
                <router-link :to="item.to"
                  class="group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 text-base-content/70 hover:bg-base-200 hover:text-base-content"
                  active-class="bg-accent/10 text-accent font-black shadow-sm">
                  <div class="flex items-center gap-3">
                    <BaseIcon :name="item.icon"
                      class="w-5 text-center text-lg transition-colors group-hover:scale-110 opacity-70" />
                    <span>{{ item.label }}</span>
                  </div>
                  <span v-if="item.badge" class="badge badge-sm border-none font-bold text-[10px] ml-auto" :class="item.badgeColor || 'bg-base-200 text-base-content/70'
                    ">
                    {{ item.badge }}
                  </span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- SECTION 3 : Gestion -->
          <div>
            <h3 class="px-3 text-[10px] font-black uppercase tracking-widest text-base-content/40 mb-2">
              Gestion
            </h3>
            <ul class="menu px-1 gap-0.5 text-sm font-semibold">
              <li v-for="(item, index) in managementMenu" :key="'mgt-' + index">
                <router-link :to="item.to"
                  class="group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 text-base-content/70 hover:bg-base-200 hover:text-base-content"
                  active-class="bg-accent/10 text-accent font-black shadow-sm">
                  <div class="flex items-center gap-3">
                    <BaseIcon :name="item.icon"
                      class="w-5 text-center text-lg transition-colors group-hover:scale-110 opacity-70" />
                    <span>{{ item.label }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Footer Sidebar (Infos Structure & Profil Entreprise) -->
        <div class="p-4 border-t border-base-200 bg-base-50 shrink-0">
          <div
            class="flex items-center justify-between group cursor-pointer p-2 -m-2 rounded-xl hover:bg-base-200 transition-colors">
            <div class="flex items-center gap-3 overflow-hidden">
              <!-- Logo/Miniature Entreprise -->
              <div
                class="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 shadow-inner font-black text-sm">
                <span>{{ company.initials }}</span>
              </div>

              <!-- Métadonnées Organisme -->
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5">
                  <p class="text-sm font-black text-base-content truncate">
                    {{ company.name }}
                  </p>
                  <BaseIcon name="success" class="text-success text-[10px]" title="Compte Entreprise vérifié" />
                </div>
                <p class="text-[11px] font-semibold text-base-content/50 truncate mb-0.5">
                  {{ company.sector }}
                </p>
                <span
                  class="badge badge-sm badge-outline border-accent/30 text-accent font-bold text-[9px] uppercase tracking-wider">{{
                  company.plan }}</span>
              </div>
            </div>

            <!-- Action Déconnexion Contextuelle Directe -->
            <button @click="handleLogout"
              class="btn btn-square btn-sm btn-ghost text-base-content/40 hover:text-error hover:bg-error/10 shrink-0 transition-colors"
              title="Déconnexion">
              <BaseIcon name="logout" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useAuth } from "../composables/useAuth";

// --- INITIALISATION AUTHENTIFICATION ---
const { currentUser, logout } = useAuth();
const user = currentUser.value || { name: "Orsi Mpiere", avatar: null }; // Fallback de sécurité

// --- CALCUL DES INITIALES UTILISATEUR ---
const userInitials = computed(() => {
  return (
    user?.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "??"
  );
});

// --- DÉCONNEXION GLOBALE ---
const handleLogout = () => {
  logout();
};

// --- CONFIGURATION DYNAMIQUE DU PROFIL DE L'ENTREPRISE ---
const company = reactive({
  name: user?.name || "TechSoft Africa",
  initials: user?.name?.substring(0, 2).toUpperCase() || "TS",
  sector: "Informatique & Numérique",
  plan: "Business Plan",
});

// ==========================================
// --- MAPPINGS ET MENUS PILOTÉS PAR DATA ---
// ==========================================

// Section 1 : Recrutement
const recruitmentMenu = [

  {
    label: "Mes offres",
    icon: "offres",
    to: "/entreprise/dashboard/offres",
    badge: "12",
    badgeColor: "bg-base-200 text-base-content",
  },
  {
    label: "Créer une offre",
    icon: "creer-offre",
    to: "/entreprise/dashboard/offres/create",
  },
  { label: "Tous les candidats", icon: "candidats", to: "/candidats" },
  {
    label: "Candidats reçus",
    icon: "inbox",
    to: "/entreprise/candidats",
    badge: "5",
    badgeColor: "bg-warning/20 text-warning-content",
  },
  { label: "Entretiens", icon: "entretien", to: "/entreprise/dashboard/entretiens" },
];

// Section 2 : Communication
const communicationMenu = [
  {
    label: "Messages",
    icon: "messages",
    to: "/message",
    badge: "3",
    badgeColor: "bg-error/10 text-error",
  },
  { label: "Invitations", icon: "invitation", to: "/invitations" },
  {
    label: "Notifications",
    icon: "notifications",
    to: "/notifications",
  },
];

// Section 3 : Gestion
const managementMenu = [
  {
    label: "Collaborateurs",
    icon: "collaborateurs",
    to: "/entreprise/collaborators",
  },
  { label: "Mon entreprise", icon: "entreprise", to: "/entreprise/settings" },
  { label: "Analyses", icon: "analyses", to: "/entreprise/stats" },
  { label: "Paramètres", icon: "parametres", to: "/entreprise/settings" },
];
</script>

<style scoped>
/* 
  Custom Scrollbar pour renforcer l'aspect SaaS premium.
  Plus élégant que la barre de défilement native épaisse de Windows.
*/
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
  border-radius: 10px;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: var(--fallback-bc, oklch(var(--bc) / 0.4));
}
</style>
