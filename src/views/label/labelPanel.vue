<template>
  <modal effect="fade" :show.sync="show" :callback='confirm' :title="isAdd?'标签添加':'标签编辑'">
    <div class="modal-body row" slot="modal-body">
      <!-- {{editData|json}} -->
      <!-- <div>{{data}}</div> -->
      <pk-input sm='12' label="标签名称">
        <input v-model='editData.category_name' type="text" class="form-control">
      </pk-input>
      <pk-input sm='12' label="标签图片">
      	<div class="border">
      		<pk-single-img size="small" :img.sync='editData.category_img'></pk-single-img>
      	</div>
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
  props: ['show', 'data', 'mode', 'refresh'],
  components: {
    modal,
    pkInput,
    pkSingleImg
  },
  computed: {
    isEdit() {
      return this.mode === 'edit'
    },
    isAdd() {
      return this.mode === 'add'
    }
  },
  data() {
    return {
      editData: this.mode == "add" ? {} : this.data,
      // show: this.show
    }
  },
  methods: {
    confirm() {
      if (this.isAdd) {
        this.editData.category_id = 0
        this.editData.parent_id = this.data.id
        this.editData.level = this.data.level
      }else{
        this.editData.category_id = this.data.id
      }
      userService.categorySubmit(this.editData)
        .then((res) => {
          if(res.code == 200){
            let num = Math.floor(Math.random()*1000)
            this.$emit("update:refresh",num)
            this.$emit("update:show",false)
          }
          bus.$emit("showAlert",res.msg)
        })

    }
  },
  watch:{
    "show"(newval){
      if(!newval) this.$emit("update:show",false)
    }
  }
}
</script>
