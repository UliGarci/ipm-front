import {createRouter, createWebHistory} from 'vue-router';

// importaciones de vistas
import UpdateUserView from '../views/admin/UpdateUserView.vue'
import App from '../App.vue'

//lista de rutas
const routes=[
    {path:'/', component:App},
    {path:'/updateuser', component:UpdateUserView},
];

//creacion de las rutas
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;