import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'TicTac',
        component: () => import('./TicTac.vue'), // Lazy-loaded component
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;