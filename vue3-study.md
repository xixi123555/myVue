# vue3.0.0 #
1. 文档地址： [vue3官方文档](https://v3.cn.vuejs.org/guide/introduction.html)
2. data,methods等属性的代理:  
   vue2.x的this.$options.data.someKey 和 this.someKey等价关系通过下面函数来实现 **`(伪源码) `** 
   vue3.0的代理用的是es6中的Proxy   new Proxy(vm, handler)
```js
    //vue2.x的原理
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
3. **vue的编译过程`（用webpack等打包工具）:（不用打包工具时，vue自己本身也有编译的能力，根据render函数是否存在）`** 
   打包时，调用vue-template-compiler(编译器)将template,script,style部分的代码解析。【主要是调用compiler.parseComponent(file, [options])方法将整个.vue文件解析为描述性对象，进而调用vue-loader,将此描述性对象组装为ES模块，并导出为vue组件对象】这个过程  .vue文件 --> js文件，这个过程也生成了render函数。故打印的component除data,metheds等之外还添加了一个render函数。
   ```js
        //.vue
        <template>
            <div>hellow</div>
        </template>
        <script>
            export.default {
                name: HELLOW,
                data(){return{}}
            }
        </script>
        <style></style>
   ```
   <center>||</center>
   <center>compiler.parseComponent(file, [options])</center>
   <center>||</center>

   ```js
        template: {
            type: 'template',
            content: '\n<div>hellow</div>\n',
            start: 10,//除template标签以外的开始位置
            attrs: {},//</template>结束位置
            end: 37
        },
        script: {
            type: 'script',
            content: '\n' +
            'export default {\n' +
            '  name: HELLOW\n'
            '  data () {}\n' +
            '  }\n' +
            '}\n',
            start: 77,
            attrs: {},
            end: 174
        },
        styles: [
                    {
                    type: 'style',
                    content: '',
                    start: 194,
                    attrs: {},
                    end: 236
                    }
                ],
   ```

   <center>||</center>
   <center>vue-loader</center>
   <center>||</center>

    
   ```js
        {
            name: HELLOW,
            data(){return {}},
            render(){...}
        }
   ```
   render函数是由compiler.compile(template, [options])方法生成,生成之后由vue-loader加入返回的ESModule中。自此编译过程结束，也将浏览器或者node不认识的vue文件翻译成了js代码。而后实例化时执行render函数生成虚拟dom，执行vue的Patch方法将虚拟dom变成真实dom
   ```js
        //compiler.compile方法返回值
        {
            ast: ASTElement, // 解析模板生成的ast，也就是抽象语法树
            render: string,	 // 渲染函数
            staticRenderFns: Array<string>, // 静态子树（diff算法更高效）
            errors: Array<string>,
            tips: Array<string>
        }
   ```

4. setup()方法的前世今生:  
   每一个组件都是一个Vue构造函数的子类,实例化的过程中，setup执行在beforCreated之后，created之前，该方法不能访问this **`(undefined)`**，setup方法只能是同步的，不能异步。setup方法是Composition API的入口，和之前的option API有一定的差异。这样也是为了让代码可以分割开，也不用考虑this指向的问题。除props外，其他的option都可以聚合到该方法内部。
5. ref()和reactive()方法  
   两者都是为把数据变成响应式的，前置用于值类型，后者用于应用类型。在使用ref包装后，要赋值或取值要使用 **`.value`**
---


# vue-router 4.0.0 #
1. 文档地址： [vue-router4.0.0官方文档](https://next.router.vuejs.org/zh/guide/)
2. 使用方式： 
```js
    import { createRouter, createWebHashHistory } from 'vue-router';
    const routes = [];
    const router = createRouter({
        history: createWebHashHistory(),
        routes,
        scrollBehavior(to,from,savePostion) {//仅在触发浏览器的前进后退事件时执行
            //...
        }
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
9. setup中的router和route： 
    由于不能访问this，故要采用以下方式,并且不用返回router和route **`（在模板中可以访问$routehe 和 $router）`**
    ```js
        import { useRouter ,useRoute} from 'vue-router';

        export default {
            setup(props,contex) {
                const router = useRouter();//等价于this.$router
                const route = useroute();//相当于this.$route
                router.push({path: '/home',query: {aaa:'xxx'}})
                //...
            }
        }
    ```
10. 路由的重定向不是中断一次导航守卫，而是创建一个新的导航
---


# vuex 4.x #