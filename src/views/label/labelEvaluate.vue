<template>
  <div class="apply">
      <div class="title">
      <div class='left'><button @click="showList" class="btn btn-primary">标签列表</button><span> > 标签评价</span></div>
    </div>
   <div class="center col-sm-12 col-xs-12" >
   <div><button class="btn btn-success" @click="addList(evalList)">新增大标题</button></div>
    
   	<!-- {{labelData|json}} -->
    <div v-for="(data,index) in evalList">
      <pk-panel theme="info" class="col-sm-10" :title="'大标题'+(index+1)">
        <div slot='body'>
          <pk-input sm="8" label="大标题名称">
            <div class="border">
              <input type="text" class="form-control" v-model="data.item_name"> 
            </div>            
          </pk-input>
          <div class="f-left" >
              <button class="btn btn-success" v-if="!data.id" @click ="addEval(data)">新增大标题</button>
              <button class="btn btn-primary" v-else @click ="editEval(data)">编辑大标题</button> 
              <button class="btn btn-success" v-if="data.id" @click ="addSmallEval(data.sub_item)">新增小标题</button>       
          </div>
          <div v-for="(data2,index) in data.sub_item">
            <pk-input sm="10" label="小标题列表">
              <div class="border">
                <input type="text" class="form-control" v-model="data2.item_name">  
                <button class="btn btn-success" v-if="!data2.id" @click ="submitSmallEval(data,data2)">保存小标题</button>
                <button class="btn btn-primary" v-else @click ="editSmallEval(data2)">编辑小标题</button>
              </div>
            </pk-input>             
          </div>
        
        </div>
      </pk-panel>      
    </div>


   </div>
   
  </div>
</template>
<script>
import {
	pkInput,
	pkPanel
} from "pk"
import{
	userService
}from "api"
export default{
	props:["data","show"],
  components:{
  	pkInput,
		pkPanel
  },
  data () {
    return {
      evalList:[],
      refreshList: 0 
    }
  },
  methods:{
    getCommentList(){
      userService.getCommentList(this.data.id)
      .then(res => {
        this.evalList = res.data
      })
    },
    addList(data){
      data.push({})
    },
    showList(){
      this.$emit("update:show",true)
    },
    addEval(data){
      data.comment_item_id = 0
      data.category_id = this.data.id
      data.level = 1
      data.parent_id = 0
      userService.submitComment(data)
      .then((res) =>{
        if(res.code==200){
          this.refreshList++
        }
      })
    },
    addSmallEval(data){
      data.push({})
    },
    submitSmallEval(data,data2){
      // console.log(data,data2)
      data2.comment_item_id = 0
      data2.category_id = this.data.id
      data2.level = 2
      data2.parent_id = data.id
      userService.submitComment(data2)
      .then((res) =>{
        if(res.code==200){
          this.refreshList++
        }
      })
    },
    editSmallEval(data){
      userService.submitComment(data)
      .then((res) =>{
        if(res.code==200){
          this.refreshList++
        }
      })
    },
    editEval(data){
      let obj ={

      }
    }
  },
  mounted(){
    this.refreshList++
  },
  watch:{
    "refreshList":"getCommentList"
  }
}
</script>
<style scoped>
.center{
	margin: 10px; 
}
.apply{
	overflow: hidden;
	text-align: center;
}
  .top-bar{
    height: 70px;
    border-bottom: 1px solid #cccccc;
    background: #64a1ff;
  }
  .position{
  	position: absolute;
  	right: -150px;
  	top:0px;
  }
  .title{
    padding:10px;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
  }
  .left{
    padding:6px 12px;
    font-size: 18px;
    float:left;
  }
  .left span:first-of-type{
    cursor: pointer;
  }
  .right{
    float:right;
  } 
</style>

