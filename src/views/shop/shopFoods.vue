<template>
<!-- 	<div class="col-sm-10">
  <button class="btn btn-primary" @click="addFoods()"> 添加推荐菜</button>
  <div v-for="(v,index) in data">
    <pk-input sm="12" :label='"菜品"+(index+1)'>
    <div class="border">
        <pk-input sm="10" label="名称">
          <input type="text" class="form-control" v-model="v.dish_name" name="">
        </pk-input>
        <pk-input sm="10" label="图片">
          <div class="border">
            <pk-single-img :img.sync="v.dish_img"></pk-single-img>
          </div>
        </pk-input> 
        <pk-input sm="10" label="推荐理由">
          <input type="text" class="form-control" v-model="v.recommend_words" name="">
        </pk-input>      
        <button class="btn btn-primary" @click="updateFood(v,'update')">保存</button>    
        <button class="btn btn-danger" @click="updateFood(v,'del',index)">删除</button> 
      </div>
    </pk-input>    
  </div>
	</div> -->
<div class="col-sm-12">
  <!-- <button class="btn btn-info"> 添加推荐菜</button> -->
  <div class="food-top">
    <div class="food-right">
      <button class="pk-btn-danger" @click="addFoods()">添加推荐菜</button>
    </div>
  </div>
  <div v-for="(v,index) in data" class="col-sm-4">
    <div class="border border-box">
        <pk-input sm="12" label="名称">
          <input type="text" class="form-control" v-model="v.dish_name" name="">
        </pk-input>
        <pk-input sm="12" label="图片">
          <div class="border">
            <pk-single-img size="width" :img.sync="v.dish_img"></pk-single-img>
          </div>
        </pk-input> 
        <pk-input sm="12" label="推荐理由">
          <textarea class="form-control" v-model="v.recommend_words" name=""></textarea>
        </pk-input>      
      </div> 
      <div class="btn-box col-sm-12 text-center">
        <button class="pk-btn-main-small" @click="updateFood(v,'update')">保存</button>    
        <span class="danger-font" @click="updateFood(v,'del',index)">删除</span>         
      </div>

  </div>
  </div>
</template>
<script>
import {
	pkInput,
	pkSingleImg
} from "pk"
import{
  userService
} from "api"
	export default{
		components:{
			pkInput,
			pkSingleImg
		},
    props:["data","id","refresh"],
		data(){
			return {
				// data:this.data
			}
		},
    methods:{
      addFoods(){
        this.data.push({})
      },
      updateFood(data,type,index){
        if(type == "del"){
          if(data.id){
            userService.shopRecommendDelete(data.id)
            .then(res => this.updateList(res,index))            
          }else{
            this.data.splice(index,1)
          }
        }else if(data.id){
          data.recommend_id = data.id
          userService.shopRecommendSubmit(data)
          .then(res => this.updateList(res,index))
        }else{
          data.recommend_id = 0
          data.shop_detail_id = this.id
          userService.shopRecommendSubmit(data)
          .then(res => this.updateList(res,index))
        }
      },
      updateList(res,index){
        if(res.code==200){
          let num = Math.floor(Math.random()*1000)
          this.$emit("update:refresh",num)
        }
      }
    },
    mounted(){
      // this.getFoodList()
    }
	}
</script>
<style scoped>
  .wrap{
    padding-top: 20px;
    float: left;
  }
  .border-box{
    padding: 10px 0; 
    box-shadow: 0 0 5px #ddebff;
  }
  .food-top{
    text-align: right;
    padding-bottom: 20px; 
  }
  .btn-box{
    padding: 20px 0;
  }
</style>