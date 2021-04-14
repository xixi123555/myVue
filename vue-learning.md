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