<template>
  <div
    class="drawer min-h-screen bg-base-200 text-base-content font-body-md select-none lg:drawer-open"
  >
    <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col min-w-0">
      <!-- Navbar Top Mobile & Desktop -->
      <header
        class="navbar bg-base-100 border-b border-base-200 h-16 sticky top-0 z-40 px-4 md:px-8 justify-between shadow-sm"
      >
        <div class="flex-none lg:hidden">
          <label
            for="dashboard-drawer"
            class="btn btn-square btn-ghost drawer-button"
          >
            <i class="fa-solid fa-bars text-xl"></i>
          </label>
        </div>

        <div class="flex-1 lg:hidden pl-2">
          <span class="text-xl font-black text-accent tracking-tight"
            >Mosalah</span
          >
        </div>

        <div
          class="hidden font-bold text-lg gap-2 text-base-content/80 lg:flex items-center"
        >
          <i class="fa-solid fa-briefcase text-accent/70"></i>
          Espace Candidat
        </div>

        <div class="flex-none gap-4">
          <router-link to="/notifications">
            <button
              class="btn btn-ghost btn-circle btn-sm relative hover:bg-base-200"
            >
              <i class="fa-regular fa-bell text-lg text-base-content/70"></i>
              <span
                class="badge badge-xs bg-error border-none absolute top-0 right-0 animate-pulse"
              ></span>
            </button>
          </router-link>

          <div class="dropdown dropdown-end" v-if="user">
            <div
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-circle avatar btn-sm border border-base-200 ring-2 ring-transparent hover:ring-accent/30 transition-all"
            >
              <div
                class="w-8 h-8 rounded-full overflow-hidden bg-base-300 flex items-center justify-center"
              >
                <img
                  v-if="user.avatar"
                  :src="user.avatar"
                  alt="Avatar"
                  class="object-cover w-full h-full"
                />
                <span v-else class="text-xs font-bold">{{ userInitials }}</span>
              </div>
            </div>
            <ul
              tabindex="0"
              class="mt-3 z-[50] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 border border-base-200 rounded-2xl w-56"
            >
              <li class="menu-title px-4 py-2">
                <span class="text-xs opacity-60">Connecté en tant que</span>
                <span class="font-bold text-base-content">{{ user.name }}</span>
              </li>
              <div class="divider my-0"></div>
              <li>
                <router-link to="/candidat/profile"
                  ><i class="fa-regular fa-user mr-2"></i> Mon
                  Profil</router-link
                >
              </li>
              <li>
                <router-link to="/candidat/settings"
                  ><i class="fa-solid fa-gear mr-2"></i> Paramètres</router-link
                >
              </li>
              <div class="divider my-0"></div>
              <li>
                <button
                  @click="handleLogout"
                  class="text-error font-bold hover:bg-error/10"
                >
                  <i class="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                  Déconnexion
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main
        class="flex-1 p-4 md:p-8 overflow-y-auto max-w-[1600px] w-full mx-auto"
      >
        <slot />
      </main>
    </div>

    <!-- Sidebar -->
    <div class="drawer-side z-[50]">
      <label
        for="dashboard-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>

      <aside
        class="bg-base-100 border-r border-base-200 w-72 min-h-screen flex flex-col justify-between shadow-xl lg:shadow-none"
      >
        <div class="overflow-y-auto pb-4 custom-scrollbar">
          <div
            class="h-16 flex items-center justify-between px-6 border-b border-base-200 sticky top-0 bg-base-100 z-10"
          >
            <div class="flex items-center gap-2">
              <router-link
                to="/"
                class="text-2xl font-black tracking-tighter text-accent"
              >
                Mosalah.
              </router-link>
              <span
                class="badge badge-sm bg-accent/10 text-accent font-black border-none text-[9px] tracking-wider uppercase"
                >Candidat</span
              >
            </div>
            <label
              for="dashboard-drawer"
              class="btn btn-square btn-ghost btn-sm lg:hidden"
            >
              <i class="fa-solid fa-xmark text-lg"></i>
            </label>
          </div>
          <!-- Section 1 : Navigation -->
          <div
            class="px-6 py-4 text-[10px] uppercase tracking-widest text-base-content/40 font-black mt-2"
          >
            Mon Suivi
          </div>
          <ul class="menu px-4 gap-1 text-sm font-semibold">
            <li v-for="(item, index) in navigationMenu" :key="`track-${index}`">
              <router-link
                :to="item.to"
                active-class="bg-accent/10 text-accent font-black"
              >
                <i :class="item.icon" class="w-5 text-center opacity-70"></i>
                {{ item.label }}
                <span
                  v-if="item.badge"
                  class="badge badge-sm bg-accent text-white border-none ml-auto"
                  >{{ item.badge }}</span
                >
              </router-link>
            </li>
          </ul>
          <!-- Section 2 : Suivi -->
          <div
            class="px-6 py-4 text-[10px] uppercase tracking-widest text-base-content/40 font-black mt-2"
          >
            Mon Suivi
          </div>
          <ul class="menu px-4 gap-1 text-sm font-semibold">
            <li v-for="(item, index) in trackingMenu" :key="`track-${index}`">
              <router-link
                :to="item.to"
                active-class="bg-accent/10 text-accent font-black"
              >
                <i :class="item.icon" class="w-5 text-center opacity-70"></i>
                {{ item.label }}
                <span
                  v-if="item.badge"
                  class="badge badge-sm bg-accent text-white border-none ml-auto"
                  >{{ item.badge }}</span
                >
              </router-link>
            </li>
          </ul>

          <!-- Section 2 : Visibilité -->
          <div
            class="px-6 py-4 text-[10px] uppercase tracking-widest text-base-content/40 font-black mt-2"
          >
            Ma Visibilité
          </div>
          <ul class="menu px-4 gap-1 text-sm font-semibold">
            <li v-for="(item, index) in visibilityMenu" :key="`vis-${index}`">
              <router-link
                :to="item.to"
                active-class="bg-accent/10 text-accent font-black"
              >
                <i :class="item.icon" class="w-5 text-center opacity-70"></i>
                {{ item.label }}
              </router-link>
            </li>
          </ul>

          <!-- Section 3 : Ressources -->
          <div
            class="px-6 py-4 text-[10px] uppercase tracking-widest text-base-content/40 font-black mt-2"
          >
            Mes Ressources
          </div>
          <ul class="menu px-4 gap-1 text-sm font-semibold">
            <li v-for="(item, index) in resourcesMenu" :key="`res-${index}`">
              <router-link
                :to="item.to"
                active-class="bg-accent/10 text-accent font-black"
              >
                <i :class="item.icon" class="w-5 text-center opacity-70"></i>
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- User Footer -->
        <div class="p-4 border-t border-base-200 bg-base-50 shrink-0">
          <div class="flex items-center gap-3 px-2 mb-3">
            <div class="avatar placeholder">
              <div
                class="bg-accent text-white rounded-xl w-10 h-10 font-black text-sm shadow-inner flex items-center justify-center"
              >
                <img
                  v-if="user?.avatar"
                  :src="user.avatar"
                  alt="Avatar"
                  class="object-cover w-full h-full"
                />
                <span v-else>{{ userInitials }}</span>
              </div>
            </div>
            <div class="min-w-0">
              <p class="text-sm font-black text-base-content truncate">
                {{ user?.name || "Utilisateur" }}
              </p>
              <p
                class="text-[11px] font-semibold text-base-content/50 truncate"
              >
                À la recherche d'opportunités
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuth } from "../composables/useAuth";
const { isAuthenticated, currentUser ,logout} = useAuth();
const user = currentUser.value || { name: "Orsi Mpiere", avatar: null }; // Mock

