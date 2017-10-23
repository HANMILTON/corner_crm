<template>
	<div>
	<div v-if="showList">
	<div class="header">		
		<h3 class="header-prompt">运营</h3>
		<button class="btn btn-primary" @click="showList=false,selectData={}">新增场景</button>
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
		<pk-table :data="sceneList" @trclick='tableClick' :option="sceneOpts"></pk-table>		
	</div>
	<scene-detail v-else :show.sync="showList" :data="selectData" :refresh.sync="refreshList"></scene-detail>
	</div>
</template>
<script>
	import{
		sceneOpts
	}from "./scene"
	import {
		pkTable
	}from "pk"
	import{
		userService
	}from "api"
	import sceneDetail from "./sceneDetail"
	export default{
		components:{
			pkTable,
			sceneDetail
		},
		data(){
			return{
				// button:"<button class='btn btn-xs btn-default' data-type='detail'>查看</button>",
				selectedId:"0",
				sceneOpts,
				selectList:[{text:"全部",value:-1},{text:"未上线",value:0},{text:"已上线",value:1}],
				sceneList:[],
				world:123,
				serachObj:{
					is_online:-1
				},
				selectData: {},
				showList: true,
				refreshList: 0
			}
		},
		methods:{
			getSceneList(){
				userService.getSceneList(this.serachObj)
					.then((data) => {
						if(data.code == 200){
							this.sceneList = data.data
						}
					})
			},
			tableClick(e,row,type){
				if(type == "edit") this.showEdit(row)
				if(type == "up") this.showUp(row)
				if(type == "down") this.showDown(row)
			},
			showEdit(row){
					this.selectData = row
					this.showList = false
			},
			showUp(row){
				userService.sceneOnline(row.id,1)
				.then((res) => {
					if(res.code == 200) this.refreshList++
					bus.$emit("showAlert",res.msg)
				})
			},
			showDown(row){
				userService.sceneOnline(row.id,0)
				.then((res) => {
					if(res.code == 200) this.refreshList++
					bus.$emit("showAlert",res.msg)
				})
			},
			searchStatus(data,index){
				this.selectedId = index
				this.serachObj.is_online = data.value
				this.refreshList++
			}
		},
		mounted(){
			this.refreshList++
		},
		watch:{
			"refreshList":"getSceneList",
			selectedId(newVal){
				this.serachObj.is_online = Number(newVal)-1
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