<template>
  <div class="drawer lg:drawer-open bg-base-200/30 min-h-screen font-sans selection:bg-accent selection:text-white">
    <input id="enterprise-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col h-screen overflow-hidden">
      <header
        class="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 h-16 shrink-0 px-4 lg:px-8 z-40 sticky top-0 transition-all">
        <div class="flex-none lg:hidden mr-2">
          <label for="enterprise-drawer" class="btn btn-square btn-ghost btn-sm">
            <BaseIcon name="menu" class="text-lg text-base-content/70" />
          </label>
        </div>

        <div class="flex-1">
          <h1 class="text-lg lg:text-xl font-black text-base-content tracking-tight">
            Vue d'ensemble
          </h1>
        </div>

        <div class="flex-none flex items-center gap-2 lg:gap-4">
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

          <router-link to="/entreprise/create-annonce"
            class="btn btn-sm h-9 bg-accent hover:bg-accent/90 text-white border-none shadow-sm shadow-accent/20 rounded-lg px-4 hidden sm:inline-flex">
            <BaseIcon name="plus" class="text-xs" />
            <span class="font-bold">Créer une offre</span>
          </router-link>

          <div class="divider divider-horizontal mx-0 hidden lg:flex before:bg-base-200 after:bg-base-200"></div>

          <!-- Centre de Notifications : lien réel + pastille conditionnelle -->
          <router-link to="/notifications"
            class="btn btn-ghost btn-circle btn-sm relative hover:bg-base-200/50 transition-colors">
            <BaseIcon name="notifications" class="text-base-content/70 text-lg" />
            <span
              v-if="unreadNotificationsCount > 0"
              class="absolute top-1 right-1 w-2 h-2 rounded-full bg-error ring-2 ring-base-100 animate-pulse"
            ></span>
          </router-link>

          <div class="dropdown dropdown-end ml-1" v-if="currentUser">
            <label tabindex="0"
              class="btn btn-ghost btn-circle avatar btn-sm border border-base-200 ring-2 ring-transparent hover:ring-accent/30 transition-all">
              <div class="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center overflow-hidden">
                <img v-if="currentUser.avatar" :src="currentUser.avatar" alt="Avatar Recruteur" class="object-cover w-full h-full" />
                <span v-else class="text-xs font-bold">{{ userInitials }}</span>
              </div>
            </label>
            <ul tabindex="0"
              class="mt-3 z-[100] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 border border-base-200 rounded-xl w-56">
              <li class="menu-title px-4 py-2">
                <span class="text-xs opacity-60">Connecté en tant que</span>
                <span class="font-bold text-base-content truncate">{{ currentUser.name }}</span>
              </li>
              <div class="divider my-0.5"></div>
              <li>
                <router-link to="/entreprise/settings" class="py-2.5 font-medium hover:text-accent">
                  <BaseIcon name="profil" class="w-4 text-center mr-2 text-base-content/40" />
                  Mon Profil
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

      <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar relative max-w-[1600px] w-full mx-auto">
        <slot />
      </main>
    </div>

    <div class="drawer-side z-50">
      <label for="enterprise-drawer" aria-label="Fermer le menu" class="drawer-overlay"></label>

      <aside
        class="bg-base-100 border-r border-base-200 w-72 min-h-screen flex flex-col justify-between shadow-2xl lg:shadow-none transition-transform">
        <div
          class="h-16 flex items-center justify-between px-6 border-b border-base-200 shrink-0 sticky top-0 bg-base-100 z-10">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center shadow-inner shadow-black/10">
              <BaseIcon name="entreprise" class="text-sm" />
            </div>
            <span class="text-xl font-black tracking-tight text-base-content">Mosalah</span>
            <span
              class="badge badge-sm bg-accent/10 text-accent font-black border-none text-[9px] tracking-wider uppercase ml-1">Recruiter</span>
          </div>
          <label for="enterprise-drawer" class="btn btn-square btn-ghost btn-sm lg:hidden">
            <BaseIcon name="fermer" class="text-lg" />
          </label>
        </div>

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
                  <span v-if="item.badge" class="badge badge-sm border-none font-bold text-[10px] ml-auto"
                    :class="item.badgeColor || 'bg-base-200 text-base-content/70'">
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
                  <span v-if="item.badge" class="badge badge-sm border-none font-bold text-[10px] ml-auto"
                    :class="item.badgeColor || 'bg-base-200 text-base-content/70'">
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

        <!-- Footer Sidebar -->
        <div class="p-4 border-t border-base-200 bg-base-50 shrink-0">
          <div
            class="flex items-center justify-between group cursor-pointer p-2 -m-2 rounded-xl hover:bg-base-200 transition-colors">
            <div class="flex items-center gap-3 overflow-hidden">
              <div
                class="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 shadow-inner font-black text-sm">
                <span>{{ company.initials }}</span>
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5">
                  <p class="text-sm font-black text-base-content truncate">
                    {{ company.name }}
                  </p>
                </div>
                <p class="text-[11px] font-semibold text-base-content/50 truncate mb-0.5">
                  {{ company.sector }}
                </p>
                <span
                  class="badge badge-sm badge-outline border-accent/30 text-accent font-bold text-[9px] uppercase tracking-wider">
                  Membre depuis {{ company.memberSince }}
                </span>
              </div>
            </div>

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
import { computed, ref, onMounted } from "vue";
import { useAuth } from "../composables/useAuth";
import { useDb } from "../composables/useDb";
import { useMessages } from "../composables/useMessages";
import { useNotifications } from "../composables/useNotifications";

