import { createApp } from '../node_modules/vue'
import App from './App.vue'
import router from './router'

console.log(process.env.NODE_ENV);

router.beforeEach((to,from,next) =>{
    console.log('beforEach');
    next()
})

router.beforeResolve((to,from,next) => {
    console.log('beforeResolve');
    next()
})

router.afterEach((to,from) => {
    console.log('afterEach');
})
console.log(App);


createApp(App).use(router).mount('#app')
