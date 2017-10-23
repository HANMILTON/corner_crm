<template>
  <modal effect="fade" :show.sync="show" :callback='confirm' :title="isAdd?'爱好添加':'爱好编辑'">
    <div class="modal-body row" slot="modal-body">
      <pk-input sm='12' label="爱好名称">
        <input v-model='editData.hobby_name' type="text" class="form-control">
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
        this.editData.hobby_id = 0
      }else{
        this.editData.hobby_id = this.data.id
      }
      userService.userHobbySubmit(this.editData)
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
      // console.log(newval)
      if(!newval) {
        this.$emit("update:show",false)
      }
    }
  }
}
</script>
