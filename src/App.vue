<template>
  <div>
    <router-view></router-view>
    <My />
    <button @click="click" class="xxxxx" style="color: red">helloWorld</button>
    <AppLink />
  </div>
</template>

<script>
import My from "./components/my";
import AppLink from "./components/AppLink"

export default {
  name: "App",
  data() {
    return {
      //将vm.$options.data存储在变量data中，同时vm新建私有属性_data映射该对象，这样就可以通过vm._data访问到data数据
      value: "11111",
    };
  },
  components: {
    My,AppLink
  },
  mounted() {
    console.log("My：",My);
    console.log("vue", this);
    console.log('getRoutes:',this.$router.getRoutes());
    // console.log('data',this._data.value);
  },
  methods: {
    click() {
      console.log("app", My);
      this.$router.push('/helloWorld')
      // console.log('vue',this);
      // console.log('data',this._data.value);
    },
  },
};
</script>

<style>
.xxxxx {
  background-color: bisque;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
