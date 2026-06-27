
export const enterpriseRoutes = {
  path: "/entreprise",
  component: () => import("../layouts/DashboardLayout.vue"),
  meta: { layout: "DashboardLayout", role: "entreprise" },
  children: [
    { path: "dashboard", component: () => import("../pages/entreprise/Dashboard.vue") },
    { path: "settings", component: () => import("../pages/entreprise/Settings.vue") },
    { path: "detail", component: () => import("../pages/entreprise/CompanyDetail.vue") },
  ],
};