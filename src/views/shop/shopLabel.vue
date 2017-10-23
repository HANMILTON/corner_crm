<template>
<div>
	<div class="col-sm-8">
    	<pk-input sm="6" label="甜度">
			<input type="text" class="form-control" v-model="editData.taste_1_s" name="">
    	</pk-input>     	
    	<pk-input sm="6" label="至">
			<input type="text" class="form-control" v-model="editData.taste_1_l" name="">
    	</pk-input> 
    	<pk-input sm="6" label="辣度">
			<input type="text" class="form-control" v-model="editData.taste_2_s" name="">
    	</pk-input>     
    	<pk-input sm="6" label="至">
			<input type="text" class="form-control" v-model="editData.taste_2_l" name="">
    	</pk-input>     		
    	<pk-input sm="6" label="口味">
			<input type="text" class="form-control" v-model="editData.taste_3_s" name="">
    	</pk-input> 
    	<pk-input sm="6" label="至">
			<input type="text" class="form-control" v-model="editData.taste_3_l" name="">
    	</pk-input>     	
    	<pk-input sm="6" label="食材">
			<input type="text" class="form-control" v-model="editData.taste_4_s" name="">
    	</pk-input> 
    	<pk-input sm="6" label="至">
			<input type="text" class="form-control" v-model="editData.taste_4_l" name="">
    	</pk-input>
    	<pk-input sm="12" label="用户爱好">
	    	<div class="hobbyBox border">
		    	<div v-for="(data,index) in hobbyList" class="hobbyList col-sm-3">
		    		<div :class="{'hobby':true,'select': data.checked == true}" @click="setSelect(index)">{{data.hobby_name}}</div>
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
	userService
}from "api"
import Vue from 'vue'
	export default{
		props:["data"],
		components:{
			pkInput,
		},
		data(){
			return {
				hobbyList: [],
				editData: this.data.taste_hobby ? this.data.taste_hobby : {}
			}
		},
		methods:{
			submit(){
				let arr = []
				this.hobbyList.forEach(data =>{
					if(data.checked){
						arr.push(data.id)
					}
				})
				this.editData.hobby_list = arr.join()
				this.editData.shop_detail_id = this.data.id
				userService.tasteHobbySubmit(this.editData)
				.then(res =>{

				})
			},
			setSelect(index){
				let obj = this.hobbyList[index]
				obj.checked = !this.hobbyList[index].checked
				Vue.set(this.hobbyList,index,obj)
			}
		},
		mounted(){
			let hobbyListArr = this.editData.hobby_list ? this.editData.hobby_list.split(",") : []
			userService.getHobbyList()
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