const { currentUser, logout } = useAuth();
const { fetchAnnonces, fetchCandidaturesForEntreprise } = useDb();
const { fetchConversations } = useMessages();
const { fetchNotifications } = useNotifications();

// --- COMPTEURS RÉELS POUR LES BADGES DE LA SIDEBAR ---
const myOffresCount = ref(0);
const candidaturesEnEtudeCount = ref(0);
const unreadMessagesCount = ref(0);
const unreadNotificationsCount = ref(0);

const loadSidebarCounters = async () => {
  if (!currentUser.value) return;

  const [annonces, candidatures, conversations] = await Promise.all([
    fetchAnnonces(),
    fetchCandidaturesForEntreprise(currentUser.value.id),
    fetchConversations(currentUser.value.id, "entreprise"),
  ]);
  const notifications = fetchNotifications(currentUser.value.id);

  myOffresCount.value = (annonces || []).filter(
    (a) => a.entrepriseId === currentUser.value.id,
  ).length;

  candidaturesEnEtudeCount.value = (candidatures || []).filter(
    (c) => (c.status || "en_etude") === "en_etude",
  ).length;

  unreadMessagesCount.value = (conversations || []).reduce(
    (acc, c) => acc + (c.unreadCount || 0),
    0,
  );

  unreadNotificationsCount.value = (notifications || []).filter(
    (n) => !n.read,
  ).length;
};

onMounted(loadSidebarCounters);

// --- INITIALES UTILISATEUR (safe, réactif) ---
const userInitials = computed(() => {
  const name = currentUser.value?.name;
  if (!name) return "??";
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
});

// --- PROFIL ENTREPRISE : entièrement dérivé de useAuth, réactif ---
const company = computed(() => ({
  name: currentUser.value?.name || "Entreprise",
  initials: userInitials.value,
  // "sector" n'existe pas encore dans UserProfileData (useAuth) : voir remarque plus bas
  sector: currentUser.value?.location || "Secteur non renseigné",
  memberSince: currentUser.value?.createdAt || "récemment",
}));

// --- DÉCONNEXION ---
const handleLogout = () => {
  logout();
};

// ==========================================
// --- MENUS : liens vérifiés, badges réels ---
// ==========================================

const recruitmentMenu = computed(() => [
    {
    label: "Créer une offre",
    icon: "creer-offre",
    to: "/entreprise/create-annonce",
  },
  {
    label: "Mes offres",
    icon: "offres",
    to: "/entreprise/dashboard/offres",
    badge: myOffresCount.value > 0 ? String(myOffresCount.value) : null,
    badgeColor: "bg-base-200 text-base-content",
  },
  { label: "Tous les candidats", icon: "candidats", to: "/candidats" },
  {
    label: "Candidats reçus",
    icon: "inbox",
    to: "/entreprise/candidats",
    badge:
      candidaturesEnEtudeCount.value > 0
        ? String(candidaturesEnEtudeCount.value)
        : null,
    badgeColor: "bg-warning/20 text-warning-content",
  },
]);

const communicationMenu = computed(() => [
  {
    label: "Messages",
    icon: "messages",
    to: "/message",
    badge: unreadMessagesCount.value > 0 ? String(unreadMessagesCount.value) : null,
    badgeColor: "bg-error/10 text-error",
  },
  {
    label: "Notifications",
    icon: "notifications",
    to: "/notifications",
    badge:
      unreadNotificationsCount.value > 0
        ? String(unreadNotificationsCount.value)
        : null,
    badgeColor: "bg-error/10 text-error",
  },
]);

const managementMenu = [
  { label: "Mon entreprise", icon: "entreprise", to: "/entreprise/settings" },
  { label: "Analyses", icon: "analyses", to: "/entreprise/stats" },
];
</script>

<style scoped>
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