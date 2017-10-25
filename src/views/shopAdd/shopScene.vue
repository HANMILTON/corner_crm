<template>
  <div class="col-sm-10">
  <button class="btn btn-primary" @click="addScene()"> 添加场景</button>
  <div v-for="(data,index) in data" class="mar-top">
    <pk-input sm="10">
      <div class="border">
        <pk-input sm="10" :label="data.scene_name">
          <textarea type="text" class="form-control" v-model="data.description" name="" rows="3"></textarea>
        </pk-input>      
        <button class="btn btn-danger mar-top" @click="deleteScene(index)">删除</button> 
      </div>
    </pk-input>    
  </div>
  <div v-if="data.length>0" class="col-sm-10 btn-pad text-center"><button class="pk-btn-main offset-left-100" @click="submit">提交</button> </div>
  <!-- {{showAdd}} -->
  <add-panel v-if="showAdd" :show.sync="showAdd" :data="data"></add-panel>
  </div>
</template>
<script>
import {
  pkInput,
  pkSingleImg
} from "pk"
import{
  userShopService
} from "api"
import addPanel from "./addPanel"

  export default{
    components:{
      pkInput,
      pkSingleImg,
      addPanel
    },
    props:["data","id","refresh"],
    data(){
      return {
        // data:this.data,
        showAdd: false
      }
    },
    methods:{
      addScene(){
        this.showAdd = true
      },
      deleteScene(index){
        this.data.splice(index,1)
      },
      updateList(res,index){
        if(res.code==200){
          bus.$emit("showAlert",res.msg)
          let num = Math.floor(Math.random()*1000)
          this.$emit("update:refresh",num)
        }
      },
      submit(){
        this.data.forEach(data => {
          delete data.id
          delete data.shop_detail_id
        })
        userShopService.shopDetailSceneSubmit(this.id,this.data)
        .then(res => {
          bus.$emit("showAlert",res.msg)
        })
      }
    },
    mounted(){
      // this.getSceneList()
    }
  }
</script>
<style scoped>
  .mar-top{
    margin-top: 23px;
  }
</style>