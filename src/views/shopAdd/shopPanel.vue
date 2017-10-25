<template>
  <modal effect="fade" :show.sync="show" :callback='confirm'>
    <div class="modal-body row" slot="modal-body">
      <pk-input sm='12' label="账号">
        <input v-model='user_name' type="text" class="form-control" placeholder="手机号或者邮箱">
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
  userShopService
} from 'api'

export default {
  props: ['show','refresh'],
  components: {
    modal,
    pkInput
  },
  data() {
    return {
      user_name: ""
    }
  },
  methods: {
    confirm() {
      userShopService.addShop(this.user_name)
        .then((res) => {
          if(res.code == 200){
            let num = Math.floor(Math.random()*1000)
            this.$emit("update:refresh",num)
            this.$emit("update:show",false)
            bus.$emit("showAlert",res.msg)
          }
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
