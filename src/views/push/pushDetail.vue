<template>
  <div class="apply">
      <div class="title">
      <div class='left'><button @click="showList" class="btn btn-primary">推送列表</button><span> > 推送编辑</span></div>
    </div>
    <div class="center col-sm-8 col-xs-12">
      <pk-input sm="12" label="推送类型">
        <div class="border">    
          <el-radio class="radio" v-model="pushData. push_type_2" label="1">标题</el-radio>
          <el-radio class="radio" v-model="pushData. push_type_2" label="2">标题、详情</el-radio> 
          <el-radio class="radio" v-model="pushData. push_type_2" label="3">标题、图片、详情</el-radio> 
        </div>
      </pk-input> 
  		<pk-input sm="12" label="推送标题">
  			<textarea class="form-control" v-model="pushData.title" type="text"></textarea>
  		</pk-input>
  		<pk-input sm="12" label="推送图片" v-if="pushData. push_type_2 == 3"> 
  			<div class="border">
  				<pk-single-img :img.sync="pushData.banner_img"></pk-single-img>
  			</div>
  		</pk-input>			
      <pk-input v-if="pushData. push_type_2 == 2 || pushData. push_type_2 == 3" sm="12" label="推送详情">
        <div class="border">
          <pk-editor :html.sync="pushData.content"></pk-editor>
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
      pushData:Object.assign({ push_type_2:"1"}, this.data),
    }
  },
    
  methods:{
   submit(){
    if(this.pushData.id){
      this.pushData.push_id = this.pushData.id
    }else{
      this.pushData.push_id = 0
    }
    userService.pushSubmit(this.pushData)
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
  },
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

