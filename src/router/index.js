import { createRouter, createWebHashHistory } from "vue-router";
import { useAuth } from "../composables/useAuth";

const { isAuthenticated , currentUser } = useAuth();
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/application/Home.vue"),
    meta: { layout: "AppLayout", title: "Accueil" },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/application/About.vue"),
    meta: { layout: "AppLayout", title: "À propos" },
  },
  {
    path: "/offres",
    name: "JobList",
    component: () => import("../pages/JobList.vue"),
    meta: { layout: "AppLayout", title: "Offres d'emploi", role: "candidat" },
  },
  {
    path: "/offres/:id",
    name: "JobDetail",
    component: () => import("../pages/jobDetail.vue"),
    props: true,
    meta: {
      layout: "AppLayout",
      title: "Détails de l'offre",
      role: "candidat",
    },
  },
  {
    path: "/offres/:id/postuler",
    name: "JobApply",
    component: () => import("../pages/candidat/JobPostule.vue"),
    props: true,
    meta: { layout: "AppLayout", title: "Postuler à l'offre" },
  },
  {
    path: "/message",
    name: "Message",
    component: () => import("../pages/Message.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      title: "Messagerie",
    },
  },
  {
    path: "/entreprises/details/:id",
    name: "CompanyDetail",
    component: () => import("../pages/entreprise/CompanyDetail.vue"),
    props: true,
    meta: { layout: "AppLayout", title: "Détails entreprise" },
  },
  {
    path: "/entreprise/dashboard/offres",
    name: "EntrepriseOffres",
    component: () => import("../pages/entreprise/JobManagement.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "entreprise",
      title: "Gestion des offres",
    },
  },
  {
    path: "/entreprise/dashboard/offres/:id",
    name: "AnnonceDetail",
    component: () => import("../pages/entreprise/AnnonceDetail.vue"),
    props: true,
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "entreprise",
      title: "Détails de l'annonce",
    },
  },
  {
    path: "/register",
    name: "ChooseAccountType",
    component: () => import("../pages/ChooseAccountPage.vue"),
    meta: { layout: "AuthLayout", title: "Créer un compte" },
  },
  {
    path: "/register/entreprise",
    name: "RegisterEntreprise",
    component: () => import("../pages/entreprise/Register.vue"),
    meta: { layout: "AuthLayout", title: "Inscription recruteur" },
  },
  {
    path: "/register/candidat",
    name: "RegisterCandidat",
    component: () => import("../pages/candidat/Register.vue"),
    meta: { layout: "AuthLayout", title: "Inscription candidat" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/Login.vue"),
    meta: { layout: "AuthLayout", title: "Connexion" },
  },
  {
    path: "/dashboard",
    name: "DashboardRedirect",
    redirect: () => {
      const user = JSON.parse(localStorage.getItem("mosalah_user") || "null");
      if (user?.role === "entreprise") {
        return { name: "EntrepriseDashboard" };
      }
      return { name: "CandidatDashboard" };
    },
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      title: "Tableau de bord",
    },
  },
  {
    path: "/candidat/dashboard",
    name: "CandidatDashboard",
    component: () => import("../pages/candidat/DashBoard.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "candidat",
      title: "Tableau de bord",
    },
  },
  {
    path: "/candidat/applications",
    name: "CandidatApplication",
    component: () => import("../pages/candidat/JobPostule.vue"),
    props: true,
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "candidat",
      title: "Mes candidatures",
    },
  },
  {
    path: "/candidat/profile",
    name: "CandidatViewProfile",
    component: () => import("../pages/candidat/Profil.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "candidat",
      title: "Mon profil",
    },
  },
  {
    path: "/candidat/job-requests",
    component: () => import("../pages/candidat/JobRequest.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "candidat",
      title: "Mes demandes d'emploi",
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
      title: "Paramètres",
    },
  },
  {
    path: "/candidats/details/:id",
    name: "CandidatDetail",
    component: () => import("../pages/candidat/CandidatDetail.vue"),
    props: true,
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "entreprise",
      title: "Détail candidat",
    },
  },
  {
    path: "/entreprises",
    name: "Entreprises",
    component: () => import("../pages/candidat/CompaniesCatalog.vue"),
    meta: { layout: "AppLayout", title: "Entreprises" },
  },
  {
    path: "/entreprise",
    name: "EntrepriseLandingPage",
    component: () => import("../pages/entreprise/entreprise.vue"),
    meta: { layout: "AppLayout", title: "Espace entreprise" },
  },
  {
    path: "/entreprise/dashboard",
    name: "EntrepriseDashboard",
    component: () => import("../pages/entreprise/JobManagement.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "entreprise",
      title: "Tableau de bord recruteur",
    },
  },
  {
    path: "/entreprise/stats",
    name: "EntrepriseStats",
    component: () => import("../pages/entreprise/Stats.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "entreprise",
      title: "Statistiques",
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
      title: "Candidats",
    },
  },
  {
    path: "/entreprise/candidats/:id",
    name: "CandidatProfile",
    component: () => import("../pages/entreprise/CandidatProfile.vue"),
    props: true,
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "entreprise",
      title: "Profil candidat",
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
      title: "Paramètres",
    },
  },
  {
    path: "/confidentialite",
    name: "Confidentialite",
    component: () => import("../pages/application/PrivacyPolicy.vue"),
    meta: { layout: "AppLayout", title: "Confidentialité" },
  },
  {
    path: "/candidats",
    name: "Candidats",
    component: () => import("../pages/application/GlobalCandidatCatalog.vue"),
    meta: { layout: "AppLayout", title: "Liste des candidats" },
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("../pages/Notifications.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      title: "Notifications",
    },
  },{
    path: "/entreprise/create-annonce",
    name: "CreateAnnonce",
    component: () => import("../pages/entreprise/CreateAnnonce.vue"),
    meta: {
      layout: "DashboardLayout",
      requiresAuth: true,
      role: "entreprise",
      title: "Créer une annonce",
    },
  },{
  path: "/demandes/:id",
  name: "DemandeDetail",
  component: () => import("../pages/entreprise/DemandeDetail.vue"),
  props: true,
  meta: {
    layout: "DashboardLayout",
    requiresAuth: true,
    role: "entreprise",
    title: "Détail de la demande",
  },
},{
  path: "/demandes",
  name: "DemandesList",
  component: () => import("../pages/entreprise/DemandesList.vue"),
  meta: {
    layout: "DashboardLayout",
    requiresAuth: true,
    role: "entreprise",
    title: "Demandes des candidats",
  },
},
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../pages/application/NotFound.vue"),
    meta: {
      layout: isAuthenticated.value ? "AuthLayout" : "AppLayout",
      title: "Page introuvable",
      requiresAuth: false,
      role: currentUser.value?.role,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("mosalah_user") || "null");

  if (to.meta.requiresAuth && !user) {
    return next({ name: "Login" });
  }

  if (to.meta.role && user?.role !== to.meta.role) {
    return next({ name: "Home" });
  }

  if (
    user &&
    [
      "Login",
      "ChooseAccountType",
      "RegisterEntreprise",
      "RegisterCandidat",
    ].includes(to.name)
  ) {
    return next({
      name:
        user.role === "entreprise"
          ? "EntrepriseDashboard"
          : "CandidatDashboard",
    });
  }

  if (user && ["Home", "EntrepriseLandingPage"].includes(to.name)) {
    return next({
      name:
        user.role === "entreprise"
          ? "EntrepriseDashboard"
          : "CandidatDashboard",
    });
  }

  const appName = "Mosalah";
  document.title =
    typeof to.meta.title === "string"
      ? `${to.meta.title} | ${appName}`
      : appName;

  const dynamicLayouts = [
    "JobList",
    "Entreprises",
    "Candidats",
    "CompanyDetail",
    "JobDetail",
  ];
  if (dynamicLayouts.includes(to.name) && user) {
    to.meta.layout = "DashboardLayout";
  }

  next();
});

export default router;
