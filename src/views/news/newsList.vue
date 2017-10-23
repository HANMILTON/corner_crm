<template>
	<div>
	<div class="header">
      <div class='left'><span class="text-primary" @click="showEdit=false">消息列表</span><span class="text-default" v-if="showEdit"> > 消息编辑</span></div>
      <div class='f-right' v-if="!showEdit"><button class="btn btn-primary" @click="showEdit=true,mode='add',selectData={}">添加消息</button></div>
    </div>
    <div v-if="!showEdit" class="news-box">
	   	<el-tabs v-model="selectedId">
        <el-tab-pane :label="data.text" v-for="(data,index) in selectList"  @click='selectedId = String(index)' :name="String(index)"></el-tab-pane>
      	</el-tabs>
    	<pk-table :data="newsList" @trclick='tableClick' :option="newsOpts"></pk-table>	
    	<el-pagination
	        @current-change="handleCurrentChange"
	        :current-page.sync="searchObj.page"
	        :page-size="searchObj.per_page"
	        layout="total, prev, pager, next"
	        :page-count="pageCount" 
	        >
        </el-pagination>
    </div>
    <news-edit v-else :data="selectData" :mode="mode" :show.sync="showEdit" :refresh.sync="refreshList"></news-edit>
	</div>
</template>
<script>
import{
	userService
}from "api"
import newsEdit from "./newsEdit"
import{
	newsOpts
}from "./news"
import{
	pkTable
}from "pk"
	export default{
		components:{
			newsEdit,
			pkTable
		},
		data() {
			return {
				newsList:[],
				showEdit: false,
				selectData:{},
				refreshList:0,
				newsOpts,
				mode: "add",
				searchObj: {
					status: 1,
					page: 1,
					perpage: 5,
					news_type: 0
				},
				selectList:[{text:"全部",value:0},{text:"商家消息",value:1},{text:"管理员消息",value:2},{text:"订单评论",value:3},{text:"朋友圈",value:4}],
				selectedId: "0",
				pageCount: 0,
			}
		},
		mounted(){
			this.refreshList++
		},
		methods:{
			handleCurrentChange(){
				this.refreshList++
			},
			getStatus(status){
				switch(status){
					case "0": 
						return "已下线"
						break;
					case "1": 
						return "已上线"
						break;												
				}
			},
			tableClick(e,row,type){
				if(type == "edit") this.handleDetail(row)
				if(type == "up") this.handleUp(row.id)
				if(type == "down") this.handleDown(row.id)
				if(type == "delete") this.handleDelete(row.id)
			},
			getNewsList(){
				userService.getNewsList(this.searchObj)
				.then((res) =>{
					if(res.code == 200){
						this.newsList = res.data.news_list
						this.pageCount = res.data.page_count
					}
				})
			},
			handleDetail(data){
				this.selectData = data
				this.showEdit = true
				this.mode = 'edit'
			},
			handleUp(id){
				userService.newsSwitchOnline(id,1)
				.then((res) => {
					if(res.code==200){
						bus.$emit("showAlert",res.msg)
						this.refreshList++
					}
				})
			},
			handleDown(id){
				userService.newsSwitchOnline(id,0)
				.then((res) => {
					if(res.code==200){
						bus.$emit("showAlert",res.msg)
						this.refreshList++
					}
				})
			},			
			handleDelete(id){
				userService.newsDelete(id)
				.then((res) => {
					if(res.code==200){
						bus.$emit("showAlert",res.msg)
						this.refreshList++
					}
				})
			}
		},
		watch:{
			"refreshList":"getNewsList",
			"selectedId"(newId){
				this.searchObj.news_type = newId
				this.refreshList++
			}
		}
	}
</script>
<style scoped>
.text-info{
	cursor: pointer;
}
  .header{
    padding:10px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .left{
    padding:6px 12px;
    font-size: 18px;
    float:left;
  }
  .nav{
  	margin-bottom: 20px;
  }
  .news-list{
  	border:1px solid #cccccc;
  	font-size: 12px;
  	margin-top: 10px; 
  }
  .news-header{
  	height: 30px;
  	padding: 8px;
  	/*border-bottom: 1px solid #cccccc;*/
  }
  .news-img{
  	width: 100%;
  }
  .news-description{
  	line-height: 20px;
  	padding-top: 10px;
  }
	.news-body{
		padding: 8px;
		border-bottom: 1px solid #cccccc;
	}
	.new-footer{
		height: 30px;
	}
	.new-footer li{
		border-right: 1px solid #cccccc; 
		cursor: pointer;
	}
	.new-footer li:hover{
		color: #3DA8F5;
	}
	.new-footer li:last-of-type{
		border-right: none; 
	}
</style>