<template>
  <div class="apply">
      <div class="title">
      <div class='left'><button @click="showList" class="btn btn-primary">banner列表</button><span> > banner编辑</span></div>
    </div>
    <div class="center col-sm-8 col-xs-12">
  		<pk-input sm="12" label="图片标题">
  			<input class="form-control" v-model="bannerData.banner_title" type="text">
  		</pk-input>
  		<pk-input sm="12" label="图片上传"> 
  			<div class="border">
  				<pk-single-img :img.sync="bannerData.banner_img"></pk-single-img>
  			</div>
  		</pk-input>			
      <pk-input sm="12" label="跳转类型">
        <div class="border">
<!--           <input v-model="bannerData.banner_type" type="radio" name="type2" value="1">h5页面
          <input v-model="bannerData.banner_type" type="radio" name="type2" value="2">编辑器内容
          <input v-model="bannerData.banner_type" type="radio" name="type2" value="3">餐厅详情  -->     
          <el-radio class="radio" v-model="bannerData.banner_type" label="1">h5页面</el-radio>
          <el-radio class="radio" v-model="bannerData.banner_type" label="2">编辑器内容</el-radio> 
          <el-radio class="radio" v-model="bannerData.banner_type" label="3">餐厅详情</el-radio> 
        </div>
      </pk-input> 
      <pk-input v-if="bannerData.banner_type == 1" sm="12" label="跳转链接">
        <input class="form-control" v-model="bannerData.content" type="text">
      </pk-input>  
      <pk-input v-if="bannerData.banner_type == 2" sm="12" label="编辑内容">
        <div class="border">
          <pk-editor :html.sync="bannerData.content"></pk-editor>
        </div>
      </pk-input> 
      <pk-input v-if="bannerData.banner_type == 3" sm="12" label="餐厅名称">
        <div class="border"> 
          <pk-search :list='goList' :keyword.sync="bannerData.content"></pk-search>
        </div>
      </pk-input>         
      <div><button class="btn btn-primary" @click="submit">提交</button></div>
    </div>
  </div>
</template>
<script>
import {
	pkInput,
	pkSingleImg,
  pkEditor,
  pkSearch
} from "pk"
import{
	userService
}from "api"
export default{
	props:["data","show","refresh"],
  components:{
  	pkInput,
	 pkSingleImg,
   pkEditor,
   pkSearch
  },
  data () {
    return {
      bannerData:Object.assign({banner_type:"1"}, this.data),
      restlist:[],
      goList:[],
      serachObj:{
        page:1,
        per_page:1000,
        category_id: 1,
        is_online: 1
      },
    }
  },
    
  methods:{
   submit(){
    if(this.bannerData.id){
      this.bannerData.banner_id = this.bannerData.id
    }else{
      this.bannerData.banner_id = 0
    }
    userService.bannerSubmit(this.bannerData)
    .then(res => this.submitSuccess(res))
   },
   submitSuccess(res){
      if(res.code == 200){
        this.showList()
      }else{
        bus.$emit("showAlert",res.msg)
      }
   },
   showList(){
    this.$emit('update:refresh',-1)
    this.$emit('update:show',true)
   },
   setGoList(res){
      this.restList =  res.data.detail_list
      this.restList.forEach(rest => {
        this.goList.push(rest.shop_name + '@' + rest.id)
      })
   }
  },
  mounted(){
    userService.getShopList(this.serachObj)
    .then(res => this.setGoList(res))
  }
}
</script>
<style scoped>
.center{
	margin: 10px; 
}
.apply{
	overflow: hidden;
	text-align: center;
}
  .top-bar{
    height: 70px;
    border-bottom: 1px solid #cccccc;
    background: #64a1ff;
  }
  .position{
  	position: absolute;
  	right: -150px;
  	top:0px;
  }
  .title{
    padding:10px;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
  }
  .left{
    padding:6px 12px;
    font-size: 18px;
    float:left;
  }
  .left span:first-of-type{
    cursor: pointer;
  }
  .right{
    float:right;
  } 
</style>

