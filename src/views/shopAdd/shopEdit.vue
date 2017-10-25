<template>
	<div>
		<div class="header">
      <div class="title">
        <div class='left'><button @click="showList" class="btn btn-primary">商家列表 </button><span> > 数据编辑</span></div>
      </div>    
    </div>
    <div class='pad-left'>
    <el-tabs v-model="selectedId">
      <el-tab-pane :label="data" v-for="(data,index) in selectArr"  @click='selectedId = String(index)' :name="String(index)"></el-tab-pane>
    </el-tabs>      
    </div>

    <!-- {{editData.scene_list}} -->
    <shop-info v-if="selectedId==0 && shopType" :type="shopType" :name="shopName" :data="editData"></shop-info>                                
    <shop-address v-if="selectedId==1" :data="editData"></shop-address>                                
    <shop-foods v-if="selectedId==2" :id="editData.id" :refresh.sync="refreshList" :data="editData.recommend_list"></shop-foods>         
    <shop-scene v-if="selectedId==3" :id="editData.id" :refresh.sync="refreshList" :data="editData.scene_list"></shop-scene>    	    		    	    	  
    <shop-label v-if="selectedId==4" :id="editData.id" :refresh.sync="refreshList" :data="editData"></shop-label>
    <shop-detail v-if="selectedId==5" :id="editData.id" :refresh.sync="refreshList" :data="editData"></shop-detail>
	</div>
</template>
<script>
import {
	pkInput,
	pkSingleImg
} from "pk"
import {
  userShopService
}from "api"
import shopInfo from "./shopInfo"
import shopAddress from "./shopAddress"
import shopFoods from "./shopFoods"
import shopScene from "./shopScene"
import shopLabel from "./shopLabel"
import shopDetail from "./shopDetail"
	export default{
    props:["id","show","refresh"],
		components:{
			pkInput,
			pkSingleImg,
			shopInfo,
      shopAddress,
      shopFoods,
      shopScene,
      shopLabel,
      shopDetail
		},
		data(){
			return {
				selectedId: "0",
				editData: {},
        shopType:"",
        shopName:"",
        selectArr:["餐厅信息","地址信息","推荐菜","场景推荐","场景标签","餐厅介绍"],
        refreshList: 0
			}
		},
    methods:{
      getShopDetail(){
        if(!this.id) return
        userShopService.getShopDetail(this.id)
        .then((res) => {
          if(res.code == 200){
            if(res.data){
              // bus.$emit("showAlert",res.msg)
              this.editData = res.data
              this.shopType = this.editData.shop_type_2.split(",")[0]
              this.shopName = this.editData.shop_name
            }
          }
        })
      },
      showList(){
        let num = Math.floor(Math.random()*1000)
        this.$emit("update:refresh",num)
        this.$emit("update:show",true)
      }
    },
    mounted(){
      this.getShopDetail()
    },
    watch:{
      "refreshList":"getShopDetail"
    }
	}
</script>
<style scoped>
.pad-left{
  padding-left: 20px; 
}
  .header{
    padding:10px;
    overflow: hidden;
  }
  .title{
    padding:10px;
    overflow: hidden;
    /*border-bottom: 1px solid #ccc;*/
  }
  .left{
    padding:6px 12px;
    font-size: 18px;
    float:left;
  }
  .left span:first-of-type{
    cursor: pointer;
  }
  .nav{
  	margin-bottom: 20px;
  }
</style>