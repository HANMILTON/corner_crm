<template>
  <modal effect="fade" :show.sync="show" :callback='confirm' :title="isAdd?'账号添加':'账号编辑'">
    <div class="modal-body row" slot="modal-body">
    <!-- {{editData}} -->
      <pk-input sm='12' label="登录账号">
        <input v-model='editData.user_name' type="text" class="form-control">
      </pk-input>
      <pk-input sm='12' label="登录密码">
        <input v-model='editData.password' type="text" class="form-control">
      </pk-input>
      <pk-input v-if="isAdd" sm='12' label="账号类型">
        <!-- <input v-model='editData.user_type' type="text" class="form-control"> -->
          <select class="form-control" v-model="editData.user_type">
            <option v-for="row in userList" :value="row.id">{{row.text}}</option>
          </select> 
      </pk-input>      
      <pk-input sm='12' label="昵称">
        <input v-model='editData.nick_name' type="text" class="form-control">
      </pk-input>
      <pk-input sm='12' label="LOGO">
        <div class="border">
          <pk-single-img size="small" :img.sync='editData.user_img'></pk-single-img>
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
      userList:[{text:"消息发布",id:"2"},{text:"新增餐厅",id:"3"}]
    }
  },
  methods: {
    confirm() {
      // return console.log(this.editData)
      if (this.isAdd) {
        this.editData.admin_user_id = 0
      }else{
        this.editData.admin_user_id = this.data.id
      }
      userService.adminSubmit(this.editData)
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
