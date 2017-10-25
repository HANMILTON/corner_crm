<template>
  <div id="app">
    <login v-if="!isLogin"></login>
    <div v-else>
            <!-- 侧边栏 -->
      <div class="col-xs-12 col-sm-3 col-lg-2">
        <side-bar></side-bar>
        <button @click="logOut" class="log-out btn btn-danger">退出</button>
      </div>
      <!-- 内容区 -->
      <div class="col-xs-12 col-sm-9 col-lg-10">
        <router-view transition='fade' transition-mode='out-in'></router-view>
    </div> 
  </div>
    <pk-alert :msg='alertObj.msg' :theme='alertObj.theme' :show.sync='alertObj.show'></pk-alert>
  </div>
</template>
<script>
import {
  userService,
  indexService
} from 'api'
import{
  pkAlert
}from "pk"
import login from "./views/login"
import sideBar from "./views/sideBar"
import Vue from 'vue'
export default {
  name: 'app',
  components:{
    pkAlert,
    login,
    sideBar
  },
  data () {
    return {
      isLogin: sessionStorage.getItem("isLogin"),
      alertObj: {
        msg: '',
        show: false,
      },
    }
  },
  methods:{
    logOut(){
      indexService.logout()
        .then(res => {
          if(res.code == 200){
            this.$router.push('/login')
            this.isLogin = false
            sessionStorage.clear()
          }
        })
    },
    },
  mounted(){
    window.bus = new Vue()
    bus.$on('showAlert', (msg, theme) => {
        if(!theme) theme = "success"
        this.$notify({
          type:theme,
          message: msg,
          offset: 100,
          duration:2000
        });      
    })
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
