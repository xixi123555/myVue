import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
    {
        path: '/',
        component: () => import ('../components/HelloWorld')
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;