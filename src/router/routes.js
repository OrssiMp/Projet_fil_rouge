import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // =========================================================================
  // 🌍 1. ZONE PUBLIQUE & CANDIDAT (Layout : AppLayout)
  // =========================================================================
  {
    path: "/",
    component: () => import("../layouts/AppLayout.vue"), // Optionnel si géré globalement, sinon encapsulé ici
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../pages/application/Home.vue"),
        meta: { title: "Accueil" }
      },
      {
        path: "about",
        name: "About",
        component: () => import("../pages/application/About.vue"),
        meta: { title: "À propos" }
      },
      {
        path: "confidentialite",
        name: "Confidentialite",
        component: () => import("../pages/application/PrivacyPolicy.vue"),
        meta: { title: "Politique de confidentialité" }
      },
      // --- Catalogue public des offres & détails
      {
        path: "offres",
        name: "JobList",
        component: () => import("../pages/JobList.vue"),
        meta: { title: "Offres d'emploi" }
      },
      {
        path: "offres/:id",
        name: "JobDetail",
        component: () => import("../pages/JobDetail.vue"),
        meta: { title: "Détails de l'offre" }
      },
      {
        path: "offres/:id/postuler",
        name: "JobApply",
        component: () => import("../pages/candidat/JobPostule.vue"),
        props: true,
        meta: { title: "Postuler à l'offre" }
      },
      // --- Catalogues spécifiques
      {
        path: "entreprises",
        name: "Entreprises",
        component: () => import("../pages/candidat/CompaniesCatalog.vue"),
        meta: { title: "Catalogue des entreprises", requiresAuth: true, role: "candidat" }
      },
      {
        path: "entreprises/details/:id",
        name: "CompanyDetail",
        component: () => import("../pages/entreprise/CompanyDetail.vue"),
        props: true,
        meta: { title: "Vitrine Entreprise" }
      },
      {
        path: "candidats",
        name: "Candidats",
        component: () => import("../pages/application/GlobalCandidatCatalog.vue"),
        meta: { title: "Vivier des Talents" }
      }
    ]
  },

  // =========================================================================
  // 🔐 2. ZONE AUTHENTIFICATION (Layout : AuthLayout)
  // =========================================================================
  {
    path: "/auth",
    redirect: "/login",
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../pages/Login.vue"),
        meta: { layout: "AuthLayout", title: "Connexion" }
      },
      {
        path: "/register",
        name: "ChooseAccountType",
        component: () => import("../pages/ChooseAccountPage.vue"),
        meta: { layout: "AuthLayout", title: "Créer un compte" }
      },
      {
        path: "/register/entreprise",
        name: "RegisterEntreprise",
        component: () => import("../pages/entreprise/Register.vue"),
        meta: { layout: "AuthLayout", title: "Inscription Recruteur" }
      },
      {
        path: "/register/candidat",
        name: "RegisterCandidat",
        component: () => import("../pages/candidat/Register.vue"),
        meta: { layout: "AuthLayout", title: "Inscription Candidat" }
      }
    ]
  },

  // =========================================================================
  // 🎛️ 3. ZONE DASHBOARD CANDIDAT (Layout : DashboardLayout)
  // =========================================================================
  {
    path: "/candidat",
    redirect: "/candidat/dashboard",
    meta: { layout: "DashboardLayout", requiresAuth: true, role: "candidat" },
    children: [
      {
        path: "dashboard",
        name: "CandidatDashboard",
        component: () => import("../pages/candidat/Dashboard.vue"),
        meta: { title: "Tableau de bord" }
      },
      {
        path: "applications",
        name: "CandidatApplication",
        component: () => import("../pages/candidat/JobPostule.vue"),
        meta: { title: "Mes candidatures" }
      },
      {
        path: "profile",
        name: "CandidatProfile",
        component: () => import("../pages/candidat/Profil.vue"),
        meta: { title: "Mon Profil" }
      },
      {
        path: "settings",
        name: "CandidatSettings",
        component: () => import("../pages/candidat/Settings.vue"),
        meta: { title: "Paramètres" }
      }
    ]
  },

  // =========================================================================
  // 🏢 4. ZONE DASHBOARD ENTREPRISE / RECRUTEUR (Layout : DashboardLayout)
  // =========================================================================
  {
    path: "/entreprise",
    redirect: "/entreprise/dashboard",
    meta: { layout: "DashboardLayout", requiresAuth: true, role: "entreprise" },
    children: [
      {
        path: "landing",
        name: "EntrepriseLandingPage",
        component: () => import("../pages/entreprise/entreprise.vue"),
        meta: { layout: "AppLayout", title: "Espace Recruteur" } // S'écarte temporairement du layout par défaut
      },
      {
        path: "dashboard",
        name: "EntrepriseDashboard",
        component: () => import("../pages/entreprise/Dashboard.vue"),
        meta: { title: "Vue d'ensemble" }
      },
      {
        path: "offres",
        name: "EntrepriseOffres",
        component: () => import("../pages/entreprise/CompanyDashboardJobs.vue"), // Intègre ton composant optimisé
        meta: { title: "Gestion des offres" }
      },
      {
        path: "candidats",
        name: "EntrepriseCandidats",
        component: () => import("../pages/entreprise/CandidatList.vue"),
        meta: { title: "Candidats reçus" }
      },
      {
        path: "settings",
        name: "EntrepriseSettings",
        component: () => import("../pages/entreprise/Settings.vue"),
        meta: { title: "Mon Compte" }
      }
    ]
  },

  // =========================================================================
  // 🚫 5. ERREUR 404 (Capture universelle)
  // =========================================================================
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../pages/application/NotFound.vue"),
    meta: { layout: "AuthLayout", title: "Page introuvable" }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Règle pro bonus : force le retour en haut de page lors d'un changement de route
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

// =========================================================================
// 🛡️ NAVIGATION GUARDS (🔒 Sécurisation des accès sans effet next())
// =========================================================================
router.beforeEach((to) => {
  const user = JSON.parse(localStorage.getItem("mosalah_user") || "null");

  // Dynamique : Change le titre de l'onglet du navigateur automatiquement
  const appName = "Mosalah";
  document.title = to.meta.title ? `${to.meta.title} | ${appName}` : appName;

  // 1. Protection d'authentification
  if (to.meta.requiresAuth && !user) {
    return { name: "Login" }; // Redirection explicite par le nom de la route
  }

  // 2. Protection par Rôle sémantique
  if (to.meta.role && user?.role !== to.meta.role) {
    return { name: "Home" }; // Redirection vers l'accueil si non autorisé
  }

  return true;
});

export default router;