const navigationMenu = [
  {
    label: "Les entrepises",
    to: "/entreprises",
    icon: "fa-solid fa-building",
  },
];





const trackingMenu = [
  {
    label: "Mes candidatures",
    to: "/candidat/applications",
    icon: "fa-solid fa-paper-plane",
  },
  {
    label: "Entretiens",
    to: "/candidat/interviews",
    icon: "fa-regular fa-calendar-check",
    badge: "2",
  },
  {
    label: "Invitations",
    to: "/candidat/invitations",
    icon: "fa-solid fa-envelope-open-text",
  },{
    label: "Notifications",
    to: "/notifications",
    icon: "fa-regular fa-bell",
  },
  { label: "Messages", to: "message", icon: "fa-solid fa-message" },
  {
    label: "Historique",
    to: "/candidat/history",
    icon: "fa-solid fa-clock-rotate-left",
  },
];

const visibilityMenu = [
  {
    label: "Créer une demande d'emploi",
    to: "/candidat/job-requests",
    icon: "fa-solid fa-bullhorn",
  },
  {
    label: "Les offres d'emploi",
    to: "/offres",
    icon: "fa-solid fa-bullhorn",
  },
  {
    label: "Mon profil public",
    to: "/candidat/profile",
    icon: "fa-solid fa-id-card-clip",
  },
];

const resourcesMenu = [
  {
    label: "Offres sauvegardées",
    to: "/candidat/saved",
    icon: "fa-regular fa-bookmark",
  },
  {
    label: "Mes Documents",
    to: "/candidat/documents",
    icon: "fa-solid fa-folder-open",
  },
  { label: "Paramètre", to: "/candidat/settings", icon: "fa-solid fa-gear" },
];

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
const handleLogout = () => {
  logout();
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
</style>
