<template>
  <div>
    <router-view ></router-view>
    <My />
    <button @click="click" class="xxxxx" style="color: red">helloWorld</button>
    <AppLink />
    <div style="margin-top:50px">
      <span style="width:400px;height:50px;display: inline-block">{{value}}</span>
      <div style="display:inline-block;width:400px">
        <div class="ccc">
          <IIInput placeholder="登录名"  v-model="value"></IIInput>
        </div>
        <div class="ccc">
          <IIInput placeholder="密码"  v-model="value"></IIInput>
        </div>
        <div class="ccc">
          <IIInput placeholder="验证码"  v-model="value"></IIInput>
        </div>
      </div>
    </div>
    <div style="margin-top:50px">
      <span style="width:400px;height:50px;display: inline-block">{{value}}</span>
      <div style="display:inline-block;width:400px">
        <div class="ccc">
          <IIInput labelPosition="top" placeholder="登录名"  v-model="value"></IIInput>
        </div>
        <div class="ccc">
          <IIInput labelPosition="top" placeholder="密码"  v-model="value"></IIInput>
        </div>
        <div class="ccc">
          <IIInput labelPosition="top" placeholder="验证码"  v-model="value"></IIInput>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import My from "./components/my";
import AppLink from "./components/AppLink"
import IIInput from "./components/setupEx"

export default {
  name: "App",
  data() {
    return {
      //将vm.$options.data存储在变量data中，同时vm新建私有属性_data映射该对象，这样就可以通过vm._data访问到data数据
      value: "",
    };
  },
  components: {
    My,AppLink,IIInput
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
  display: inline-block
}
.ccc {
  margin-top: 39px;
}

</style>
