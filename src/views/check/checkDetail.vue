<template>
  <div class="apply">
      <div class="title">
      <div class='left'><button @click="showList" class="btn btn-primary">商家列表</button><span> > 商家信息认证</span></div>
    </div>
   <div class="center col-sm-8 col-xs-12">

   	<!-- {{applyData|json}} -->
    <pk-panel theme="info" title='商家信息'>
      <div slot='body'>
		<pk-input sm="10" label="商家类型">
			<!-- <input class="form-control" v-model="applyData.shop_type" type="text"> -->
			<div class="border">
				<input type="text" class="form-control" v-if="applyData.shop_type==1" value="商家" disabled>	
				<input type="text" class="form-control" v-else value="生活">	
			</div>
		</pk-input>
		<pk-input sm="10" label="商家名称">
			<input class="form-control" v-model="applyData.business_name" type="text" disabled>
		</pk-input>
		<pk-input sm="10" label="公司名称">
			<input class="form-control" v-model="applyData.company_name" type="text" disabled>
		</pk-input>
		<pk-input sm="10" label="餐饮许可证">
			<div class="border">
				<pk-single-img :img.sync="applyData.health_permit"></pk-single-img>
			</div>
		</pk-input>
		<pk-input sm="10" label="营业执照">
			<div class="border">
				<pk-single-img :img.sync="applyData.business_licence"></pk-single-img>
			</div>
		</pk-input>									
      </div>
    </pk-panel>
    <pk-panel theme="info" title='运营人信息'>
      <div slot='body'>
		<pk-input sm="10" label="姓名">
			<input class="form-control" v-model="applyData.contact_name" type="text" disabled>
		</pk-input>
		<pk-input sm="10" label="身份证号码">
			<input class="form-control" v-model="applyData.id_number" type="text" disabled>
		</pk-input>
		<pk-input sm="10" label="手机号">
			<input class="form-control" v-model="applyData.contact_mobile" type="text" disabled>
		</pk-input>
		<pk-input sm="10" label="身份证正面">
			<div class="border">
				<pk-single-img :img.sync="applyData.id_card_1"></pk-single-img>
			</div>
		</pk-input>	
		<pk-input sm="10" label="身份证反面">
			<div class="border">
				<pk-single-img :img.sync="applyData.id_card_2"></pk-single-img>
			</div>
		</pk-input>											
      </div>
    </pk-panel> 
    <div v-if="applyData.validate_status==0">
      <button class="btn btn-primary" @click="checkPass">审核通过</button> 
      <button class="btn btn-danger" @click="checkRefuse">审核拒绝</button>       
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
	// applyTop
	pkSingleImg
  },
  data () {
    return {
      name: 'corner',
      applyData:Object.assign({}, this.data),
      isCheck: false,
      categoryList:[]
    }
  },
  methods:{
    showList(){
      this.$emit('update:show', true)
    },
   checkPass(){
   	// return console.log(this.applyData)
		userService.validateAct(this.applyData.id,1,"")
		.then(res => this.checkSuccess(res))
   },
   checkRefuse(){
    let str = window.prompt("请填写拒绝的理由，如果忽略点击取消")
    if(str == null ) return 
		userService.validateAct(this.applyData.id,2,str)
		.then(res => this.checkSuccess(res))
   },   
   checkSuccess(res){
   		if(res.code == 200){
        this.$emit('update:refresh', this.refresh++)
   			this.$emit('update:show', true)
   		}else{
   			alert(res.msg)
   		}
   },
   // setList(res){
   // 	if(res.code == 200){
   // 		this.categoryList = res.data
   // 	}else{
   // 		alert(res.msg)
   // 	}
   // }
  },
 mounted(){
 	console.log(this.refresh)
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

