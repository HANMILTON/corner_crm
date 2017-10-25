<template>
	<div>
	<div v-if="showList">
		<div class="header">
			<h3 class="header-prompt">餐厅列表</h3>
			<button class="btn btn-primary" @click="addShop">新增餐厅</button>
		</div>
	    <el-tabs v-model="selectedId">
        <el-tab-pane :label="data.text" v-for="(data,index) in selectList"  @click='selectedId = String(index)' :name="String(index)"></el-tab-pane>
      	</el-tabs>
	    <div class="wrap"></div>
		<pk-table :data="shopList" @trclick='tableClick' :option="shopOpts"></pk-table>		
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
	<shop-edit v-else :show.sync="showList" :id="selectData" :refresh.sync="refreshList"></shop-edit>
	<shop-panel v-if="showPanel" :show.sync="showPanel" :refresh.sync="refreshList"></shop-panel>
	</div>
</template>
<script>
	import{
		shopOpts
	}from "./shop"
	import {
		pkTable
	}from "pk"
	import{
		userShopService
	}from "api"
	import shopEdit from "./shopEdit"
	import shopPanel from "./shopPanel"
	export default{
		components:{
			pkTable,
			shopEdit,
			shopPanel
		},
		data(){
			return{
				selectedId:"0",
				shopOpts,
				selectList:[{text:"未上线",value:0},{text:"已上线",value:1}],
				shopList:[],
				serachObj:{
					page:1,
					per_page:8,
					category_id: 1,
					is_online: 0
				},
				pageCount: 0,
				selectData:"",
				showPanel: false,
				showList:true,
				refreshList: 0
			}
		},
		methods:{
			addShop(){
				this.showPanel = true
			},
			handleCurrentChange(){
				this.refreshList++
			},			
			getShopList(){
				userShopService.getShopList(this.serachObj)
					.then((data) => {
						if(data.code == 200){
							this.pageCount = data.data.page_count	
							this.shopList = data.data.detail_list
						}
					})
			},			
			tableClick(e,row,type){
				if(type == "edit") this.showDetail(row)
				if(type == "up") this.showUp(row)
				if(type == "down") this.showDown(row)
				if(type == "delete") this.showDelete(row)
			},
			showDetail(row){
				this.selectData = row.id
				this.showList = false
			},
			showUp(row){
				userShopService.shopOnline(row.id,1)
				.then(res => this.updateList(res))
			},
			showDown(row){
				userShopService.shopOnline(row.id,0)
				.then(res => this.updateList(res))
			},
			showDelete(row){
				userShopService.shopDelete(row.id)
				.then(res => this.updateList(res))
			},
			// searchStatus(data,index){
			// 	this.selectedId = index
			// 	this.serachObj.is_online=data.value
			// 	this.refreshList++
			// },
			updateList(res){
				bus.$emit("showAlert",res.msg)
				this.refreshList++
			}
		},
		mounted(){
			 this.refreshList++
		},
		watch:{
			"refreshList": "getShopList",
			selectedId(newVal){
				this.serachObj.is_online = Number(newVal)
				this.refreshList++
			}
		}

	}
</script>
<style scoped>
	.header{
		padding: 20px 0;
	}
	.header-prompt{
		width: 80%;
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