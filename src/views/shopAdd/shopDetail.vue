<template>
<div>
	<div class="col-sm-8">
    	<pk-input sm="12" label="标题">
    		<input type="text" class="form-control" v-model="data.intro_title" name="">
    	</pk-input>    
    	<pk-input sm="12" label="描述">
    		<textarea type="text" class="form-control" v-model="data.intro_description" rows="3"></textarea>
    	</pk-input>     	
		<pk-input sm="12" label="详情页">
			<!-- <div class="border"> -->
				<pk-editor :html.sync="data.intro_content"></pk-editor>
			<!-- </div>	 -->
		</pk-input>
    	<div class="col-sm-11 pad-top pad-bot">
    		<button class="btn btn-primary" @click="submit">提交</button>
    	</div>	
    </div>
</div>
</template>
<script>
import {
	pkInput,
	pkEditor
} from "pk"
import {
	userShopService
}from "api"
	export default{
		props:["data"],
		components:{
			pkInput,
			pkEditor
		},
		data(){
			return {
				
			}
		},
		methods:{
			submit(){
				this.data.detail_id = this.data.id
				userShopService.shopUpdate(this.data)
				.then((res) =>{
					if(res.code==200){
						bus.$emit("showAlert",res.msg)
					}
				})
			},
		},
		mounted(){

		}
	}
</script>
<style scoped>
	#container,.mapBox{ 
    height: 500px; 
    overflow:hidden;
    margin-top:20px; 
    position: relative;
	}
	.mapBox{
		width: 50%;
	}
	#container{
		width: 100%;
	}
	.positionInfo{
		position: absolute;
		right: -50px;
		top:20px;
	}
</style>