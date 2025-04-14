import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'TicTac',
        component: () => import('./TicTac.vue'), // Lazy-loaded component
    },
    {
        path: '/rock',
        name: 'rockPaperScissors',
        component: () => import('./RockPaperScssors.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;