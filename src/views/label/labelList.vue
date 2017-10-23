<template>
	<div>
	<div v-if="showList">	
		<div class="header">		
			<h3 class="header-prompt">标签</h3>
			<button class="btn btn-primary f-right" @click="addLevelOne">新增一级</button>
		</div>
	  	<div class="wrap"></div>
		<pk-table :data="labelList" @trclick='tableClick' :option="labelOpts"></pk-table>		
	</div>
	<label-evaluate v-else :show.sync="showList" :data="selectData" :refresh.sync="refreshList"></label-evaluate>
	<label-panel v-if="showAdd" :show.sync="showAdd" :data="selectData" :mode="mode" :refresh.sync="refreshList"></label-panel>
	</div>
</template>
<script>
	import{
		labelOpts
	}from "./label"
	import {
		pkTable
	}from "pk"
	import{
		userService
	}from "api"
	import labelEvaluate from "./labelEvaluate"
	import labelPanel from "./labelPanel"
	export default{
		components:{
			pkTable,
			labelEvaluate,
			labelPanel
		},
		data(){
			return{
				// button:"<button class='btn btn-xs btn-default' data-type='detail'>查看</button>",
				selectedId:0,
				labelOpts,
				selectList:[{text:"全部",value:-1},{text:"未上线",value:0},{text:"已上线",value:1}],
				labelList:[],
				world:123,
				serachObj:{
					is_online: -1
				},
				selectData: {},
				showList: true,
				refreshList: 0,
				showAdd:false,
				dataArr: [],
				mode:""
			}
		},
		methods:{
			getlabelList(){
				userService.getCategoryList()
					.then((data) => {
						if(data.code == 200){
							this.dataArr = []
							let labelArr = data.data
							this.recursion(labelArr)
							// console.log(this.dataArr)
							this.labelList = this.dataArr
						}
					})
			},
			recursion(arr){
				for(let i=0;i<arr.length;i++){
					this.dataArr.push(arr[i])
					if(arr[i].sub_category){
						this.recursion(arr[i].sub_category)
					}
				}
			},
			tableClick(e,row,type){
				if(type == "edit") this.showEdit(row)
				if(type == "evaluate") this.showEvaluate(row)
				if(type == "add") this.showAddPanel(row)
			},
			addLevelOne(){
				this.mode = "add"
				this.showAdd = true
				this.selectData = {
					id: 0, 
					level: 0
				}			
			},
			showAddPanel(row){
				// console.log(row)
				this.mode = "add"
				this.showAdd = true
				this.selectData = row
			},
			showEvaluate(row){
				this.showList = false
				this.selectData = row
			},
			showEdit(row){
				this.mode = "edit"
				this.selectData = row
				this.showAdd = true
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
			"refreshList":"getlabelList"
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
		text-align: left;
	}
	.wrap{
		height: 20px;
	}
</style>