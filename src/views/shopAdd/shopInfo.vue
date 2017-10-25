<template>
	<div class="col-sm-8">
		<pk-input sm="10" label="餐厅名称">
    		<!-- <input type="text" class="form-control" :value="name" disabled> -->
    		<input type="text" class="form-control" v-model="data.shop_name" name="">
    	</pk-input>
    	<pk-input sm="10" label="商家类型">
	    	<div class="border">
	    	<!-- <div>{{data.shop_type_2}}</div> -->
	    	<div v-for="(data,index) in shopTypeList" class="col-sm-6">
	    		<select class="form-control" @change="setType($event,index)" v-model="data.id">
	    			<option v-for="data in getList(index)" :value="data.id">{{data.category_name}}</option>
	    		</select>	    		
	    	</div>
	    	</div>
    	</pk-input>
    	<pk-input sm="10" label="人均价格">
    		<input type="number" class="form-control" v-model="data.price_average" name="">
    	</pk-input>
    	<pk-input sm="10" label="优惠信息">
    		<input type="text" class="form-control" v-model="data.prompt" name="">
    	</pk-input> 	
    	<pk-input sm="10" label="营业时间">
    		<input type="text" class="form-control" v-model="data.business_time" name="">
    	</pk-input>
    	<pk-input sm="10" label="一句话介绍">
    		<textarea type="text" class="form-control" v-model="data.brief" name="" rows="3"></textarea>
    	</pk-input>    
    	<pk-input sm="10" label="备注">
    		<textarea type="text" class="form-control" v-model="data.remark" name="" rows="3"></textarea>
    	</pk-input>  
    	<pk-input sm="10" label="商家图标">
	    	<div :class="{'border':!data.img_logo}">
	    		<pk-single-img size="small" :img.sync="data.img_logo"></pk-single-img>
	    	</div>
    	</pk-input>   	
    	<pk-input sm="10" label="商家列表图">
	    	<div :class="{'border':!data.img_first}">
	    		<pk-single-img :img.sync="data.img_first"></pk-single-img>
	    	</div>
    	</pk-input> 
    	<pk-input sm="10" label="商家详情轮播">
	    	<div class="border">
	    		<pk-multi-imgs :imgs.sync="data.img_shop"></pk-multi-imgs>
	    	</div>	
    	</pk-input> 
    	<div class="col-sm-10 btn-pad text-center">
    		<button class="pk-btn-main offset-left-100" @click="submit">提交</button>
    	</div>
	</div>
</template>
<script>
import {
	pkInput,
	pkSingleImg,
	pkMultiImgs
} from "pk"
import {
	userShopService
}from "api"
import shopInfo from "./shopInfo"
	export default{
		props:["data","type","name"],
		components:{
			pkInput,
			pkSingleImg,
			shopInfo,
			pkMultiImgs
		},
		data(){
			return {
				shopTypeList:[],
				categoryList0:[],
				categoryList1:[],
				categoryList2:[],
				categoryList3:[],
				categoryList4:[],
				categoryList5:[],
				categoryList6:[],
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
			setType(e,index){
				let value = e.target.value
				if(!value) return
				index++
				this.shopTypeList.splice(index)
				this.data.shop_type_2 = this.data.shop_type_2.split(",").splice(0,index).join()
				if(index == this.shopTypeList.length) this.data.shop_type_2 += ","+value
				this.getCategorySub(value,index,true);
			},
			getList(index){
				let str =  "categoryList"+index
				return this[str]
			},
			getCategorySub(id,index,flag){
				userShopService.getCategorySub(id)
				.then((res) => {
					if(res.code==200){
						let len = res.data.length
						if(len > 0){
							this['categoryList'+index] = res.data
							if(flag){
								this.shopTypeList.push({})
								this.shopTypeList[index]={}						
							}
						}
					}
				})				
			},
			initSelect(){
				let selectArr = this.data.shop_type_2.split(",")
				for(let i=0;i<selectArr.length;i++){
					if(i>0) this.shopTypeList.push({id:selectArr[i]})
					this['categoryList'+i] = {id:selectArr[i]}
					if(i==selectArr.length-1){
						this.getCategorySub(selectArr[i],i,true)
					}else{
						this.getCategorySub(selectArr[i],i)
					}
				}
			}
		},
		mounted(){
			this.initSelect()
			this.data.shop_name = this.name
		}		
	}
</script>