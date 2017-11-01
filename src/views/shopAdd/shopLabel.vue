<template>
<div>
	<div class="col-sm-8">
	<!-- {{editData}} -->
    <pk-input sm="6" label="甜度">
		<el-slider
	      v-model="taste_1"
	      range
	      show-stops
	      :format-tooltip="setPrompt1"
	      :max="2">
	    </el-slider>
	</pk-input> 
	<pk-input sm="6" label="辣度">
		<el-slider
	      v-model="taste_2"
	      range
	      show-stops
	      :format-tooltip="setPrompt2"
	      :max="2">
	    </el-slider>
	</pk-input> 
	<pk-input sm="6" label="口味">
		<el-slider
	      v-model="taste_3"
	      range
	      :format-tooltip="setPrompt3"
	      show-stops
	      :max="2">
	    </el-slider>
	</pk-input> 
	<pk-input sm="6" label="食材">
		<el-slider
	      v-model="taste_4"
	      range
	      :format-tooltip="setPrompt4"
	      show-stops
	      :max="2">
	    </el-slider>
	</pk-input> 
    	<pk-input sm="10" label="用户爱好">
	    	<div class="hobbyBox border">
		    	<div v-for="(data,index) in hobbyList" class="hobbyList col-sm-3">
		    		<div :class="{'hobby':true,'select': data.checked == true}" @click="setSelect(1,index)">{{data.hobby_name}}</div>
		    		<!-- <input type="hidden" v-model="data.checked" :value="true" name=""> -->
		    	</div>     		
	    	</div>    	
    	</pk-input>
    	<pk-input sm="10" label="商家风格">
	    	<div class="hobbyBox border">
		    	<div v-for="(data,index) in styleList" class="hobbyList col-sm-3">
		    		<div :class="{'hobby':true,'select': data.checked == true}" @click="setSelect(2,index)">{{data.style_name}}</div>
		    		<!-- <input type="hidden" v-model="data.checked" :value="true" name=""> -->
		    	</div>     		
	    	</div>    	
    	</pk-input>
    	<div class="col-sm-12 pad-top pad-bot">
    		<button class="btn btn-primary" @click="submit">提交</button>
    	</div>	
    </div>
</div>

</template>
<script>
import {
	pkInput,
} from "pk"

import {
	userShopService
}from "api"
import Vue from 'vue'
	export default{
		props:["data"],
		components:{
			pkInput,
		},
		data(){
			return {
				styleList:[],
				hobbyList: [],
				editData: this.data.taste_hobby ? this.data.taste_hobby : {},
				taste_1: this.data.taste_hobby ? [Number(this.data.taste_hobby.taste_1_s),Number(this.data.taste_hobby.taste_1_l)] : [0,0],
				taste_2: this.data.taste_hobby ? [Number(this.data.taste_hobby.taste_2_s),Number(this.data.taste_hobby.taste_2_l)] : [0,0],
				taste_3: this.data.taste_hobby ? [Number(this.data.taste_hobby.taste_3_s),Number(this.data.taste_hobby.taste_3_l)] : [0,0],
				taste_4: this.data.taste_hobby ? [Number(this.data.taste_hobby.taste_4_s),Number(this.data.taste_hobby.taste_4_l)] : [0,0],
			}
		},
		methods:{
			setTaste(obj){
				if(obj){
					this.taste_1=[Number(obj.taste_1_s),Number(obj.taste_1_l)]
					this.taste_2=[Number(obj.taste_2_s),Number(obj.taste_2_l)]
					this.taste_3=[Number(obj.taste_3_s),Number(obj.taste_3_l)]
					this.taste_4=[Number(obj.taste_4_s),Number(obj.taste_4_l)]
					console.log(this.taste_1,this.taste_2,this.taste_3,this.taste_4)
					return obj
				}else{
					this.taste_1=[0,0]
					this.taste_2=[0,0]
					this.taste_3=[0,0]
					this.taste_4=[0,0]
					return {}
				}
			},
			setPrompt1(val){
				switch(val){
					case 0:
						return "0分甜";
						break;
					case 1:
						return "5分甜";
						break;
					case 2:
						return "10分甜";
						break;
				}
			},
			setPrompt2(val){
				switch(val){
					case 0:
						return "不辣";
						break;
					case 1:
						return "中辣";
						break;
					case 2:
						return "特辣";
						break;
				}
			},
			setPrompt3(val){
				switch(val){
					case 0:
						return "清淡";
						break;
					case 1:
						return "适宜";
						break;
					case 2:
						return "浓重";
						break;
				}
			},
			setPrompt4(val){
				switch(val){
					case 0:
						return "素食";
						break;
					case 1:
						return "适宜";
						break;
					case 2:
						return "肉食";
						break;
				}
			},
			submit(){
				// return this.taste_1=[0,2]
				let arr = []
				this.hobbyList.forEach(data =>{
					if(data.checked){
						arr.push(data.id)
					}
				})
				this.editData.hobby_list = arr.join()
				let arr2 = []
				this.styleList.forEach(data =>{
					if(data.checked){
						arr2.push(data.id)
					}
				})
				this.editData.style_list = arr2.join()
				// if(this.editData)
				for(let i=1;i<5;i++){
					this.editData['taste_'+i+'_s'] = this['taste_'+i][0]
					this.editData['taste_'+i+'_l'] = this['taste_'+i][1]
				}

				this.editData.shop_detail_id = this.data.id
				// return console.log(this.editData)
				userShopService.tasteHobbySubmit(this.editData)
				.then(res =>{
					bus.$emit("showAlert",res.msg)
				})
			},
			setSelect(flag,index){
				if(flag == 1){
					let obj = this.hobbyList[index]
					obj.checked = !this.hobbyList[index].checked
					Vue.set(this.hobbyList,index,obj)					
				}else{
					let obj = this.styleList[index]
					obj.checked = !this.styleList[index].checked
					Vue.set(this.styleList,index,obj)	
				}

			},
			setHobby(){
				let hobbyListArr = this.editData.hobby_list ? this.editData.hobby_list.split(",") : []
				userShopService.getHobbyList()
				.then(res => {
					if(res.code==200){
						let hobbyArr = res.data
						hobbyArr.forEach(data => {
							if(hobbyListArr.indexOf(data.id)!=-1){
								data.checked = true
							}else{
								data.checked = false
							}
						})
						this.hobbyList = hobbyArr;
					}
				})
			},
			setStyle(){
				let styleListArr = this.editData.style_list ? this.editData.style_list.split(",") : []
				userShopService.getStyleList()
				.then(res => {
					if(res.code==200){
						let styleArr = res.data
						styleArr.forEach(data => {
							if(styleListArr.indexOf(data.id)!=-1){
								data.checked = true
							}else{
								data.checked = false
							}
						})
						this.styleList = styleArr;
					}
				})
			}

		},
		mounted(){
			this.setHobby()
			this.setStyle()
		}
	}
</script>
<style scoped>
	.hobbyList{
		padding: 10px;
	}
	.hobby{
		border-radius: 4px;
		text-align: center;
		padding: 3px;
		cursor: pointer;
	}
	.select{
		background: #64a1ff;
		color: white;
	}
</style>