t<template>
  <modal effect="fade" :show.sync="show" :callback='confirm' title="新增场景">
    <div class="modal-body row" slot="modal-body">
      <!-- {{editData|json}} -->
      <!-- <div>{{selectData}}</div> -->
      <pk-input sm='12' label="场景名称">
        <select class="form-control" v-model="selectData.scene_id" @change="getName(selectData.scene_id)">
        	<option v-for="data in sceneList" :value="data.id">{{data.scene_name}}</option>
        </select>
      </pk-input>
    </div>
  </modal>	
</template>
<script>
import {
  pkInput,
  modal,
  pkSingleImg
} from 'pk'
import {
  userService
} from 'api'

export default {
  props: ['show','data'],
  components: {
    modal,
    pkInput,
  },
  data() {
    return {
      sceneList:[],
      selectData:{}
    }
  },
  methods: {
    confirm() {
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].scene_id == this.selectData.scene_id){
          return alert("不可以重复添加场景!")
        }
      }
      this.data.push(this.selectData)
      this.$emit("update:show",false)
  	},
  	getSceneList(){
  		userService.getSceneList()
  		.then((res) =>{
  			this.sceneList = res.data
  		})
  	},
  	getName(id){
  		this.sceneList.forEach(data => {
  			if(data.id == id) this.selectData.scene_name = data.scene_name
  		})
    },
  },
  mounted(){
  	this.getSceneList(1)
  },
  watch:{
    "show"(newval){
      if(!newval) this.$emit("update:show",false)
    }
  }
}
</script>
