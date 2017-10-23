<template>
	<div>
	<div v-if="showList">
	<div class="header">		
		<h3 class="header-prompt">banner列表</h3>
		<button class="btn btn-primary f-right" @click="showList=false,selectData={}">新增banner</button>
	</div>	
<!-- 	   <ul class="nav nav-tabs">
	      <li :class="{active:selectedId===index}" v-for="(data,index) in selectList"  @click='searchStatus(data,index)'>
	        <a href="javascript:;">
	          <span>{{data.text}}</span>
	        </a>
	      </li>
	    </ul> -->
	   	<el-tabs v-model="selectedId">
        <el-tab-pane :label="data.text" v-for="(data,index) in selectList"  @click='selectedId = String(index)' :name="String(index)"></el-tab-pane>
      	</el-tabs>
	    <div class="wrap"></div>
		<pk-table :data="bannerList" @trclick='tableClick' :option="bannerOpts"></pk-table>		
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
	<banner-detail v-else :show.sync="showList" :data="selectData" :refresh.sync="refreshList"></banner-detail>

	</div>
</template>
<script>
	import{
		bannerOpts
	}from "./banner"
	import {
		pkTable
	}from "pk"
	import{
		userService
	}from "api"
	import bannerDetail from "./bannerDetail"
	export default{
		components:{
			pkTable,
			bannerDetail
		},
		data(){
			return{
				selectedId:"0",
				bannerOpts,
				selectList:[{text:"已上线",value:1},{text:"已下线",value:0}],
				bannerList:[],
				world:123,
				searchObj:{
					page:1,
					per_page:10,
					status:1,
					is_online:1
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
				userService.bannerSwitch(id,1)
				.then(res => this.refreshList++)
			},
			handleDown(id){
				userService.bannerSwitch(id,0)
				.then(res => this.refreshList++)
			},
			handleDelete(id){
				userService.bannerDelete(id)
				.then(res => this.refreshList++)
			},
			// searchStatus(data,index){
			// 	this.selectedId = index
			// 	this.searchObj.is_online=data.value
			// 	this.refreshList++
			// },
			getBannerList(){
				userService.getBannerList(this.searchObj)
				.then((data) => {
					// console.log(data)
					if(data.code == 200){
						this.pageCount = data.data.page_count	
						this.bannerList = data.data.banner_list
					}
				})				
			}

		},
		mounted(){
			this.refreshList++
		},
		watch:{
			"refreshList": "getBannerList",
			"selectedId"(newId){
				this.searchObj.is_online = newId == 1 ? "0" : "1"
				this.refreshList++
			}
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