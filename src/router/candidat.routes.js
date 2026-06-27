export const candidateRoutes = {
  path: "/candidat",
  component: () => import("../layouts/DashboardLayout.vue"),
  meta: { layout: "DashboardLayout", role: "candidat" },
  children: [
    { path: "dashboard", component: () => import("../pages/candidat/Dashboard.vue") },
    { path: "profile", component: () => import("../pages/candidat/Profil.vue") },
    { path: "settings", component: () => import("../pages/candidat/Settings.vue") },
  ],
};
