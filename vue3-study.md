# VUE3.0.0 #
1. 文档地址： [vue3官方文档](https://v3.cn.vuejs.org/guide/introduction.html)
2.  
---


# vue-router 4.0.0 #
1. 文档地址： [vue-router4.0.0官方文档](https://next.router.vuejs.org/zh/guide/)
2. 使用方式： 
```js
    import { createRouter, createWebHashHistory } from 'vue-router';
    const routes = [];
    const router = createRouter({
        history: createWebHashHistory(),
        routes
    });
```
3. router.push()方法，中参数提供了path时params会被忽略
```js
    let param = 'you';
    router.push({name: 'my', params: { param }});//会跳到 /my/you ， you为参数
    router.push({path: '/my', params: { param }});//会跳转到 /my ，获取不到参数
```
4. router.replace() 和 router.push()的区别是前者不能返回当前的路由，而后者能
```js
    router.push({path: '/home', replace: true});
    router.replace({path: 'home'});//两者等价
```
5. this.router 和 this.route 的区别，前者是路由器负责执行，后者是路由表负责提供蓝图
---


# vuex 4.x #