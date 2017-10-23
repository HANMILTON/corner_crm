<template>
	<div>
		<div class="header">		
			<h3 class="header-prompt">账号列表</h3>
			<button class="btn btn-primary f-right" @click="showAddPanel">新增账号</button>
		</div>
		<pk-table :data="adminList" @trclick='tableClick' :option="adminOpts"></pk-table>		
		<admin-detail v-if="showAdd" :show.sync="showAdd" :mode="mode" :data="selectData" :refresh.sync="refreshList"></admin-detail>
	</div>
</template>
<script>
	import{
		adminOpts
	}from "./admin"
	import {
		pkTable
	}from "pk"
	import{
		userService
	}from "api"
	import adminDetail from "./adminDetail"
	export default{
		components:{
			pkTable,
			adminDetail
		},
		data(){
			return{
				selectedId:0,
				adminOpts,
				adminList:[],
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
			getAdminList(){
				userService.getAdminList()
					.then((data) => {
						if(data.code == 200){
							this.adminList = data.data
						}
					})
			},
			tableClick(e,row,type){
				if(type == "edit") this.showEdit(row)
			},
			showEdit(row){
					this.selectData = row
					this.showAdd = true
					this.mode = "edit"
			},
		},
		mounted(){
			this.refreshList++
		},
		watch:{
			"refreshList":"getAdminList"
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