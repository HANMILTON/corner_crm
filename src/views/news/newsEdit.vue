<template>
	<div>
	<div v-if='mode == "add" || data.news_type == 1 || data.news_type == 2'>
		<pk-input sm="10" label="列表页">
			<div class="border">
				<pk-input sm="12" label="标题">
					<input type="text" class="form-control" v-model="editData.title" name="">
				</pk-input>
				<pk-input sm="12" label="图片">
					<!-- <input type="text" v-model="editData.img" name=""> -->
					<div class="border">
						<pk-multi-imgs :imgs.sync="editData.img"></pk-multi-imgs>
					</div>
				</pk-input>
				<pk-input sm="12" label="文字说明">
					<textarea class="form-control" v-model="editData.description" rows="3"></textarea>
				</pk-input>
				<pk-input sm="12" label="账号" v-if="editData.news_type!=1">
		    		<select class="form-control" v-model="editData.user_id">
		    			<option v-for="data in adminList" :value="data.id">{{data.nick_name}}</option>
		    		</select>
				</pk-input>	
			</div>
		</pk-input>
		<pk-input sm="10" label="详情页">
			<div class="border">
				<pk-editor :html.sync="editData.detail"></pk-editor>
			</div>	
		</pk-input>	
		<div><button class="btn btn-primary" @click="submit">提交</button></div>	
	</div>
	<div class="col-sm-10" v-else>
		<pk-input sm="12" label="消息内容">
		<div class="border">
			<div v-for="v in data.detail">
				<div class="text">{{v.text}}</div>
				<img class="news-img" v-for="s in (v.images.split(','))" :src="s">
			</div>
		</div>
		</pk-input>
	</div>
	</div>
</template>
<script>
	import {
		pkInput,
		pkMultiImgs,
		pkEditor
	} from "pk"
	import{
		userService
	}from "api"
	export default{
		props:["data","refresh","show","mode"],
		components:{
			pkInput,
			pkMultiImgs,
			pkEditor
		},
		data (){
			return {
				editData:Object.assign({}, this.data),
				editorOption:{},
				adminList:[]
			}
		},
		methods:{
			submit(){
				let id =this.editData.id
				if(id) {
					this.editData.news_id = id
				}else{
					this.editData.news_id = 0
				}
				userService.newsSubmit(this.editData)
				.then((res) =>{
					if(res.code == 200){
						let num = this.refreshList++
						this.$emit('update:refresh',num)
						this.$emit('update:show',false)
					}
				})
			}
		},
		mounted(){
			userService.getAdminList(this.editData)
			.then((res) =>{
				if(res.code == 200){
					this.adminList = res.data
				}
			})	
		}
	}
</script>
<style type="text/css" scoped>
	.text{
		padding: 10px;
	}
	.news-img{
		padding-bottom: 20px;
	}
	.news-img{
		width: 23%;
		margin: 0 1%;
	}
</style>