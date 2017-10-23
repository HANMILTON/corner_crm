<template>
<div>
	<div class="col-sm-9">
		<pk-input sm="6" label="省份">
    		<!-- <input type="text" v-model="data.sheng" name=""> -->
    		<select class="form-control" v-model="data.sheng" @change="getAreaList(1,data.sheng,true)">
    			<option v-for="data in proList" :value="data.id">{{data.sheng}}</option>
    		</select>
    	</pk-input>
    	<pk-input sm="6" label="市">
    		<!-- <input type="text" class="form-control" v-model="data.shi" name=""> -->
    		<select class="form-control" v-model="data.shi" @change="getAreaList(2,data.shi,true)">
    			<option v-for="data in cityList" :value="data.id">{{data.shi}}</option>
    		</select>
    	</pk-input>
    	<pk-input sm="6" label="县（区）">
    		<!-- <input type="text" class="form-control" v-model="data.xian" name=""> -->
    		<select class="form-control" v-model="data.xian" @change="getAreaList(3,data.xian,true)">
    			<option v-for="data in districtList" :value="data.id">{{data.xian}}</option>
    		</select>    		
    	</pk-input>
     	<pk-input sm="6" label="商圈">
    		<!-- <input type="text" class="form-control" v-model="data.xian" name=""> -->
    		<select class="form-control" v-model="data.shangquan_id" @change="setAddress(data.shangquan_id)">
    			<option v-for="data in busList" :value="data.id">{{data.shangquan}}</option>
    		</select>    		
    	</pk-input>      	
    	<pk-input sm="6" label="地址">
    		<input type="text" class="form-control" v-on:keyup.enter="searchByStationName(data.address)" v-model="data.address" name="">
    		<input type="hidden" v-model="data.senderLatitude" value="1">
			<input type="hidden" v-model="data.senderLongitude" value="1">	
    	</pk-input>
    	<pk-input sm="6" label="楼层">
    		<input type="text" class="form-control" v-model="data.floor" name="">
    	</pk-input>    
    	<pk-input sm="6" label="电话 021-">
    		<textarea type="text" class="form-control" v-model="data.tel" name="" rows="5"></textarea>
    	</pk-input>  
    	<pk-input sm="6" label="联系人">
			<input type="text" class="form-control" v-model="data.contacter" name="">
    	</pk-input>   	
    	<pk-input sm="6" label="WIFI名称">
			<input type="text" class="form-control" v-model="data.wifi_name" name="">
    	</pk-input> 
    	<pk-input sm="6" label="WIFI密码">
			<input type="text" class="form-control" v-model="data.wifi_password" name="">
    	</pk-input> 
    	<pk-input sm="6" label="停车场">
			<input type="text" class="form-control" v-model="data.park_address" name="">
    	</pk-input> 
    	<pk-input sm="6" label="停车场备注">
			<input type="text" class="form-control" v-model="data.park_remark" name="">
    	</pk-input> 
    	<div class="f-left col-sm-12 btn-pad text-cente">
    		<button class="pk-btn-main offset-left-50" @click="submit">提交</button>
    	</div>	
    </div>
    <div class="mapBox">
		<!-- <pk-input label="经纬度" sm="6"> -->
			<!-- <input type="text" class="form-control" v-model="positionInfo" disabled> -->
		<!-- </pk-input>	 -->
		<div id="container"></div>
	</div>
</div>

    	
	
