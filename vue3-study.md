# vue3.0.0 #
1. 文档地址： [vue3官方文档](https://v3.cn.vuejs.org/guide/introduction.html)
2. data,methods等属性的代理:  
this.$options.data.someKey 和 this.someKey等价关系通过下面函数来实现 **`(伪源码) `** 
```js
    function initData (vm) {
        var data = vm.$options.data;
        vm._data = data;//在实例上创建一个_data的私有属性
        // ...methods,props等
        var key = Object.keys(data);
        var i = key.length;
        while(i--) {
            proxy(vm,"_data",key)//将vm._data代理到vm上
        }
        const commomObject = {
            enumerable: true,
            configurable: true,
            get: noop,//vue源码中 const NOOP = () => { };空函数
            set: noop
        }
        function proxy (target,suorceKey,key) {
            commomObject.get = function proxyGetter() {return this[suorceKey][key];}
            commomObject.set = function proxySetter(val) {return this[suorceKey][key] = val};
            Object.defineProperty(target,key,commomObject);//将在vm上添加key属性，值为commomObject的值，并添加get，set方法
        }
    }
```
3. createApp()方法的来龙去脉
4. setup()方法的前世今生
5. ref()和reactive()方法
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
6. 嵌套路由使用别名时，如别名为带‘/’的字符串，则真正的别名不用带上父级路由。
```js
    const routes = [
        {
            path: '/home',
            children: [
                {
                    path: '/son',
                    component: myComponent,
                    alias: ['/son1', 'son2']
                }
                //  /home/son    /home/son2     /son1   三者都指向myComponent组件
            ]
        }
    ]
```
7. 组件内的守卫，beforeRouteEnter()中不能访问this，beforeRouteUpdate()和beforeRouteLeave()中能访问this
8. 路由钩子的执行过程：   
   <img src="./路由过程.png">
---


# vuex 4.x #