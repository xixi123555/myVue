import { createRouter, createWebHashHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue' 

// const factory = (path) => defineAsyncComponent((path) => import(path))
// const factory = (path) => defineAsyncComponent(() => import(path))

const routes = [
    {
        path: '/helloWorld',
        component: () => import("../components/HelloWorld")
    },
    {
        path: '/copy/:id',
        component: () => import("../components/copy"),
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