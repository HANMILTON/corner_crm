<template>
	<div>
		<div class="header">		
			<h3 class="header-prompt">用户兴趣</h3>
			<button class="btn btn-primary" @click="showAddPanel">新增兴趣</button>
		</div>
		<pk-table :data="hobbyList" @trclick='tableClick' :option="hobbyOpts"></pk-table>		
		<hobby-detail v-if="showAdd" :show.sync="showAdd" :mode="mode" :data="selectData" :refresh.sync="refreshList"></hobby-detail>
	</div>
</template>
<script>
	import{
		hobbyOpts
	}from "./hobby"
	import {
		pkTable
	}from "pk"
	import{
		userService
	}from "api"
	import hobbyDetail from "./hobbyDetail"
	export default{
		components:{
			pkTable,
			hobbyDetail
		},
		data(){
			return{
				selectedId:0,
				hobbyOpts,
				hobbyList:[],
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
			getHobbyList(){
				userService.getHobbyList()
					.then((data) => {
						if(data.code == 200){
							this.hobbyList = data.data
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
				userService.userHobbyDelete(row.id)
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
			"refreshList":"getHobbyList"
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