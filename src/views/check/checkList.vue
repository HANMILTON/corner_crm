<template>
	<div>
	<div v-if="showList">
		<h3 class="text-left">审核结果</h3>
	    <el-tabs v-model="selectedId">
        <el-tab-pane :label="data.text" v-for="(data,index) in selectList"  @click='selectedId = String(index)' :name="String(index)"></el-tab-pane>
      	</el-tabs> 
	    <div class="wrap"></div>
	    <!-- <div>{{button()}}</div> -->
		<pk-table :data="checkList" @trclick='tableClick' :option="checkOpts"></pk-table>		
		<div class="text-center" v-if="pageCount>1">
			<el-pagination
		        @current-change="handleCurrentChange"
		        :current-page.sync="serachObj.page"
		        :page-size="serachObj.per_page"
		        layout="sizes, prev, pager, next"
		        :page-count="pageCount" 
		        :page-sizes="[10, 50, 100, 200]"
      			@size-change="handleSizeChange"
		        >
	        </el-pagination>			
		</div>
	</div>
	<check-detail v-else :show.sync="showList" :refresh.sync="refreshList" :data="selectData"></check-detail>

	</div>
</template>
<script>
	import{
		checkOpts
	}from "./check"
	import {
		pkTable
	}from "pk"
	import{
		userService
	}from "api"
	import checkDetail from "./checkDetail"
	export default{
		components:{
			pkTable,
			checkDetail
		},
		data(){
			return{
				selectedId:"0",
				checkOpts,
				selectList:[{text:"全部",value:-1},{text:"未审核",value:0},{text:"通过",value:1},{text:"未通过",value:2}],
				checkList:[],
				world:123,
				serachObj:{
					page:1,
					per_page:8,
					validate_status:-1
				},
				pageCount: 0,
				selectData:{},
				showList:true,
				refreshList:0
			}
		},
		methods:{
			handleSizeChange(size){
				this.serachObj.per_page = size
				this.refreshList++
			},
			handleCurrentChange(){
				this.refreshList++
			},
			tableClick(e,row,type){
				if(type == "detail"){
					this.selectData = row
					this.showList = false
				}
			},
			// searchStatus(data,index){
			// 	alert(1)
			// 	this.selectedId = String(index)
			// 	this.serachObj.validate_status=data.value
			// 	this.refreshList++
			// },
			getShopValidateList(){
				userService.getShopValidateList(this.serachObj)
				.then((data) => {
					// console.log(data)
					if(data.code == 200){
						this.pageCount= data.data.page_count	
						this.checkList = data.data.validate_list
					}
				})				
			}
		},
		mounted(){
			this.refreshList++
		},
		watch:{
			"refreshList": "getShopValidateList",
			selectedId(newVal){
				this.serachObj.validate_status = Number(newVal)-1
				this.refreshList++
			}
		}

	}
</script>
<style scoped>
	.pad-left{
		/*padding-left: 50px;*/
	}
	h3{
		margin: 20px 0;
	}
	.wrap{
		height: 20px;
	}
</style>