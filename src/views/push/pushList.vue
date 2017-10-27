<template>
	<div>
	<div v-if="showList">
	<div class="header">		
		<h3 class="header-prompt">推送列表</h3>
		<button class="btn btn-primary f-right" @click="showList=false,selectData={}">新增推送</button>
	</div>	
		<el-row :gutter="30">
  			<el-col :span="6">
			   	<el-tabs v-model="selectedId">
		        <el-tab-pane :label="data.text" v-for="(data,index) in onlineList"  @click='selectedId = String(index)' :name="String(index)"></el-tab-pane>
		      	</el-tabs>  				
  			</el-col>
  			<el-col :span="6" :offset="12">
  				<el-select v-model="searchObj.status"  @change="refreshList++" placeholder="订单类型">
					<el-option
					  v-for="item in deleteList"
					  :label="item.text"
					  :value="item.value">
					</el-option>
			  	</el-select>
  			</el-col>
  		</el-row>
		<!--<el-tabs v-model="">
        <el-tab-pane :label="data.text" v-for="(data,index) in deleteList"  @click='selectedId = String(index)' :name="String(index)"></el-tab-pane>
      	</el-tabs> -->

	    <div class="wrap"></div>
		<pk-table :data="pushList" @trclick='tableClick' :option="pushOpts"></pk-table>		
		<div class="text-center" v-if="pageCount>1">
		<el-pagination
	        @current-change="handleCurrentChange"
	        :current-page.sync="searchObj.page"
	        :page-size="searchObj.per_page"
	        layout="total, prev, pager, next"
	        :page-count="pageCount" 
	        >
        </el-pagination>
        </div>
	</div>
	<push-detail v-else :show.sync="showList" :data="selectData" :refresh.sync="refreshList"></push-detail>
	</div>
</template>
<script>
	import{
		pushOpts
	}from "./push"
	import {
		pkTable
	}from "pk"
	import{
		userService
	}from "api"
	import pushDetail from "./pushDetail"
	export default{
		components:{
			pkTable,
			pushDetail
		},
		data(){
			return{
				selectedId:"0",
				pushOpts,
				onlineList:[{text:"全部",value:-1},{text:"未上线",value:0},{text:"已上线",value:1}],
				deleteList:[{text:"全部(删除状态)",value:-1},{text:"已删除",value:0},{text:"未删除",value:1}],
				pushList:[],
				searchObj:{
					page: 1,
					per_page: 10,
					status: 1,
					is_online: -1
				},
				pageCount: 0,
				selectData:{},
				showList:true,
				refreshList: 0
			}
		},
		methods:{
			handleCurrentChange(){
				this.refreshList++
			},
			tableClick(e,row,type){
				if(type == "edit") this.handleDetail(row)
				if(type == "up") this.handleUp(row.id)
				if(type == "down") this.handleDown(row.id)
				if(type == "delete") this.handleDelete(row.id)
			},
			handleDetail(row){
				this.showList = false
				this.selectData = row
			},
			handleUp(id){
				userService.pushOnline(id,1)
				.then(res => this.refreshList++)
			},
			handleDown(id){
				userService.pushOnline(id,0)
				.then(res => this.refreshList++)
			},
			handleDelete(id){
				userService.pushDelete(id)
				.then(res => this.refreshList++)
			},
			// searchStatus(data,index){
			// 	this.selectedId = index
			// 	this.searchObj.is_online=data.value
			// 	this.refreshList++
			// },
			getPushList(){
				userService.getPushList(this.searchObj)
				.then((data) => {
					// console.log(data)
					if(data.code == 200){
						this.pageCount = data.data.page_count	
						this.pushList = data.data.push_list
					}
				})				
			}

		},
		mounted(){
			this.refreshList++
		},
		watch:{
			"refreshList": "getPushList",
			"selectedId"(newId){
				this.searchObj.is_online = newId-1
				this.refreshList++
			},
		}
	}
</script>
<style scoped>
	.header{
		padding: 20px 0;
		overflow: hidden;
	}
	.header-prompt{
		width: 80%;
		float: left;
	}
	h3{
		margin: 0;
		padding: 0;
		float: left;
		text-align: left;
	}
	.wrap{
		height: 20px;
	}
</style>