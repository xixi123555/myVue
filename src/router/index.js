import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
    {
        path: '/helloWorld',
        component: () => import ('../components/HelloWorld')
    },
    {
        path: '/',
        component: () => import ('../components/copy'),
        beforeEnter:(to, from, next) => {
            console.log('beforeEnter');
            next()
        }
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;