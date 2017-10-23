<template>
	<div>
	<div v-if="showList">
		<h3 class="text-left">用户列表</h3>
		<div class="wrap">
<!-- 			<pk-input sm="4" label="手机号">
				<input type="text" class="form-control" @keyup.enter="getUserList" v-model="serachObj.mobile" name="">
			</pk-input>		
			<pk-input sm="4" label="注册时间">
				<pk-date-time :value.sync="serachObj.reg_date_start"></pk-date-time>
			</pk-input>	
			<pk-input sm="4" label="至">
				<pk-date-time :value.sync="serachObj.reg_date_end"></pk-date-time>
			</pk-input>	
			<pk-input sm="4" label="登录时间">
	    		<select class="form-control" @change="getUserList" v-model="serachObj.login_date">
	    			<option v-for="data in dateArr" :value="data.value">{{data.text}}</option>
	    		</select>	
			</pk-input>				
			<div>
				<button class="btn btn-primary" @click="getUserList">查询</button>
			</div> -->	
		<el-row :gutter="30">
  			<el-col :span="6">
  				<el-input v-model="serachObj.mobile" @change="refreshList++" placeholder="搜索手机号"></el-input>
  			</el-col>
		    <el-col :span="6">			    
	  			<el-date-picker
				      v-model="serachObj.reg_date_start"
				      @change="dateChange($event,'reg_date_start')"
				      :clearable="true"
				      placeholder="注册开始日期">
				   </el-date-picker>
			  </el-col>
  			<el-col :span="6">			   	
  				<el-date-picker
			      v-model="serachObj.reg_date_end"
			      @change="dateChange($event,'reg_date_end')"
			      :clearable="true"
			      placeholder="注册结束日期">
			    </el-date-picker>	
			  </el-col>
			  <el-col :span="6">
  				<el-select v-model="serachObj.login_date"  @visible-change="getUserList" placeholder="登录时间">
				<el-option
				  v-for="item in dateArr"
				  :label="item.text"
				  :value="item.value">
				</el-option>
			  </el-select>
  			</el-col>
		  </el-row>	
		</div>

	    <div class="wrap"></div>
		<pk-table :data="userList" @trclick='tableClick' :option="userOpts"></pk-table>	
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
	
	<user-detail v-else :show.sync="showList" :data="selectData"></user-detail>
	</div>
</template>
<script>
	import{
		userOpts
	}from "./user"
	import {
		pkTable,
		pkInput,
		pkDateTime
	}from "pk"
	import userDetail from "./userDetail"
	import{
		userService
	}from "api"
	export default{
		components:{
			pkTable,
			pkInput,
			pkDateTime,
			userDetail
		},
		data(){
			return{
				userOpts,
				userList:[],
				serachObj:{
					page:1,
					per_page:5,
					status:-1,
					reg_date_start: "",
					reg_date_end: ""
				},
				pageCount: 0,
				showList: true,
				dateArr: [{text:"全部",value:"-1"},{text:"最近3天",value:"3"},{text:"最近7天",value:"7"}],
				refreshList: 0,
				selectData:{}
			}
		},
		methods:{
			dateChange(val,key) {
			    this.serachObj[key] = val
			    this.refreshList++
			},
			handleCurrentChange(){
				this.refreshList++
			},
			getUserList(){
				userService.getUserList(this.serachObj)
				.then((data) => {
					if(data.code == 200){
						this.pageCount = data.data.page_count
						this.userList = data.data.user_list
					}
				})
			},
			tableClick(e,row,type){
				if(type == "detail"){
					this.selectData = row
					this.showList = false
				}
			}
		},
		mounted(){
			this.refreshList++
		},
		watch:{
			"refreshList": "getUserList",
		}

	}
</script>
<style scoped>
	h3{
		margin: 20px 0;
		padding-bottom:20px;
	}
	.wrap{
		min-height: 20px;
	}
</style>