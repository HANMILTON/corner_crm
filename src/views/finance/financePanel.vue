<template>
	<div>
		<h3 class="text-left">财务结算</h3>
		<div class="wrap">
		<el-row :gutter="30">
			<el-col :span="5">
			  <el-select
			    v-model="serachObj.shop_detail_id"
			    filterable
			    remote
			    placeholder="餐厅名称"
			    :clearable="true"
			    :remote-method="searchShop">
			    <el-option
			      v-for="item in shopList"
			      :key="item.id"
			      :label="item.shop_name"
			      :value="item.id">
			    </el-option>
			  </el-select>	
			  </el-col>
		    <el-col :span="5">			    
	  			<el-date-picker
				      v-model="serachObj.date_start"
				      @change="dateChange($event,'date_start')"
				      :clearable="true"
				      placeholder="开始日期">
				   </el-date-picker>
			  </el-col>
  			<el-col :span="5">			   	
  				<el-date-picker
			      v-model="serachObj.date_end"
			      @change="dateChange($event,'date_end')"
			      :clearable="true"
			      placeholder="结束日期">
			    </el-date-picker>	
			  </el-col>
			  <el-col :span="4":offset="5">
  				<div class="total-money">未结算金额：<span class="danger-font">{{totalMoney}}元</span></div>
  			</el-col>
		  </el-row>
	
		</div>		
	    <div class="wrap"></div>
	    <!-- <div>{{button()}}</div> -->
		<pk-table v-if="!serachObj.shop_detail_id" :data="financeList" @trclick='tableClick' :option="financeOpts"></pk-table>	
		 <el-table
		 	v-else
		    ref="multipleTable"
		    :data="financeList"
		    tooltip-effect="dark"
		    style="width: 1007px"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      type="selection"
		      align="center"
		      width="55">
		    </el-table-column>
<!-- 		    <div v-for="data in  financeOpts.columns">
		    	
		    </div> -->
		    <el-table-column
		    v-for="data in  financeArr1"
		      :prop="data.field"
		      :label="data.th"
		      align="center"
		      :width="data.width">
		    </el-table-column>	
		    <el-table-column
		      prop="order_type"
		      :formatter="setTpye"
		      label="订单类型"
		      align="center"
		      width="100">
		    </el-table-column>
		   	<el-table-column
		    v-for="data in  financeArr2"
		      :prop="data.field"
		      :label="data.th"
		      align="center"
		      :width="data.width">
		    </el-table-column>	    
		        <el-table-column
      label="操作"
      align="center"
      width="100">
      <template scope="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row)">结算</el-button>
      </template>
    </el-table-column>
		  </el-table>
		  <div class="text-left pad-top">
		  	<el-button v-if="serachObj.shop_detail_id" type="primary" @click="multipleCount('','')">批量结算</el-button>
		  </div>
		<div class="text-center" v-if="pageCount>1 && !serachObj.shop_detail_id">
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
		financeOpts,
		financeArr1,
		financeArr2
	}from "./finance.js"
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
				financeOpts,
				financeArr1,
				financeArr2,
				financeList:[],
				serachObj:{
					page:1,
					per_page:8,
					shop_detail_id:"",
					date_start:"",
					date_end :""
				},
				refreshList: 0,
				pageCount: 0,
				multipleSelectionId:[],
				shopList:[],
				totalMoney: ""
			}
		},
		methods:{
			setTpye(row, column, cellValue){
				switch(cellValue){
					case "1":
						return "套餐订单"
						break;
					case "2":
						return "买单订单"
						break;
					case "3":
						return "预约订单"
						break;
				}
			},
			dateChange(val,key) {
				val = val == undefined ? "" : val
			    this.serachObj[key] = val
			    this.refreshList++
			},
			searchShop(query){
				console.log(query)
				if(!query) {					
					this.serachObj.shop_detail_id = ""
					return 
				}
				userService.searchShopByWords(query,20)
				.then(res =>{
					this.shopList= res.data
					// this.refreshList++
				})
			},
			multipleCount(idArr,shop_detail_id){
				// return console.log(idArr)
				let arrList = idArr ? idArr : this.multipleSelectionId
				if(arrList.length < 1) return
				let shopDetailId = shop_detail_id ? shop_detail_id : this.serachObj.shop_detail_id
				userService.orderSettlementConfirm(arrList,shopDetailId)
				.then(res =>{
					if(res.code == 200){
						bus.$emit("showAlert",res.msg)
						this.refreshList++
					}
				})

			},
			handleSelectionChange(rows){
				// console.log(rows)
				let selectArr = []
				rows.forEach(row => {
					selectArr.push(row.id)
				})
				// console.log(selectArr)
				this.multipleSelectionId = selectArr
			},
			handleCurrentChange(){
				this.refreshList++
			},
			getFinanceList(){
				userService.orderSettlementList(this.serachObj)
				.then((data) => {
					if(data.code == 200){
						this.pageCount = data.data.page_count
						this.financeList = data.data.order_settlement_list
						this.totalMoney = data.data.order_settlement_money
					}
				})
			},
			tableClick(e,row,type){
				if(type == "settlement"){
					this.multipleCount([row.id],row.shop_detail_parent_id)
				}
			},
			handleClick(row){
				this.multipleCount([row.id],row.shop_detail_parent_id)
			}
		},
		mounted(){
			this.refreshList++
		},
		watch:{
			"refreshList": "getFinanceList",
			"serachObj.shop_detail_id": "getFinanceList"
		}

	}
</script>
<style scoped>
	.pad-left{
		padding-left: 50px;
	}
	h3{
		margin: 20px 0;
		padding-bottom:20px;
	}
	.wrap{
		min-height: 20px;
	}
	.pad-top{
		padding-top: 20px; 
	}
</style>