<template>
	<div>
		<div class="header">		
			<h3 class="header-prompt">商家风格</h3>
			<button class="btn btn-primary" @click="showAddPanel">新增风格</button>
		</div>
		<pk-table :data="styleList" @trclick='tableClick' :option="styleOpts"></pk-table>		
		<style-detail v-if="showAdd" :show.sync="showAdd" :mode="mode" :data="selectData" :refresh.sync="refreshList"></style-detail>
	</div>
</template>
<script>
	import{
		styleOpts
	}from "./style"
	import {
		pkTable
	}from "pk"
	import{
		userService
	}from "api"
	import styleDetail from "./styleDetail"
	export default{
		components:{
			pkTable,
			styleDetail
		},
		data(){
			return{
				selectedId:0,
				styleOpts,
				styleList:[],
				selectData: {},
				showAdd: false,
				refreshList: 0,
				mode:"add"
			}
		},
		methods:{
			showAddPanel(){
				this.mode = "add"
				this.showAdd = true
			},
			getstyleList(){
				userService.getStyleList()
					.then((data) => {
						if(data.code == 200){
							this.styleList = data.data
						}
					})
			},
			tableClick(e,row,type){
				if(type == "edit") this.showEdit(row)
				if(type == "del") this.showDelete(row)
			},
			showEdit(row){
					this.selectData = row
					this.showAdd = true
					this.mode = "edit"
			},
			showDelete(row){
				userService.styleDelete(row.id)
				.then((res) => {
					if(res.code == 200) this.refreshList++
					bus.$emit("showAlert",res.msg)
				})
			},
		},
		mounted(){
			this.refreshList++
		},
		watch:{
			"refreshList":"getstyleList"
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