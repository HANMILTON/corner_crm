<template>  
  <div>
    <div class="page-header">
       <h4><button class="btn btn-primary" @click="back">用户列表</button> > <span style="color:green">用户信息</span></h4>
    </div>
    <div class="center col-sm-7 col-xs-12">
      <pk-panel theme="info" title='用户基本信息'>
        <div slot='body'>
        <!-- {{data}} -->
          <pk-input sm="12" label ="昵称">
            <input type="text" class="form-control" v-model="data.user_name" name="">
          </pk-input>
          <pk-input sm="12" label ="性别">
            <input type="text" class="form-control" v-model="data.user_gender" name="">
          </pk-input>
          <pk-input sm="12" label ="籍贯">
            <input type="text" class="form-control" v-model="data.native" name="">
          </pk-input>  
          <pk-input sm="12" label ="生日">
            <input type="text" class="form-control" v-model="data.birth" name="">
          </pk-input> 
          <pk-input sm="12" label ="年龄">
            <input type="text" class="form-control" v-model="data.age" name="">
          </pk-input> 
          <pk-input sm="12" label ="星座">
            <input type="text" class="form-control" v-model="data.constellation" name="">
          </pk-input>                                       
        </div>
      </pk-panel>
    </div>
    <div class="center col-sm-7 col-xs-12">
      <pk-panel theme="info" title='用户特性'>
        <div slot='body'>
          <pk-input sm="12" label ="爱好">
            <input type="text" class="form-control" v-model="data.hobby" name="">
          </pk-input>
          <pk-input sm="12" label ="口味">
            <input type="text" class="form-control" v-model="data.taste" name="">
          </pk-input>
          <pk-input sm="12" label ="菜系">
            <input type="text" class="form-control" v-model="data.cuisine" name="">
          </pk-input>                                         
        </div>
      </pk-panel>
    </div>    
  </div>
</template>
<script>
  import{
    pkInput,
    pkPanel
  }from "pk"
  import {
    userService,
    publicService
  }from "api"
  export default{
    props:["show","data"],
    components:{
      pkInput,
      pkPanel
    },
    data(){
      return {

      }
    },
    methods:{
      back(){
        this.$emit("update:show",true)
      },
      updateInfo(){
        let gender = this.data.user_gender 
        switch(gender){
          case "0":
            this.data.user_gender = "女"
            break;
          case "1":
            this.data.user_gender = "男"
            break;    
          default:
            this.data.user_gender = "未知" 
            break;
        }
        if(this.data.native){
          let proId =  this.data.native.split(",")[0]
          let cityId =  this.data.native.split(",")[1]
          this.setNativeInfo(proId,cityId)
        }else{
          this.data.native = "未填写"
        }
        this.data.hobby ? this.setUserHobby(this.data.hobby) : this.data.hobby = "未选择" 
        this.data.taste ? this.setUserTaste(this.data.taste) : this.data.taste = "未选择"
        this.data.cuisine ? this.setUserCuisine(this.data.cuisine) : this.data.cuisine = "未选择"
      },
      setNativeInfo(proId,cityId){
        let str = ""
        let proName = ""
        let cityName = ""
        publicService.getCityTop()
        .then((res) => {
          if(res.code==200){
            let proList = res.data
            let that = this
            proList.forEach(function(data){
              if(data.id == proId){
                proName = data.name
                if(cityName) that.data.native = proName + cityName
              }
            })
          }
        })
        publicService.getCitySub(1,proId)
        .then((res) => {
          if(res.code==200){
            let cityList = res.data
            let that = this
            cityList.forEach(function(data){
              if(data.id == cityId){
                cityName = data.name
                if(proName) that.data.native = proName + cityName
              }
            })
          }
        })
      },
      setUserHobby(hobbyStr){
        let hobbyArr = hobbyStr.split(",")
        let hobbyCn = ""
        userService.getHobbyList()
        .then(res => {
          let hobbyList = res.data
          hobbyList.forEach(function(data){
            if(hobbyArr.indexOf(data.id)!=-1){
              hobbyCn = hobbyCn + data.hobby_name + ","
            }
          })
          this.data.hobby = hobbyCn.slice(0,-1)
        })
      },
      setUserTaste(tasteStr){
        let tasteArr = tasteStr.split("|||")
        let tasteObj = [["甜度不甜", "甜度中甜", "甜度特甜"],["辣度不辣", "辣度中辣", "辣度重辣"],["口味清淡", "口味适宜", "口味浓重"],["钟爱素食", "荤素适宜", "钟爱肉食"]]
        let tasteCn = ""
        for(let i=0;i<tasteArr.length;i++){
          tasteCn += tasteObj[i][tasteArr[i]] +"-"
        }    
        this.data.taste = tasteCn.slice(0,-1)
      },
      setUserCuisine(cuisineStr){
        let cuisineArr = cuisineStr.split(",")
        let cuisineCn = ""
        userService.getCategoryList()
        .then(res => {
          let cuisineList = res.data[0].sub_category
          cuisineList.forEach(function(data){
            if(cuisineArr.indexOf(data.id)!=-1){
              cuisineCn = cuisineCn + data.category_name + ","
            }
          })
          this.data.cuisine = cuisineCn.slice(0,-1)
        })
      }
    },
    mounted(){
      // console.log(this.data)
      this.updateInfo()
    }
  }
</script>
<style scoped>
  .page-header{
    text-align: left;
    border-bottom: none;
  }
</style>