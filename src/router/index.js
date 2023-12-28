import { createRouter, createWebHistory } from 'vue-router';
import Login from "../login/login.vue";
import List from "../login/list.vue";
import Home from "../home/Home.vue";


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/list',
                name: 'List',
                component: List,
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
