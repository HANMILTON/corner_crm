<template>
  <div class="login" v-if="showLogin">
    <div class="login-box col-sm-3 col-xs-8">
      <h1>{{ name }}</h1>
      <form class="form-box">
        <div class="control-group">
           <input type="text" class="form-control" v-model="loginData.user_name" placeholder="邮箱/手机号">
        </div>
        <div class="control-group">
           <input type="password" class="form-control" v-model="loginData.password" placeholder="密码">
        </div>
        <div class="control-group">
           <button type="button" class="btn btn-primary btn-full" @click="login">登录</button>
        </div>    
      </form>   
    </div>
  </div>
</template>
<script>
import {
  pkInput
} from 'pk'
import {
  indexService
}from "api"
export default {
  components:{
    pkInput
  },
  data () {
    return {
      name: '拼客后台',
      loginData:{},
      showLogin: false
    }
  },
  methods:{
    login(){
      indexService.login(this.loginData)
      .then(res => this.loginSuccess(res))
    },
    loginSuccess(res){
      if(res.code == 200 || res.code == 201){
        let data = res.data
        sessionStorage.setItem("isLogin",1)
        sessionStorage.setItem("user_id",data.id)
        sessionStorage.setItem("upload_validate_str",data.upload_validate_str)
        this.$parent.isLogin = 1
        this.$router.push('/checkList')
        bus.$emit("showAlert",res.msg)
      }else if(res.code == 299){
        this.showLogin = true
      }
    },
  },
  mounted(){
    indexService.checkHasLogin()
    .then(res => this.loginSuccess(res))
  }
}
</script>
<style scoped>
  h1{
    font-size: 18px;
    padding: 100px 20px 30px;
  }
  .login{
    /*background-image: url("../assets/login_bg.png");    */
    background: white;
  }
  .login-box{
    margin: 0 auto;
    padding: 0 10px;
    float: none;
  }
  .control-group{
    position: relative;
    top:0;left: 0;
  }
</style>

