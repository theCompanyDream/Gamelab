import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'TicTac',
        component: () => import('./games/tic-tac-toe/TicTac.vue'), // Lazy-loaded component
    },
    {
        path: '/rock',
        name: 'rockPaperScissors',
        component: () => import('./games/rock-paper-scissors/RockPaperScssors.vue')
    },
    {
        path: '/pong',
        name: 'pong',
        component: () => import('./games/pong/pong.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;