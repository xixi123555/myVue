import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

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
