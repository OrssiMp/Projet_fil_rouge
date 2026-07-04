import { createRouter, createWebHashHistory, useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useAuth } from "../composables/useAuth.js";

const userRoleExist = ref(false);
const currentLayout = ref("AppLayout");
const route = useRoute();
let currentUserRole = ref("candidat");
let isConnected = ref(false);

const routes = [
  // --- 🌍 SECTION PUBLIQUE & APPS (Layout dynamique intelligent) ---
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/application/Home.vue"),
    meta: { layout: "AppLayout" },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/application/About.vue"),
    meta: { layout: "AppLayout" },
  },
  {
    path: "/offres",
    name: "JobList",
    component: () => import("../pages/JobList.vue"),
    meta: {
      layout: currentLayout,
      role: "candidat",
    },
  },
  {
    path: "/offres/:id",
    name: "JobDetail",
    component: () => import("../pages/jobDetail.vue"),
    meta: {
      layout: isConnected.value ? "AppLayout" : "DashboardLayout",
      role: currentUserRole.value,
    },
  },
  {
    path: "/offres/:id/postuler",
    name: "JobApply", // Correction du doublon de nom de route
    component: () => import("../pages/candidat/JobPostule.vue"),
    meta: {
      layout: isConnected.value ? "AppLayout" : "DashboardLayout",
      role: currentUserRole.value,
    },
    props: true,
  },
  {
    path: "/message",
    component: () => import("../pages/Message.vue"),
    meta: { 
      layout: "DashboardLayout", 
      role: currentUserRole.value 
    },
  },
  {
    path: "/entreprises/details/:id",
    name: "CompanyDetail", // Nom unique corrigé
    component: () => import("../pages/entreprise/CompanyDetail.vue"),
    meta: { layout: "DashboardLayout", role: currentUserRole.value },
    props: true,
  },
  {
    path: "/entreprise/dashboard/offres",
    name: "EntrepriseOffres",
    component: () => import("../pages/entreprise/JobManagement.vue"),
    meta: { layout: "DashboardLayout", role: "entreprise" },
  },

  // --- 🔐 SECTION AUTHENTIFICATION (Layout minimaliste) ---
  {
    path: "/register",
    name: "ChooseAccountType",
    component: () => import("../pages/ChooseAccountPage.vue"),
    meta: { layout: "AuthLayout" },
  },
  {
    path: "/register/entreprise",
    name: "RegisterEntreprise",
    component: () => import("../pages/entreprise/Register.vue"),
    meta: { layout: "AuthLayout" },
  },
  {
    path: "/register/candidat",
    name: "RegisterCandidat",
    component: () => import("../pages/candidat/Register.vue"),
    meta: { layout: "AuthLayout" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/Login.vue"),
    meta: { layout: "AuthLayout" },
  },
  {
    path: "/dashboard",
    name: "DashboardRedirect",
    component: () => {
      return currentUserRole.value === "candidat"
        ? import("../pages/candidat/DashBoard.vue")
        : import("../pages/entreprise/Dashboard.vue");
    },
    meta: {
      layout: "DashboardLayout",
      role: currentUserRole.value,
      requiresAuth: true,
    },
  },
  // --- 🎛️ SECTION DASHBOARDS (Layout d'espace de travail avec Sidebar) ---
  {
    path: "/candidat/dashboard",
    name: "CandidatDashboard",
    component: () => import("../pages/candidat/DashBoard.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "candidat",
    },
  },

  {
    path: "/candidat/applications",
    name: "CandidatApplication",
    component: () => import("../pages/candidat/JobPostule.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "candidat",
    },
    props: true,
  },
  {
    path: "/candidat/profile",
    name: "CandidatProfile",
    component: () => import("../pages/candidat/Profil.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "candidat",
    },
  },
  {
    path: "/candidat/settings",
    name: "CandidatSettings",
    component: () => import("../pages/candidat/Settings.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "candidat",
    },
  },
  {
    path: "/candidats/details/:id",
    component: () => import("../pages/candidat/CandidatDetail.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "candidat",
    },
  },
  {
    path: "/entreprises",
    name: "Entreprises",
    component: () => import("../pages/candidat/CompaniesCatalog.vue"),
    meta: {
      layout: "AppLayout",
      role: "candidat",
    },
  },
  {
    path: "/entreprise",
    name: "EntrepriseLandingPage",
    component: () => import("../pages/entreprise/entreprise.vue"),

    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/entreprise/dashboard",
    name: "EntrepriseDashboard",
    component: () => import("../pages/entreprise/Dashboard.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "entreprise",
    },
  },
  {
    path: "/entreprise/candidats",
    name: "EntrepriseCandidats",
    component: () => import("../pages/entreprise/CandidatList.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "entreprise",
    },
  },
  {
    path: "/entreprise/settings",
    name: "EntrepriseSettings",
    component: () => import("../pages/entreprise/Settings.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "entreprise",
    },
  },
  {
    path: "/confidentialite",
    name: "Confidentialite",
    component: () => import("../pages/application/PrivacyPolicy.vue"),
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/candidats",
    name: "Candidats",
    component: () => import("../pages/application/GlobalCandidatCatalog.vue"),
    meta: {
      layout: "AppLayout",
    },
  },
  // --- 🚫 ERREUR 404 ---
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../pages/application/NotFound.vue"),
    meta: { layout: "AuthLayout" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const offLineOnlyName = ["Home", "About", "EntrepriseLandingPage"];
router.beforeEach((to, from, next) => {
  const { currentUser, isAuthenticated } = useAuth();

  if (isAuthenticated.value) {
    currentUserRole.value = currentUser.value.role;
    isConnected.value = isAuthenticated.value;
    console.log(currentUserRole.value);
  }

  // Layout par défaut
  to.meta.layout = to.meta.defaultLayout || to.meta.layout || "AppLayout";

  // Pages publiques qui changent selon la connexion
  const dynamicLayouts = ["JobList", "Entreprises", "Candidats"];

  if (dynamicLayouts.includes(to.name)) {
    to.meta.layout = isAuthenticated.value ? "DashboardLayout" : "AppLayout";
  }
  // if (isConnected.value) {
  //   // 1. Si l'utilisateur est connecté et essaie d'aller sur une page "Visiteur"
  //   if (offLineOnlyName.includes(to.name) && isConnected.value) {
  //     console.log(`Utilisateur connecté, redirection vers le tableau de bord`);

  //     // On redirige vers la route générique /dashboard
  //     return next({ name: "DashboardRedirect" });
  //   }
  // }

  // Protection des routes
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return next("/login");
  }

  // Vérification du rôle
  if (
    to.meta.role &&
    isAuthenticated.value &&
    currentUser.value.role !== to.meta.role
  ) {
    return next("/");
  }

  next();
});

export default router;
