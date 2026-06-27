import { createRouter, createWebHashHistory } from "vue-router";
import { computed } from "vue";

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
    meta: { layout: "AppLayout" },
  },
  {
    path: "/offres/:id",
    name: "JobDetail",
    component: () => import("../pages/JobDetail.vue"),
    meta: { layout: "AppLayout" },
  },
  {
    path: "/offres/:id/postuler",
    name: "JobApply", // Correction du doublon de nom de route
    component: () => import("../pages/candidat/JobPostule.vue"),
    meta: { layout: "AppLayout" },
    props: true,
  },
  {
    path: "/message",
    component: () => import("../pages/Message.vue"),
    meta: { layout: "AppLayout" },
  },
  {
    path: "/entreprises/details/:id",
    name: "CompanyDetail", // Nom unique corrigé
    component: () => import("../pages/entreprise/CompanyDetail.vue"),
    meta: { layout: "DashboardLayout" },
    props: true,
  },
  {
    path: "/entreprise/dashboard/offres",
    name: "EntrepriseOffres",
    component: () => import("../pages/entreprise/JobManagement.vue"),
    meta: { layout: "DashBoardLayout", role: "entreprise" },
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

  // --- 🎛️ SECTION DASHBOARDS (Layout d'espace de travail avec Sidebar) ---
  {
    path: "/candidat/dashboard",
    name: "CandidatDashboard",
    component: () => import("../pages/candidat/Dashboard.vue"),
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
      requiresAuth: true,
      role: "candidat",
    },
  },
  {
    path: "/entreprise",
    name: "EntrepriseLandingPage",
    component: () => import("../pages/entreprise/entreprise.vue"),

    meta: {
      layout: "AppLayout",
      requiresAuth: true,
      role: "entreprise",
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

// router.beforeEach((to, from, next) => {
  // const {
  //   currentUser: { value:{role} },
  // } = useAuth();
  // console.log(role);
  // if (role ==='') {
    
  // } else {
    
  // }
// const {isAuthenticated}=useAuth()
// console.log(is)
//   next()
  
// });
// 🛡️ Middleware de simulation d'authentification mis à jour (Sans next())
// router.beforeEach((to) => {
//   const user = JSON.parse(localStorage.getItem("mosalah_user") || "null");

//   // 1. Si la page nécessite d'être connecté et que l'utilisateur ne l'est pas
//   if (to.meta.requiresAuth && !user) {
//     return "/login"; // On retourne directement le chemin de redirection
//   }

//   // 2. Si la page requiert un rôle spécifique et que l'utilisateur n'a pas le bon rôle
//   if (to.meta.role && user?.role !== to.meta.role) {
//     return "/"; // On le renvoie à l'accueil
//   }

//   // 3. Sinon, on ne retourne rien (ou true) pour laisser la navigation s'effectuer normalement
//   return true;
// });
export default router;
