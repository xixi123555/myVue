1. 事件总线的实现方式，观察者模式的理解
   ```js
        import { createApp} from 'vue'

        class Bus {
            constructor () {
                this.eventHandles = {}
            },
            $on(eventName,eventHandle) {
                this.eventHandles[eventName] = eventHandle
            },
            $emit(eventName,args) {
                if(this.eventHandles[eventName]) {
                    this.eventHandles[eventName](args)//只支持单个事件方法
                }
            }
        }

        const app = createApp(App).config.$bus = new Bus();

   ```
2. 相关性组件的通信  
   ***`父子组件的通讯:`*** 1. props传递属性，emit（）抛出事件； 2.父子组件中各自访问$parents,$children  3.父组件中直接使用ref来访问组件或者元素  
   ***`爷孙组件的通讯：`*** 需要借助中间组件即父组件，在父组件中v-bind=“\$attrs”,子组件中访问\$attrs即可；在父组件中v-on=“$listeners”,子组件中emit(),爷爷组件中实现该事件即可  
   ***`同族组件的通讯：`*** provide/inject,祖组件中 provide( ){ return{...} } ,后代组件中 inject:{ } **`(和props的写法类似)`**  
3. 插槽，重点作用于插槽
   ```js
        //component1
        <slot :someAttr="someValue"></slot>

        //component2
        <component1>
            <template v-slot:default="component1Slot">
                {{component1Slot.someAttr}}//这里是在组件2中访问组件1中的值，在组件2中呈现，在组件1中表达
            </template>
        </component1>
   ```
