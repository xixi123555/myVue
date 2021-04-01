<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
//将vm.$options.data存储在变量data中，同时vm新建私有属性_data映射该对象，这样就可以通过vm._data访问到data数据
      value: '11111'
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    console.log(this.$router);
    console.log('vue',this);
    console.log('data',this._data.value);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
