<template>
  <div class="apply">
      <div class="title">
      <div class='left'><button @click="showList" class="btn btn-primary">运营 </button><span> > 运营编辑</span></div>
    </div>
   <div class="center col-sm-8 col-xs-12">
    <pk-panel theme="info" title='场景信息'>
      <div slot='body'>
    		<pk-input sm="10" label="场景">
    			<input class="form-control" v-model="sceneData.scene_name" type="text">
    		</pk-input>
    		<pk-input sm="10" label="场景轮播图片">
    			<div class="border">
    				<pk-single-img :img.sync="sceneData.scene_img"></pk-single-img>
    			</div>
    		</pk-input>
        </pk-input>
        <pk-input sm="10" label="场景列表图片">
          <div class="border">
            <pk-single-img :img.sync="sceneData.scene_img_2"></pk-single-img>
          </div>
        </pk-input>  
        <pk-input sm="10" label="本地图片名称">
          <input class="form-control" v-model="sceneData.scene_img_name_local" type="text">
        </pk-input>              
    		<pk-input sm="10" label="理由">
          <input class="form-control" v-model="sceneData.scene_reason" type="text">
    		</pk-input>		
        <pk-input sm="10" label="旅游场景">
        <div class="border">
          <el-radio class="radio" v-model="sceneData.is_travel_scene" label="1">是</el-radio>
          <el-radio class="radio" v-model="sceneData.is_travel_scene" label="0">否</el-radio>
        </div>
        </pk-input> 	
        <pk-input sm="10" label="顺序(由小到大)">
          <input class="form-control" v-model="sceneData.sort" type="text">
        </pk-input> 			
        <pk-input sm="10" label="置顶时间段">
          <input class="form-control" v-model="sceneData.hour_suggest_str" type="text">
        </pk-input>         
      </div>
    </pk-panel>
    <div class="col-sm-12 pad-top pad-bot">
      <button class="btn btn-primary" @click="submit">提交</button>  
    </div>
   </div>
   
  </div>
</template>
<script>
import {
	pkInput,
	pkPanel,
	pkSingleImg
} from "pk"
import{
	userService
}from "api"
export default{
	props:["data","show","refresh"],
  components:{
  	pkInput,
		pkPanel,
	 pkSingleImg
  },
  data () {
    return {
      name: 'corner',
      sceneData:Object.assign({is_travel_scene:"0"}, this.data),
      isCheck: false,
      categoryList:[],

    }
  },
  methods:{
   submit(){
    let id = this.sceneData.id
    if(id){
      this.sceneData.scene_id = id
    }else{
      this.sceneData.scene_id = 0
    }
    // this.sceneData.scene_img = "http://shop.findfit.cn/Uploads/images/2017-07-05/3_595cb0067b75f.png"
    userService.sceneSubmit(this.sceneData)
    .then((res) => {
      if(res.code==200){
        console.log(typeof this.refresh)
        let num = Math.floor(Math.random()*1000)
        this.$emit('update:refresh',num)
        this.$emit('update:show', true)
      }
      bus.$emit(res.msg)
    })
   },
   showList(){
    this.$emit('update:show', true)
   }
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

