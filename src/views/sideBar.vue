<template>
	<div class="panel-group">
		<ul class="nav nav-pills nav-stacked">
			<li :class="{active:selectedId===index}" @click="selectedId=index" v-for='(side,index) in mainSide'>
				<router-link :to="{name:side.path}">{{side.title}}</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
import {
	mainSide
} from './sideList'
export default {
  components: {
  },
  data() {
    return {
      mainSide,
      selectedId:0
    }
  },
  methods:{
    getIndex(){
      let name = this.$route.name
      for(let i=0;i<this.mainSide.length;i++){
        if(this.mainSide[i].path == name){
          return i
        }
      }
    }
  },
  mounted(){
    this.selectedId = this.getIndex()
  }
}
</script>
<style scoped>
  .panel-group{
    margin-top: 20px;
    border: 1px solid #cccccc; 
  }
</style>
