import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/menu.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about.vue'),
    },
    {
        path: '/play/tic-tac-toe',
        name: 'TicTac',
        component: () => import('@/games/tic-tac-toe/TicTac.vue'), // Lazy-loaded component
    },
    {
        path: '/play/rock-paper-scissors',
        name: 'rockPaperScissors',
        component: () => import('@/games/rock-paper-scissors/RockPaperScssors.vue')
    },
    {
        path: '/play/pong',
        name: 'pong',
        component: () => import('@/games/pong/pong.vue')
    },
    {
        path: '/play/minesweeper',
        name: 'minesweeper',
        component: () => import('@/games/minesweeper/MineSweeper.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;