</template>
<script>
import {
	pkInput,
	pkSingleImg
} from "pk"
import {
	publicService,
	userService
}from "api"
import shopInfo from "./shopInfo"
	export default{
		props:["data"],
		components:{
			pkInput,
			pkSingleImg,
			shopInfo
		},
		data(){
			return {
				proList:[],
				cityList:[],
				districtList:[],
				busList:[],
				positionInfo:"",
				proName:"",
				cityName:"",
				districtName:"",
				searchStr: ""
			}
		},
		methods:{
			getList(level){
				switch(level){
					case 1:
						return this.proList
						break;
					case 2:
						return this.cityList
						break;
					case 3:
						return this.districtList
						break;												
				}
			},
			getAreaList(level,parent_id,flag){
				var id = parent_id
				if(!id) return
				if(flag){
					let str = ""
					// console.log(str)
					let dataArr = this.getList(level)
					for(let i=0;i<dataArr.length;i++){
						if(dataArr[i].id == id){
							if(level == 1){
								str = dataArr[i].sheng
							}else if(level == 2){
								str = dataArr[i].sheng + dataArr[i].shi
							}else if(level == 3){
								str = dataArr[i].sheng + dataArr[i].shi + dataArr[i].xian
							}
						}
					}
					this.searchStr = str
					this.searchByStationName(str)					
				}
				publicService.getCitySub(level,id)
				.then((res) => {
					if(res.code==200){
						if(level==1){
							this.cityList = res.data	
							if(flag){
								this.districtList = []			
								this.busList = []								
							}
						}else if(level==2){
							this.districtList = res.data
							if(flag){
								this.busList = []
							}
						}else{
							this.busList = res.data
						}
					}
				})
			},
			setAddress(id){
				let str = ""
				for(let i=0;i<this.busList.length;i++){
					if(this.busList[i].id == id){
						str = this.busList[i].sheng + this.busList[i].shi + this.busList[i].xian　+　this.busList[i].shangquan
					}
				}
				this.searchStr = str
				this.searchByStationName(str)
			},
			searchByStationName(keyword){
			    window.map.clearOverlays();//清空原来的标注
			    if(!keyword) return
			    var that = this
			    window.localSearch.setSearchCompleteCallback(function (searchResult) {
			        let poi = searchResult.getPoi(0);
			        if(!poi) return
			        that.positionInfo = poi.point.lng + "," + poi.point.lat;
			        that.data.y = poi.point.lat
			        that.data.x = poi.point.lng
			        map.centerAndZoom(poi.point, 13);
			        let marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
			        map.addOverlay(marker);
			        let infoWindow = new BMap.InfoWindow("<p style='font-size:12px;'>" + keyword + "</p>");
			        marker.openInfoWindow(infoWindow)
			        marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); });
			    });
			    localSearch.search(keyword);
			},			
			submit(){
				this.data.detail_id = this.data.id
				userService.shopUpdate(this.data)
				.then((res) =>{
					if(res.code==200){
						bus.$emit("showAlert","修改成功！")
					}
				})
			},
			initCity(){
				if(this.data.address) {
					let that = this
					setTimeout(function(){
						that.searchByStationName(that.data.address)
					},300)
				}
				publicService.getCityTop()
				.then((res) => {
					if(res.code==200){
						this.proList = res.data
					}
				})
				if(this.data.sheng != "0") this.getAreaList(1,this.data.sheng)
				if(this.data.shi != "0") this.getAreaList(2,this.data.shi)
				if(this.data.xian != "0") this.getAreaList(3,this.data.xian)
			},			
			initData(){
				if(!this.data.sheng || this.data.sheng == "0") this.data.sheng=""
				if(!this.data.shi || this.data.shi == "0") this.data.shi=""
				if(!this.data.xian || this.data.xian == "0") this.data.xian=""
				if(!this.data.shangquan_id || this.data.shangquan_id == "0") this.data.shangquan_id=""
			}
		},
		mounted(){
			this.initData()
			// 百度地图
			window.map = new BMap.Map("container");
		    map.centerAndZoom("上海", 12);
		    map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
		    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用

		    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
		    window.localSearch = new BMap.LocalSearch(map);
		    localSearch.enableAutoViewport();
		    this.initCity()
		}
	}
</script>
<style scoped>
	#container,.mapBox{ 
    height: 260px; 
    overflow:hidden;
    margin-top:20px; 
    position: fixed;
    bottom:0;
    right: 0;
	}
	.mapBox{
		width: 24%;
	}
	#container{
		width: 100%;
	}
	.positionInfo{
		position: absolute;
		right: -50px;
		top:20px;
	}
</style>