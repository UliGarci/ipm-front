import AdminLayout from "@/components/admin/AdminLayout.vue";
import AdminDashboardView from "@/views/admin/AdminDashboardView.vue";
import UpdateUserView from "@/views/admin/UpdateUserView.vue";
import AreaListView from "@/views/admin/AreaListView.vue";

export default [
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        component: AdminDashboardView,
      },
      {
        path: "empleados",
        component: AdminDashboardView,
      },
      {
        path: "empleados/actualizarempleado",
        component: UpdateUserView,
      },
      {
        path:'departamentos',
        component:AreaListView
      }
    ],
    meta: { requiresAuth: true, roles: ["ROLE_ADMIN"] },
  },
];
