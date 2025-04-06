import { createRouter, createWebHistory } from "vue-router";
import adminRoutes from "@/router/adminRoutes";
import employeeRoutes from "@/router/employeeRoutes";
import teacherRoutes from "@/router/teacherRoutes";
import LoginView from "@/views/LoginView.vue";
import { jwtDecode } from "jwt-decode";

const routes = [
    { path: "/", component: LoginView, meta: { isPublic: true } },
    ...adminRoutes,
    ...employeeRoutes,
    ...teacherRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('t');
    
    if (token) { 
        try {
            const decoded = jwtDecode(token);
            const userRole = decoded.authorities;
            const currentTime = Math.floor(Date.now() / 1000);

            // Validar que el token aún sea válido
            if (decoded.exp < currentTime) { 
                localStorage.removeItem('t');
                return next('/'); 
            }

            // Redirección al flujo de rutas por roles desde rutas públicas
            if (to.meta.isPublic) { 
                if (userRole === "ROLE_ADMIN") return next("/admin");
                if (userRole === "ROLE_TEACHER") return next("/teacher");
                if (userRole === "ROLE_EMPLOYEE") return next("/employee");
                return next('/'); 
            }

            // Validación de autorización de roles
            if (to.path.startsWith('/admin') && userRole !== "ROLE_ADMIN") return next('/');
            if (to.path.startsWith('/teacher') && userRole !== "ROLE_TEACHER") return next('/');
            if (to.path.startsWith('/employee') && userRole !== "ROLE_EMPLOYEE") return next('/');

            return next(); 
            
        } catch (error) {
            localStorage.removeItem('t');
            return next('/');
        }
    }

    if (to.meta.isPublic) return next(); 

    return next('/'); 
});

export default router;