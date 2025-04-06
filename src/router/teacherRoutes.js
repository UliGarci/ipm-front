import TeacherLayout from "@/components/teacher/TeacherLayout.vue";
import TeacherDashboardView from "@/views/teacher/TeacherDashboardView.vue";

export default [
  {
    path: "/teacher",
    component: TeacherLayout,
    children: [{ path: "", component: TeacherDashboardView }],
    meta: { requiresAuth: true, roles: ['ROLE_TEACHER']}
  },
];
