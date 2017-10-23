<template>
	<div>
	<div v-if="showList">
		<h3 class="text-left">餐厅列表</h3>
	    <el-tabs v-model="selectedId">
        <el-tab-pane :label="data.text" v-for="(data,index) in selectList"  @click='selectedId = String(index)' :name="String(index)"></el-tab-pane>
      	</el-tabs>
	    <div class="wrap"></div>
	    <!-- <div>{{button()}}</div> -->
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
	<shop-edit v-else :show.sync="showList" :id="selectData"></shop-edit>
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
		userService
	}from "api"
	import shopEdit from "./shopEdit"
	export default{
		components:{
			pkTable,
			shopEdit
		},
		data(){
			return{
				selectedId:"0",
				shopOpts,
				selectList:[{text:"未上线",value:0},{text:"已上线",value:1}],
				shopList:[],
				world:123,
				serachObj:{
					page:1,
					per_page:8,
					category_id: 1,
					is_online: 0
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
			getShopList(){
				userService.getShopList(this.serachObj)
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
				userService.shopOnline(row.id,1)
				.then(res => this.updateList(res))
			},
			showDown(row){
				userService.shopOnline(row.id,0)
				.then(res => this.updateList(res))
			},
			showDelete(row){
				userService.shopDelete(row.id)
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
	.pad-left{
		padding-left: 50px;
	}
	h3{
		margin: 20px 0;
	}
	.wrap{
		height: 20px;
	}
</style>