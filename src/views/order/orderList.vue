<template>
	<div>
		<h3 class="text-left">订单列表</h3>
		<div class="wrap">
<!-- 			<pk-input sm="4" label="手机号">
				<input type="text" class="form-control" @keyup.enter="getOrderList" v-model="serachObj.mobile" name="">
			</pk-input>		
			<pk-input sm="4" label="商家名称">
				<input type="text" class="form-control" @keyup.enter="getOrderList" v-model="serachObj.shop_name" name="">
			</pk-input>	
			<pk-input sm="4" label="下单情况">
	    		<select class="form-control" @change="getOrderList" v-model="serachObj.time_add_day">
	    			<option v-for="data in dateArr" :value="data.value">{{data.text}}</option>
	    		</select>	
			</pk-input>				
			<div>
				<button class="btn btn-primary" @click="getOrderList">查询</button>
			</div> -->
			<el-row :gutter="30">
  			<el-col :span="6">
  				<el-input v-model="serachObj.mobile" @change="refreshList++" placeholder="搜索手机号"></el-input>
  			</el-col>
		    <el-col :span="6">			    
	  			<el-date-picker
				      v-model="serachObj.time_pay_start"
				      @change="dateChange($event,'time_pay_start')"
				      :clearable="true"
				      placeholder="注册开始日期">
				   </el-date-picker>
			  </el-col>
  			<el-col :span="6">			   	
  				<el-date-picker
			      v-model="serachObj.time_pay_end"
			      @change="dateChange($event,'time_pay_end')"
			      :clearable="true"
			      placeholder="注册结束日期">
			    </el-date-picker>	
			  </el-col>
			  <el-col :span="6">
  				<el-select v-model="serachObj.order_type"  @change="setType(serachObj.order_type)" placeholder="订单类型">
				<el-option
				  v-for="item in typeArr"
				  :label="item.text"
				  :value="item.value">
				</el-option>
			  </el-select>
  			</el-col>
		  </el-row>			
		</div>		
	    <div class="wrap"></div>
	    <!-- <div>{{button()}}</div> -->
		<pk-table :data="orderList" @trclick='tableClick' :option="orderOpts"></pk-table>	
		<div class="text-center" v-if="pageCount>1">
		<el-pagination
	        @current-change="handleCurrentChange"
	        :current-page.sync="serachObj.page"
	        :page-size="serachObj.per_page"
	        layout="total, prev, pager, next"
	        :page-count="pageCount" 
	        >
        </el-pagination>
        </div>	
	</div>
</template>
<script>
	import{
		orderOpts0,
		orderOpts1,
		orderOpts2,
		orderOpts3
	}from "./order"
	import {
		pkTable,
		pkDateTime,
		pkInput
	}from "pk"
	import{
		userService
	}from "api"
	export default{
		components:{
			pkTable,
			pkDateTime,
			pkInput			
		},
		data(){
			return{
				orderOpts0,
				orderOpts1,
				orderOpts2,
				orderOpts3,
				orderOpts:orderOpts0,
				orderList:[],
				serachObj:{
					page:1,
					perpage:8,
					status:-1,
					order_type: "0",
					time_pay_start:"",
					time_pay_end:""
				},
				refreshList: 0,
				pageCount: 0,
				typeArr: [{text:"全部",value:"0"},{text:"套餐订单",value:"1"},{text:"买单订单",value:"2"},{text:"预约订单",value:"3"}]
			}
		},
		methods:{
			setType(type){
				this.orderOpts = this["orderOpts"+type]
				this.refreshList++
			},
			dateChange(val,key) {
			    this.serachObj[key] = val
			    this.refreshList++
			},
			handleCurrentChange(){
				this.refreshList++
			},
			getOrderList(){
				userService.getOrderList(this.serachObj)
				.then((data) => {
					if(data.code == 200){
						this.pageCount = data.data.page_count
						this.orderList = data.data.order_list
					}
				})
			},
			tableClick(e,row,type){
				if(type == "detail"){
					this.selectData = row
					this.showList = false
				}
			}
		},
		mounted(){
			this.refreshList++
		},
		watch:{
			"refreshList": "getOrderList",
		}

	}
</script>
<style scoped>
	h3{
		margin: 20px 0;
		padding-bottom:20px;
	}
	.wrap{
		min-height: 20px;
	}
</style>